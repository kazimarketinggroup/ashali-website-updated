"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import heroBg from "../../../assets/about/heroBg.png";
import { brandGradientTextStyle } from "../../../constants/brandGradient";
import { ANALYTICS_EVENTS } from "../../../utils/analytics";
import { Body, CtaRow, PrimaryLink, ProofStrip, SecondaryLink } from "../../Shared/SectionKit";

const credentials = [
  "25+ years in technology",
  "Just Eat UK's first Marketing Director",
  "Business Book of the Year 2021",
  "Co-founder, Uhubs.ai",
  "London • Kuala Lumpur • Global",
];

/** §4 — About hero + credential strip. */
const AboutIntro: React.FC = () => (
  <section className="relative w-full overflow-hidden bg-black px-4 py-16 sm:px-6 md:py-24 lg:px-14">
    {/*
      Stage photograph as the hero background. It is already dark on the left,
      and the two overlays keep the copy legible: a flat scrim for baseline
      contrast, plus a left-to-right gradient so the text column stays dark
      while Ash remains visible on the right.
    */}
    <div className="absolute inset-0" aria-hidden>
      {/*
        `fill` rather than width/height: the parent is absolutely positioned and
        the image must cover it at any viewport, which is what the original
        `h-full w-full object-cover` did. object-position is preserved by the
        same utility class.

        `priority` replaces loading="eager" + fetchPriority="high" — this is the
        LCP element on /about, so it must not be lazy-loaded.

        `sizes="100vw"` tells the responsive srcset that this spans the full
        viewport; without it Next assumes 100vw anyway but warns.
      */}
      <Image
        src={heroBg}
        alt="Ash Ali speaking on stage at a global keynote event"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[72%_center]"
        draggable="false"
      />
      <div className="absolute inset-0 bg-black/70 sm:bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
    </div>

    <div className="relative z-10 mx-auto w-full max-w-fluid">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 sm:text-[11px]">
          About Ash Ali
        </p>

        <h1 className="mt-4 text-fluid-34 font-semibold leading-[1.2] tracking-tight text-white">
          25 years <span style={brandGradientTextStyle}>building what he now speaks about.</span>
        </h1>

        <Body className="mt-6 max-w-[640px]">
          Ash Ali is a British tech entrepreneur, investor, author and international keynote speaker.
          Raised in inner-city Birmingham, he left college twice, taught himself digital skills and
          built a career by seeing opportunities before they became obvious.
        </Body>

        <CtaRow className="mt-8">
          <PrimaryLink to="/speaking">Explore keynotes</PrimaryLink>
          <SecondaryLink to="/workshops" event={ANALYTICS_EVENTS.heroExploreKeynotesWorkshops}>
            Explore workshops
          </SecondaryLink>
        </CtaRow>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="mt-12 rounded-[4px] border border-white/[0.08] bg-[#0c0c0c]/85 p-6 backdrop-blur-sm sm:p-8"
      >
        <ProofStrip items={credentials} />
      </motion.div>
    </div>
  </section>
);

export default AboutIntro;
