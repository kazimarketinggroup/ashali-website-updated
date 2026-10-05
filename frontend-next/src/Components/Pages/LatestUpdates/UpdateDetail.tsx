"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { motion, easeOut } from "framer-motion";

import { UPDATE_POSTS } from "./updatesData";
import { useCMS } from "../../../context/CMSContext";
import EnquiryNow from "./EnquiryNow";

const UpdateDetail: React.FC<{ slug?: string }> = ({ slug }) => {
  const { cmsData } = useCMS();

  const post = useMemo(() => {
    const cmsPost = cmsData?.updates?.find((p) => p.slug === slug);
    if (cmsPost) return cmsPost;
    return UPDATE_POSTS.find((p) => p.slug === slug);
  }, [slug, cmsData]);

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

  const postContent = (post as any).content || post.excerpt;

  return (
    <div className="bg-black font-sans text-white">
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
            <span className="text-white/80">{post.date}</span>
            {(post as any).author && (
              <span className="text-white/50">&bull; By {(post as any).author}</span>
            )}
            {(post as any).readTime && (
              <span className="text-white/50">&bull; {(post as any).readTime}</span>
            )}
          </div>

          {post.cover && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black">
              <img src={post.cover} alt="" className="w-full object-cover object-center" />
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.05 }}
            className="prose prose-invert mt-10 max-w-none prose-p:leading-relaxed prose-p:text-white/90 space-y-4"
          >
            <p className="text-base text-white/80 font-medium italic border-l-2 border-orange-500 pl-4 mb-6">
              {post.excerpt}
            </p>
            {postContent !== post.excerpt && (
              <div className="text-sm text-white/90 leading-relaxed whitespace-pre-line">
                {postContent}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <div className="mt-14">
        <EnquiryNow />
      </div>
    </div>
  );
};

export default UpdateDetail;
