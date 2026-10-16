import React, { lazy, Suspense, useEffect } from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import BotIcon from "./BotIcon";
import { configure, setOpen, useAssistState, type DocsAssistConfig } from "./store";
import styles from "./styles.module.css";

// The panel pulls in the Markdown renderer; only download it once someone opens the chat.
const Panel = lazy(() => import("./Panel"));

/** The floating "Ask AI" button and the chat panel. Renders nothing unless `customFields.docsAssist` is set. */
export default function DocsAssist() {
  const { siteConfig } = useDocusaurusContext();
  const cfg = siteConfig.customFields?.docsAssist as DocsAssistConfig | undefined;
  const { open, unread, busy } = useAssistState();

  useEffect(() => {
    if (cfg) configure(cfg);
  }, [cfg]);

  if (!cfg) return null;

  return (
    <>
      {!open && (
        <button
          type="button"
          className={clsx(styles.fab, busy && styles.fabBusy)}
          onClick={() => setOpen(true)}
          aria-label={unread ? "Ask AI (new answer)" : "Ask AI"}
          data-docs-assist-fab=""
        >
          <BotIcon className={styles.fabIcon} />
          <span className={styles.fabLabel}>Ask AI</span>
          {unread && <span className={styles.unreadDot} />}
        </button>
      )}
      {open && (
        <Suspense fallback={null}>
          <Panel />
        </Suspense>
      )}
    </>
  );
}
