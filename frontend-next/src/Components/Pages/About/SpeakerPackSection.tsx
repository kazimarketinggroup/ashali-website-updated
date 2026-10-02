"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { motion } from 'framer-motion';
import { brandGradientTextStyle } from '../../../constants/brandGradient';

import tedxImage from '../../../assets/about/tedxImage.png';

import YouTubeFacade from '../../Shared/YouTubeFacade';

/* ── Main section ── */
export const SpeakerPackSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const elementVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  const assetList = [
    'Short bio',
    'Long bio',
    'High-resolution headshots',
    'Speaker one-pager',
    'Talk topics overview',
    'Book cover assets',
    'Showreel and selected clips',
  ];

  return (
    <section className="w-full bg-black py-16 md:py-20 px-6 sm:px-12 text-white font-sans select-text">
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">

        {/* LEFT: video embed */}
        <div className="md:col-span-6 w-full">
          <YouTubeFacade
            url="https://www.youtube.com/watch?v=rMB2lFUMXpY"
            posterImage={tedxImage}
            title="Ash Ali TEDx Talk"
            aspectRatio="16/9"
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* RIGHT: copy & actions */}
        <motion.div
          className="md:col-span-6 flex flex-col items-start pl-0 md:pl-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            className="text-white text-fluid-24 font-semibold leading-tight tracking-tight mb-2"
            variants={elementVariants}
          >
            Everything You Need To
          </motion.h2>

          <motion.h3
            className="text-fluid-24 font-semibold leading-tight tracking-tight mb-6"
            variants={elementVariants}
          >
            <span style={brandGradientTextStyle}>Book And Promote</span>
          </motion.h3>

          <motion.p
            className="text-[#a1a1aa] font-light text-[13px] sm:text-[14px] leading-relaxed tracking-wide mb-6 max-w-md"
            variants={elementVariants}
          >
            Ready-to-use assets so your team can brief, plan and promote without chasing.
          </motion.p>

          <motion.ul
            className="space-y-2 mb-8 text-[#a1a1aa] font-light text-[13px] sm:text-[14px] tracking-wide"
            variants={elementVariants}
          >
            {assetList.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-3 text-white/40 select-none">•</span>
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>

          <motion.button
            type="button"
            variants={elementVariants}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.03)' }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2.5 bg-transparent border border-white text-white font-medium text-[12px] uppercase tracking-wider rounded-[2px] transition-colors duration-150 font-sans shadow-md"
          >
            Download speaker pack
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default SpeakerPackSection;