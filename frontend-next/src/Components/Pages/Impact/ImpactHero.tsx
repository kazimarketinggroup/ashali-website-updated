"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Replace this placeholder with your actual image asset route from image_c3cf5d.png
import impactSessionImg from "../../../assets/impact/impactHero.png";
import Link from "next/link";

export const ImpactHero: React.FC = () => {
  // Stagger variants for premium entrance execution
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  };

//   const textVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.65, ease: [0.25, 1, 0.5, 1] }
//     }
//   };

  return (
    <section className="w-full bg-black py-16 md:py-20 px-6 sm:px-12 md:px-28 select-none">
      <div className="max-w-fluid mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* ================= LEFT COLUMN: NARRATIVE COPY BLOCK ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-7 flex flex-col items-start text-left select-text"
        >
          {/* Eyebrow Section Marker */}
          <motion.div 
            // variants={textVariants}
            className="flex items-center mb-3 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-500 uppercase"
          >
            <span>Impact</span>
          </motion.div>

          {/* Three-Tone Multi-Accent Headline parsing verbatim from image_c3cf5d.png */}
          <motion.h1 
            // variants={textVariants}
            className="text-white text-fluid-30 font-medium  tracking-tight leading-[1.25] mb-6 max-w-xl font-sans"
          >
            <span className="text-[#14b8a6]">Helping</span>{" "}
            <span className="text-[#65735b]">Young People</span>{" "}
            <span className="text-white">Recognise <br /> the advantages they already hold.</span>
          </motion.h1>

          {/* Accurate Paragraph Summary Body */}
          <motion.p 
            // variants={textVariants}
            className="text-gray-400 font-light text-[13.5px] sm:text-[14px] leading-[1.75] tracking-wide mb-10 max-w-xl antialiased"
          >
            Ash gives a limited number of pro-bono talks each year to schools, colleges and organisations supporting young people from underrepresented or low-opportunity backgrounds.
          </motion.p>

          {/* Minimalist CTA Action Button */}
          <motion.div >
            <Link href="/contact"><button
              type="button"
              className="px-6 py-3 bg-white text-black font-semibold text-[13px] tracking-wide rounded-[2px] transition-colors duration-150 hover:bg-gray-100 shadow-md"
            >
              Request a pro-bono talk
            </button></Link>
          </motion.div>
        </motion.div>

        {/* ================= RIGHT COLUMN: FRAMED PRESENTATION LIFESTYLE IMAGE ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
          className="lg:col-span-5 flex justify-center lg:justify-end w-full"
        >
          {/* Square aspect ratio frame to perfectly match image_c3cf5d.png */}
          <div className="w-full max-w-[450px] aspect-square rounded-sm overflow-hidden border border-white/[0.03] shadow-2xl relative group bg-neutral-900">
            <img
              src={impactSessionImg.src}
              alt="Ash Ali speaking interactively directly with an audience panel"
              className="w-full h-full object-cover filter brightness-[1.03] contrast-105 transition-transform duration-500 group-hover:scale-[1.02]"
              draggable="false"
              loading="lazy"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ImpactHero;