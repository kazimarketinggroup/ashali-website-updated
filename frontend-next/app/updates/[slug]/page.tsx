import type { Metadata } from "next";
import { notFound } from "next/navigation";

import JsonLd from "@/src/Components/Shared/JsonLd";
import UpdateDetail from "@/src/Components/Pages/LatestUpdates/UpdateDetail";
import { UPDATE_POSTS } from "@/src/Components/Pages/LatestUpdates/updatesData";
import { pageMetadata } from "@/src/constants/metadata";
import { breadcrumbSchema } from "@/src/constants/structuredData";

/*
  /updates/:slug -> /updates/[slug]

  The slug is read here, in the Server Component, and passed down as a prop.
  UpdateDetail is a client component (framer-motion) but must NOT call
  useParams: that hook has no value during the server render, so valid posts
  were server-rendering as "Post not found" and only correcting themselves
  after hydration — a visible flash, and the wrong content for crawlers.

  In Next 16 `params` is a Promise and must be awaited.

  UNKNOWN SLUGS RETURN A REAL 404. The lookup happens here rather than inside
  the component so that a miss can call notFound(), which sets an actual HTTP
  404 status and renders app/not-found.tsx. This replaced the previous
  soft-404 (HTTP 200 plus a "Post not found" body) carried over from the Vite
  build, where a genuine 404 was impossible because vercel.json rewrote every
  unmatched path to the index document.
*/

export function generateStaticParams() {
  return UPDATE_POSTS.map((post) => ({ slug: post.slug }));
}

/*
  Reject any slug not in UPDATE_POSTS instead of rendering it on demand.
  Without this, an unknown slug would still be server-rendered (and 200) on
  first request; `false` makes Next return the 404 for anything outside the
  prerendered set.
*/
export const dynamicParams = false;

/*
  Post titles are stored in ALL CAPS for the on-page heading design. Search
  results render the <title> verbatim, and all-caps reads as shouting and
  measurably hurts click-through, so it is converted to title case HERE ONLY —
  the visible <h1> still uses post.title untouched.

  Small words stay lowercase unless they lead the title. Words already
  containing an inner capital or digit (AI, B2B, $2.44B) are left alone so
  acronyms survive the conversion.
*/
const MINOR_WORDS = new Set([
  // Articles, coordinating conjunctions and short prepositions only.
  // Pronouns ("you", "we", "it") are NOT minor words and stay capitalised —
  // including "you" here produced "How you Already Have What It Takes".
  "a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into",
  "nor", "of", "on", "onto", "or", "over", "per", "the", "to", "up", "via",
  "with",
]);

function toTitleCase(value: string): string {
  // Split on whitespace and hyphens, keeping the separators so the original
  // spacing and hyphenation are reproduced exactly.
  const tokens = value.split(/(\s+|-)/);
  let wordIndex = 0;

  return tokens
    .map((token) => {
      if (token === "" || /^\s+$/.test(token) || token === "-") return token;

      const isFirstWord = wordIndex === 0;
      wordIndex += 1;

      // Leave tokens containing digits alone (e.g. "$2.44B", "2021").
      if (/\d/.test(token)) return token;

      const lower = token.toLowerCase();
      if (!isFirstWord && MINOR_WORDS.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = UPDATE_POSTS.find((p) => p.slug === slug);

  if (!post) {
    // dynamicParams=false means this is unreachable, but generateMetadata must
    // still return something valid rather than throwing.
    return pageMetadata({
      title: "Post not found | Ash Ali",
      description: "This update could not be found.",
      path: "/updates",
      index: false,
    });
  }

  return pageMetadata({
    title: `${toTitleCase(post.title)} | Ash Ali`,
    // The excerpt is real, human-written copy already shown on the page.
    description: post.excerpt,
    path: `/updates/${post.slug}`,
    type: "article",
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = UPDATE_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Updates", path: "/updates" },
          { name: toTitleCase(post.title), path: `/updates/${post.slug}` },
        ])}
      />
      <UpdateDetail slug={slug} />
    </>
  );
}
