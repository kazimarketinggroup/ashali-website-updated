"use client";

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { brandGradientTextStyle } from '../../../constants/brandGradient';

export const SpeakerBioSection: React.FC = () => {
  // Balanced scroll-reveal animation configuration
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const elementVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section className="w-full bg-black py-16 md:py-10 px-4 sm:px-6 md:px-10 lg:px-20 select-text">
      <div className="w-full max-w-fluid mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
        
        {/* ================= LEFT COLUMN: NARRATIVE COPY ================= */}
        <motion.div 
          className="md:col-span-6 flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Headline featuring exact color assignments */}
          <motion.h2 
            className="text-white text-fluid-26 font-normal leading-[1.35] tracking-tight mb-6"
            variants={elementVariants}
          >
            <span style={brandGradientTextStyle}>Keynotes
            And
            Leadership Sessions</span> On Unfair Advantage, AI, Entrepreneurship And Human Potential.
          </motion.h2>

          {/* Core Body Copy */}
          <motion.p 
            className="text-[#a1a1aa] font-light text-[13px] sm:text-[14px] leading-[1.75] tracking-wide antialiased max-w-xl"
            variants={elementVariants}
          >
            Ash Ali is a founder, operator and award-winning author who helps audiences cut through 
            the noise turning big shifts like AI into practical advantage and reminding leaders that 
            talent, timing and human judgement still decide who wins.
          </motion.p>
        </motion.div>

        {/* ================= RIGHT COLUMN: MEDIA PLAYER RENDERER ================= */}
        <motion.div 
          className="md:col-span-6 w-full flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.98, x: 20 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Ash Ali Tedx Video Container Frame */}
          <div className="relative w-full aspect-video rounded-[4px] bg-[#1a1a1a] border border-white/[0.03] shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/_ZXJ9V3D4lA"
              title="Ash Ali Keynote"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SpeakerBioSection;