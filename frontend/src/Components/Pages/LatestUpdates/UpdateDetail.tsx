import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, easeOut } from "framer-motion";

import { UPDATE_POSTS } from "./updatesData";
import EnquiryNow from "./EnquiryNow";

// const CATEGORY = "#A67C52";

const UpdateDetail: React.FC = () => {
  const { slug } = useParams();

  const post = useMemo(() => UPDATE_POSTS.find((p) => p.slug === slug), [slug]);

  if (!post) {
    return (
      <section className="bg-black px-4 pb-20 pt-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-semibold">Post not found</h1>
          <Link to="/updates" className="mt-6 inline-block text-sm underline underline-offset-4">
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
          <Link to="/updates" className="text-sm text-white/70 hover:text-white">
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
            <p>{post.excerpt}</p>
            <p>
              This is the full blog detail page layout. Replace this body with your real content anytime (Markdown, CMS, or API).
              The design is built to be clean and readable on mobile, and matches your dark UI style.
            </p>
            <p>
              If you want, I can also add author, read-time, share buttons, and “Related posts” under this.
            </p>
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

