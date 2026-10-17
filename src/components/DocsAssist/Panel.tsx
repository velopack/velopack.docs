import React, {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import clsx from "clsx";
import VelopackMark from "./VelopackMark";
import Markdown from "./Markdown";
import { preloadTurnstile } from "./turnstile";
import {
  MAX_MESSAGE_CHARS,
  dismissNotice,
  newConversation,
  retry,
  returnToPreviousConversation,
  send,
  setDraft,
  setOpen,
  setTurnstileHost,
  useAssistState,
  type ChatMessage,
  type Notice,
} from "./store";
import { SHEET_QUERY, prefersReducedMotion, turnClock } from "./constants";
import { useMediaQuery } from "./useMediaQuery";
import { useSmoothText } from "./useSmoothText";
import { splitBlocks } from "./splitBlocks";
import {
  AlertCircleIcon,
  AlertTriangleIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  BadgeCheckIcon,
  ChevronDownIcon,
  ClockIcon,
  ComposeIcon,
  InfoIcon,
  MaximizeIcon,
  MinimizeIcon,
  MoonIcon,
  RefreshIcon,
  ShieldIcon,
  RocketIcon,
  UsersIcon,
} from "./icons";
import styles from "./Panel.module.css";

type IconComponent = ComponentType<{ size?: number; className?: string }>;

const EXAMPLES: { q: string; Icon: IconComponent }[] = [
  { q: "How do I check for updates when my app starts?", Icon: RocketIcon },
  { q: "How do I code-sign my app on Windows and macOS?", Icon: BadgeCheckIcon },
  { q: "Can I install for all users instead of per-user?", Icon: UsersIcon },
];

const WIDE_QUERY = "(min-width: 1024px)";
const WIDE_KEY = "velopack-docs-assist-wide";
// The visitor's own choice from the expand button: "1" expanded, "0" collapsed (after which the panel
// never expands by itself again), null if they haven't used it.
let widePref = readWidePref();
// The current width, kept across Layout remounts. An automatic expand lasts for the page session only.
let sessionWide = widePref === "1";
const COARSE = "(pointer: coarse)";

/**
 * Whether the mounted panel was last committed open. A Layout remount (docs → blog) renders the new
 * panel before the old one's cleanups run, so this is kept up to date on every commit, not on unmount.
 */
let committedOpen = false;

export default function Panel({ fabRef }: { fabRef: RefObject<HTMLButtonElement | null> }) {
  const s = useAssistState();
  const shellRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const stickToBottom = useRef(true);
  const smoothScrolling = useRef(false);
  const unmounting = useRef(false);

  const sheet = useMediaQuery(SHEET_QUERY);
  const canWide = useMediaQuery(WIDE_QUERY) && !sheet;
  const [wide, setWideState] = useState(sessionWide);
  const setWide = useCallback((next: boolean) => {
    sessionWide = next;
    setWideState(next);
  }, []);

  // A remount while it stays open (docs → blog) shows the panel in place, without the morph.
  const [skipEnter, setSkipEnter] = useState(() => committedOpen && s.open);
  // Any remount (open in place, or closed) shows the panel as it was: entrances already played.
  const [settleOnMount] = useState(() => skipEnter || !s.open);

  // Bumped on every open so the tint streaks replay; `openedAt` tells the intro whether it is
  // mounting as part of the open morph (staggered after it) or later (no delay).
  const [openCount, setOpenCount] = useState(0);
  const [openedAt, setOpenedAt] = useState(() => (s.open && !skipEnter ? Date.now() : 0));
  const [prevOpen, setPrevOpen] = useState(s.open);
  if (s.open !== prevOpen) {
    setPrevOpen(s.open);
    if (s.open) {
      setOpenCount((c) => c + 1);
      setOpenedAt(Date.now());
    } else if (skipEnter) {
      setSkipEnter(false);
    }
  }

  // The first mount happens already open (the chunk is resolved by hand). Render it closed for one
  // style flush, then open, so the morph plays from the launcher. (Not @starting-style: the site's
  // CSS minifier can't parse it.) `shown` drives everything that should follow the visible state.
  const [primed, setPrimed] = useState(() => !(s.open && !skipEnter));
  useLayoutEffect(() => {
    if (primed) return;
    shellRef.current?.getBoundingClientRect(); // flush the closed style so the transitions start from it
    setPrimed(true);
  }, [primed]);
  const shown = s.open && primed;

  // The send arrow launches out when a turn starts and drops back in (re-keyed) when it ends.
  const [arrowKey, setArrowKey] = useState(0);
  const [prevBusy, setPrevBusy] = useState(s.busy);
  if (s.busy !== prevBusy) {
    setPrevBusy(s.busy);
    if (!s.busy) setArrowKey((k) => k + 1);
  }

  useLayoutEffect(() => {
    committedOpen = s.open;
  }, [s.open]);

  useEffect(() => {
    return () => {
      unmounting.current = true;
    };
  }, []);

  // On a remount, finish every one-shot entrance (composer, send arrow, intro stagger, status row,
  // notice…) so nothing flashes in again. Looping animations are left running.
  useLayoutEffect(() => {
    if (!settleOnMount) return;
    for (const a of shellRef.current?.getAnimations({ subtree: true }) ?? []) {
      if (Number.isFinite(Number(a.effect?.getComputedTiming().endTime))) a.finish();
    }
  }, [settleOnMount]);

  const close = useCallback(() => setOpen(false), []);
  // In the sheet layout the panel covers the page, so get out of the way when a docs link is followed.
  const onInternalLink = useCallback(() => {
    if (window.matchMedia(SHEET_QUERY).matches) setOpen(false);
  }, []);
  // Auto-expand: a turn started while the panel is mounted arms a check, and the panel expands the
  // first time that turn (question plus answer) no longer fits, unless the visitor has collapsed it
  // before. The check stays armed until the finished answer has been measured, because the end of an
  // answer and the end of the turn often arrive together (and the panel may be closed when it does).
  const fit = useRef({ armed: false, canExpand: false, busy: false, revealing: false });
  const checkFit = useCallback(() => {
    const f = fit.current;
    const el = scrollRef.current;
    if (!f.armed || !f.canExpand || !el) return;
    if (widePref === "0") {
      f.armed = false;
    } else if (!turnFits(el)) {
      f.armed = false;
      setWide(true);
    } else if (!f.busy && !f.revealing) {
      f.armed = false; // the whole answer fits
    }
  }, [setWide]);
  // Called as an answer grows: follow it, and see whether it still fits.
  const pin = useCallback(
    (revealing: boolean) => {
      const el = scrollRef.current;
      if (!el) return;
      if (stickToBottom.current) el.scrollTop = el.scrollHeight;
      fit.current.revealing = revealing;
      checkFit();
    },
    [checkFit],
  );
  // …and when the panel opens or resizes, or the turn ends, with the answer already in place.
  useLayoutEffect(checkFit, [shown, canWide, wide, s.messages, s.busy, checkFit]);

  // Open: warm Turnstile, move focus in, listen for Esc. Close (cleanup): give focus back.
  useEffect(() => {
    if (!shown) return;
    preloadTurnstile();
    const opener = document.activeElement as HTMLElement | null;
    const input = inputRef.current;
    // On touch, focusing the input mid-slide pops the keyboard; focus the dialog and let them tap.
    if (!window.matchMedia(COARSE).matches && input && !input.disabled) input.focus({ preventScroll: true });
    else panelRef.current?.focus({ preventScroll: true });
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && !e.defaultPrevented && !e.isComposing) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (unmounting.current) return;
      const shell = shellRef.current;
      const active = document.activeElement;
      // Never take focus away from somewhere the visitor moved it.
      if (!active || active === document.body || shell?.contains(active)) {
        const back =
          opener && opener !== document.body && opener.isConnected && !shell?.contains(opener) ? opener : fabRef.current;
        back?.focus({ preventScroll: true });
      }
    };
  }, [shown, fabRef]);

  // The input was disabled while the conversation loaded; hand focus to it once it's usable.
  useEffect(() => {
    if (!shown || s.restoring) return;
    const input = inputRef.current;
    if (input && document.activeElement === panelRef.current && !window.matchMedia(COARSE).matches) {
      input.focus({ preventScroll: true });
    }
  }, [shown, s.restoring]);

  // Fit the sheet to the visual viewport: iOS doesn't shrink the layout viewport for the keyboard,
  // and a page with horizontal overflow widens the layout viewport past the screen on mobile.
  useEffect(() => {
    const vv = window.visualViewport;
    const shell = shellRef.current;
    if (!vv || !sheet || !shell) return;
    const update = () => {
      shell.style.setProperty("--vvh", `${vv.height}px`);
      shell.style.setProperty("--vvw", `${vv.width}px`);
      shell.style.setProperty("--vvl", `${vv.offsetLeft}px`);
      shell.style.setProperty("--vvt", `${vv.offsetTop}px`);
    };
    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      for (const p of ["--vvh", "--vvw", "--vvl", "--vvt"]) shell.style.removeProperty(p);
    };
  }, [sheet]);

  // Follow the answer as it streams, unless the visitor has scrolled up to read.
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (el && stickToBottom.current) el.scrollTop = el.scrollHeight;
  }, [s.messages, s.activity, s.notice, s.busy]);

  // …and stay pinned when the body itself resizes (the footer grows, the panel expands).
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (stickToBottom.current) el.scrollTop = el.scrollHeight;
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // The scroll-to-latest button sits just above the footer.
  useEffect(() => {
    const footer = footerRef.current;
    const panel = panelRef.current;
    if (!footer || !panel) return;
    const ro = new ResizeObserver(() => panel.style.setProperty("--da-footer-h", `${footer.offsetHeight}px`));
    ro.observe(footer);
    return () => ro.disconnect();
  }, []);

  // Grow the input with its content (up to the CSS max-height), tweening between line counts.
  useLayoutEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const from = el.offsetHeight;
    // A tween still running would override height:auto and skew the measurement.
    for (const a of el.getAnimations()) a.cancel();
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
    const to = el.offsetHeight;
    formRef.current?.toggleAttribute("data-multiline", el.scrollHeight > (sheet ? 42 : 40));
    if (from && from !== to && !prefersReducedMotion()) {
      el.animate({ height: [`${from}px`, `${to}px`] }, { duration: 140, easing: "cubic-bezier(0.2, 0, 0, 1)" });
    }
  }, [s.draft, s.limitReached, sheet]);

  // Controls that remove or disable themselves when used (example rows, Send, notice actions,
  // "Start new conversation") hand focus to the composer once the result has rendered, instead of
  // dropping it to <body> (which would also let Tab escape the sheet's focus trap). On touch the
  // dialog takes it, so the keyboard doesn't pop up.
  const focusPending = useRef(false);
  const applyFocus = useCallback(() => {
    if (!focusPending.current) return;
    focusPending.current = false;
    const shell = shellRef.current;
    const input = inputRef.current;
    const active = document.activeElement;
    if (!shell || active === input) return;
    if (active && active !== document.body && !shell.contains(active)) return; // the visitor moved on
    if (input && !input.disabled && !window.matchMedia(COARSE).matches) input.focus({ preventScroll: true });
    else panelRef.current?.focus({ preventScroll: true });
  }, []);
  const refocus = useCallback(() => {
    focusPending.current = true;
    requestAnimationFrame(applyFocus); // in case the action didn't re-render
  }, [applyFocus]);
  useLayoutEffect(applyFocus);

  // Scroll state: header hairline (imperative, no re-render) and the scroll-to-latest button.
  const [showLatest, setShowLatest] = useState(false);
  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    headerRef.current?.toggleAttribute("data-scrolled", el.scrollTop > 0);
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    if (smoothScrolling.current) {
      if (atBottom) smoothScrolling.current = false;
      return;
    }
    stickToBottom.current = atBottom;
    setShowLatest(!atBottom);
  };
  const cancelSmoothScroll = () => {
    smoothScrolling.current = false;
  };
  const scrollToLatest = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    stickToBottom.current = true;
    setShowLatest(false);
    if (prefersReducedMotion()) {
      el.scrollTop = el.scrollHeight;
    } else {
      smoothScrolling.current = true;
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      window.setTimeout(cancelSmoothScroll, 1000);
    }
    // The button goes away; keep a keyboard user's focus somewhere useful.
    if (e.detail === 0) refocus();
  };

  const submit = () => {
    stickToBottom.current = true;
    setShowLatest(false);
    void send(s.draft);
    refocus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit();
    }
  };

  // When the limit card replaces the composer, the focused textarea is removed with it: hand focus to
  // the card's "Start new conversation" button instead of letting it drop to <body>.
  const limitRef = useRef<HTMLButtonElement>(null);
  useLayoutEffect(() => {
    if (!s.limitReached || !shown) return;
    const active = document.activeElement;
    if (!active || active === document.body) limitRef.current?.focus({ preventScroll: true });
  }, [s.limitReached, shown]);

  const startNew = useCallback(() => {
    newConversation();
    refocus();
  }, [refocus]);

  const toggleWide = () => {
    const next = !wide;
    setWide(next);
    widePref = next ? "1" : "0";
    try {
      localStorage.setItem(WIDE_KEY, widePref);
    } catch {
      // storage unavailable; the choice just won't stick
    }
  };

  // Done cue: the header spark twinkles once when a turn finishes cleanly while open.
  const [tileTwinkle, twinkleTile] = useFlag(700);
  const wasBusy = useRef(s.busy);
  useEffect(() => {
    const was = wasBusy.current;
    wasBusy.current = s.busy;
    if (was && !s.busy && s.open && !s.notice && s.messages[s.messages.length - 1]?.role === "assistant") twinkleTile();
  }, [s.busy, s.open, s.notice, s.messages, twinkleTile]);

  // A restored conversation fades in once, as a whole.
  const [restored, flagRestored] = useFlag(300);
  const wasRestoring = useRef(s.restoring);
  useLayoutEffect(() => {
    if (wasRestoring.current && !s.restoring && s.messages.length) flagRestored();
    wasRestoring.current = s.restoring;
  }, [s.restoring, s.messages.length, flagRestored]);

  const inputDisabled = s.busy || s.restoring || s.limitReached;
  const tooLong = s.draft.length > MAX_MESSAGE_CHARS;
  const canSend = !inputDisabled && !!s.draft.trim() && !tooLong;
  const sendState = s.busy ? "busy" : canSend ? "ready" : "idle";
  const empty = s.messages.length === 0 && !s.busy && !s.restoring;
  const showStatus = s.busy && !s.streamingId;
  const lastMessage = s.messages[s.messages.length - 1];

  // The counter nudges once when the draft first goes over the limit.
  const [nudge, flagNudge] = useFlag(250);
  const wasTooLong = useRef(tooLong);
  useLayoutEffect(() => {
    if (tooLong && !wasTooLong.current) flagNudge();
    wasTooLong.current = tooLong;
  }, [tooLong, flagNudge]);

  // Message entry is decided by position, not by mount: only items appended at the end in small
  // batches animate. Messages present at mount, a restored history, and ids swapped by a history
  // refresh never do. (Render-time ref writes are gated on the array's identity, so they're idempotent.)
  const seenMessages = useRef(s.messages);
  const enterFrom = useRef(Number.POSITIVE_INFINITY);
  const fadeAssistant = useRef(true);
  const sawRestoring = useRef(s.restoring);
  const statusShowing = useRef(showStatus);
  if (s.restoring) sawRestoring.current = true;
  if (seenMessages.current !== s.messages) {
    const before = seenMessages.current.length;
    const added = s.messages.length - before;
    enterFrom.current = added > 0 && added <= 2 && !sawRestoring.current ? before : Number.POSITIVE_INFINITY;
    // When the status row was showing, the answer takes its place without a fade.
    fadeAssistant.current = !statusShowing.current;
    sawRestoring.current = s.restoring;
    seenMessages.current = s.messages;
  }
  statusShowing.current = showStatus;

  // One stable live region for the status row, polite notices and the limit card: regions that are
  // inserted already holding text are announced unreliably. Notice copy is read from the DOM so it
  // lives in one place; danger notices announce themselves (role="alert").
  const statusLabel = s.restoring ? "Loading your conversation…" : showStatus ? (s.activity ?? "Working…") : "";
  const [live, setLive] = useState("");
  useEffect(() => {
    const notice = scrollRef.current?.querySelector("[data-live]")?.textContent?.trim();
    setLive(notice || (s.limitReached ? "This conversation has reached its limit." : statusLabel));
  }, [statusLabel, s.notice, s.limitReached]);

  const [introMounted, introLeaving] = usePresence(empty, 180);
  const [latestMounted, latestLeaving] = usePresence(showLatest && !empty, 120);
  const state = shown ? "open" : "closed";
  const enter = skipEnter ? "none" : undefined;
  const isWide = canWide && wide;
  {
    // Render-time ref writes, idempotent per render.
    const f = fit.current;
    if (s.busy && !f.busy) f.armed = true;
    f.busy = s.busy;
    f.canExpand = shown && canWide && !wide;
  }

  return (
    <>
      <div className={styles.scrim} data-state={state} data-enter={enter} aria-hidden="true" />
      <div
        ref={shellRef}
        className={styles.shell}
        data-docs-assist-shell=""
        data-state={state}
        data-enter={enter}
        data-wide={isWide ? "" : undefined}
        inert={!shown}
      >
        <div className={styles.panelShadow} aria-hidden="true" />
        <div
          ref={panelRef}
          id="docs-assist-panel"
          className={styles.panel}
          role="dialog"
          aria-labelledby="da-title"
          aria-describedby="da-subtitle"
          aria-modal={sheet || undefined}
          tabIndex={-1}
          data-empty={empty ? "" : undefined}
          onKeyDown={sheet ? trapTab : undefined}
        >
          <div className={styles.tint} aria-hidden="true">
            <Fragment key={openCount}>
              <i className={styles.tintStreak} />
              <i className={styles.tintStreak} />
            </Fragment>
          </div>

          <header ref={headerRef} className={styles.header}>
            <MarkTile size="md" twinkle={tileTwinkle} />
            <div className={styles.titles}>
              <strong id="da-title" className={styles.title}>
                Ask AI
              </strong>
              <span id="da-subtitle" className={styles.subtitle}>
                Velopack assistant
              </span>
            </div>
            <div className={styles.headerActions}>
              {(s.messages.length > 0 || s.notice) && (
                <button
                  type="button"
                  className={clsx(styles.headerButton, styles.newButton)}
                  onClick={startNew}
                  title="New conversation"
                  aria-label="New conversation"
                >
                  <ComposeIcon />
                </button>
              )}
              {canWide && (
                <button
                  type="button"
                  className={styles.headerButton}
                  onClick={toggleWide}
                  title={wide ? "Collapse" : "Expand"}
                  aria-label="Expand"
                  aria-pressed={wide}
                >
                  <span className={styles.swap}>
                    <MaximizeIcon className={styles.swapExpand} />
                    <MinimizeIcon className={styles.swapCollapse} />
                  </span>
                </button>
              )}
              <button type="button" className={styles.headerButton} onClick={close} title="Close" aria-label="Close">
                <ChevronDownIcon />
              </button>
            </div>
          </header>

          <div
            ref={scrollRef}
            className={styles.body}
            onScroll={onScroll}
            onWheel={cancelSmoothScroll}
            onTouchStart={cancelSmoothScroll}
            aria-busy={s.restoring || undefined}
            data-restored={restored ? "" : undefined}
          >
            {introMounted && <Intro leaving={introLeaving} openedAt={openedAt} onPick={refocus} />}

            {s.restoring && (
              <>
                <Skeleton />
                <Status text="Loading your conversation…" />
              </>
            )}

            {s.messages.map((m, i) => (
              <Message
                key={m.id}
                message={m}
                enter={i >= enterFrom.current}
                fadeBody={fadeAssistant.current}
                sender={m.role === "assistant" && s.messages[i - 1]?.role !== "assistant"}
                streaming={m.id === s.streamingId}
                onInternalLink={onInternalLink}
                pin={pin}
              />
            ))}

            {showStatus && <Status text={s.activity ?? "Working…"} sender={lastMessage?.role !== "assistant"} elapsed />}

            {s.notice && <NoticeView notice={s.notice} onAction={refocus} onStartNew={startNew} />}
          </div>

          {latestMounted && (
            <button
              type="button"
              className={styles.latest}
              data-leaving={latestLeaving ? "" : undefined}
              onClick={scrollToLatest}
              aria-label="Scroll to latest"
              title="Scroll to latest"
            >
              <ChevronDownIcon />
            </button>
          )}

          <footer ref={footerRef} className={styles.footer}>
            <div className={styles.turnstileWrap}>
              <div ref={setTurnstileHost} className={styles.turnstile} />
            </div>
            {s.limitReached ? (
              <div className={styles.limit}>
                <span>This conversation has reached its limit.</span>
                <button ref={limitRef} type="button" className={styles.limitButton} onClick={startNew}>
                  Start new conversation
                  <ArrowRightIcon size={14} />
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                className={styles.inputRow}
                data-over={tooLong ? "" : undefined}
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                <textarea
                  ref={inputRef}
                  className={styles.input}
                  rows={1}
                  value={s.draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder={s.messages.length ? "Ask a follow-up…" : "Ask a question…"}
                  aria-label="Your question"
                  aria-describedby="da-hint"
                  disabled={s.restoring}
                />
                <button
                  type="submit"
                  className={styles.send}
                  data-state={sendState}
                  disabled={!canSend}
                  aria-label="Send"
                >
                  <ArrowUpIcon key={arrowKey} className={styles.sendIcon} />
                </button>
              </form>
            )}
            <div className={styles.counterWrap} aria-live="polite">
              <div className={styles.counterInner}>
                {s.draft.length > MAX_MESSAGE_CHARS * 0.9 && (
                  <div className={styles.counter} data-over={tooLong ? "" : undefined} data-nudge={nudge ? "" : undefined}>
                    <span aria-hidden="true">
                      {s.draft.length.toLocaleString()} / {MAX_MESSAGE_CHARS.toLocaleString()}
                    </span>
                  </div>
                )}
                <span className={styles.srOnly}>{tooLong ? "Message too long" : ""}</span>
              </div>
            </div>
            <span id="da-hint" className={styles.srOnly}>
              Press Enter to send, Shift+Enter for a new line.
            </span>
          </footer>
          <div className={styles.srOnly} role="status" aria-live="polite">
            {live}
          </div>
        </div>
      </div>
    </>
  );
}

/* ======================================================================== pieces */

function MarkTile({ size, twinkle }: { size: "sm" | "md" | "lg"; twinkle?: boolean }) {
  return (
    <span className={clsx(styles.tile, styles[`tile_${size}`])} data-twinkle={twinkle ? "" : undefined} aria-hidden="true">
      <VelopackMark className={styles.tileMark} />
    </span>
  );
}

function SenderRow() {
  return (
    <div className={styles.sender} aria-hidden="true">
      <MarkTile size="sm" />
      <span className={styles.eyebrow}>Velopack AI</span>
    </div>
  );
}

function Intro({ leaving, openedAt, onPick }: { leaving: boolean; openedAt: number; onPick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const lastTop = useRef(0);
  // Staggered after the open morph when it mounts with it; straight away after "New conversation".
  const [base] = useState(() => (Date.now() - openedAt < 150 ? "200ms" : "0ms"));

  // When leaving, take it out of the flow where it stands so the first message lands in place.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (leaving) el.style.top = `${lastTop.current}px`;
    else lastTop.current = el.offsetTop;
  });

  const item = (i: number) => ({ "--i": i }) as CSSProperties;
  return (
    <div ref={ref} className={styles.intro} data-leaving={leaving ? "" : undefined} style={{ "--base": base } as CSSProperties}>
      <div className={styles.introMark} style={item(0)}>
        <MarkTile size="lg" />
      </div>
      <h2 className={styles.introTitle} style={item(1)}>
        How can I help you ship?
      </h2>
      <p className={styles.introText} style={item(2)}>
        Ask anything about Velopack. Answers are researched from the Velopack source code, these docs and GitHub issues, so
        they can take 30 seconds or more.
      </p>
      <div className={styles.eyebrow} style={item(3)}>
        Try asking
      </div>
      <div className={styles.examples}>
        {EXAMPLES.map(({ q, Icon }, i) => (
          <button key={q} type="button" className={styles.example} style={item(4 + i)} onClick={() => {
              void send(q);
              onPick();
            }}
            tabIndex={leaving ? -1 : undefined}>
            <Icon size={16} className={styles.exampleIcon} />
            <span>{q}</span>
            <ArrowRightIcon size={14} className={styles.exampleArrow} />
          </button>
        ))}
      </div>
    </div>
  );
}

const Message = memo(function Message({
  message,
  enter,
  fadeBody,
  sender,
  streaming,
  onInternalLink,
  pin,
}: {
  message: ChatMessage;
  enter: boolean;
  fadeBody: boolean;
  sender: boolean;
  streaming: boolean;
  onInternalLink: () => void;
  pin: (revealing: boolean) => void;
}) {
  // Decided once, at mount: later renders never add or drop the entry classes.
  const [entering] = useState(enter);
  const [fading] = useState(enter && fadeBody);
  if (message.role === "user") {
    return (
      <div className={clsx(styles.user, entering && styles.enter)} data-user="">
        {message.text}
      </div>
    );
  }
  return (
    <AssistantMessage text={message.text} streaming={streaming} sender={sender} fade={fading} onInternalLink={onInternalLink} pin={pin} />
  );
});

function AssistantMessage({
  text,
  streaming,
  sender,
  fade,
  onInternalLink,
  pin,
}: {
  text: string;
  streaming: boolean;
  sender: boolean;
  fade: boolean;
  onInternalLink: () => void;
  pin: (revealing: boolean) => void;
}) {
  const [shown, revealing] = useSmoothText(text);
  const live = streaming || revealing;
  const blocks = useMemo(() => splitBlocks(live ? hidePartialMarkup(shown) : shown), [shown, live]);
  // The smoothed text grows between store updates; keep the thread pinned as it does.
  useLayoutEffect(() => pin(live), [shown, live, pin]);
  return (
    <div className={styles.assistant}>
      {sender && <SenderRow />}
      <div
        className={clsx(styles.assistantBody, live && styles.streaming, fade && styles.enter)}
        aria-busy={streaming || undefined}
      >
        {blocks.map((md, i) => (
          <Block key={i} md={md} onInternalLink={onInternalLink} />
        ))}
      </div>
    </div>
  );
}

const Block = memo(function Block({ md, onInternalLink }: { md: string; onInternalLink: () => void }) {
  return <Markdown text={md} onInternalLink={onInternalLink} />;
});

function Status({ text, sender = false, elapsed = false }: { text: string; sender?: boolean; elapsed?: boolean }) {
  return (
    <div className={styles.status}>
      {sender && <SenderRow />}
      <div className={styles.statusLine} data-warn={text === "Reconnecting…" ? "" : undefined}>
        <span className={styles.spinner} aria-hidden="true" />
        <span key={text} className={styles.statusText}>
          {text}
        </span>
        {elapsed && <Elapsed />}
      </div>
    </div>
  );
}

/** " · 12s" after the first five seconds of a turn. */
function Elapsed() {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const since = turnClock.since;
  const secs = since === null ? 0 : Math.floor((now - since) / 1000);
  if (secs < 5) return null;
  return (
    <span className={styles.elapsed} aria-hidden="true">
      · {secs}s
    </span>
  );
}

function Skeleton() {
  return (
    <div className={styles.skeleton} aria-hidden="true">
      <div className={styles.skBubble} />
      <div className={styles.skSender}>
        <i />
        <b />
      </div>
      <div className={styles.skLine} style={{ width: "92%" }} />
      <div className={styles.skLine} style={{ width: "68%" }} />
    </div>
  );
}

type Tone = "danger" | "warn" | "neutral";

function NoticeCard({
  tone,
  Icon,
  children,
  actions,
}: {
  tone: Tone;
  Icon: IconComponent;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    // Danger notices interrupt (role="alert"); the rest are mirrored into the panel's live region.
    <div className={styles.notice} data-tone={tone} role={tone === "danger" ? "alert" : undefined}>
      <Icon size={16} className={styles.noticeIcon} />
      {/* only the copy is mirrored (not the button labels) */}
      <div className={styles.noticeText} data-live={tone === "danger" ? undefined : ""}>
        {children}
      </div>
      {actions && <div className={styles.noticeActions}>{actions}</div>}
    </div>
  );
}

function NoticeButton({ primary, onClick, children }: { primary?: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" className={clsx(styles.noticeButton, primary && styles.noticeButtonPrimary)} onClick={onClick}>
      {children}
    </button>
  );
}

function NoticeView({ notice, onAction, onStartNew }: { notice: Notice; onAction: () => void; onStartNew: () => void }) {
  // Every action removes its own button, so focus is handed back to the composer afterwards.
  const act = (fn: () => void) => () => {
    fn();
    onAction();
  };
  switch (notice.kind) {
    case "ip_limit":
      return (
        <NoticeCard
          tone="warn"
          Icon={ClockIcon}
          actions={notice.canGoBack && <NoticeButton onClick={act(returnToPreviousConversation)}>Back to previous conversation</NoticeButton>}
        >
          You've started a lot of conversations today.
          {notice.resetsAt ? ` You can start a new one at ${formatTime(notice.resetsAt)}.` : " Try again later."}{" "}
          {notice.canGoBack ? "Meanwhile, you can carry on with your previous conversation." : ""}
        </NoticeCard>
      );
    case "cap":
      return (
        <NoticeCard tone="warn" Icon={MoonIcon}>
          The assistant is resting{notice.resetsAt ? ` until ${formatTime(notice.resetsAt)}` : ""}. In the meantime, try the{" "}
          <a href="https://discord.gg/CjrCrNzd3F" target="_blank" rel="noopener noreferrer">
            Velopack Discord
          </a>{" "}
          or{" "}
          <a href="https://github.com/velopack/velopack/issues" target="_blank" rel="noopener noreferrer">
            GitHub issues
          </a>
          .
        </NoticeCard>
      );
    case "rate_limited":
      return (
        <NoticeCard tone="warn" Icon={ClockIcon}>
          Too many requests. Please wait a minute and try again.
        </NoticeCard>
      );
    case "session_limit":
      return null; // shown in place of the input
    case "refusal":
      return (
        <NoticeCard tone="neutral" Icon={InfoIcon}>
          Sorry, I can't help with that one.
        </NoticeCard>
      );
    case "invalid_message":
      return (
        <NoticeCard tone="warn" Icon={AlertTriangleIcon}>
          That message is too long. Please keep it under {(notice.maxChars ?? MAX_MESSAGE_CHARS).toLocaleString()} characters.
        </NoticeCard>
      );
    case "turnstile":
      return (
        <NoticeCard tone="warn" Icon={ShieldIcon} actions={<NoticeButton onClick={act(dismissNotice)}>OK</NoticeButton>}>
          We couldn't verify your browser. Please try sending your question again.
        </NoticeCard>
      );
    case "restore_failed":
      return (
        <NoticeCard
          tone="danger"
          Icon={AlertCircleIcon}
          actions={
            <NoticeButton primary onClick={onStartNew}>
              Start new conversation
            </NoticeButton>
          }
        >
          Couldn't load your previous conversation.
        </NoticeCard>
      );
    case "error":
      return (
        <NoticeCard
          tone="danger"
          Icon={AlertCircleIcon}
          actions={
            notice.retry && (
              <NoticeButton primary onClick={act(retry)}>
                <RefreshIcon size={14} />
                Retry
              </NoticeButton>
            )
          }
        >
          Something went wrong{notice.retry ? " while answering" : ""}. Please try again.
        </NoticeCard>
      );
  }
}

/* ======================================================================== helpers */

/**
 * While an answer streams, hides markup that hasn't finished arriving, so raw markdown never flashes
 * before it snaps into place: a partial link (`[text](https://ex`, `[text]`, `[text`) shows just its
 * text, and an unclosed `code` or **bold** span on the last line drops its opening marker. Leaves the
 * text alone inside an unclosed code fence.
 */
function hidePartialMarkup(md: string): string {
  if ((md.match(/^ {0,3}(`{3,}|~{3,})/gm)?.length ?? 0) % 2) return md;
  const out = md
    .replace(/!?\[([^\]\n]*)\]\([^)\s]*$/, "$1")
    .replace(/!?\[([^\]\n]*)\]$/, "$1")
    .replace(/!?\[([^\]\n]*)$/, "$1");
  const start = out.lastIndexOf("\n") + 1;
  let line = out.slice(start);
  if (/^ {0,3}(`{3,}|~{3,})/.test(line)) return out; // a fence line, never an inline span
  if ((line.match(/`/g)?.length ?? 0) % 2) {
    const i = line.lastIndexOf("`");
    line = line.slice(0, i) + line.slice(i + 1);
  }
  if ((line.replace(/`[^`]*`/g, "").match(/\*\*/g)?.length ?? 0) % 2) {
    const i = line.lastIndexOf("**");
    line = line.slice(0, i) + line.slice(i + 2);
  }
  return out.slice(0, start) + line;
}

/** A reset time in the visitor's local time, with the day when it isn't today. */
function formatTime(iso: string): string {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return "later";
  const time = date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  if (date.toDateString() === new Date().toDateString()) return time;
  return `${date.toLocaleDateString(undefined, { weekday: "long" })} ${time}`;
}

function readWidePref(): "1" | "0" | null {
  try {
    const v = localStorage.getItem(WIDE_KEY);
    return v === "1" || v === "0" ? v : null;
  } catch {
    return null;
  }
}

/** Whether the latest turn, from the visitor's question to the end of the thread, fits in the visible body. */
function turnFits(body: HTMLElement): boolean {
  const users = body.querySelectorAll("[data-user]");
  const first = users[users.length - 1] ?? body.firstElementChild;
  const last = body.lastElementChild;
  if (!first || !last) return true;
  const style = getComputedStyle(body);
  const room = body.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
  return last.getBoundingClientRect().bottom - first.getBoundingClientRect().top <= room;
}

/** A one-shot flag: `trigger()` turns it on for `ms`, then it clears itself (keyframe names are minified, so never read them). */
function useFlag(ms: number): [boolean, () => void] {
  const [on, setOn] = useState(false);
  const timer = useRef(0);
  const trigger = useCallback(() => {
    clearTimeout(timer.current);
    setOn(true);
    timer.current = window.setTimeout(() => setOn(false), ms);
  }, [ms]);
  useEffect(() => () => clearTimeout(timer.current), []);
  return [on, trigger];
}

/** Keeps something mounted for `ms` after `show` turns false, so it can play an exit (instant under reduced motion). */
function usePresence(show: boolean, ms: number): [mounted: boolean, leaving: boolean] {
  const [mounted, setMounted] = useState(show);
  if (show && !mounted) setMounted(true);
  if (!show && mounted && prefersReducedMotion()) setMounted(false);
  useEffect(() => {
    if (show || !mounted) return;
    const t = setTimeout(() => setMounted(false), ms);
    return () => clearTimeout(t);
  }, [show, mounted, ms]);
  return [show || mounted, !show && mounted];
}

/** Keeps Tab inside the panel while it is a full-screen modal sheet. */
function trapTab(e: KeyboardEvent<HTMLElement>) {
  if (e.key !== "Tab") return;
  const items = Array.from(
    e.currentTarget.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => el.getClientRects().length > 0);
  if (!items.length) {
    e.preventDefault();
    return;
  }
  const first = items[0];
  const last = items[items.length - 1];
  const active = document.activeElement;
  if (e.shiftKey && (active === first || active === e.currentTarget)) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && active === last) {
    e.preventDefault();
    first.focus();
  }
}
