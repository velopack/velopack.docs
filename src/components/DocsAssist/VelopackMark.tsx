import React, { useId, type CSSProperties } from "react";

// The Velopack chevron, copied verbatim from static/logo/velopack-black.svg.
const MARK_D =
  "M168.58,1.97l-85.2,132.33c-.5.78-1.65.78-2.15,0l-28.65-44.51c-.55-.85.06-1.97,1.08-1.97h49.55c1.4,0,1.78-1.93.48-2.46l-67.27-27.55c-1.3-.53-.92-2.46.48-2.46h87.16c1.4,0,1.78-1.93.48-2.46L.8,2.46C-.5,1.93-.12,0,1.28,0h166.22c1.01,0,1.62,1.12,1.07,1.97Z";

/** A four-point spark in a 34..52 x 29..47 box (the assistant's "AI" accent). */
export const SPARK_D =
  "M 43 29 C 42.51 29 42.089766 29.349844 42.009766 29.839844 C 41.069766 35.479844 40.29 36.139297 36.75 37.029297 C 36.31 37.139297 36 37.54 36 38 C 36 38.46 36.31 38.860703 36.75 38.970703 C 40.29 39.860703 41.069766 40.520156 42.009766 46.160156 C 42.089766 46.650156 42.51 47 43 47 C 43.49 47 43.900469 46.650156 43.980469 46.160156 C 44.920469 40.520156 45.700234 39.860703 49.240234 38.970703 C 49.680234 38.860703 50 38.46 50 38 C 50 37.54 49.680234 37.139297 49.240234 37.029297 C 45.700234 36.139297 44.920469 35.479844 43.980469 29.839844 C 43.900469 29.349844 43.49 29 43 29 z";

/**
 * The assistant's mark: the Velopack chevron with a spark tucked under its right wing. With `streaks`,
 * two speed lines sit in the logo's own cut-in rows (hidden until the launcher is hovered). Colours come
 * from CSS (`--da-mark-fill`, `--da-spark-fill`, `--da-streak`); see fab.module.css.
 */
export default function VelopackMark({ className, streaks = false }: { className?: string; streaks?: boolean }) {
  // useId output (e.g. «r1») isn't a safe url(#…) fragment.
  const gid = "da-g" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const style = { "--da-mark-gradient": `url(#${gid})`, "--da-streak-gradient": `url(#${gid}s)` } as CSSProperties;
  return (
    <svg className={className} viewBox="0 0 172 136" overflow="visible" aria-hidden="true" focusable="false" style={style}>
      <defs>
        <linearGradient id={gid} x1="16.38" y1="88.39" x2="121.56" y2="1.68" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#e2bd23" />
          <stop offset=".99" stopColor="#edd323" />
        </linearGradient>
        {streaks && (
          <linearGradient id={`${gid}s`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" style={{ stopColor: "var(--da-streak)", stopOpacity: 0 }} />
            <stop offset="1" style={{ stopColor: "var(--da-streak)", stopOpacity: 1 }} />
          </linearGradient>
        )}
      </defs>
      {streaks && (
        <g className="da-streaks">
          {/* middle and lower cut-in rows; each ends just left of its bar tip */}
          <rect className="da-streak" x="-30" y="55.5" width="60" height="12" rx="6" />
          <rect className="da-streak" x="-14" y="88" width="60" height="12" rx="6" />
        </g>
      )}
      <g className="da-markGroup">
        <path className="da-mark" d={MARK_D} />
        <g transform="translate(148 112) scale(2.4) translate(-43 -38)">
          <path className="da-spark" d={SPARK_D} />
        </g>
      </g>
    </svg>
  );
}
