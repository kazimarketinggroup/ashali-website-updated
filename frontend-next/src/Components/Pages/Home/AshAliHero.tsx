"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import ashAliImg from "../../../assets/home/updatedHeroImage.png";

import { brandGradientTextStyle } from "../../../constants/brandGradient";

const AshAliHero: React.FC = () => {
  return (
    <section className="overflow-hidden bg-[#101010] text-white select-none">

      {/* ── fluid wrapper — content fills large screens, capped for readability ── */}
      <div className="mx-auto w-full max-w-fluid px-4 sm:px-6 lg:px-8">

        {/* =================================================
            HERO — content-driven height (no vh units), so it
            renders identically on every monitor size
        ================================================= */}
        <div className="grid grid-cols-1 pt-4 pb-10 lg:pb-16 lg:pt-10 lg:grid-cols-12 lg:gap-10 xl:gap-12">

          {/* IMAGE — left, fixed design height on lg+ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1] }}
            className="
              flex items-end justify-center overflow-hidden
              h-[55vw] min-h-[240px] max-h-[420px]
              lg:h-[520px] lg:max-h-none lg:min-h-0
              xl:h-[560px]
              lg:col-span-5
            "
          >
            <img
              src={ashAliImg.src}
              alt="Ash Ali pointing up and presenting"
              className="
                object-contain object-bottom filter brightness-105
                h-full w-auto max-w-[72%]
                sm:max-w-[60%]
                lg:max-w-full lg:h-full
              "
              draggable="false"
            />
          </motion.div>

          {/* COPY — right, vertically centered against the image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1], delay: 0.05 }}
            className="
              flex flex-col justify-center items-start text-left
              py-10
              lg:col-span-7 lg:py-0 lg:pl-4 lg:self-center
            "
          >
            {/* Eyebrow */}
            <div className="flex items-center mb-3 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-400 uppercase">
              {/*
 */}
              <span>International keynote speaker • Founder • Operator • Author</span>
            </div>

            {/* Headline */}
            <h1 className="
              font-semibold leading-[1.2] tracking-tight text-white mb-5
              text-fluid-34
            ">
              Find Your <span style={brandGradientTextStyle}>Unfair Advantage</span>
              <br />
              In An AI-Shaped World.
            </h1>

            {/* Body */}
            <p className="
              text-gray-400 font-light leading-[1.65] tracking-wide antialiased mb-8
              text-[13px] sm:text-[14px] lg:text-[15px] max-w-[540px]
            ">
            Ash Ali helps leaders and organisations turn AI disruption into sharper strategy, stronger human capability and practical competitive advantage. He brings 25+ years of experience building technology businesses, including serving as Just Eat UK's first Marketing Director, co-authoring The Unfair Advantage and co-founding Uhubs.ai.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 w-full">
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-white text-black font-semibold text-[12px] rounded-[2px] transition-colors duration-150 hover:bg-gray-100 shadow-md"
              >
                Work with Ash
              </Link>

              {[
                { to: "/speaking",     label: "Keynotes" },
                { to: "/advisory",     label: "Advisory" },
                { to: "/workshops", label: "Workshops" },
              ].map((btn) => (
                <Link
                  key={btn.label}
                  href={btn.to}
                  className="px-5 py-2.5 bg-transparent border border-white/20 text-white font-medium text-[12px] rounded-[2px] transition-all duration-150 hover:border-white/60 hover:bg-white/5"
                >
                  {btn.label}
                </Link>
              ))}
            </div>
            <p className="text-xs mt-4 text-gray-400">Based between London and Kuala Lumpur. Available globally for keynotes, leadership offsites and executive workshops.</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AshAliHero;
