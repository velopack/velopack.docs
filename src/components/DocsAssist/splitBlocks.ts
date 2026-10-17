/**
 * Splits markdown at blank lines outside fenced code, so finished blocks can be memoized and only the
 * trailing block re-parses while an answer streams. Caveats that are fine for model output: a "loose"
 * list split by blank lines renders as adjacent lists (ordered lists keep their start number), and
 * reference-style link definitions only resolve within their own block.
 */
export function splitBlocks(md: string): string[] {
  const out: string[] = [];
  let buf: string[] = [];
  let fence: string | null = null;
  for (const line of md.split("\n")) {
    const m = /^ {0,3}(`{3,}|~{3,})/.exec(line);
    if (m) {
      if (fence === null) fence = m[1];
      else if (m[1][0] === fence[0] && m[1].length >= fence.length) fence = null;
    }
    if (fence === null && line.trim() === "") {
      if (buf.length) {
        out.push(buf.join("\n"));
        buf = [];
      }
      continue;
    }
    buf.push(line);
  }
  if (buf.length) out.push(buf.join("\n"));
  return out;
}
