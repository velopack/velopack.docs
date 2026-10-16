// Stands in for the `open-ask-ai` package. @easyops-cn/docusaurus-search-local shows an
// "Ask AI: <query>" row in search results when its `askAi` option is set, and on selection calls
// `openWithNewSession(query)` on the `AskAIWidget` it imports from `open-ask-ai`. The docsAssist
// plugin in docusaurus.config.ts aliases that import here, so the row opens our widget instead.
// This relies on the search plugin's internals (checked against 0.55.3); re-check after upgrades.

import { forwardRef, useImperativeHandle } from "react";
import { ask, setOpen } from "./store";

export interface AskAIWidgetRef {
  open: () => void;
  close: () => void;
  openWithNewSession: (message: string) => void;
}

export const AskAIWidget = forwardRef<AskAIWidgetRef>(function AskAIWidget(_props, ref) {
  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
    openWithNewSession: (message: string) => ask(message),
  }));
  return null;
});
