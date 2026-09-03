import NotFound from "@/src/Components/Pages/NotFound";

/*
  Replaces the `{ path: "*", element: <NotFound /> }` catch-all from the Vite
  router. Unlike the SPA version, this returns a real HTTP 404 status rather
  than a 200 — the SPA physically could not, because vercel.json rewrote every
  unmatched path to the index document.

  This also means /book, /workshop and /unlock (the three broken internal links
  flagged in the migration report) will now correctly 404 instead of serving a
  200 with not-found content. Those links are awaiting a per-link decision.
*/
export default function Page() {
  return <NotFound />;
}
