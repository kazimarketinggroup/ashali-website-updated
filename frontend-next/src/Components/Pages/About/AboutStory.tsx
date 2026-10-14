"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import portrait from "../../../assets/about/ash-tech-nation-winner.png";

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
      "Bestselling author of 'The Unfair Advantage', won the UK Business Book of the Year Award and the 2021 Best Startup/Scale Up Book Award. His book helps entrepreneurs unlock their unique strengths to succeed in business.",
  },
  {
    title: "Co-Founder Of Uhubs",
    body:
      "Ash co-founded Uhubs to measure what actually drives sales performance as AI changes the work. Its capability data powers the Global Sales Capability Index, the research behind his keynotes and workshops.",
  },
  {
    title: "Global Keynote Speaker",
    body:
      "Ash speaks to leadership teams, revenue leaders and AI events across the UK, Southeast Asia and beyond, on what AI changes, what stays human and where lasting advantage now comes from.",
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

      <div className="relative mx-auto max-w-fluid px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        {/* Intro grid */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="flex flex-col text-fluid-34 font-bold leading-tight tracking-tight"
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
            className="max-w-xl text-[14px] leading-relaxed text-white/90 sm:text-[15px]"
          >
            Ash Ali is an entrepreneur, investor, speaker, and author. As Just Eat&apos;s first marketing director, he
            helped drive its £1.5 billion IPO. He co-authored the bestseller{" "}
            <span className="text-white">&apos;The Unfair Advantage&apos;</span> and leads Uhubs, a pioneering sales
            performance platform.
          </motion.p>
        </div>

        {/* Profile + pillars */}
        <div className="mt-10 grid gap-8 border-t border-white/10 pt-10 lg:mt-14 lg:grid-cols-2 lg:gap-12 lg:pt-14">

          {/* Stage Photo — London Tech Week Grand Final Winner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
            className="relative mx-auto w-full max-w-[340px] lg:mx-0 lg:max-w-[400px]"
          >
            <div className="relative overflow-hidden rounded-xl border border-white/[0.08] shadow-2xl">
              <img
                src={portrait.src}
                alt="Ash Ali at London Tech Week, Tech Nation Grand Final Winner"
                className="block w-full h-auto object-cover"
              />
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
                <p className="text-[13.5px] leading-relaxed text-white/80 sm:text-[14.5px]">{b.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;