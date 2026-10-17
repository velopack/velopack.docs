// Media queries shared by the launcher (main bundle) and the panel (lazy chunk). The CSS repeats
// SHEET_QUERY as `(max-width: 768px), (max-height: 600px)` (and its exact complement,
// `(width > 768px) and (height > 600px)`, for desktop-only motion); keep them in step.

/** Full-screen sheet layout: phones, and short (landscape phone) viewports. */
export const SHEET_QUERY = "(max-width: 768px), (max-height: 600px)";
const REDUCE = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia(REDUCE).matches;
}

/**
 * When the current turn started. Written by the launcher (always mounted, so it sees every busy
 * change, even while the panel is closed or between Layout remounts) and read by the panel's timer.
 */
export const turnClock: { since: number | null } = { since: null };
