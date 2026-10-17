// Conversation state for the "Ask AI" widget. It lives at module level, outside React, so an answer
// keeps streaming while the panel is closed and across page navigation (the UI is mounted from the
// theme Layout, which can remount between pages).

import { useSyncExternalStore } from "react";
import { translate } from "@docusaurus/Translate";
import { Api, ApiError, readEvents, type DoneReason } from "./api";
import { getTurnstileToken } from "./turnstile";

export interface DocsAssistConfig {
  apiBase: string;
  turnstileSiteKey: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

/** The status shown while the connection is being re-established (the panel styles it as a warning). */
export function reconnectingText(): string {
  return translate({
    id: "docsAssist.status.reconnecting",
    message: "Reconnecting…",
    description: "Ask AI: status shown while the connection to the assistant is being re-established",
  });
}

export type Notice =
  | { kind: "ip_limit"; resetsAt?: string; canGoBack: boolean }
  | { kind: "cap"; resetsAt?: string }
  | { kind: "rate_limited" }
  | { kind: "session_limit" }
  | { kind: "refusal" }
  | { kind: "invalid_message"; maxChars?: number }
  | { kind: "turnstile" }
  | { kind: "restore_failed" }
  | { kind: "error"; retry: boolean };

export interface AssistState {
  open: boolean;
  /** An answer finished while the panel was closed. */
  unread: boolean;
  threadId: string | null;
  messages: ChatMessage[];
  /** A turn is in progress (including starting the conversation). */
  busy: boolean;
  /** The message currently receiving text deltas, if any. */
  streamingId: string | null;
  /** What the agent is doing right now, shown as a status line. */
  activity: string | null;
  notice: Notice | null;
  limitReached: boolean;
  restoring: boolean;
  /** The text in the input box. Kept here so it survives the panel remounting. */
  draft: string;
}

export const MAX_MESSAGE_CHARS = 10_000;
const STORAGE_KEY = "velopack-docs-assist-thread";
const REATTACH_DELAYS_MS = [1_000, 2_000, 4_000, 8_000];

let config: DocsAssistConfig | null = null;
let api: Api | null = null;
let state: AssistState = {
  open: false,
  unread: false,
  threadId: readStoredThread(),
  messages: [],
  busy: false,
  streamingId: null,
  activity: null,
  notice: null,
  limitReached: false,
  restoring: false,
  draft: "",
};
const listeners = new Set<() => void>();

/** Bumped whenever the conversation is replaced, so work for the old one stops touching state. */
let generation = 0;
let controller: AbortController | null = null;
let restoredThreadId: string | null = null;
let previousThreadId: string | null = null;
let lastText = "";
let localIds = 0;

let turnstileHost: HTMLElement | null = null;
let turnstileHostWaiters: Array<(host: HTMLElement) => void> = [];

function set(patch: Partial<AssistState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

export function useAssistState(): AssistState {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => state,
  );
}

export function configure(cfg: DocsAssistConfig) {
  if (config?.apiBase === cfg.apiBase && config.turnstileSiteKey === cfg.turnstileSiteKey) return;
  config = cfg;
  api = new Api(cfg.apiBase);
}

export function setOpen(open: boolean) {
  set(open ? { open, unread: false } : { open });
  if (open) void restore();
}

export function setDraft(draft: string) {
  set({ draft });
}

/** Called by the panel with the element the Turnstile widget renders into (null on unmount). */
export function setTurnstileHost(host: HTMLElement | null) {
  turnstileHost = host;
  if (host) {
    turnstileHostWaiters.forEach((w) => w(host));
    turnstileHostWaiters = [];
  }
}

/**
 * Opens the panel and asks `question` in a new conversation (the "Ask AI" row in the search bar).
 * If an answer is still streaming, the question is put in the input box instead.
 */
export function ask(question: string) {
  question = question.trim();
  if (!question || state.busy) {
    setOpen(true);
    if (question) set({ draft: question });
    return;
  }
  set({ open: true, unread: false });
  if (state.threadId || state.messages.length || state.restoring) newConversation();
  void send(question);
}

export function newConversation() {
  abortTurn();
  if (state.threadId) previousThreadId = state.threadId;
  storeThread(null);
  restoredThreadId = null;
  set({
    threadId: null,
    messages: [],
    busy: false,
    streamingId: null,
    activity: null,
    notice: null,
    limitReached: false,
    restoring: false,
  });
}

/** Goes back to the conversation that "New conversation" replaced (when a new one couldn't be started). */
export function returnToPreviousConversation() {
  const id = previousThreadId;
  if (!id) return;
  abortTurn();
  previousThreadId = null;
  storeThread(id);
  restoredThreadId = null;
  set({ threadId: id, messages: [], notice: null, busy: false, streamingId: null, activity: null });
  void restore();
}

export function dismissNotice() {
  set({ notice: null });
}

export function retry() {
  if (lastText) void send(lastText, { retry: true });
}

export async function send(text: string, opts: { retry?: boolean } = {}) {
  text = text.trim();
  if (!text || state.busy || state.restoring || state.limitReached || !api) return;
  if (text.length > MAX_MESSAGE_CHARS) {
    set({ notice: { kind: "invalid_message", maxChars: MAX_MESSAGE_CHARS } });
    return;
  }

  const gen = generation;
  const localId = `local-${++localIds}`;
  lastText = text;
  set({
    busy: true,
    notice: null,
    activity: translate({
      id: "docsAssist.status.thinking",
      message: "Thinking…",
      description: "Ask AI: status shown while waiting for the first part of an answer",
    }),
    draft: opts.retry ? state.draft : "",
    messages: opts.retry ? state.messages : [...state.messages, { id: localId, role: "user", text }],
  });

  let streamStarted = false;
  try {
    let threadId = state.threadId ?? (await createThread(gen));
    let res: Response;
    const ctrl = newController();
    try {
      res = await api.sendMessage(threadId, text, location.href, ctrl.signal);
    } catch (err) {
      // The Worker doesn't know this conversation (anymore); start a new one.
      if (!(err instanceof ApiError && err.status === 404) || gen !== generation) throw err;
      storeThread(null);
      set({ threadId: null });
      threadId = await createThread(gen);
      res = await api.sendMessage(threadId, text, location.href, ctrl.signal);
    }
    if (gen !== generation) return;
    streamStarted = true;
    await runTurn(gen, threadId, res);
  } catch (err) {
    if (gen !== generation || isAbort(err)) return;
    console.warn("[DocsAssist] send failed", err);
    if (!streamStarted && !opts.retry) {
      // Nothing reached the agent: take the message back so it can be sent again.
      set({ messages: state.messages.filter((m) => m.id !== localId), draft: state.draft || text });
    }
    finishTurn(gen, noticeFor(err, streamStarted || !!opts.retry));
  }
}

async function createThread(gen: number): Promise<string> {
  const { turnstileSiteKey } = config!;
  const host = await waitForTurnstileHost();
  let token = await getTurnstileToken(host, turnstileSiteKey);
  let threadId: string;
  try {
    threadId = await api!.createThread(token, location.href);
  } catch (err) {
    if (!(err instanceof ApiError && err.code === "turnstile_failed")) throw err;
    token = await getTurnstileToken(host, turnstileSiteKey);
    threadId = await api!.createThread(token, location.href);
  }
  if (gen === generation) {
    storeThread(threadId);
    restoredThreadId = threadId;
    previousThreadId = null;
    set({ threadId });
  }
  return threadId;
}

/** Applies a turn's event stream, then reattaches while the connection keeps dropping mid-turn. */
async function runTurn(gen: number, threadId: string, res: Response) {
  let reason = await consume(gen, res);
  for (let attempt = 0; reason === "disconnected" && gen === generation; attempt++) {
    if (attempt >= REATTACH_DELAYS_MS.length) {
      finishTurn(gen, { kind: "error", retry: false });
      return;
    }
    set({ activity: reconnectingText() });
    await new Promise((r) => setTimeout(r, REATTACH_DELAYS_MS[attempt]));
    if (gen !== generation) return;
    try {
      reason = await consume(gen, await api!.attach(threadId, newController().signal));
    } catch (err) {
      if (isAbort(err) || gen !== generation) return;
      if (err instanceof ApiError && err.status !== 429 && err.status < 500) throw err;
      continue; // still offline, or the Worker is having a moment
    }
    // A reattached stream doesn't replay deltas or catch discards we missed; history is authoritative.
    await refreshHistory(gen, threadId);
  }
  if (gen !== generation) return;
  if (reason === "idle") await refreshHistory(gen, threadId);
  finishTurn(gen, noticeForDone(reason));
}

/** Reads one SSE stream into state. Returns how it ended; a stream that breaks without `done` counts as `disconnected`. */
async function consume(gen: number, res: Response): Promise<DoneReason> {
  try {
    for await (const ev of readEvents(res)) {
      if (gen !== generation) return "idle";
      switch (ev.event) {
        case "start":
          upsertMessage(ev.data.id, (m) => m ?? "");
          set({ streamingId: ev.data.id, activity: null });
          break;
        case "delta":
          upsertMessage(ev.data.id, (m) => (m ?? "") + ev.data.text);
          set({ streamingId: ev.data.id, activity: null });
          break;
        case "message":
          upsertMessage(ev.data.id, () => ev.data.text);
          set({ streamingId: null, activity: null });
          break;
        case "discard":
          set({
            messages: state.messages.filter((m) => m.id !== ev.data.id),
            streamingId: state.streamingId === ev.data.id ? null : state.streamingId,
          });
          break;
        case "activity":
          set({ activity: ev.data.text });
          break;
        case "done":
          return ev.data.reason;
      }
    }
  } catch (err) {
    if (isAbort(err) || gen !== generation) return "idle";
  }
  return "disconnected";
}

function upsertMessage(id: string, update: (text: string | undefined) => string) {
  const i = state.messages.findIndex((m) => m.id === id);
  if (i < 0) {
    set({ messages: [...state.messages, { id, role: "assistant", text: update(undefined) }] });
  } else {
    const messages = state.messages.slice();
    messages[i] = { ...messages[i], text: update(messages[i].text) };
    set({ messages });
  }
}

function finishTurn(gen: number, notice: Notice | null) {
  if (gen !== generation) return;
  controller = null;
  set({
    busy: false,
    streamingId: null,
    activity: null,
    notice,
    unread: !state.open,
    ...(notice?.kind === "session_limit" ? { limitReached: true } : {}),
  });
}

/** Loads the stored conversation once per page load, and reattaches if an answer is still running. */
async function restore() {
  const threadId = state.threadId;
  if (!api || !threadId || restoredThreadId === threadId || state.busy || state.restoring) return;
  restoredThreadId = threadId;
  const gen = generation;
  set({ restoring: true });
  try {
    const history = await api.history(threadId);
    if (gen !== generation) return;
    set({ messages: history.messages, limitReached: history.limitReached, restoring: false });
    if (history.running) {
      set({
        busy: true,
        activity: translate({
          id: "docsAssist.status.resuming",
          message: "Picking up where it left off…",
          description: "Ask AI: status shown when reattaching to an answer that was still being written after a page reload",
        }),
      });
      await runTurn(gen, threadId, await api.attach(threadId, newController().signal));
    }
  } catch (err) {
    if (gen !== generation || isAbort(err)) return;
    if (err instanceof ApiError && err.status === 404) {
      storeThread(null);
      set({ threadId: null, messages: [], restoring: false });
      return;
    }
    console.warn("[DocsAssist] restore failed", err);
    restoredThreadId = null; // try again next time the panel opens
    set({ restoring: false });
    finishTurn(gen, { kind: "restore_failed" });
  }
}

async function refreshHistory(gen: number, threadId: string) {
  try {
    const history = await api!.history(threadId);
    if (gen === generation) set({ messages: history.messages, limitReached: history.limitReached });
  } catch {
    // keep what we have
  }
}

function noticeFor(err: unknown, canRetry: boolean): Notice {
  if (err instanceof ApiError) {
    switch (err.code) {
      case "ip_limit":
        return { kind: "ip_limit", resetsAt: err.resetsAt, canGoBack: !!previousThreadId };
      case "daily_cap":
      case "weekly_cap":
        return { kind: "cap", resetsAt: err.resetsAt };
      case "rate_limited":
        return { kind: "rate_limited" };
      case "session_limit":
        return { kind: "session_limit" };
      case "invalid_message":
        return { kind: "invalid_message", maxChars: err.maxChars };
      case "turnstile_failed":
        return { kind: "turnstile" };
    }
  } else if (err instanceof Error && err.message.startsWith("Turnstile")) {
    return { kind: "turnstile" };
  }
  return { kind: "error", retry: canRetry };
}

function noticeForDone(reason: DoneReason): Notice | null {
  switch (reason) {
    case "session_limit":
      return { kind: "session_limit" };
    case "refusal":
      return { kind: "refusal" };
    case "error":
    case "disconnected":
      return { kind: "error", retry: true };
    default:
      return null;
  }
}

function newController(): AbortController {
  controller?.abort();
  controller = new AbortController();
  return controller;
}

function abortTurn() {
  generation++;
  controller?.abort();
  controller = null;
}

function waitForTurnstileHost(): Promise<HTMLElement> {
  if (turnstileHost) return Promise.resolve(turnstileHost);
  return new Promise((resolve) => turnstileHostWaiters.push(resolve));
}

function isAbort(err: unknown): boolean {
  return err instanceof DOMException && err.name === "AbortError";
}

function readStoredThread(): string | null {
  try {
    return typeof localStorage === "undefined" ? null : localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeThread(threadId: string | null) {
  try {
    if (threadId) localStorage.setItem(STORAGE_KEY, threadId);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // storage unavailable; the conversation just won't survive a reload
  }
}
