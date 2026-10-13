"use client";

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { brandGradientTextStyle } from '../../../constants/brandGradient';
import YouTubeFacade from '../../Shared/YouTubeFacade';
import freddieAvatar from '../../../assets/speaking/monk.png';

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
    <section className="w-full bg-black py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-20 select-text">
      <div className="w-full max-w-fluid mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* ================= LEFT COLUMN: NARRATIVE COPY & TESTIMONIAL ================= */}
        <motion.div 
          className="lg:col-span-6 flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Headline featuring sentence case and brand gradient */}
          <motion.h2 
            className="text-white text-fluid-26 sm:text-fluid-28 font-medium leading-[1.25] tracking-tight mb-5"
            variants={elementVariants}
          >
            <span style={brandGradientTextStyle}>Keynotes and leadership sessions</span>{" "}
            on unfair advantage, AI, entrepreneurship and human potential.
          </motion.h2>

          {/* Core Body Copy */}
          <motion.p 
            className="text-gray-300 font-light text-[13px] sm:text-[14px] leading-[1.7] tracking-wide antialiased mb-7 max-w-xl"
            variants={elementVariants}
          >
            Ash Ali is a founder, operator and award-winning author who helps audiences cut through 
            the noise turning big shifts like AI into practical advantage and reminding leaders that 
            talent, timing and human judgement still decide who wins.
          </motion.p>

          {/* Verified Organiser Testimonial Card (Freddie Monk - EY) */}
          <motion.div
            variants={elementVariants}
            className="bg-[#141414] border border-white/[0.04] rounded-2xl p-5 sm:p-6 flex items-start sm:items-center gap-4 sm:gap-5 shadow-lg max-w-xl select-none"
          >
            <img
              src={freddieAvatar.src}
              alt="Freddie Monk - EY"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shrink-0 border border-white/10"
              draggable={false}
            />
            <div className="flex flex-col text-left">
              <p className="text-gray-300 font-light text-[12.5px] sm:text-[13px] leading-relaxed mb-2.5">
                &ldquo;Ash delivered an outstanding keynote at our Innovation event, sharing valuable insights from Just Eat. Professional, insightful, and a pleasure to work with many thanks!&rdquo;
              </p>
              <span className="text-white text-[13px] font-semibold tracking-wide">
                Freddie Monk - EY
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= RIGHT COLUMN: MEDIA PLAYER RENDERER ================= */}
        <motion.div 
          className="lg:col-span-6 w-full flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.98, x: 20 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Ash Ali Tedx Video Container Frame */}
          <div className="relative w-full aspect-video rounded-[4px] bg-[#1a1a1a] border border-white/[0.03] shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden">
            <YouTubeFacade
              videoId="_ZXJ9V3D4lA"
              title="Ash Ali Keynote Presentation"
              aspectRatio="16/9"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SpeakerBioSection;