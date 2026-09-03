/*
  Visual-parity capture, implementing the protocol recorded in MIGRATION.md.

  Usage:
    node scripts/shoot.mjs <label> [port]

  Writes full-page PNGs to .visual/<label>/<route>@<width>.png.
  Run it once before a risky change and once after, then compare with
  scripts/diff.mjs.

  Why the site cannot simply be screenshotted as-is
  -------------------------------------------------
  ~103 components use framer-motion, most with `whileInView` scroll triggers.
  A naive screenshot catches elements mid-animation and is different on every
  run, which would drown a real regression in noise. So each capture:

    1. Disables animation/transition durations via an init script, and runs the
       context with reducedMotion: 'reduce'.
    2. Scrolls the full height in steps to fire every `whileInView` block, then
       returns to the top. Nearly all use `viewport={{ once: true }}`, so they
       settle permanently into their final state.
    3. Waits for document.fonts.ready and for every <img> to report complete,
       so a late-loading image cannot shift layout mid-shot.
    4. Masks YouTube/TikTok iframes — third-party content that will never match
       between two runs.
*/
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const label = process.argv[2];
const port = process.argv[3] || "3000";
if (!label) {
  console.error("usage: node scripts/shoot.mjs <label> [port]");
  process.exit(1);
}

const BASE = `http://localhost:${port}`;
const OUT = `.visual/${label}`;

// The 25 real content routes. Placeholder routes are excluded — they render
// identical chrome and would only add noise.
const ROUTES = [
  "/", "/about", "/speaking", "/workshops", "/advisory", "/contact",
  "/unfair-advantage", "/book/usa-book", "/book/uae-book", "/book/china-book",
  "/book/southeast-asia-book", "/impact", "/portfolio", "/portfolio/uhubs",
  "/portfolio/just-eat", "/portfolio/fare-exchange", "/portfolio/wash-plus",
  "/malaysia-sea", "/the-next-level", "/the-next-level/level-1",
  "/the-next-level/level-2", "/the-next-level/level-3",
  "/the-next-level/secret-level", "/updates",
  "/updates/how-you-already-have-what-it-takes-to-succeed",
];

// 1440 is the approved design width; 1920 exercises the `3xl` breakpoint.
const WIDTHS = [375, 768, 1280, 1440, 1920];

const FREEZE_CSS = `
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
    caret-color: transparent !important;
  }
  html { scroll-behavior: auto !important; }
`;

/*
  The default Chromium launch crashes the tab ("Target crashed") partway
  through this site — /speaking was reproducibly fatal. The cause is memory,
  not page size: /dev/shm is small, and full-page screenshots of an
  image-heavy 6400px page exhaust it. Disabling the shm backing store and
  raising the JS heap makes every route capture in well under a second.
*/
const browser = await chromium.launch({
  args: ["--disable-dev-shm-usage", "--js-flags=--max-old-space-size=4096"],
});
let shot = 0;

for (const width of WIDTHS) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  await context.addInitScript(() => {
    // Make Math.random deterministic in case any component seeds layout from it.
    Math.random = () => 0.5;
  });

  for (const route of ROUTES) {
    /*
      A FRESH PAGE PER ROUTE.

      Reusing one page across all 25 routes crashes the tab ("Target crashed")
      after the second or third capture. Each full-page screenshot of this site
      is a large bitmap — /speaking at 375px is 10,013px tall, a ~14MB raw
      surface — and the memory is not reclaimed promptly between captures, so
      it accumulates until the renderer dies. Any single route screenshots
      fine in isolation, which is what made this look like a per-page bug
      rather than a cumulative one.
    */
    const page = await context.newPage();

    /*
      Block third-party requests outright.

      YouTube/TikTok embeds hold connections open, so `waitUntil: "networkidle"`
      never settles on the pages that carry them. Those regions are masked in
      the screenshot anyway, so their content is irrelevant — aborting makes
      every page load deterministically and much faster. Everything served from
      this origin passes through untouched.
    */
    await page.route("**/*", (r) =>
      r.request().url().startsWith(BASE) ? r.continue() : r.abort()
    );

    const url = `${BASE}${route}`;
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
      // Local assets only, so this settles quickly now that third parties are
      // blocked. Failure here is non-fatal: the explicit font/image waits below
      // are the real guarantee.
      await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
    } catch {
      console.log(`  SKIP ${route} @${width} (navigation timeout)`);
      await page.close();
      continue;
    }

    await page.addStyleTag({ content: FREEZE_CSS });

    // Fire every whileInView block, then settle back at the top.
    await page.evaluate(async () => {
      const step = window.innerHeight;
      const total = document.body.scrollHeight;
      for (let y = 0; y < total; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 150));
    });

    await page.evaluate(() => document.fonts.ready);

    /*
      Let JS-driven animations settle.

      FREEZE_CSS zeroes CSS animation and transition durations, but
      framer-motion layout animations (`layoutId`, spring transitions) are
      driven by measured positions in JavaScript and ignore CSS entirely.
      A self-test — capturing the same unchanged build twice — showed 18 of 125
      shots differing by up to 464px purely from these springs still easing,
      most visibly the `layoutId="activeDot"` indicator on /advisory.

      Waiting for two animation frames with no further style mutation is
      cheaper and more reliable than trying to disable framer-motion itself,
      and it drops the noise floor to zero.
    */
    await page.evaluate(
      () =>
        new Promise((resolve) => {
          let quiet = 0;
          const observer = new MutationObserver(() => { quiet = 0; });
          observer.observe(document.body, {
            attributes: true, subtree: true,
            attributeFilter: ["style", "class", "transform"],
          });
          const tick = () => {
            // 20 consecutive frames (~330ms) with no style mutation anywhere.
            if (++quiet > 20) { observer.disconnect(); return resolve(); }
            requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          // Hard ceiling so a permanently-animating element cannot wedge the run.
          setTimeout(() => { observer.disconnect(); resolve(); }, 8000);
        })
    );

    /*
      Wait for images — but never unconditionally.

      Many images carry loading="lazy", so an image still below the fold after
      the scroll pass never fires `load` and an unbounded Promise.all over
      every <img> hangs forever. That is exactly what stalled earlier runs:
      the homepage sat with 6 of 10 images `incomplete`, /speaking with 37 of
      44, and the script waited indefinitely on the first of them.

      Two changes make it safe: force every image eager first (so the browser
      actually fetches them), and cap the wait. A slow image costs a few
      seconds; it can no longer wedge the run.
    */
    await page.evaluate(() => {
      for (const img of document.querySelectorAll("img")) {
        img.loading = "eager";
        img.decoding = "sync";
      }
    });

    await page
      .waitForFunction(
        () => [...document.querySelectorAll("img")].every((i) => i.complete),
        null,
        { timeout: 20_000 }
      )
      .catch(() => {
        // Fall through: a stuck image is reported by the diff, not hidden here.
      });

    await page.waitForTimeout(250);

    const file = `${OUT}${route === "/" ? "/_home" : route}@${width}.png`;
    mkdirSync(dirname(file), { recursive: true });

    try {
      const buffer = await page.screenshot({
        fullPage: true,
        animations: "disabled",
        // Third-party embeds never match between runs.
        mask: await page.locator('iframe[src*="youtube"], iframe[src*="tiktok"]').all(),
        maskColor: "#FF00FF",
      });
      writeFileSync(file, buffer);
      shot++;
    } catch (err) {
      // A single crashed route must not abandon the whole run — the diff step
      // reports it as missing, which is visible rather than silent.
      console.log(`  FAIL ${route} @${width}: ${err.message.split("\n")[0]}`);
    } finally {
      await page.close().catch(() => {});
    }
  }

  await context.close();
  console.log(`captured ${width}px`);
}

await browser.close();
console.log(`\n${shot} screenshots -> ${OUT}`);
