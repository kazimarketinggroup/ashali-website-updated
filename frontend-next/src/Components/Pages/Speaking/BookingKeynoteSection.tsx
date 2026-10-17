"use client";

import React from "react";
import { motion } from "framer-motion";
import { BRAND_ORANGE } from "../../../constants/brandGradient";
import { PrimaryLink } from "../../Shared/SectionKit";
import { ANALYTICS_EVENTS } from "../../../utils/analytics";

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
        {/* Section Heading & Enquire CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mb-12"
        >
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            Booking a <span style={{ color: BRAND_ORANGE }}>keynote</span>
          </h2>

          <div>
            <PrimaryLink
              to="/contact"
              event={ANALYTICS_EVENTS.keynoteEnquiryClick}
            >
              Enquire about a keynote
            </PrimaryLink>
          </div>
        </motion.div>

        {/* 3 Information Cards Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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

        {/* Note: 3-item press download banner hidden for now per request */}
      </div>
    </section>
  );
};

export default BookingKeynoteSection;
