"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

// import introBg from "../../../assets/about/intro-story.png";
/*
  Candid portrait, replacing portrait-ash.png. The previous image was a
  background cut-out with visible halo artefacts around the hair and shoulders;
  this is an unedited photograph, and its reflective tone suits the personal
  register of this section better than a formal headshot.
*/
import portrait from "../../../assets/about/ash-portrait-thinking.jpeg";

import { BRAND_GRADIENT_LR, brandGradientTextStyle } from "../../../constants/brandGradient";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const gradientRuleStyle = {
  height: "1px",
  background: BRAND_GRADIENT_LR,
  opacity: 0.85,
} as const;

const blocks = [
  {
    title: "Bestselling Author",
    body:
      "Bestselling author of 'The Unfair Advantage', winner of Business Book of the Year 2021, The Business Book Awards and the 2021 Best Startup / Scale Up Book Award. The book helps entrepreneurs unlock their unique strengths to succeed in business.",
  },
  {
    title: "Co-Founder of Uhubs",
    body:
      "Uhubs has been recognised as a pioneering sales performance platform: revenue leaders assess, benchmark, and elevate sales teams with data-driven insights and real-time performance tracking, trusted by ambitious organisations globally.",
  },
  {
    title: "Global Keynote Speaker",
    body:
      "Ash speaks internationally across the UK, USA, UAE, Southeast Asia, and China, covering entrepreneurship, startup growth, unfair advantages, and what it takes to scale in the digital age.",
  },
];

const AboutStory: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url(${introBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
        aria-hidden
      /> */}

      <div className="relative mx-auto max-w-fluid px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* Intro grid */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="flex flex-col text-3xl font-bold leading-none tracking-tight"
          >
            <motion.span variants={fadeUp} style={brandGradientTextStyle}>
              Entrepreneur · Author · Innovator
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="max-w-xl text-sm leading-relaxed text-white/95 sm:text-base"
          >
            Ash Ali is an entrepreneur, investor, speaker, and author. As Just Eat&apos;s first marketing director, he
            helped drive its £1.5 billion IPO. He co-authored the bestseller{" "}
            <span className="text-white">&apos;The Unfair Advantage&apos;</span> and leads Uhubs, a pioneering sales
            performance platform.
          </motion.p>
        </div>

        {/* Profile + pillars */}
        <div className="mt-10 grid gap-8 border-t border-white/10 pt-10 lg:mt-14 lg:grid-cols-2 lg:gap-12 lg:pt-14">

          {/* Portrait — capped smaller */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
            className="relative mx-auto w-full max-w-[280px] lg:mx-0 lg:max-w-[320px]"
          >
            <div className="relative overflow-hidden rounded-2xl">
              {/*
                `object-top` because the frame (roughly 320x404) is shorter than
                the source photograph (1266x1600), so object-cover has to crop.
                Anchoring to the top keeps the face fully in frame; the default
                centre crop cut across the top of his head.
              */}
              <img
                src={portrait.src}
                alt="Ash Ali, entrepreneur and keynote speaker"
                className="block w-full object-cover object-top"
              />
              {/* <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black"
                aria-hidden
              /> */}
            </div>
          </motion.div>

          {/* Pillars */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="flex flex-col gap-7"
          >
            {blocks.map((b) => (
              <motion.article key={b.title} variants={fadeUp}>
                <h3
                  className="text-base font-semibold capitalize sm:text-lg"
                  style={{
                    background: BRAND_GRADIENT_LR,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {b.title}
                </h3>
                <div className="my-3 w-full max-w-md" style={gradientRuleStyle} />
                <p className="text-xs leading-relaxed text-white/90 sm:text-sm">{b.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;