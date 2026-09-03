"use client";

import React from 'react';
import { motion } from 'framer-motion';
// import type { Variants } from 'framer-motion';

/* ── Helper: YouTube video ID extractor ── */
const getYouTubeId = (url: string): string => {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : '';
};

/* ── Reusable YouTube embed ── */
interface YouTubeEmbedProps {
  url: string;
  className?: string;
  title?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ url, className = '', title = 'YouTube video' }) => {
  const id = getYouTubeId(url);
  if (!id) return null;

  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-black ${className}`}
         style={{ paddingBottom: '56.25%' /* 16:9 */ }}>
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};

/* ── Main Section ── */
export const SpeakerMediaSection: React.FC = () => {
 

  return (
    <section className="w-full bg-black py-16 md:py-20 px-6 sm:px-12 text-white font-sans select-text">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-20 sm:gap-28">

        {/* ═══════════════════════════════════════════════
            UPPER SECTION — Book & Promote
        ═══════════════════════════════════════════════ */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start"> */}

          {/* Left: YouTube embed */}
          {/* <YouTubeEmbed
            url="https://www.youtube.com/watch?v=OzrKO5IhJiE"
            title="Ash Ali speaker showreel"
          /> */}

          {/* Right: Text content */}
          {/* <motion.div
            className="flex flex-col items-start pt-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2
              className="text-white text-fluid-22 font-semibold leading-tight tracking-tight mb-1"
              variants={elementVariants}
            >
              Everything You Need To
            </motion.h2>

            <motion.h3
              className="text-fluid-22 font-semibold leading-tight tracking-tight mb-5"
              variants={elementVariants}
            >
              <span className="text-[#d97736]">Book</span>{' '}
              <span className="text-white">And</span>{' '}
              <span className="text-[#14b8a6]">Promote</span>
            </motion.h3>

            <motion.p
              className="text-white/80 font-light text-[13px] sm:text-[14px] leading-relaxed tracking-wide mb-6 max-w-md"
              variants={elementVariants}
            >
              Ready-to-use assets so your team can brief, plan and promote without chasing.
            </motion.p>

            <motion.ul
              className="space-y-2 mb-8 text-white/90 font-light text-[13px] sm:text-[14px] tracking-wide"
              variants={elementVariants}
            >
              {assetList.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-3 text-white/40 select-none">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>

            <motion.button
              type="button"
              variants={elementVariants}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 bg-transparent border border-white text-white font-medium text-[12px] uppercase tracking-wider rounded-[2px] transition-colors duration-150"
            >
              Download speaker pack
            </motion.button>
          </motion.div> */}

        {/* </div> */}

        {/* ═══════════════════════════════════════════════
            LOWER SECTION — Podcasts, Panels & Media
        ═══════════════════════════════════════════════ */}
        <div className="w-full flex flex-col items-center">

          <div className="text-center max-w-3xl mb-10 sm:mb-14 flex flex-col items-center">
            <h2 className="text-fluid-22 font-medium tracking-normal mb-4">
              <span className="text-[#14b8a6]">Podcasts</span>
              <span className="text-white">, Panels </span>
              <span className="text-[#d97736]">&amp; Media</span>
            </h2>
            <p className="text-white/70 font-light text-[13px] sm:text-[14px] leading-[1.8] tracking-wide max-w-xl antialiased">
              Ash is a regular podcast and panel guest on advantage, AI and the human side of
              building things—bringing sharp founder insight and honest, practical stories.
            </p>
          </div>

          {/* Video grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-5xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            <YouTubeEmbed
              url="https://www.youtube.com/watch?v=Nqsqj0LaP78&t=2s"
              title="Ash Ali podcast appearance 1"
            />
            <YouTubeEmbed
              url="https://www.youtube.com/watch?v=Ap8YiydvQ1g"
              title="Ash Ali podcast appearance 2"
            />
            <YouTubeEmbed
              url="https://www.youtube.com/watch?v=rMB2lFUMXpY"
              title="Ash Ali podcast appearance 3"
            />
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default SpeakerMediaSection;