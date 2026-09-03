import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, easeOut } from "framer-motion";

import { UPDATE_POSTS, type UpdatePost } from "./updatesData";

function CardMedia({ post }: { post: UpdatePost }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-black">
      <img src={post.cover} alt="" className="aspect-[16/10] w-full object-cover object-center" />

      {post.podcastUi ? (
        <>
          <span className="absolute left-3 top-3 text-[10px] font-medium tracking-wide text-white drop-shadow-md sm:text-xs">
            Talks at Google
          </span>
          <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#e62117] shadow-lg">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" className="ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </>
      ) : null}
    </div>
  );
}

const LatestUpdatesGrid: React.FC = () => {
  const [visible, setVisible] = useState(6);

  const shown = UPDATE_POSTS.slice(0, visible);

  return (
    <section className="bg-black px-4 pb-16 pt-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-fluid">

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {shown.map((post, idx) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: easeOut, delay: idx * 0.03 }}
              className="flex flex-col"
            >
              <Link to={`/updates/${post.slug}`} className="block">
                <CardMedia post={post} />
              </Link>

              <h3 className="mt-5 text-xs font-bold uppercase leading-snug tracking-wide text-white">
                <Link to={`/updates/${post.slug}`} className="hover:opacity-85">
                  {post.title}
                </Link>
              </h3>

              <div className="mt-4 flex items-center text-sm">
                <span className="ml-auto text-white">{post.date}</span>
              </div>

              <p className="mt-3 text-sm font-light leading-relaxed text-white/90">{post.excerpt}</p>
            </motion.article>
          ))}
        </div>

        {visible < UPDATE_POSTS.length ? (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((v) => Math.min(v + 6, UPDATE_POSTS.length))}
              className="rounded-sm border border-white/40 bg-transparent px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Load More
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default LatestUpdatesGrid;