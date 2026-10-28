"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import ashSeaImg from "../../../assets/malaysia/ash-southeast-asia-hero.png";

const topics = [
  {
    title: "The Unfair Advantage for Malaysia's Next Generation",
    desc: "Helping young talent see and use the advantages they already hold.",
  },
  {
    title: "AI, Human Potential and the Future of Work in SEA",
    desc: "What AI means for the region's careers, companies and competitiveness.",
  },
  {
    title: "Building Global Companies from Regional Advantage",
    desc: "How SEA founders build world-class companies without leaving home.",
  },
  {
    title: "Social Mobility and Reinvention",
    desc: "Turning background and circumstance into momentum.",
  },
];

const RegionalFocusSection: React.FC = () => {
  return (
    <section className="bg-black text-white py-16 md:py-24 select-none">
      <div className="mx-auto w-full max-w-fluid px-4 sm:px-6 lg:px-8">

        {/* ================= TOP: IMAGE + REGIONAL TOPICS ================= */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">

          {/* Left image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden rounded-lg"
          >
            <Image
              src={ashSeaImg}
              alt="Ash Ali holding The Unfair Advantage in Southeast Asia"
              width={600}
              height={450}
              sizes="(max-width: 1024px) 100vw, 600px"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
              draggable="false"
            />
          </motion.div>

          {/* Right content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.05 }}
          >
            {/* Eyebrow */}
            <div className="mb-3 flex items-center text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] text-gray-400">
              <span>Regional topics</span>
            </div>

            {/* Heading */}
            <h2 className="mb-8 text-fluid-34 font-normal tracking-tight text-white">
              Talks tuned to the region.
            </h2>

            {/* Topics list */}
            <div className="flex flex-col gap-6">
              {topics.map((t) => (
                <div key={t.title}>
                  <h3 className="text-[16px] sm:text-[17px] font-semibold text-white">
                    {t.title}
                  </h3>
                  <p className="mt-1 text-[13.5px] sm:text-[14.5px] font-light leading-relaxed text-gray-300">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* ================= BOTTOM: CENTERED QUOTE ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="mt-20 flex flex-col items-center text-center"
        >
          {/* Eyebrow */}
          <div className="mb-3 flex items-center text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] text-gray-400">
            <span>Regional perspective</span>
          </div>

          {/* Quote */}
          <p className="max-w-4xl text-fluid-26 sm:text-fluid-28 text-white/90 font-normal leading-relaxed">
            &ldquo;Southeast Asia is at a pivotal inflection point. The combination of hungry talent, rapid AI adoption and cross-border ambition means the{" "}
            <span className="bg-gradient-to-r from-[#008080] to-[#FF781D] bg-clip-text text-transparent font-medium">
              next generation of global market leaders
            </span>{" "}
            will be built right here.&rdquo;
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default RegionalFocusSection;