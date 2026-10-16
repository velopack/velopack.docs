import React, { type ReactNode } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Provider from "@theme-original/Layout/Provider";
import DocsAssist from "@site/src/components/DocsAssist";

// Mounts the "Ask AI" widget on every page. It goes inside the layout providers (not in Root)
// because the answers render code with @theme/CodeBlock, which needs the color mode context.
// The conversation itself lives in a module-level store, so remounting here doesn't interrupt it.
export default function ProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <Provider>
      {children}
      <BrowserOnly>{() => <DocsAssist />}</BrowserOnly>
    </Provider>
  );
}
