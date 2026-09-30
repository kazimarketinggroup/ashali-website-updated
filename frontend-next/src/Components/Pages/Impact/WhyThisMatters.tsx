"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { brandGradientTextStyle } from '../../../constants/brandGradient';

export const WhyThisMatters: React.FC = () => {
  // Cascading animation stagger targets for smooth element presentation on scroll
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

//   const elementVariants = {
//     hidden: { opacity: 0, y: 15 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.75, ease: [0.25, 1, 0.5, 1] }
//     }
//   };

  return (
    <section className="w-full bg-black py-16 md:py-20 px-6 sm:px-12 flex flex-col items-center justify-center text-center select-none">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-5xl flex flex-col items-center select-text"
      >
        
        {/* ================= 1. MINIMALIST ACCENT EYEBROW ================= */}
        <motion.div 
          className="flex items-center mb-3 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-500 uppercase font-sans"
        >
          <span>Why this matters</span>
        </motion.div>

        {/* ================= 2. PRECISE MULTI-TONE BRAND HEADLINE SPLIT ================= */}
        <motion.h2 
          className="text-white text-fluid-30 leading-[1.35] tracking-tight max-w-4xl mb-4 font-sans"
        >
          <span style={brandGradientTextStyle}>Talent is everywhere.</span>{" "}
          <span className="text-white">Access, confidence and context are not.</span>
        </motion.h2>

        {/* Supporting Line: Journey from inner-city Birmingham */}
        <motion.p
          className="text-white/80 font-normal text-[15px] sm:text-[16px] leading-relaxed tracking-wide max-w-3xl mb-6 antialiased"
        >
          From inner-city Birmingham to startups, technology, authorship and global work.
        </motion.p>

        {/* ================= 3. NARRATIVE EXPLANATORY BODY COPY ================= */}
        <motion.p 
          className="text-gray-400 font-light text-[13.5px] sm:text-[14.5px] leading-[1.75] tracking-wide max-w-3xl antialiased"
        >
          Ash's own story is proof that potential isn't the problem. This work is about helping young people 
          <br className="hidden md:block" />
          see the advantages they already hold and believe they're allowed to use them.
        </motion.p>

      </motion.div>
    </section>
  );
};

export default WhyThisMatters;