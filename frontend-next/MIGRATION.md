# Next.js migration — working document

Tracks the migration of ashali.com from Vite + react-router-dom to Next.js 16
App Router. Updated at each phase.

**Branches**

| Branch | Contains |
|---|---|
| `main` | `255ebbb` — what is currently deployed. Untouched. |
| `safety/pre-nextjs-migration` | `5405bdf` — full snapshot of the uncommitted working state. Restore point. |
| `feat/nextjs-migration` | This work. `frontend/` stays byte-for-byte untouched; all new code is in `frontend-next/`. |

Rollback at any point is `git checkout safety/pre-nextjs-migration`. The live
deployment is unaffected by anything on this branch because Vercel builds
`frontend/` from `main`.

---

## Phase 1 — scaffold (done)

- Next 16.3.0, React 19.1.1, TypeScript. Scaffolded by hand, **not** via
  `create-next-app`, which installs Tailwind v4.
- **Tailwind pinned to v3** (resolved 3.4.19). `tailwind.config.ts` is a verbatim
  port of the design tokens. Verified present in compiled CSS.
- `index.css` → `app/globals.css`, two behaviour-preserving changes documented
  in the file header.
- All 36 routes reproduced 1:1 and verified building.
- 18 unreferenced packages dropped.

### Architecture decision: no-rewrite component port

Components will be copied into `frontend-next/src/` at the **same directory
depth** they occupy today, so all 411 asset imports and every cross-component
relative import (`../../../../assets/book/china.png`) keep resolving unchanged.
The `app/` tree stays thin — each `page.tsx` does little more than re-export a
page component via the `@/*` alias.

This matters for the identical-design guarantee: rewriting 411 import paths by
hand is the single most likely way to silently ship a broken or wrong image.

---

## Phase 2 — component port (done)

`npm run typecheck` is clean, `npm run build` generates all 36 routes, and every
route returns 200 with content from `next start`.

### Routing

- All 50 files importing `react-router-dom` converted to `next/link` /
  `next/navigation`. Zero references remain.
- `<Link to=>` → `<Link href=>` (167 sites). No `state`/`replace`/
  `reloadDocument` props existed, so the swap was mechanical.
- `MainLayout.tsx` deleted — `app/layout.tsx` supersedes it. `<Outlet>` becomes
  `children`; `<ScrollRestoration>` is dropped because App Router restores
  scroll by default.
- `<NavLink>`'s `isActive` render-prop has no next/link equivalent. `SiteHeader`
  now derives active state from `usePathname()`, reproducing NavLink's exact
  matching semantics (`end` → exact match, otherwise prefix). Verified: the
  gradient class appears on `/about` and not on `/`.

### Client / Server split

111 client, 113 server. The `app/` routing layer is entirely Server Components;
each `page.tsx` renders one imported component.

The dominant reason for a client boundary is **framer-motion (103 files)**, not
browser APIs — the site is animation-dense, and framer-motion registers effects
and handlers. This caps how much can stay on the server, but note the HTML is
server-rendered either way; only the hydration bundle differs.

### Three runtime bugs found and fixed

These were invisible to the typechecker and all three would have shipped:

1. **`CapabilityIndexSection` — the whole homepage 500'd.**
   `createPortal(..., document.body)` runs *during render*, and `"use client"`
   does not mean "browser only" — client components still render once on the
   server, where `document` is undefined. Gated behind a `mounted` flag set in
   an effect.

2. **Static image imports are objects, not strings.** Vite typed
   `import img from "./x.png"` as `string`; Next's loader returns
   `StaticImageData` (`{src, width, height}`). `<img src={obj}>` renders
   `src="[object Object]"`. Confirmed empirically against a running server
   before changing anything. Fixed by appending `.src` at 399 use-sites across
   93 files — deliberately *not* by converting to `next/image`, which is
   explicitly deferred to the SEO/performance phase.
   One case the codemod could not see was `` `url(${impactBg})` `` inside a
   template literal in `Portfolio/ImpactHero.tsx`; the `/impact` hero would have
   rendered with no background. Swept all routes afterwards: zero
   `[object Object]` remain.

3. **`/updates/[slug]` server-rendered "Post not found" for valid posts.**
   `useParams` is a client hook with no value during the server render, so the
   lookup missed and the correct post only appeared after hydration — a visible
   flash, and the wrong content for crawlers. The slug is now read from
   `params` in the page (awaited; it is a Promise in Next 16) and passed down as
   a prop.

### One component became client-only for a non-obvious reason

`LevelTwoUnlockSkills` uses a callback `ref` to measure a sibling with
`getBoundingClientRect()`. Refs are unavailable in Server Components and the
build fails outright ("Refs cannot be used in Server Components"). It is the
only component in the port that crossed the boundary purely because of a ref.

### Environment variables

`import.meta.env` does not exist in Next. Rewritten in `utils/api.ts` and
`constants/site.ts` as full static `process.env.NEXT_PUBLIC_*` property
accesses — Next inlines these literally at build time, so destructuring or
dynamic indexing would silently yield `undefined` in the browser.

---

## Visual parity strategy

The constraint is that the rendered output must be **pixel-identical**, so
parity is verified mechanically rather than by eye. Both builds get served
simultaneously and compared.

### Why eyeballing will not work here

The site is animation-dense: ~120 files import `framer-motion`, most using
`whileInView` scroll triggers. Screenshots of it are non-deterministic by
default, and a subtle regression — a shifted breakpoint, a font falling back, an
animation that no longer retriggers — is invisible in side-by-side review but
obvious in a pixel diff.

### Capture protocol

Both servers run at once:

```
cd frontend      && npm run build && npm run preview   # :4173  (baseline)
cd frontend-next && npm run build && npm start         # :3000  (candidate)
```

For each of the 25 real routes, at 5 viewport widths — **375, 768, 1280, 1440
(the approved design width), 1920** (exercises the `3xl` breakpoint) — capture a
full-page screenshot under these conditions:

1. **Force animations to completion.** Inject
   `*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; }`
   and run the context with `reducedMotion: 'reduce'`.
2. **Trigger every `whileInView` block.** Scroll to the bottom in steps, then
   back to top. Because nearly all use `viewport={{ once: true }}`, this settles
   them permanently into their final state.
3. **Wait for fonts and images**: `document.fonts.ready`, then all `<img>`
   `complete`.
4. **Mask known-nondeterministic regions**: YouTube iframes
   (`SpeakerMediaSection`, `VideoHero`, `SupportingVideos`,
   `HeiFrameVideoSection`, `TikTokReviewSection`, `ArabicVideoReview`) render
   third-party content that will never match between runs.

Compare with a per-pixel diff. **Threshold: 0 differing pixels outside masked
regions.** Anything non-zero is triaged, not waved through.

### Two known-acceptable diffs, to be confirmed not assumed

- **Font rendering.** `next/font` self-hosts the same Outfit files Google
  serves, so metrics should be identical and the diff should be zero. If text
  shifts even slightly, the font is falling back and must be fixed before
  proceeding — this would affect every page.
- **Image re-encoding.** `next/image` serves AVIF/WebP where the Vite build
  served PNG. Visually identical at the diff threshold, but if any image shows
  banding or artefacts, `quality` needs raising on that image.

### Per-page sign-off gate

A page is not "migrated" until: pixel diff clean at all 5 viewports, no console
errors, no hydration mismatch warning, and its interactive elements
(mobile menu, the Capability Index modal, the Contact datepicker, both forms)
manually exercised once.

---

## Carried-forward items (awaiting your decision)

### 1. `frontend/vercel.json` — do NOT delete yet

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

This SPA rewrite must not exist for the Next build — with it, **every route
collapses to the homepage**.

It is deliberately still in place. Deleting it now would break the *live* site,
because that rewrite is exactly what makes the currently-deployed SPA serve
routes like `/about`. It is a **cutover-time action, not a migration-phase
action**.

`frontend-next/` has no `vercel.json` at all (Next on Vercel is zero-config),
so the correct sequence at cutover is: point the Vercel project's Root
Directory at `frontend-next`, which orphans the old file — then delete it once
the new deployment is confirmed good. Flagging rather than executing, since the
instruction to delete it "as part of this phase" would, taken literally, be the
one action in this whole migration capable of taking the site down.

### 2. Three broken internal links — flagged, not fixed

These `<Link to=...>` targets have no matching route and currently fall through
to the catch-all:

| Link | Found in | Likely intent |
|---|---|---|
| `to="/book"` | footer / body links | `/unfair-advantage` |
| `to="/workshop"` | body link | `/workshops` (singular vs plural typo) |
| `to="/unlock"` | body link | no obvious target — may be unbuilt |

Also `to="#workshops"` is passed to a router `Link`, which treats it as a path,
not an anchor — it will not scroll to the section.

**Behaviour change to be aware of:** in the SPA these returned HTTP 200 (the
rewrite guaranteed it). In Next they return a true 404. That is strictly more
correct, and better for SEO, but it is a change. Awaiting your per-link call.

### 3. Ten placeholder routes — untouched by design

`results-media`, `investment`, `podcast`, `radio-show`, `faq`, `blog`,
`privacy`, `terms`, `quotes`, `media` are ported as-is with behaviour
preserved. Whether each becomes real content, `noindex`, or 410 is a Phase 2
SEO decision.

### 4. Environment variables

`.env.local.example` documents the rename. Both must be added to the Vercel
project before the new deployment is promoted:

| Old (Vite) | New (Next) |
|---|---|
| `VITE_API_URL` | `NEXT_PUBLIC_API_URL` |
| `VITE_SITE_URL` *(referenced but never set)* | `NEXT_PUBLIC_SITE_URL` |

### 5. Repo hygiene (non-blocking)

`frontend/assets/` is 16MB of hash-named Vite build output committed to the
repo root by accident. It is in the safety snapshot to keep that snapshot
faithful, and gitignored in `frontend-next/`. Worth deleting from `frontend/`
separately, once you confirm nothing references it.

---

## SEO baseline (Phase 2 scope)

Recorded now so the fix list has a measurable before-state:

- All ~35 URLs share **one** title and meta description. The `<Head>` component
  exists but is wired into exactly one page (Workshops).
- No `robots.txt`, no `sitemap.xml`, no canonical tags.
- `src/constants/structuredData.ts` contains complete, well-written Person and
  Book JSON-LD — **injected by nothing**. Wiring it up is close to free.
- OG/Twitter image tags are commented out; social shares render imageless.
- `/updates/:slug` currently soft-404s (HTTP 200 + "Post not found").

---

## Phase 3 — per-page metadata, JSON-LD, robots & sitemap (done)

### Canonical host corrected

The codebase hardcoded `https://ashali.com` in three places. Production
307-redirects the apex to `https://www.ashali.com`, so every canonical would
have pointed at a redirecting host. Fixed in `constants/site.ts`,
`app/layout.tsx`, `.env.local` and `.env.local.example`.

### Metadata

`src/constants/metadata.ts` exposes `pageMetadata()`; every indexable route
builds its `metadata` export through it, so title, canonical, OG and Twitter
tags cannot drift apart. Before this, all ~27 URLs shared one title and one
description.

Verified: 24 static routes plus 3 posts, each with a unique title (15–54
chars), unique description (74–152 chars), a self-referencing canonical on the
www host, and a complete OG/Twitter set.

`/updates/[slug]` builds its metadata from the post record. Titles are stored
ALL CAPS for the on-page heading; they are converted to title case for the
`<title>` tag ONLY (all-caps reads as shouting in search results). The visible
`<h1>` is untouched. Pronouns are not treated as minor words — an earlier pass
produced "How you Already Have What It Takes".

### JSON-LD

`structuredData.ts` already contained well-written builders that nothing
injected. They are now rendered by `Shared/JsonLd.tsx`, a server component, so
the markup is in the first byte rather than appearing after hydration.

| Schema | Where |
|---|---|
| `Person` | `/` and `/about` |
| `Book` | `/unfair-advantage` and the 4 regional book pages |
| `BreadcrumbList` | every route except `/` (a one-item trail carries no information) |
| `FAQPage` | `/workshops` only |

`FAQPage` is on Workshops alone because it is the only page with a visible FAQ
accordion — `/speaking` has none, and declaring FAQ markup without matching
on-page content is a structured-data violation. The schema is built from the
same `faqs` array the accordion renders.

### OG images

`public/og/default.png` (1200x630) is a generated placeholder card used
sitewide, so no share is imageless. Per-page art drops into `public/og/` and is
wired with a single `ogImage` line in the page's `pageMetadata()` call — no
other change needed.

### Removed: `Shared/Head.tsx`

It set `document.title` in a `useEffect`, which runs after hydration, so the
server HTML always carried the generic sitewide title — verified before removal
by curling `/workshops`, its only consumer, and seeing the homepage title. Its
`jsonLd` prop was never rendered at all. Both jobs are now done properly.

### Soft-404 eliminated

`/updates/[slug]` returns a real HTTP 404 for unknown slugs via `notFound()`
plus `dynamicParams = false`. The three commented-out posts in `updatesData.ts`
now 404 instead of returning 200 with a "Post not found" body.

### Broken internal links fixed

| Was | Now | Note |
|---|---|---|
| `/book` | `/unfair-advantage` | Home page book CTA |
| `/workshop` | `/workshops` | About hero, "Explore workshops" |
| `/unlock` | `/contact` | Speaking hero "Unlock Greatness"; matches every other CTA on that page |

`to="#workshops"` needed no change: `CtaLink` already routes `#` links to a
plain anchor rather than next/link.

---

## Phase 6 (part 1) — image filenames, alt text, visual-regression harness

### Filenames

86 assets renamed to descriptive, hyphenated, lowercase names; 119 import
references rewritten. Source filenames survive into the public URL
(`/_next/static/media/<name>.<hash>.png`), so these were reaching crawlers.

Before: `EY-logo 2.png`, `WhatsApp Image 2025-02-17 at 20.37.00_8581e511.png`,
`1685097225358 9 (1).png`.
After: `ey-logo.png`, `ash-birmingham-natwest-talk.png`, `ash-tedx-talk-stage.png`.

Image URLs containing literal spaces went from 52 to 0. Note these were NOT
broken — browsers percent-encode them — so this was hygiene and SEO, not an
outage.

### Two genuine pre-existing bugs found and fixed

Both were broken images on live book pages, unrelated to the rename itself:

1. `amazonLogo.png` and `amazonlogo.png` — byte-identical files differing only
   in case. On a case-insensitive filesystem both collapse to one build
   artifact, so the lowercase URL 404'd on /book/usa-book, /book/uae-book and
   /book/china-book.
2. `barnes&nobel.png` — the `&` is HTML-escaped in the rendered `src`, so the
   request 404'd on /book/usa-book and /book/china-book.

A full sweep of all 24 routes now reports zero broken images.

### Alt text

Already in good shape before this phase: 152 `<img>` tags, 0 missing `alt`,
110 meaningful and 42 correctly empty for decorative images. Only three weak
values needed work — `alt="logo"`, `alt="Project"` and `alt="Hero"` — fixed by
threading the venture name through as a prop rather than hardcoding a string.

### Visual-regression harness (`scripts/shoot.mjs`, `scripts/diff.mjs`)

MIGRATION.md specified a pixel-diff gate from Phase 1; it had never been built.
It exists now: 25 routes x 5 viewports = 125 full-page screenshots, compared
per-pixel.

Three problems had to be solved before the output was trustworthy:

1. **`networkidle` never settles.** YouTube/TikTok embeds hold connections
   open. Third-party requests are now aborted outright — those regions are
   masked anyway.
2. **The run stalled after two routes.** The image-wait looped over every
   `<img>` waiting for `load`, but images with `loading="lazy"` below the fold
   never fire it. The homepage sat with 6 of 10 images incomplete, /speaking
   with 37 of 44. Images are forced eager and the wait is capped.
3. **The harness was not deterministic.** Capturing the same unchanged build
   twice produced 18 differing shots, up to 464px. Cause: framer-motion layout
   animations (`layoutId`) are driven by measured positions in JavaScript and
   ignore the CSS animation freeze. A MutationObserver now waits for 20
   consecutive quiet frames.

**Verified: 125/125 identical on a repeat capture of an unchanged build.** The
noise floor is zero, so any non-zero diff is a real change.

### next/image — validated on one component

`AboutHero` converted as a proof of concept (the `fill` case: `h-full w-full
object-cover` in an absolutely-positioned parent).

- 183KB PNG -> **16.7KB AVIF, a 91% reduction**
- Pixel diff against baseline: **125/125 identical**

The remaining 151 images are unconverted pending sign-off.

---

## Phase 4 — heading hierarchy

**10 of 24 routes had no `<h1>` at all**, including /speaking,
/unfair-advantage and all four book pages. In every case the page had a
perfectly good top heading that was simply marked `h2` (or `h3` on
/portfolio/uhubs, which skipped a level).

16 of 20 content routes now have exactly one h1. All fixes were promotions of
existing headings — no new copy was invented — and the pixel diff confirms
**125/125 identical**, so the change is purely semantic.

Two required care rather than a blind swap:

- `KeynotesBanner` lives under `Home/` but renders on **/speaking only**
  (SpeakingHero, which held the original h1, is commented out).
- `BookShowcase` renders on **both** / and /unfair-advantage. Hardcoding an h1
  would have given the homepage two. It now takes an `as` prop defaulting to
  `h2`; only /unfair-advantage passes `as="h1"`.

### Still open: 4 portfolio pages

/portfolio/uhubs, /portfolio/just-eat, /portfolio/fare-exchange and
/portfolio/wash-plus have **no text heading anywhere in their hero** — each is
a logo image over a photograph. Giving them an h1 means adding visible text,
which is a design change, not a markup fix. Awaiting a decision.
