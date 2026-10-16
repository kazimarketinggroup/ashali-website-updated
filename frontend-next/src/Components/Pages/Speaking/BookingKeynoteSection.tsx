"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { BRAND_ORANGE } from "../../../constants/brandGradient";

const deliveryFormats = [
  "Keynote",
  "Keynote followed by a facilitated workshop",
  "Executive briefing for a board or leadership team",
  "Fireside chat or founder session",
  "Panels, podcasts and media",
];

const typicalDurations = [
  "Keynote: 45–60 minutes",
  "Keynote plus workshop: add a 60–90 minute session",
  "Deeper options: half-day or full-day leadership lab",
];

const BookingKeynoteSection: React.FC = () => {
  return (
    <section className="w-full border-t border-white/10 bg-black py-16 md:py-24 select-text">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10 text-center md:mb-14"
        >
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            Booking a <span style={{ color: BRAND_ORANGE }}>keynote</span>
          </h2>
        </motion.div>

        {/* 3 Information Cards Grid */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Card 1: Delivery formats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            className="flex flex-col rounded-[4px] border border-white/10 bg-[#0d0d0f] p-7 sm:p-8 md:p-9 shadow-lg"
          >
            <h3
              className="mb-6 text-lg font-semibold tracking-wide sm:text-xl"
              style={{ color: BRAND_ORANGE }}
            >
              Delivery formats
            </h3>
            <ul className="space-y-3.5 text-[14.5px] leading-relaxed text-zinc-300 sm:text-[15px]">
              {deliveryFormats.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1 text-xs text-zinc-500">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Card 2: Typical duration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col rounded-[4px] border border-white/10 bg-[#0d0d0f] p-7 sm:p-8 md:p-9 shadow-lg"
          >
            <h3
              className="mb-6 text-lg font-semibold tracking-wide sm:text-xl"
              style={{ color: BRAND_ORANGE }}
            >
              Typical duration
            </h3>
            <ul className="space-y-3.5 text-[14.5px] leading-relaxed text-zinc-300 sm:text-[15px]">
              {typicalDurations.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1 text-xs text-zinc-500">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Card 3: Preparation process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className="flex flex-col rounded-[4px] border border-white/10 bg-[#0d0d0f] p-7 sm:p-8 md:p-9 shadow-lg"
          >
            <h3
              className="mb-6 text-lg font-semibold tracking-wide sm:text-xl"
              style={{ color: BRAND_ORANGE }}
            >
              Preparation process
            </h3>
            <div className="space-y-4 text-[14.5px] leading-relaxed text-zinc-300 sm:text-[15px]">
              <p>
                Every session is adapted to your organisation, audience and the decisions you need to make.
                Preparation can include stakeholder conversations or a short pre-session questionnaire.
              </p>
              <p>
                Share your audience, date and the outcome you want to create. We&apos;ll recommend the most
                suitable format and confirm availability.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Banner: Press and event organisers */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col justify-between gap-5 rounded-[4px] border border-white/10 bg-[#0d0d0f] p-6 shadow-lg sm:px-8 sm:py-6 md:flex-row md:items-center"
        >
          <h4
            className="text-base font-semibold tracking-wide sm:text-[18px]"
            style={{ color: BRAND_ORANGE }}
          >
            Press and event organisers
          </h4>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <a
              href="/press/ash-ali-press-headshots.zip"
              download="ash-ali-press-headshots.zip"
              className="group inline-flex items-center gap-2 text-sm font-medium transition-colors hover:brightness-110 sm:text-[15px]"
              style={{ color: BRAND_ORANGE }}
              title="Download high-resolution press headshots (ZIP)"
            >
              <Download className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5" />
              <span>Headshots (ZIP)</span>
            </a>

            <a
              href="/press/ash-ali-short-bio.txt"
              download="ash-ali-short-bio.txt"
              className="group inline-flex items-center gap-2 text-sm font-medium transition-colors hover:brightness-110 sm:text-[15px]"
              style={{ color: BRAND_ORANGE }}
              title="Download Ash Ali short speaker bio (TXT)"
            >
              <Download className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5" />
              <span>Short bio</span>
            </a>

            <a
              href="/press/ash-ali-long-bio.txt"
              download="ash-ali-long-bio.txt"
              className="group inline-flex items-center gap-2 text-sm font-medium transition-colors hover:brightness-110 sm:text-[15px]"
              style={{ color: BRAND_ORANGE }}
              title="Download Ash Ali comprehensive speaker bio (TXT)"
            >
              <Download className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5" />
              <span>Long bio</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingKeynoteSection;
