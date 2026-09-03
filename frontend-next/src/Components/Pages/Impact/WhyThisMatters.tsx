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
        //   variants={elementVariants}
          className="flex items-center mb-3 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-500 uppercase font-sans"
        >
          <span>Why This Matters</span>
        </motion.div>

        {/* ================= 2. PRECISE MULTI-TONE BRAND HEADLINE SPLIT ================= */}
        <motion.h2 
        //   variants={elementVariants}
          className="text-white text-fluid-30  leading-[1.35] tracking-tight max-w-4xl mb-8 font-sans"
        >
          <span style={brandGradientTextStyle}>From Inner-City Birmingham To Startups,</span>
          <br />
          <span className="text-white">
            Technology, Authorship And Global Work Talent Is Everywhere, But Access, Confidence And Context Are Not.
          </span>
        </motion.h2>

        {/* ================= 3. NARRATIVE EXPLANATORY BODY COPY ================= */}
        <motion.p 
        //   variants={elementVariants}
          className="text-gray-400 font-light text-[13.5px] sm:text-[14.5px] leading-[1.75] tracking-wide max-w-3xl antialiased"
        >
          Ash's Own Story Is Proof That Potential Isn't The Problem. This Work Is About Helping Young People 
          <br className="hidden md:block" />
          See The Advantages They Already Hold And Believe They're Allowed To Use Them.
        </motion.p>

      </motion.div>
    </section>
  );
};

export default WhyThisMatters;