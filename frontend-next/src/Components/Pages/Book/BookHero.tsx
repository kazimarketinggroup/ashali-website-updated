"use client";

import React from "react";
import Image from "next/image";
import { motion, easeOut } from "framer-motion";

import heroImage from "../../../assets/book/heroImage.png";
import aliAvatar from "../../../assets/book/ali.png";
import derekAvatar from "../../../assets/book/derek.png";

const cardBase =
  "rounded-xl border border-white/10 bg-black/75 backdrop-blur-md shadow-[0_18px_40px_rgba(0,0,0,0.5)]";

const BookHero: React.FC = () => {
  return (
    <>
      {/* ── MOBILE layout (< sm): image + cards stacked normally ── */}
      <section className="block bg-black text-white sm:hidden">
        <div className="relative w-full h-[240px]">
          <Image
            src={heroImage}
            alt="The Unfair Advantage book"
            priority
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-black/40" />
        </div>

        {/* Cards below image on mobile */}
        <div className="mx-auto flex max-w-[520px] flex-col gap-3 px-4 py-5">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
            className={`${cardBase} px-3 py-3`}
          >
            <p className="text-[11px] leading-relaxed text-white/90">
              "A powerful way to think about success as an entrepreneur."
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <img
                src={aliAvatar.src}
                alt="Ali Abdaal"
                className="h-8 w-8 rounded-full border border-white/20 object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-white leading-tight">Ali Abdaal</p>
                <p className="text-[9px] text-white/55 leading-snug mt-0.5">
                  Productivity YouTuber, Podcaster & Ex-Doctor
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
            className={`${cardBase} px-3 py-3`}
          >
            <p className="text-[11px] leading-relaxed text-white/90">
              "Crucial business advice that you won't get anywhere else."
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <img
                src={derekAvatar.src}
                alt="Derek Sivers"
                className="h-8 w-8 rounded-full border border-white/20 object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-white leading-tight">Derek Sivers</p>
                <p className="text-[9px] text-white/55 leading-snug mt-0.5">
                  Entrepreneur & Author of 'Anything You Want'
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TABLET + DESKTOP layout (sm+): capped hero height with overlaid cards ── */}
      <section className="relative hidden min-h-[min(90vh,780px)] w-full overflow-hidden bg-black sm:block">
        <Image
          src={heroImage}
          alt="The Unfair Advantage book"
          priority
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-black/40" />

        {/* Safe area container so cards don't touch the edges on ultra-wide */}
        <div className="absolute inset-0 mx-auto max-w-fluid">
          {/* Left card — top-left */}
          {/* <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: easeOut, delay: 0.2 }}
            className={`${cardBase} absolute
              sm:left-5 sm:top-5 sm:w-[220px] sm:px-3 sm:py-3
              md:left-8 md:top-8 md:w-[250px] md:px-4 md:py-4
              lg:left-10 lg:top-10 lg:w-[275px]
              xl:left-14 xl:top-14 xl:w-[300px]`}
          >
            <p className="text-[11px] md:text-xs lg:text-sm leading-relaxed text-white/90">
              "A powerful way to think about success as an entrepreneur."
            </p>
            <div className="mt-3 flex items-center gap-2.5">
              <img
                src={aliAvatar.src}
                alt="Ali Abdaal"
                className="h-9 w-9 md:h-10 md:w-10 lg:h-11 lg:w-11 rounded-full border border-white/20 object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs md:text-sm font-semibold text-white leading-tight">Ali Abdaal</p>
                <p className="text-[10px] md:text-[11px] text-white/55 leading-snug mt-0.5">
                  Productivity YouTuber,
                  <br />
                  Podcaster & Ex-Doctor
                </p>
              </div>
            </div>
          </motion.div> */}

          {/* Right card — bottom-right */}
          {/* <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: easeOut, delay: 0.3 }}
            className={`${cardBase} absolute
              sm:right-5 sm:bottom-5 sm:w-[220px] sm:px-3 sm:py-3
              md:right-8 md:bottom-8 md:w-[250px] md:px-4 md:py-4
              lg:right-10 lg:bottom-10 lg:w-[275px]
              xl:right-14 xl:bottom-14 xl:w-[300px]`}
          >
            <p className="text-[11px] md:text-xs lg:text-sm leading-relaxed text-white/90">
              "Crucial business advice that you won't get anywhere else."
            </p>
            <div className="mt-3 flex items-center gap-2.5">
              <img
                src={derekAvatar.src}
                alt="Derek Sivers"
                className="h-9 w-9 md:h-10 md:w-10 lg:h-11 lg:w-11 rounded-full border border-white/20 object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs md:text-sm font-semibold text-white leading-tight">Derek Sivers</p>
                <p className="text-[10px] md:text-[11px] text-white/55 leading-snug mt-0.5">
                  Entrepreneur & Author
                  <br />
                  of 'Anything You Want'
                </p>
              </div>
            </div>
          </motion.div> */}
        </div>

      </section>
    </>
  );
};

export default BookHero;
