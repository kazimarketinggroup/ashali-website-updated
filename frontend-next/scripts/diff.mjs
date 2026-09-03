/*
  Per-pixel comparison of two capture sets produced by scripts/shoot.mjs.

    node scripts/diff.mjs before after

  Reports every route/viewport whose rendering changed, and writes a visual
  diff PNG for each one to .visual/diff/ so the change can be inspected rather
  than guessed at.

  Threshold is 0 differing pixels outside masked regions: with animations
  frozen and fonts/images awaited, an identical build must produce identical
  bytes. Anything non-zero is triaged, not waved through — the whole point is
  that "looks the same to me" is not evidence.

  A size mismatch is reported as a hard failure rather than a pixel count,
  because a page that changed height has almost certainly had its layout
  altered.
*/
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const [, , beforeLabel, afterLabel] = process.argv;
if (!beforeLabel || !afterLabel) {
  console.error("usage: node scripts/diff.mjs <before> <after>");
  process.exit(1);
}

const A = `.visual/${beforeLabel}`;
const B = `.visual/${afterLabel}`;
const D = `.visual/diff`;

function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (p.endsWith(".png")) acc.push(p);
  }
  return acc;
}

const files = walk(A).map((f) => relative(A, f));
if (!files.length) {
  console.error(`no screenshots in ${A}`);
  process.exit(1);
}

let identical = 0;
const changed = [];
const missing = [];

for (const rel of files) {
  const pathB = join(B, rel);
  if (!existsSync(pathB)) { missing.push(rel); continue; }

  const imgA = PNG.sync.read(readFileSync(join(A, rel)));
  const imgB = PNG.sync.read(readFileSync(pathB));

  if (imgA.width !== imgB.width || imgA.height !== imgB.height) {
    changed.push({ rel, note: `SIZE ${imgA.width}x${imgA.height} -> ${imgB.width}x${imgB.height}` });
    continue;
  }

  const diff = new PNG({ width: imgA.width, height: imgA.height });
  const n = pixelmatch(imgA.data, imgB.data, diff.data, imgA.width, imgA.height, {
    threshold: 0.1,          // per-pixel colour tolerance, not a pixel budget
    includeAA: false,        // ignore pure anti-aliasing noise
  });

  if (n === 0) { identical++; continue; }

  const out = join(D, rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, PNG.sync.write(diff));
  const pct = ((n / (imgA.width * imgA.height)) * 100).toFixed(3);
  changed.push({ rel, note: `${n} px (${pct}%)`, out });
}

console.log(`identical: ${identical}/${files.length}`);
if (missing.length) {
  console.log(`\nmissing in ${afterLabel} (${missing.length}):`);
  missing.forEach((m) => console.log("  " + m));
}
if (changed.length) {
  console.log(`\nCHANGED (${changed.length}):`);
  changed
    .sort((a, b) => (parseInt(b.note) || 1e9) - (parseInt(a.note) || 1e9))
    .forEach((c) => console.log(`  ${c.rel.padEnd(52)} ${c.note}`));
  console.log(`\ndiff images -> ${D}`);
  process.exit(1);
}
console.log("\nNo visual differences.");
