/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { BRAND_GRADIENT_LR } from "../../../constants/brandGradient";

interface FrameworkRow {
  letter: string;
  content: React.ReactNode;
}

export const MilesFramework: React.FC = () => {
  // Exact copywriting parsed verbatim from image_c520db.png
  const milesData: FrameworkRow[] = [
    {
      letter: "M",
      content: (
        <p className="text-[12px] sm:text-[13px]  md:text-[13.5px] font-semibold tracking-wider leading-relaxed text-gray-200">
          MONEY{" "}
          <span className="font-light text-gray-400">
            THE FINANCIAL RESOURCES, RUNWAY AND CAPITAL YOU CAN DRAW ON.
          </span>
        </p>
      ),
    },
    {
      letter: "I",
      content: (
        <p className="text-[12px] sm:text-[13px] md:text-[13.5px] font-semibold tracking-wider leading-relaxed text-gray-200">
          INTELLIGENCE & INSIGHT{" "}
          <span className="font-light text-gray-400">
            YOUR KNOWLEDGE, SKILLS, INSTINCTS AND THE WAY YOU SEE PROBLEMS OTHERS MISS.
          </span>
        </p>
      ),
    },
    {
      letter: "L",
      content: (
        <p className="text-[12px] sm:text-[13px] md:text-[13.5px] font-semibold tracking-wider leading-relaxed text-gray-200">
          LOCATION & LUCK{" "}
          <span className="font-light text-gray-400">
            WHERE YOU ARE, WHO'S AROUND YOU, AND THE TIMING YOU CAN POSITION YOURSELF TO BENEFIT FROM.
          </span>
        </p>
      ),
    },
    {
      letter: "E",
      content: (
        <p className="text-[12px] sm:text-[13px] md:text-[13.5px] font-semibold tracking-wider leading-relaxed text-gray-200">
          EDUCATION & EXPERTISE{" "}
          <span className="font-light text-gray-400">
            WHAT YOU'VE LEARNED — FORMALLY AND THROUGH EXPERIENCE — AND THE CREDIBILITY IT GIVES YOU.
          </span>
        </p>
      ),
    },
    {
      letter: "S",
      content: (
        <p className="text-[12px] sm:text-[13px] md:text-[13.5px] font-semibold tracking-wider leading-relaxed text-gray-200">
          STATUS{" "}
          <span className="font-light text-gray-400">
            YOUR REPUTATION, NETWORKS AND THE DOORS YOUR STANDING CAN OPEN.
          </span>
        </p>
      ),
    },
  ];

  // Cascading timeline variants for an elegant reveal sequence
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

//   const rowVariants = {
//     hidden: { opacity: 0, y: 12 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] },
//     },
//   };

  return (
    <section className="w-full bg-black mt-10 py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-28 text-white select-text">
      <div className="max-w-fluid mx-auto flex flex-col items-start text-left">
        
        {/* ================= TOP BRAND HEADLINES ================= */}
        {/* Minimalist Header Accent Ribbon */}
        <div className="flex items-center mb-3 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-500 uppercase">
          <span>The MILES Framework</span>
        </div>

        {/* Section Main Title */}
        <h2 className="text-fluid-38 font-normal tracking-tight text-white leading-tight mb-6">
          Five forces that shape every advantage.
        </h2>

        {/* Section Description Copy */}
        <p className="text-gray-400 font-light text-[12.5px] sm:text-[13.5px] tracking-wide mb-14 max-w-2xl antialiased">
          The Book Gives You A Practical Way To Spot Your Own Advantages, Across Five Areas:
        </p>

        {/* ================= MILES FRAMEWORK MATRIX ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full flex flex-col gap-3.5"
        >
          {milesData.map((row, _index) => (
            <motion.div
              key={row.letter}
            //   variants={rowVariants}
              className="grid grid-cols-12 gap-3 sm:gap-4 items-stretch w-full group"
            >
              
              {/* Left Column Block: Letter Box Badge */}
              <div
                className="col-span-2 md:col-span-1 rounded-[4px] p-[1px] flex items-center justify-center transition-transform duration-200 group-hover:scale-[1.01]"
                style={{ background: BRAND_GRADIENT_LR }}
              >
                <div className="w-full h-full bg-[#111111] rounded-[3px] flex items-center justify-center py-4 md:py-5">
                  <span className="text-white text-[16px] sm:text-[18px] md:text-[20px] font-bold tracking-tight">
                    {row.letter}
                  </span>
                </div>
              </div>

              {/* Right Column Block: Definitions Core Panel */}
              <div
                className="col-span-10 md:col-span-11 rounded-[4px] p-[1px] flex items-center transition-transform duration-200 group-hover:scale-[1.005]"
                style={{ background: BRAND_GRADIENT_LR }}
              >
                <div className="w-full h-full bg-[#111111] rounded-[3px] px-5 py-4 sm:px-7 sm:py-5 flex items-center">
                  {row.content}
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default MilesFramework;