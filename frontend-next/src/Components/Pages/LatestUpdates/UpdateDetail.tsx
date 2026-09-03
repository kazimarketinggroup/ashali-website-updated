"use client";

/*
  CLIENT COMPONENT — reason: framer-motion scroll animations.

  The slug arrives as a PROP rather than via useParams, which is a deliberate
  change from the react-router version.

  Why: useParams is a client hook. During the server render of a dynamic route
  it does not yet have the segment, so the lookup missed and the server HTML
  contained "Post not found" for perfectly valid slugs — the correct content
  only appeared after hydration. That is a visible flash of wrong content and,
  because crawlers read the server HTML, it would have made every post look
  like a broken page. Threading the slug down from the page's `params` means
  the server HTML is correct on the first byte.
*/

import React, { useMemo } from "react";
import Link from "next/link";
import { motion, easeOut } from "framer-motion";

import { UPDATE_POSTS } from "./updatesData";
import EnquiryNow from "./EnquiryNow";

// const CATEGORY = "#A67C52";

const UpdateDetail: React.FC<{ slug?: string }> = ({ slug }) => {
  const post = useMemo(() => UPDATE_POSTS.find((p) => p.slug === slug), [slug]);

  /*
    Defensive only — this branch is now unreachable in normal routing.

    app/updates/[slug]/page.tsx does the lookup first and calls notFound() on a
    miss, which returns a real HTTP 404 instead of the 200 + "Post not found"
    body this used to produce. It is kept so the component stays safe to render
    with an arbitrary slug (e.g. if it is ever reused outside that route)
    rather than crashing on `post.title`.
  */
  if (!post) {
    return (
      <section className="bg-black px-4 pb-20 pt-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-semibold">Post not found</h1>
          <Link href="/updates" className="mt-6 inline-block text-sm underline underline-offset-4">
            Back to Latest Updates
          </Link>
        </div>
      </section>
    );
  }

  return (
    <main className="bg-black font-sans text-white">
      <section className="px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link href="/updates" className="text-sm text-white/70 hover:text-white">
            ← Back to Latest Updates
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="mt-6 text-2xl font-semibold leading-tight sm:text-3xl"
          >
            {post.title}
          </motion.h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            {/* <span style={{ color: CATEGORY }}>{post.category}</span> */}
            <span className="text-white/80">{post.date}</span>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black">
            <img src={post.cover} alt="" className="w-full object-cover object-center" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.05 }}
            className="prose prose-invert mt-10 max-w-none prose-p:leading-relaxed prose-p:text-white/90"
          >
            {/*
              Only the post's real excerpt renders here.

              Two hardcoded placeholder paragraphs used to follow it on EVERY
              post ("Replace this body with your real content…" and "If you
              want, I can also add author, read-time, share buttons…"). They
              were template/assistant boilerplate that shipped to production and
              were publicly visible on every article.

              They are removed rather than replaced: inventing article prose
              would be worse than showing less. When real bodies exist, add a
              `body` field to UpdatePost in updatesData.ts and render it below
              the excerpt.
            */}
            <p>{post.excerpt}</p>
          </motion.div>
        </div>
      </section>

      <div className="mt-14">
        <EnquiryNow />
      </div>
    </main>
  );
};

export default UpdateDetail;

