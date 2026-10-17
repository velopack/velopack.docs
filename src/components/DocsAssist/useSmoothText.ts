import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./constants";

const MIN_CPS = 90; // chars/second floor
const CATCH_UP_S = 0.35; // any backlog is cleared within ~350ms
const COMMIT_MS = 32; // at most ~30 renders per second

/**
 * Reveals streamed text at an even pace instead of in network-sized clumps. It mounts with the full
 * text, so restored or remounted messages never retype; text that shrinks or gets replaced shows at
 * once. Returns the text to show and whether it is still catching up.
 */
export function useSmoothText(text: string): [shown: string, revealing: boolean] {
  const [len, setLen] = useState(text.length);
  const lenRef = useRef(len);
  const prevText = useRef(text);

  useEffect(() => {
    // Only a strict continuation of the previous text is typed out; anything else is a replacement.
    const continues = text.startsWith(prevText.current);
    prevText.current = text;
    if (!continues || text.length <= lenRef.current || prefersReducedMotion()) {
      lenRef.current = text.length;
      setLen(text.length);
      return;
    }
    let raf = 0;
    let last = performance.now();
    let lastCommit = 0;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const backlog = text.length - lenRef.current;
      if (backlog <= 0) return;
      const step = Math.max(1, Math.round(Math.max(MIN_CPS, backlog / CATCH_UP_S) * dt));
      lenRef.current = Math.min(text.length, lenRef.current + step);
      if (now - lastCommit >= COMMIT_MS || lenRef.current === text.length) {
        lastCommit = now;
        setLen(lenRef.current);
      }
      if (lenRef.current < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text]);

  // (A replacement shows in full from its first render, before the effect catches up.)
  const done = len >= text.length || !text.startsWith(prevText.current);
  return [done ? text : text.slice(0, len), !done];
}
