"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from "next/link";
import { Award, Globe, GraduationCap, LayoutGrid } from 'lucide-react';

// Assets
import bgBooks from "../../../assets/home/books-bg.png";
import allCovers from "../../../assets/home/updatedImage.png";

const tags = [
  { icon: Award,         label: "Business Book of the Year 2021, The Business Book Awards" },
  { icon: Globe,         label: "Translated worldwide" },
  { icon: Award,         label: "150,000+ copies sold" },
  { icon: GraduationCap, label: "Used in MBA & university courses" },
  { icon: LayoutGrid,    label: "The MILES framework" },
];

/*
  `as` controls the heading level of the headline below.

  This section renders on BOTH / and /unfair-advantage. The homepage already
  has its own h1 (the hero), so this must stay an h2 there — two h1s on one
  page is exactly the ambiguity the audit was looking for. On
  /unfair-advantage there is no other candidate (BookHero is images only), so
  that page passes `as="h1"` and gains the top-level heading it was missing.

  Default is the safe option: callers that say nothing keep the old h2.
*/
const BookShowcase: React.FC<{ as?: "h1" | "h2" }> = ({ as = "h2" }) => {
  const Heading = as;

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center px-4 py-16 sm:px-6 md:py-20 md:px-24"
      style={{ backgroundImage: `url(${bgBooks.src})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/90" />

      <div className="relative z-10 mx-auto flex max-w-fluid flex-col items-center gap-12 lg:flex-row lg:gap-16">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full lg:w-1/2"
        >
          {/* Eyebrow */}
          <div className="flex items-center mb-3 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-400 uppercase">
            <span>The Unfair Advantage</span>
          </div>

          {/* Headline */}
          <Heading className="text-fluid-30 font-semibold tracking-tight text-white leading-[1.2]">
            <span className="bg-gradient-to-r from-[#2dd4bf] to-[#0e9aa8] bg-clip-text text-transparent">
              The award winning book
            </span>{" "}
            challenging the myth that success is only about hard work.
          </Heading>

          {/* Body */}
          <p className="mt-6 max-w-[560px] text-[13px] leading-[1.9] text-white/75 sm:text-sm">
            Success is shaped by context, timing, access, skills, mindset, networks and knowing how to
            use what you already have. The book has become core IP behind Ash's talks, frameworks and
            global work.
          </p>

          {/* Tags */}
          <div className="mt-8 flex flex-col items-start gap-3 max-w-[540px]">
            {tags.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/[0.05] border border-white/10 text-white/85 text-[12px] rounded-[2px]"
              >
                <Icon size={15} strokeWidth={1.8} className="shrink-0 text-white/80" />
                {label}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href={as === "h1" ? "#retailers" : "/unfair-advantage"}
              className="px-5 py-2.5 bg-white text-black font-semibold text-[12px] rounded-[2px] transition-colors duration-150 hover:bg-gray-100 shadow-md text-center"
            >
              {as === "h1" ? "Get your copy" : "Explore the book"}
            </Link>
            <a
            target="_blank"
              href="https://www.theunfairacademy.com/"
              className="px-5 py-2.5 bg-transparent border border-white/20 text-white font-medium text-[12px] rounded-[2px] transition-all duration-150 hover:border-white/60 hover:bg-white/5 text-center"
            >
              The Unfair Academy
            </a>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex w-full justify-center lg:w-1/2"
        >
          <div className="relative flex flex-col items-center">
            <img
              src={allCovers.src}
              alt="International editions of The Unfair Advantage"
              className="w-full max-w-[500px] object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)] transition-transform duration-500 hover:scale-[1.02]"
            />

            {/* Caption below the book covers */}
            <p className="mt-6 max-w-[440px] text-center text-[15px] italic leading-snug text-white/85">
              The Unfair Advantage has now been translated
              <br className="hidden sm:block" />
              into 8 languages worldwide
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default BookShowcase;