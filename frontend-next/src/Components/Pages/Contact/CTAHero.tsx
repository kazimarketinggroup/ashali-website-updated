"use client";

import React from "react";
import { motion } from "framer-motion";
import { brandGradientTextStyle } from "../../../constants/brandGradient";

const CTAHero: React.FC = () => {
  // Cascading reveal variants for a premium layout entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  // const elementVariants = {
  //   hidden: { opacity: 0, y: 15 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: { duration: 0.75, ease: [0.25, 1, 0.5, 1] }
  //   }
  // };

  return (
    <section className="flex min-h-[60svh] w-full items-center justify-center bg-black px-6 py-16 md:py-20 md:min-h-[70svh] text-center select-none">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="w-full max-w-4xl flex flex-col items-center select-text"
      >
        
        {/* 1. Minimalist Top Accent Eyebrow */}
        <motion.div 
          // variants={elementVariants}
          className="flex items-center mb-3 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-400 uppercase"
        >
          <span>Work with Ash</span>
        </motion.div>

        {/* 2. Precise Multi-Tone Brand Headline Split */}
        {/*
          h1, not h2: /contact previously had no h1 and started at h2. This is
          the page's top-level heading. Classes are unchanged, so the rendering
          is identical — the change is purely semantic.
        */}
        <motion.h1
          // variants={elementVariants}
          className="text-white text-fluid-36 font-normal leading-[1.35] tracking-tight max-w-2xl mb-8 font-sans"
        >
          <span style={brandGradientTextStyle}>Tell Us What You Have In Mind,</span>{" "}

          <br />
          We'll Route It To The Right <br />
          <span >Conversation.</span>
        </motion.h1>

        {/* 3. Narrative Service Router Copy Block */}
        <motion.p 
          // variants={elementVariants}
          className="text-gray-400 font-light text-[13px] sm:text-[14px] leading-relaxed tracking-wide max-w-xl antialiased"
        >
          For Speaking, Advisory, Media, Malaysia & Southeast Asia{" "}
          <br className="hidden sm:block" />
          Opportunities, Or Selected Pro-Bono Impact Work,
        </motion.p>

      </motion.div>
    </section>
  );
};

export default CTAHero;