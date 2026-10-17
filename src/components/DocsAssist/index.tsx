import React, { useEffect, useLayoutEffect, useRef, useState, type ComponentType, type RefObject } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { translate } from "@docusaurus/Translate";
import VelopackMark from "./VelopackMark";
import { configure, setOpen, useAssistState, type DocsAssistConfig } from "./store";
import { turnClock } from "./constants";
import styles from "./fab.module.css";

type PanelComponent = ComponentType<{ fabRef: RefObject<HTMLButtonElement | null> }>;

// The panel pulls in the Markdown renderer, so it lives in its own chunk. It is resolved by hand
// (no React.lazy/Suspense) so the launcher's "open" state and the panel's first, already-open mount
// land in the same commit, which lets the open morph start from the launcher's exact rect.
// Module-level, so it survives Layout remounts (e.g. docs → blog).
let panelModule: PanelComponent | null = null;
let panelPromise: Promise<PanelComponent> | null = null;
function loadPanel(): Promise<PanelComponent> {
  panelPromise ??= import("./Panel").then(
    (m) => (panelModule = m.default),
    (err) => {
      panelPromise = null; // let the next attempt retry
      throw err;
    },
  );
  return panelPromise;
}

/** The launcher's entrance plays once per page load, never on a Layout remount. */
let fabEntered = false;
/** Once the panel has been opened, it stays mounted (closed) across Layout remounts, so every later
 * open plays the morph from a mounted, closed panel. */
let panelEverOpened = false;

/** The floating "Ask AI" button and the chat panel. Renders nothing unless `customFields.docsAssist` is set. */
export default function DocsAssist() {
  const { siteConfig } = useDocusaurusContext();
  const cfg = siteConfig.customFields?.docsAssist as DocsAssistConfig | undefined;
  const { open, unread, busy, notice, messages } = useAssistState();
  const rootRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);
  const [Panel, setPanel] = useState<PanelComponent | null>(() => panelModule);
  const [everOpened, setEverOpened] = useState(() => open || panelEverOpened);
  if (open && !everOpened) setEverOpened(true);
  const panelReady = !!Panel;
  const [entered, setEntered] = useState(fabEntered);
  const [twinkle, setTwinkle] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [isMac] = useState(() => /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent));
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    if (cfg) configure(cfg);
  }, [cfg]);

  useEffect(() => {
    if (everOpened) panelEverOpened = true;
  }, [everOpened]);

  // The panel's elapsed timer reads this; the launcher is always mounted, so it never misses a change.
  useLayoutEffect(() => {
    if (!busy) turnClock.since = null;
    else turnClock.since ??= Date.now();
  }, [busy]);

  // On phones, a page with horizontal overflow makes the layout viewport bigger than the screen (it
  // grows in both directions, keeping the aspect ratio), and `position: fixed` anchors to that box, so
  // the launcher and the back-to-top button would sit off-screen. --da-vv-r/--da-vv-b are the gaps
  // between the layout viewport's edges (a fixed, inset-0 probe) and the visual viewport's; both are
  // 0 on desktop.
  useEffect(() => {
    const vv = window.visualViewport;
    const probe = probeRef.current;
    if (!cfg || !vv || !probe) return;
    const html = document.documentElement;
    const write = (name: string, px: number) => {
      if (px > 0) html.style.setProperty(name, `${px}px`);
      else html.style.removeProperty(name);
    };
    let last = "";
    const update = () => {
      const r = probe.getBoundingClientRect();
      const right = Math.max(0, Math.round(r.right - vv.offsetLeft - vv.width));
      const bottom = Math.max(0, Math.round(r.bottom - vv.offsetTop - vv.height));
      if (`${right},${bottom}` === last) return;
      last = `${right},${bottom}`;
      write("--da-vv-r", right);
      write("--da-vv-b", bottom);
    };
    let raf = 0;
    const later = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    // Content that loads or reflows can change the overflow without any viewport event.
    const ro = new ResizeObserver(later);
    ro.observe(document.body);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro.disconnect();
      cancelAnimationFrame(raf);
      html.style.removeProperty("--da-vv-r");
      html.style.removeProperty("--da-vv-b");
    };
  }, [cfg]);

  const resolvePanel = () =>
    loadPanel().then(
      (m) => setPanel(() => m),
      (err) => console.warn("[DocsAssist] couldn't load the chat panel", err),
    );

  // Opened before the chunk arrived (first click, or the search bar's "Ask AI" row).
  useEffect(() => {
    if (!open || Panel) return;
    loadPanel().then(
      (m) => setPanel(() => m),
      (err) => {
        console.warn("[DocsAssist] couldn't load the chat panel", err);
        setOpen(false);
      },
    );
  }, [open, Panel]);

  // Warm the chunk when idle, so the first open rarely waits on the network (Safari has no requestIdleCallback).
  useEffect(() => {
    if (!cfg || panelModule) return;
    const run = () => void resolvePanel();
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(run, { timeout: 4000 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(run, 2500);
    return () => clearTimeout(id);
  }, [cfg]);

  // The morph's closed clip is the launcher's rect; measure it before any open can happen.
  // offsetWidth/Height ignore transforms, so the hover lift and press never skew it.
  useLayoutEffect(() => {
    const fab = fabRef.current;
    const root = rootRef.current;
    if (!fab || !root) return;
    const write = () => {
      root.style.setProperty("--da-fab-w", `${fab.offsetWidth}px`);
      root.style.setProperty("--da-fab-h", `${fab.offsetHeight}px`);
    };
    write();
    const ro = new ResizeObserver(write);
    ro.observe(fab);
    return () => ro.disconnect();
  }, [cfg]);

  // Mark the entrance as played. The attribute is added once it has finished, so hover is never delayed.
  useEffect(() => {
    if (entered) return;
    fabEntered = true;
    const t = setTimeout(() => setEntered(true), 800);
    return () => clearTimeout(t);
  }, [entered]);

  // Announcements and the launcher's "new answer" twinkle. Starts from the current state, so a
  // Layout remount never re-announces.
  const prev = useRef({ unread, busy });
  useEffect(() => {
    const was = prev.current;
    prev.current = { unread, busy };
    const say = (text: string) => {
      // Clear first so identical text is announced again.
      setAnnouncement("");
      requestAnimationFrame(() => setAnnouncement(text));
    };
    if (unread && !was.unread) {
      say(
        translate({
          id: "docsAssist.fab.announceNewAnswer",
          message: "New answer from Ask AI",
          description: "Ask AI: screen reader announcement when an answer finishes while the panel is closed",
        }),
      );
      setTwinkle(true);
    } else if (was.busy && !busy && open && !notice && messages[messages.length - 1]?.role === "assistant") {
      say(
        translate({
          id: "docsAssist.fab.announceAnswerReady",
          message: "Answer ready",
          description: "Ask AI: screen reader announcement when an answer finishes while the panel is open",
        }),
      );
    }
  }, [unread, busy, open, notice, messages]);

  useEffect(() => {
    if (!twinkle) return;
    const t = setTimeout(() => setTwinkle(false), 700);
    return () => clearTimeout(t);
  }, [twinkle]);

  // Ctrl+I (⌘I on Apple platforms) toggles the panel.
  useEffect(() => {
    if (!cfg) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.isComposing || e.altKey || e.shiftKey || e.repeat) return;
      if (isMac ? !e.metaKey || e.ctrlKey : !e.ctrlKey || e.metaKey) return;
      if (e.key !== "i" && e.key !== "I") return;
      if ((e.target as HTMLElement | null)?.isContentEditable) return;
      e.preventDefault();
      setOpen(!openRef.current);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [cfg, isMac]);

  if (!cfg) return null;

  const shown = open && panelReady;
  const askAi = translate({
    id: "docsAssist.fab.label",
    message: "Ask AI",
    description: "Ask AI: the floating launcher button's text (keep it short)",
  });
  const label = unread
    ? translate({
        id: "docsAssist.fab.labelUnread",
        message: "Ask AI (new answer)",
        description: "Ask AI: the launcher's accessible name when there is an unread answer",
      })
    : busy && !open
      ? translate({
          id: "docsAssist.fab.labelBusy",
          message: "Ask AI (answering…)",
          description: "Ask AI: the launcher's accessible name while an answer is being written in the background",
        })
      : askAi;
  const shortcut = isMac ? "⌘I" : "Ctrl+I";

  return (
    <div ref={rootRef} className={styles.root} data-docs-assist-root="">
      <button
        ref={fabRef}
        type="button"
        className={styles.fab}
        data-docs-assist-fab=""
        data-entered={entered ? "" : undefined}
        data-open={shown ? "" : undefined}
        data-loading={open && !panelReady ? "" : undefined}
        data-busy={busy && !open ? "" : undefined}
        data-unread={unread ? "" : undefined}
        data-twinkle={twinkle ? "" : undefined}
        aria-expanded={open}
        aria-controls={everOpened && panelReady ? "docs-assist-panel" : undefined}
        aria-label={label}
        aria-keyshortcuts={isMac ? "Meta+I" : "Control+I"}
        title={translate(
          {
            id: "docsAssist.fab.tooltip",
            message: "Ask AI ({shortcut})",
            description: "Ask AI: the launcher's tooltip; {shortcut} is the keyboard shortcut, e.g. Ctrl+I",
          },
          { shortcut },
        )}
        inert={shown}
        onPointerEnter={() => void resolvePanel()}
        onFocus={() => void resolvePanel()}
        onClick={() => setOpen(true)}
      >
        <span className={styles.fabGlow} aria-hidden="true" />
        <span className={styles.fabRing} aria-hidden="true" />
        <span className={styles.fabSurface} aria-hidden="true" />
        <VelopackMark className={styles.fabIcon} streaks />
        <span className={styles.fabLabel}>{askAi}</span>
        {unread && <span className={styles.unreadDot} aria-hidden="true" />}
      </button>
      <span ref={probeRef} className={styles.vvProbe} aria-hidden="true" />
      <span className={styles.srOnly} role="status" aria-live="polite">
        {announcement}
      </span>
      {everOpened && Panel && <Panel fabRef={fabRef} />}
    </div>
  );
}
