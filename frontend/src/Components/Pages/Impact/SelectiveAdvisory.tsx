import React from 'react';
import { motion } from 'framer-motion';

export const SelectiveAdvisory: React.FC = () => {
  // Ordered groups representing Row 1 and Row 2 from image_91e143.png
  const rowOneTags = [
    "Schools",
    "Sixth Forms",
    "Colleges",
    "Universities",
    "Youth Programmes"
  ];

  const rowTwoTags = [
    "Social Mobility Organisations",
    "Entrepreneurship Programmes",
    "Muslim Youth & Community Organisations"
  ];

  // Animation variants for an elegant staggered cascade on view entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

//   const tagVariants = {
//     hidden: { opacity: 0, y: 12 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
//     }
//   };

  return (
    <section className="w-full bg-black py-16 md:py-20 px-6 sm:px-12 text-center select-none">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="w-full max-w-fluid mx-auto flex flex-col items-center"
      >
        
        {/* ================= 1. MINIMALIST ACCENT EYEBROW ================= */}
        <motion.div 
        //   variants={tagVariants}
          className="flex items-center mb-3 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-500 uppercase font-sans"
        >
          <span>Who it's for</span>
        </motion.div>

        {/* ================= 2. HEADLINE WITH SPECIFIC COLOR BREAK ================= */}
        <motion.h2 
        //   variants={tagVariants}
          className="text-white text-fluid-30  font-medium tracking-tight mb-12 font-sans"
        >
          Ash <span className="text-[#d97736]">advises</span> a selective group of
        </motion.h2>

        {/* ================= 3. MATTE TAGS PLATFORM SYSTEM ================= */}
        <div className="w-full flex flex-col items-center gap-4 max-w-5xl select-text">
          
          {/* Row 1 Layout Grid */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 w-full">
            {rowOneTags.map((tag, idx) => (
              <motion.span
                key={`r1-${idx}`}
                // variants={tagVariants}
                className="px-6 py-3.5 bg-[#1a1a1a] border border-white/[0.02] text-gray-200 text-[13px] sm:text-[14px] font-medium tracking-wide rounded-[6px] shadow-[0_4px_20px_rgba(0,0,0,0.3)]  transition-all duration-200 cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Row 2 Layout Grid */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 w-full mt-1 sm:mt-0">
            {rowTwoTags.map((tag, idx) => (
              <motion.span
                key={`r2-${idx}`}
                // variants={tagVariants}
                className="px-6 py-3.5 bg-[#1a1a1a] border border-white/[0.02] text-gray-200 text-[13px] sm:text-[14px] font-medium tracking-wide rounded-[6px] shadow-[0_4px_20px_rgba(0,0,0,0.3)]  transition-all duration-200 cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div>

        </div>

      </motion.div>
    </section>
  );
};

export default SelectiveAdvisory;