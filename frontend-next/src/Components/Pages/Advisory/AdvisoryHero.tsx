"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { motion } from 'framer-motion';

import ashAliImage from '../../../assets/advisory/ashImage.png';
import Link from "next/link";

export const AdvisoryHero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const elementVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
    },
  };

  return (
    <section className="relative w-full min-h-[min(100vh,800px)] bg-[#0d0d0d] overflow-hidden">
      <div className="relative w-full max-w-fluid mx-auto min-h-[min(100vh,800px)] flex items-center">

        {/* ── Person image — left column ── */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-full md:w-[48%] lg:w-[44%] pointer-events-none flex items-end"
        >
          <img
            src={ashAliImage.src}
            alt="Ash Ali"
            className="
              absolute bottom-0 left-0
              h-[72%] sm:h-[78%] md:h-[82%] lg:h-[85%]
              w-auto max-w-none
              object-contain object-bottom
            "
            draggable="false"
          />

          {/* Right fade — blends image into background */}
          <div className="absolute inset-y-0 right-0 w-[0%] bg-gradient-to-r from-transparent to-[#0d0d0d] z-10" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 w-full h-[18%] bg-gradient-to-t from-[#0d0d0d] to-transparent z-10" />
          {/* Mobile overlay so text stays readable */}
          <div className="absolute inset-0 bg-[#0d0d0d]/65 md:hidden z-20" />
        </div>

        {/* ── Text content — right column ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="
            relative z-30 w-full flex flex-col justify-center
            px-6 py-12
            sm:px-10 sm:py-14
            md:ml-auto md:w-[56%] md:pl-8 md:pr-12 md:py-16
            lg:w-[54%] lg:pl-10 lg:pr-16 xl:pr-20
          "
        >
          {/* Eyebrow */}
          <motion.div variants={elementVariants} className="flex items-center gap-2 mb-4">
            <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 font-medium">
              Selective strategic advisory
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={elementVariants}
            className="
              text-white font-normal leading-[1.3] tracking-tight mb-5
              text-fluid-32
            "
          >
            <span className="text-[#3ecfb2]">A trusted operator's  </span>
            <span className="text-white">
              perspective on consequential decisions.
            </span>
          </motion.h1>

          {/* Body */}
          <motion.p
            variants={elementVariants}
            className="
              text-[#9ca3af] font-light leading-[1.75] tracking-wide antialiased mb-8
              text-[12px] sm:text-[13px] max-w-[440px]
            "
          >
            Advising high-growth tech founders, CEOs and executives across the UK, Europe, MENA and Southeast Asia. Ash advises a small number of leadership teams navigating growth, positioning, AI-driven change and the decisions that are difficult to make from inside the business.
          </motion.p>

          {/* CTA */}
          <motion.div variants={elementVariants}>
            <Link href="/contact" className="inline-block">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02, backgroundColor: '#f3f4f6' }}
                whileTap={{ scale: 0.98 }}
                className="
                  px-5 py-2.5 bg-white text-black
                  font-semibold text-[12px] tracking-wide
                  rounded-[2px] shadow-lg transition-colors duration-150
                "
              >
                Discuss advisory
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default AdvisoryHero;