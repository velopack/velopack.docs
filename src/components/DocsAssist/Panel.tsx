import React, { memo, useCallback, useEffect, useLayoutEffect, useRef, type KeyboardEvent } from "react";
import clsx from "clsx";
import BotIcon from "./BotIcon";
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
import styles from "./styles.module.css";

const EXAMPLES = [
  "How do I check for updates when my app starts?",
  "How do I code-sign my app on Windows and macOS?",
  "Can I install for all users instead of per-user?",
];

const MOBILE_QUERY = "(max-width: 768px)";

export default function Panel() {
  const s = useAssistState();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const stickToBottom = useRef(true);

  const close = useCallback(() => setOpen(false), []);
  // On mobile the panel covers the page, so get out of the way when the visitor follows a docs link.
  const onInternalLink = useCallback(() => {
    if (window.matchMedia(MOBILE_QUERY).matches) setOpen(false);
  }, []);

  useEffect(() => {
    preloadTurnstile();
    inputRef.current?.focus({ preventScroll: true });
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  // Follow the answer as it streams, unless the visitor has scrolled up to read.
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (el && stickToBottom.current) el.scrollTop = el.scrollHeight;
  }, [s.messages, s.activity, s.notice, s.busy]);

  // Grow the input with its content, up to the max-height in CSS.
  useLayoutEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [s.draft]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (el) stickToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
  };

  const submit = () => {
    stickToBottom.current = true;
    void send(s.draft);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit();
    }
  };

  const inputDisabled = s.busy || s.restoring || s.limitReached;
  const tooLong = s.draft.length > MAX_MESSAGE_CHARS;
  const empty = s.messages.length === 0 && !s.busy && !s.restoring;
  const showStatus = s.busy && !s.streamingId;

  return (
    <div className={styles.panel} role="dialog" aria-label="Ask AI">
      <header className={styles.header}>
        <BotIcon className={styles.headerIcon} />
        <div className={styles.headerTitle}>
          <strong>Ask AI</strong>
          <span>Velopack assistant</span>
        </div>
        {(s.messages.length > 0 || s.notice) && (
          <button type="button" className={styles.headerButton} onClick={newConversation} title="New conversation" aria-label="New conversation">
            <NewIcon />
          </button>
        )}
        <button type="button" className={styles.headerButton} onClick={close} title="Close" aria-label="Close">
          <CloseIcon />
        </button>
      </header>

      <div className={styles.body} ref={scrollRef} onScroll={onScroll}>
        {empty && (
          <div className={styles.intro}>
            <BotIcon className={styles.introIcon} />
            <p>
              Ask anything about Velopack. Answers are researched from the Velopack source code, these docs and GitHub issues,
              so they can take 30 seconds or more.
            </p>
            <div className={styles.examples}>
              {EXAMPLES.map((q) => (
                <button key={q} type="button" className={styles.example} onClick={() => void send(q)}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {s.restoring && <Status text="Loading your conversation…" />}

        {s.messages.map((m) => (
          <Message key={m.id} message={m} streaming={m.id === s.streamingId} onInternalLink={onInternalLink} />
        ))}

        {showStatus && <Status text={s.activity ?? "Working…"} />}

        {s.notice && <NoticeView notice={s.notice} />}
      </div>

      <footer className={styles.footer}>
        <div ref={setTurnstileHost} className={styles.turnstile} />
        {s.limitReached ? (
          <div className={styles.limit}>
            This conversation has reached its limit.
            <button type="button" className="button button--primary button--sm" onClick={newConversation}>
              Start new conversation
            </button>
          </div>
        ) : (
          <form
            className={styles.inputRow}
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
              disabled={s.restoring}
            />
            <button type="submit" className={styles.send} disabled={inputDisabled || !s.draft.trim() || tooLong} aria-label="Send">
              <SendIcon />
            </button>
          </form>
        )}
        {s.draft.length > MAX_MESSAGE_CHARS * 0.9 && (
          <div className={clsx(styles.counter, tooLong && styles.counterOver)}>
            {s.draft.length.toLocaleString()} / {MAX_MESSAGE_CHARS.toLocaleString()}
          </div>
        )}
        <div className={styles.disclaimer}>AI answers can be wrong. Conversations are logged to improve the docs.</div>
      </footer>
    </div>
  );
}

const Message = memo(function Message({
  message,
  streaming,
  onInternalLink,
}: {
  message: ChatMessage;
  streaming: boolean;
  onInternalLink: () => void;
}) {
  if (message.role === "user") {
    return <div className={styles.user}>{message.text}</div>;
  }
  return (
    <div className={clsx(styles.assistant, streaming && styles.streaming)}>
      <Markdown text={message.text} onInternalLink={onInternalLink} />
    </div>
  );
});

function Status({ text }: { text: string }) {
  return (
    <div className={styles.status} role="status">
      <span className={styles.spinner} aria-hidden="true" />
      {text}
    </div>
  );
}

function NoticeView({ notice }: { notice: Notice }) {
  switch (notice.kind) {
    case "ip_limit":
      return (
        <div className={styles.notice}>
          You've started a lot of conversations today.
          {notice.resetsAt ? ` You can start a new one at ${formatTime(notice.resetsAt)}.` : " Try again later."}{" "}
          {notice.canGoBack ? "Meanwhile, you can carry on with your previous conversation." : ""}
          {notice.canGoBack && (
            <button type="button" className="button button--secondary button--sm" onClick={returnToPreviousConversation}>
              Back to previous conversation
            </button>
          )}
        </div>
      );
    case "cap":
      return (
        <div className={styles.notice}>
          The assistant is resting{notice.resetsAt ? ` until ${formatTime(notice.resetsAt)}` : ""}. In the meantime, try the{" "}
          <a href="https://discord.gg/CjrCrNzd3F" target="_blank" rel="noopener noreferrer">
            Velopack Discord
          </a>{" "}
          or{" "}
          <a href="https://github.com/velopack/velopack/issues" target="_blank" rel="noopener noreferrer">
            GitHub issues
          </a>
          .
        </div>
      );
    case "rate_limited":
      return <div className={styles.notice}>Too many requests. Please wait a minute and try again.</div>;
    case "session_limit":
      return null; // shown in place of the input
    case "refusal":
      return <div className={styles.notice}>Sorry, I can't help with that one.</div>;
    case "invalid_message":
      return (
        <div className={styles.notice}>
          That message is too long. Please keep it under {(notice.maxChars ?? MAX_MESSAGE_CHARS).toLocaleString()} characters.
        </div>
      );
    case "turnstile":
      return (
        <div className={styles.notice}>
          We couldn't verify your browser. Please try sending your question again.
          <button type="button" className="button button--secondary button--sm" onClick={dismissNotice}>
            OK
          </button>
        </div>
      );
    case "restore_failed":
      return (
        <div className={styles.notice}>
          Couldn't load your previous conversation.
          <button type="button" className="button button--secondary button--sm" onClick={newConversation}>
            Start new conversation
          </button>
        </div>
      );
    case "error":
      return (
        <div className={styles.notice}>
          Something went wrong{notice.retry ? " while answering" : ""}. Please try again.
          {notice.retry && (
            <button type="button" className="button button--secondary button--sm" onClick={retry}>
              Retry
            </button>
          )}
        </div>
      );
  }
}

/** A reset time in the visitor's local time, with the day when it isn't today. */
function formatTime(iso: string): string {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return "later";
  const time = date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  if (date.toDateString() === new Date().toDateString()) return time;
  return `${date.toLocaleDateString(undefined, { weekday: "long" })} ${time}`;
}

function NewIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}
