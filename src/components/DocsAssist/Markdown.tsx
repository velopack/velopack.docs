import React, { Children, isValidElement, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";

// Answers are model output steered by visitor input, and the agent reads GitHub issues anyone can
// write, so a planted link could end up in an answer. Only these destinations become clickable;
// anything else is shown as plain text. Raw HTML is never rendered (no rehype-raw) and remote
// images are never loaded.
const EXTERNAL_HOSTS = new Set([
  "velopack.io",
  "www.nuget.org",
  "nuget.org",
  "crates.io",
  "www.npmjs.com",
  "learn.microsoft.com",
  "developer.apple.com",
]);
const DOCS_HOST = "docs.velopack.io";

type Target = { kind: "internal"; to: string } | { kind: "external"; href: string };

export function linkTarget(href: string | undefined): Target | null {
  if (!href) return null;
  if (href.startsWith("/") && !href.startsWith("//")) return { kind: "internal", to: href };
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" || url.username || url.password) return null;
  const host = url.hostname.toLowerCase();
  if (host === DOCS_HOST) return { kind: "internal", to: url.pathname + url.search + url.hash };
  if (
    EXTERNAL_HOSTS.has(host) ||
    (host === "github.com" && url.pathname.startsWith("/velopack/")) ||
    (host === "discord.gg" && url.pathname === "/CjrCrNzd3F")
  ) {
    return { kind: "external", href: url.href };
  }
  return null;
}

function textOf(node: ReactNode): string {
  return Children.toArray(node)
    .map((c) => (typeof c === "string" || typeof c === "number" ? String(c) : isValidElement<{ children?: ReactNode }>(c) ? textOf(c.props.children) : ""))
    .join("");
}

function components(onInternalLink: () => void): Components {
  return {
    a({ href, children }) {
      const target = linkTarget(href);
      if (target?.kind === "internal") {
        return (
          <Link to={target.to} autoAddBaseUrl={false} onClick={onInternalLink}>
            {children}
          </Link>
        );
      }
      if (target?.kind === "external") {
        return (
          <a href={target.href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      }
      const label = textOf(children);
      return (
        <span>
          {children}
          {href && href !== label ? ` (${href})` : null}
        </span>
      );
    },
    img({ alt, src }) {
      return <span>{alt || src ? `[image: ${alt || src}]` : null}</span>;
    },
    pre({ children }) {
      const code = Children.toArray(children)[0];
      if (isValidElement<{ className?: string; children?: ReactNode }>(code)) {
        return <CodeBlock className={code.props.className}>{textOf(code.props.children).replace(/\n$/, "")}</CodeBlock>;
      }
      return <pre>{children}</pre>;
    },
    table({ children }) {
      return (
        <div style={{ overflowX: "auto" }}>
          <table>{children}</table>
        </div>
      );
    },
  };
}

export default function Markdown({ text, onInternalLink }: { text: string; onInternalLink: () => void }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components(onInternalLink)}>
      {text}
    </ReactMarkdown>
  );
}
