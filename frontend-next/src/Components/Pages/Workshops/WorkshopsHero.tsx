"use client";

import React from "react";
import { motion } from "framer-motion";

import workshopFacilitation from "../../../assets/workshops/ash-workshop-session.jpg";
import { brandGradientTextStyle } from "../../../constants/brandGradient";
import { ANALYTICS_EVENTS } from "../../../utils/analytics";
import { Body, CtaRow, PrimaryLink, SecondaryLink } from "../../Shared/SectionKit";

/** §3 — Workshops hero. */
const WorkshopsHero: React.FC = () => (
  <section className="w-full bg-black px-4 py-16 sm:px-6 md:py-20 lg:px-14">
    <div className="mx-auto w-full max-w-fluid">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        
        {/* Left Column: Text & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 max-w-3xl"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 sm:text-[11px]">
            Executive workshops and leadership labs
          </p>

          <h1 className="mt-4 text-fluid-34 font-semibold leading-[1.2] tracking-tight text-white">
            Turn the AI conversation into <span style={brandGradientTextStyle}>decisions.</span>
          </h1>

          <Body className="mt-6 max-w-[640px]">
            Ash works with leadership teams to identify where AI creates real leverage, which human
            capabilities matter most and what the organisation should prioritise next. Every session
            is tailored around the audience, the business context and a tangible output—not a generic
            tour of AI tools.
          </Body>

          <CtaRow className="mt-8">
            <PrimaryLink to="/contact" event={ANALYTICS_EVENTS.workshopEnquiryClick}>
              Discuss a workshop
            </PrimaryLink>
            <SecondaryLink to="#workshops">Explore the workshops</SecondaryLink>
          </CtaRow>
        </motion.div>

        {/* Right Column: Real facilitation photography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="lg:col-span-5 w-full"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl max-h-[380px]">
            <img
              src={workshopFacilitation.src}
              alt="Ash facilitating an executive AI workshop session"
              className="h-full w-full object-cover object-center aspect-[16/10] lg:aspect-[4/3]"
              loading="eager"
            />
          </div>
        </motion.div>

      </div>
    </div>
  </section>
);

export default WorkshopsHero;