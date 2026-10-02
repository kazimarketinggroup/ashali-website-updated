"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BRAND_GRADIENT_LR, brandGradientTextStyle } from "../../../constants/brandGradient";
import Link from "next/link";

interface ThemeCardProps {
  title: string;
  description: string;
}

// Individual micro-card component with gradient outer mask border mapping
const ThemeCard: React.FC<ThemeCardProps> = ({ title, description }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 1, 0.5, 1] } }
      }}
      className="relative rounded-lg p-[1px] min-h-[200px] w-full transition-transform duration-200 hover:scale-[1.012]"
      style={{ background: BRAND_GRADIENT_LR }}
    >
      {/* Matte backdrop internal clipping mask container */}
      <div className="w-full h-full bg-[#060606] rounded-[7px] p-6 sm:p-8 flex flex-col justify-start text-left">
        {/* Card Title */}
        <h3 className="text-white text-[15px] sm:text-[16px] font-bold tracking-tight mb-4 leading-snug">
          {title}
        </h3>
        
        {/* Card Description */}
        <p className="text-gray-400 font-light text-[12.5px] sm:text-[13.5px] leading-relaxed tracking-wide antialiased">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export const TalkThemes: React.FC = () => {
  // Accurate content matrix extracted verbatim from image_91d296.png
  const themesData = [
    {
      title: "Finding your unfair advantage",
      description: "Seeing the strengths and circumstances you already have."
    },
    {
      title: "Entrepreneurship and self-belief",
      description: "Permission, mindset and the first steps that build momentum."
    },
    {
      title: "Using AI without losing your own thinking",
      description: "Staying sharp, curious and human in an AI shaped world."
    },
    {
      title: "Social mobility and opportunity",
      description: "How access really works and how to create your own."
    },
    {
      title: "Turning your story into strength",
      description: "Making background and identity a source of advantage."
    },
    {
      title: "Tailored to your group",
      description: "Sessions adapted to age, setting and what your young people need."
    }
  ];

  return (
    <section className="w-full bg-black py-16 md:py-20 px-6 sm:px-12 text-white select-text">
      <div className="max-w-fluid mx-auto flex flex-col items-center">
        
        {/* ================= 1. MINIMALIST ACCENT EYEBROW ================= */}
        <div className="flex items-center mb-3 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-500 uppercase">
          <span>Talk themes</span>
        </div>

        {/* ================= 2. TITLE WITH EXACT BRAND COLOR BREAKS ================= */}
        <h2 className="text-white text-fluid-30 font-medium tracking-tight text-center leading-tight mb-14 max-w-2xl">
          Concrete, hopeful <br />
          and <span style={brandGradientTextStyle}>genuinely useful.</span>
        </h2>

        {/* ================= 3. 3-COLUMN GRADIENT BORDER GRID ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-5xl mb-14"
        >
          {themesData.map((theme, idx) => (
            <ThemeCard
              key={idx}
              title={theme.title}
              description={theme.description}
            />
          ))}
        </motion.div>

        {/* ================= 4. CENTRAL CALL TO ACTION BUTTON ================= */}
        <div className="w-full flex justify-center pt-2">
          <Link href="/contact?type=impact" className="inline-block">
            <button
            type="button"
            className="px-7 py-3 bg-white text-black font-semibold text-[12.5px] tracking-wide rounded-[2px] transition-colors duration-150 hover:bg-gray-100 shadow-md cursor-pointer"
          >
            Work with Ash
          </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TalkThemes;