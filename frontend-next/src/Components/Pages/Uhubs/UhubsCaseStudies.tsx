"use client";

import React from "react";
import { motion } from "framer-motion";

// Replace with your actual logo imports
import pleoLogo from "../../../assets/uhubs/pleo.png";
import yulifeLogo from "../../../assets/uhubs/u.png";
import smarpLogo from "../../../assets/uhubs/smarp.png";
import pLogo from "../../../assets/uhubs/p.png";
import pulsarLogo from "../../../assets/uhubs/pulsar.png";
import parentPayLogo from "../../../assets/uhubs/parentpay-logo.png";
import jesperAvatar from "../../../assets/uhubs/jasper.png";
import michaelAvatar from "../../../assets/uhubs/kinder.png";

// Partner logos for the grid
import hpLogo from "../../../assets/uhubs/hp.png";
import treatwellLogo from "../../../assets/uhubs/tretwell.png";
import flexportLogo from "../../../assets/uhubs/flexport-logo.png";
import orangeLogo from "../../../assets/uhubs/orange.png";
import eyLogo from "../../../assets/uhubs/ey.png";
import travelopiaLogo from "../../../assets/uhubs/trave.png";
import cheggLogo from "../../../assets/uhubs/chegg.png";
import flyrLogo from "../../../assets/uhubs/flyr.png";

const caseStudies = [
  {
    logo: pleoLogo.src,
    
    desc: "How Uhubs helped Pleo cross $100m ARR and achieve 130% net revenue retention",
  },
  {
    logo: yulifeLogo.src,
    
    desc: "How Uhubs helped Yulife embed and reinforce their sales process to increase win rates by 9%",
  },
  {
    logo: smarpLogo.src,
 
    desc: "How Uhubs helped Smarp increase deal sizes by > 10%",
  },
  {
    logo: pLogo.src,
   
    desc: "How Uhubs reduced ramp time by 50% for one of Europe's fastest growing SaaS companies",
  },
  {
    logo: pulsarLogo.src,
   
    desc: "How Uhubs reduced BDR ramp time by 31% for Pulsar",
  },
  {
    logo: parentPayLogo.src,
 
    desc: "How Uhubs helped ParentPay define their Territory Manager blueprint",
  },
];

const partnerLogos = [
  { src: hpLogo.src, alt: "HP" },
  { src: treatwellLogo.src, alt: "Treatwell" },
  { src: flexportLogo.src, alt: "Flexport" },
  { src: orangeLogo.src, alt: "Orange" },
  { src: eyLogo.src, alt: "EY" },
  { src: travelopiaLogo.src, alt: "Travelopia" },
  { src: cheggLogo.src, alt: "Chegg" },
  { src: flyrLogo.src, alt: "FLYR" },
];

const Card: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`bg-[#1c1c1c] border border-white/[0.07] rounded-2xl p-6 flex flex-col ${className}`}
  >
    {children}
  </motion.div>
);

const UhubsCaseStudies: React.FC = () => {
  return (
    <section className="w-full bg-black text-white py-16 md:py-20 px-6 sm:px-10 lg:px-16">
      <div className="max-w-fluid mx-auto">

        {/* 3-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* ── Row 1 — Case study cards ── */}
          {caseStudies.map((cs, i) => (
            <Card key={i} delay={i * 0.06}>
              {/* Logo area */}
              <div
                className="w-full rounded-xl mb-4 flex items-center justify-start px-3 py-3"
                style={{  minHeight: "64px" }}
              >
                <img src={cs.logo} alt="" className="h-8 w-auto object-contain" />
              </div>

              {/* Description */}
              <p className="text-[13px] text-white/70 leading-[1.75] flex-1">
                {cs.desc}
              </p>

              {/* Read Full Story */}
              <p className="text-[12px] text-white/40 mt-3">
                Read{" "}
                <span className="text-white/70 underline underline-offset-2 cursor-pointer hover:text-white transition">
                  Full Story
                </span>{" "}
                ›
              </p>
            </Card>
          ))}

          {/* ── Row 3 col 1 — Jesper testimonial ── */}
          <Card delay={0.18}>
            <p className="text-[13px] text-white/80 leading-[1.75] flex-1 mb-4">
              Boosted Rep Efficiency, Slashed Onboarding Time, and Retained Our Top Performers!
            </p>
            <div className="flex items-center gap-3 mt-auto">
              <img
                src={jesperAvatar.src}
                alt="Jesper J"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <p className="text-[13px] font-semibold text-white leading-tight">Jesper J</p>
                <p className="text-[11px] text-white/45 mt-0.5">Co-founder & CCO @ PatentRenewal</p>
              </div>
            </div>
          </Card>

          {/* ── Row 3 col 2 — Michael testimonial ── */}
          <Card delay={0.22}>
            <p className="text-[13px] text-white/75 leading-[1.8] flex-1 mb-4">
              "We chose Uhubs because of their unique data-informed approach. Since partnering
              we have achieved a 31% reduction in time to first meeting scheduled for BDRs, and
              an 80% reduction in BDR ramp time variance"
            </p>
            <div className="flex items-center gap-3 mt-auto">
              <img
                src={michaelAvatar.src}
                alt="Michael Kinder"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <p className="text-[13px] font-semibold text-white leading-tight">Michael Kinder</p>
                <p className="text-[11px] text-white/45 mt-0.5">Enablement Manager @ Pulsar Group</p>
              </div>
            </div>
          </Card>

          {/* ── Row 3 col 3 — Partner logos grid ── */}
          <Card delay={0.26}>
            <div className="grid grid-cols-3 gap-3 h-full">
              {partnerLogos.map((logo, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center py-2"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-5 w-auto object-contain opacity-70"
                  />
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
};

export default UhubsCaseStudies;