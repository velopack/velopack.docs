// Client for the velopack.docsassist Worker. The API contract is documented in WIDGET.md in that repo.

export interface HistoryMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export interface History {
  messages: HistoryMessage[];
  running: boolean;
  limitReached: boolean;
}

export type DoneReason = "end_turn" | "session_limit" | "refusal" | "error" | "disconnected" | "idle";

export type StreamEvent =
  | { event: "start"; data: { id: string } }
  | { event: "delta"; data: { id: string; text: string } }
  | { event: "message"; data: { id: string; text: string } }
  | { event: "discard"; data: { id: string } }
  | { event: "activity"; data: { text: string } }
  | { event: "done"; data: { reason: DoneReason } };

/** A non-2xx response. `code` is the Worker's `error` field (e.g. "ip_limit"), when it sent one. */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string | undefined,
    readonly resetsAt: string | undefined,
    readonly maxChars: number | undefined,
  ) {
    super(`docs assistant API error ${status}${code ? ` (${code})` : ""}`);
  }
}

export class Api {
  constructor(private readonly base: string) {}

  async createThread(turnstileToken: string, page: string): Promise<string> {
    const res = await this.request("/api/threads", { method: "POST", body: JSON.stringify({ turnstileToken, page }) });
    const body = (await res.json()) as { threadId: string };
    return body.threadId;
  }

  async history(threadId: string): Promise<History> {
    const res = await this.request(`/api/threads/${encodeURIComponent(threadId)}`, { method: "GET" });
    return (await res.json()) as History;
  }

  /** Sends a message. The response body is the SSE stream of the answer (see `readEvents`). */
  sendMessage(threadId: string, text: string, page: string, signal: AbortSignal): Promise<Response> {
    return this.request(`/api/threads/${encodeURIComponent(threadId)}/messages`, {
      method: "POST",
      body: JSON.stringify({ text, page }),
      signal,
    });
  }

  /** Reattaches to a turn in progress. Sends `done { reason: "idle" }` straight away when nothing is running. */
  attach(threadId: string, signal: AbortSignal): Promise<Response> {
    return this.request(`/api/threads/${encodeURIComponent(threadId)}/stream`, { method: "GET", signal });
  }

  private async request(path: string, init: RequestInit): Promise<Response> {
    const res = await fetch(this.base.replace(/\/+$/, "") + path, {
      ...init,
      headers: init.body ? { "Content-Type": "application/json" } : undefined,
    });
    if (!res.ok) {
      let body: { error?: string; resetsAt?: string; maxChars?: number } = {};
      try {
        body = await res.json();
      } catch {
        // not JSON; the status is all we have
      }
      throw new ApiError(res.status, body.error, body.resetsAt, body.maxChars);
    }
    return res;
  }
}

/**
 * Reads an SSE response body. EventSource can't POST, so this is a small parser over fetch:
 * events are separated by blank lines, and only the `event:` and `data:` fields are used.
 * `ping` keep-alives and unparseable events are skipped.
 */
export async function* readEvents(res: Response): AsyncGenerator<StreamEvent> {
  if (!res.body) return;
  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return;
      buffer += value.replace(/\r\n?/g, "\n");
      let end: number;
      while ((end = buffer.indexOf("\n\n")) >= 0) {
        const block = buffer.slice(0, end);
        buffer = buffer.slice(end + 2);
        const ev = parseBlock(block);
        if (ev) yield ev;
      }
    }
  } finally {
    reader.releaseLock();
  }
}

function parseBlock(block: string): StreamEvent | null {
  let event = "message";
  const data: string[] = [];
  for (const line of block.split("\n")) {
    if (!line || line.startsWith(":")) continue;
    const colon = line.indexOf(":");
    const field = colon < 0 ? line : line.slice(0, colon);
    let value = colon < 0 ? "" : line.slice(colon + 1);
    if (value.startsWith(" ")) value = value.slice(1);
    if (field === "event") event = value;
    else if (field === "data") data.push(value);
  }
  if (event === "ping" || data.length === 0) return null;
  try {
    return { event, data: JSON.parse(data.join("\n")) } as StreamEvent;
  } catch {
    return null;
  }
}
