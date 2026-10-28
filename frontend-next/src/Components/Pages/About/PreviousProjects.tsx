"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCMS } from "../../../context/CMSContext";
import { brandGradientTextStyle } from "../../../constants/brandGradient";
import { defaultCmsData } from "../../../data/defaultCmsData";

import logoJustEat from "../../../assets/about/justeat.png";
import logoFare from "../../../assets/about/fare-exchange-logo.png";
import logoWash from "../../../assets/about/washplus-logo.png";

const LOGO_MAP: Record<string, typeof logoJustEat> = {
  "proj-1": logoJustEat,
  "proj-2": logoFare,
  "proj-3": logoWash,
};

export const PreviousProjects: React.FC = () => {
  const { cmsData } = useCMS();
  const rawProjects = cmsData?.previousProjects || defaultCmsData.previousProjects || [];
  const projects = rawProjects.filter((p) => p.published !== false);

  return (
    <section className="w-full bg-black py-16 md:py-24 border-t border-white/[0.06] select-text">
      <div className="mx-auto max-w-fluid px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center mb-3 text-[11px] uppercase tracking-[0.2em] text-gray-400 font-medium"
          >
            <span>Operator Track Record</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-fluid-32 font-semibold tracking-tight text-white leading-tight"
          >
            Previous ventures <span style={brandGradientTextStyle}>&amp; commercial projects.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 text-[14px] sm:text-[15px] leading-[1.8] text-gray-300 font-light"
          >
            Before advising leaders and speaking on global stages, Ash spent 25 years building,
            marketing and scaling high-growth digital businesses from scratch.
          </motion.p>
        </div>

        {/* 3-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj, idx) => {
            const staticLogo = LOGO_MAP[proj.id];

            return (
              <motion.div
                key={proj.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-[8px] bg-[#141414] border border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between hover:border-white/20 transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.4)]"
              >
                <div>
                  {/* Top: Logo & Years */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="h-10 min-w-0 flex items-center">
                      {staticLogo ? (
                        <Image
                          src={staticLogo}
                          alt={proj.name}
                          width={110}
                          height={36}
                          className="h-8 w-auto object-contain object-left filter brightness-105"
                        />
                      ) : (
                        <span className="text-lg font-bold text-white tracking-tight">
                          {proj.name}
                        </span>
                      )}
                    </div>
                    <span className="shrink-0 text-[11px] font-medium tracking-wider text-gray-400 bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded-[2px]">
                      {proj.years}
                    </span>
                  </div>

                  {/* Name (if not using logo alone) & Description */}
                  <h3 className="text-white text-[16px] sm:text-[17px] font-semibold tracking-tight mb-2">
                    {proj.name}
                  </h3>

                  <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-gray-300 font-light mb-6">
                    {proj.description}
                  </p>
                </div>

                {/* Bottom Outcome callout */}
                <div className="border-t border-white/[0.08] pt-4 mt-auto">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d97736] block mb-1">
                    Outcome
                  </span>
                  <p className="text-[13px] sm:text-[13.5px] font-medium text-white/95 leading-snug">
                    {proj.outcome}
                  </p>

                  {proj.url && (
                    <div className="mt-4 pt-2">
                      <Link
                        href={proj.url}
                        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-gray-400 hover:text-white transition-colors group-hover:translate-x-0.5 duration-200"
                      >
                        <span>View case study</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PreviousProjects;
