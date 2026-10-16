// Cloudflare Turnstile, loaded on demand. One widget is rendered into the chat panel and only runs
// when a token is needed (starting a conversation). It stays invisible unless the visitor has to
// interact with it.

interface TurnstileApi {
  render(container: HTMLElement, options: Record<string, unknown>): string;
  execute(container: HTMLElement | string): void;
  reset(widgetId: string): void;
  remove(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
// Long enough for a visitor to solve an interactive challenge.
const TIMEOUT_MS = 120_000;

let scriptPromise: Promise<TurnstileApi> | null = null;
let widget: { id: string; host: HTMLElement } | null = null;
let pending: { resolve: (token: string) => void; reject: (err: Error) => void } | null = null;

function loadScript(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  scriptPromise ??= new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile failed to load")));
    script.onerror = () => {
      scriptPromise = null;
      script.remove();
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/** Starts loading the Turnstile script early, so the first message isn't held up by it. */
export function preloadTurnstile(): void {
  void loadScript().catch(() => {});
}

/** Runs the challenge in `host` and resolves with a fresh, single-use token. */
export async function getTurnstileToken(host: HTMLElement, siteKey: string): Promise<string> {
  const ts = await loadScript();
  pending?.reject(new Error("Turnstile superseded"));

  if (widget && (widget.host !== host || !widget.host.isConnected)) {
    try {
      ts.remove(widget.id);
    } catch {
      // already gone with its container
    }
    widget = null;
  }

  return new Promise<string>((resolve, reject) => {
    const timer = setTimeout(() => settle(new Error("Turnstile timed out")), TIMEOUT_MS);
    const settle = (result: string | Error) => {
      clearTimeout(timer);
      if (pending !== entry) return;
      pending = null;
      if (typeof result === "string") resolve(result);
      else reject(result);
    };
    const entry = { resolve: (t: string) => settle(t), reject: (e: Error) => settle(e) };
    pending = entry;

    if (!widget) {
      const id = ts.render(host, {
        sitekey: siteKey,
        execution: "execute",
        appearance: "interaction-only",
        theme: document.documentElement.dataset.theme === "dark" ? "dark" : "light",
        callback: (token: string) => pending?.resolve(token),
        "error-callback": (code: string) => {
          pending?.reject(new Error(`Turnstile error ${code}`));
          return true;
        },
        "expired-callback": () => pending?.reject(new Error("Turnstile token expired")),
        "timeout-callback": () => pending?.reject(new Error("Turnstile challenge timed out")),
      });
      widget = { id, host };
    } else {
      // A token is single-use; get a new one.
      ts.reset(widget.id);
    }
    ts.execute(widget.host);
  });
}
