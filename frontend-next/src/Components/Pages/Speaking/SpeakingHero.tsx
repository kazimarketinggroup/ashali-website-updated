"use client";

import React from "react";
import { motion, easeOut } from "framer-motion";

import aboutPortrait from "../../../assets/speaking/aboutImage.png";
import { brandGradientTextStyle } from "../../../constants/brandGradient";

import GradientBorderLink from "./GradientBorderLink";

const SpeakingHero: React.FC = () => (
  <div className="mx-auto grid max-w-fluid grid-cols-1 items-center gap-6 px-5 py-6 lg:grid-cols-2 lg:gap-8 lg:py-10">
    
    {/* IMAGE */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: easeOut }}
      className="relative flex justify-center lg:justify-start"
    >
      <div
        className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[320px]"
        style={{
          maskImage:
            "radial-gradient(ellipse 85% 75% at 50% 45%, black 35%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 75% at 50% 45%, black 35%, transparent 72%)",
        }}
      >
        <img
          src={aboutPortrait.src}
          alt="Ash Ali, keynote speaker and entrepreneur"
          className="block w-full object-cover object-top"
        />
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black to-transparent" />
    </motion.div>

    {/* TEXT */}
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: easeOut }}
      className="text-left"
    >
      <h1 className="text-lg font-semibold leading-snug sm:text-xl md:text-2xl lg:text-[1.65rem]" style={brandGradientTextStyle}>
        Joke Of The Family To Tech Millionaire And Serial Entrepreneur
      </h1>

      <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/85">
        Ash Ali is an award-winning entrepreneur, author, and keynote speaker
        with over 20 years of experience in B2B sales, marketing, and go-to-market
        strategies.
      </p>

      <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/85">
        He is the co-author of The Unfair Advantage, a guide to leveraging
        unique strengths for success in business and life.
      </p>

      <div className="mt-4">
        {/*
          Was `to="/unlock"` — a route that never existed, so this CTA fell
          through to the catch-all. Retargeted to /contact, matching every other
          GradientBorderLink on this page.
        */}
        <GradientBorderLink to="/contact">
          Unlock Greatness
        </GradientBorderLink>
      </div>
    </motion.div>
  </div>
);

export default SpeakingHero;