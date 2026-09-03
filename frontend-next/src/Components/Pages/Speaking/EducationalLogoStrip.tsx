"use client";

import React from 'react';
import { motion } from 'framer-motion';

// 1. Import your actual university logo image assets here
import imperialCollege from '../../../assets/speaking/loughborough-university-logo.png';
import escpSchool from '../../../assets/speaking/escp-business-school-logo.png';
import loughboroughUni from '../../../assets/speaking/loughborough-university-logo-alt.png';
import uclLogo from '../../../assets/speaking/ucl-logo.png';
import royalHolloway from '../../../assets/speaking/royal-holloway-logo.png';
import warwickUni from '../../../assets/speaking/warwick-university-logo.png';
import { brandGradientTextStyle } from '../../../constants/brandGradient';

interface InstituteLogo {
  src: string;
  alt: string;
  dimensions: string; // Tailored width matching each logo's natural aspect ratio
}

const instituteLogos: InstituteLogo[] = [
  { src: imperialCollege.src, alt: "Imperial College Business School", dimensions: "w-[130px] sm:w-[150px] md:w-[165px]" },
  { src: escpSchool.src, alt: "ESCP Business School", dimensions: "w-[100px] sm:w-[110px] md:w-[125px]" },
  { src: loughboroughUni.src, alt: "Loughborough University", dimensions: "w-[120px] sm:w-[135px] md:w-[150px]" },
  { src: uclLogo.src, alt: "UCL", dimensions: "w-[75px] sm:w-[85px] md:w-[95px]" },
  { src: royalHolloway.src, alt: "Royal Holloway University of London", dimensions: "w-[75px] sm:w-[85px] md:w-[95px]" },
  { src: warwickUni.src, alt: "Warwick The University of Warwick", dimensions: "w-[85px] sm:w-[95px] md:w-[105px]" }
];

export const EducationalLogoStrip: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-black pt-12 pb-14 w-full select-none"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Centered Three-Tone Multi-Color Headline Asset Sync */}
        <h2 className="text-center text-fluid-24 font-normal tracking-wide mb-10 sm:mb-12">
          <span style={brandGradientTextStyle}>Keynotes Educational Institutes</span>
        </h2>

        {/* Distributed Single Horizontal Row Layout Grid */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between gap-x-8 gap-y-6 w-full max-w-5xl px-4">
          {instituteLogos.map((logo, index) => (
            <div
              key={index}
              className={`flex items-center justify-center shrink-0 ${logo.dimensions}`}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="
                  h-auto
                  w-full
                  object-contain
                  opacity-85
                "
                draggable="false"
              />
            </div>
          ))}
        </div>

      </div>
    </motion.div>
  );
};

export default EducationalLogoStrip;