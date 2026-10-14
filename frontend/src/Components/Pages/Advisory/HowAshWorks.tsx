import React from "react";
import { motion } from "framer-motion";

import imgPrivate from "../../../assets/advisory/image1.png";
import imgStrategic from "../../../assets/advisory/image2.png";
import imgFounder from "../../../assets/advisory/image3.png";

interface FormCard {
  image: string;
  title: string;
  description: string;
}

export const HowAshWorks: React.FC = () => {
  const cardsData: FormCard[] = [
    {
      image: imgPrivate,
      title: "Strategic decision session",
      description: "Single deep-dive session focused on a specific decision, inflection point or strategy question.",
    },
    {
      image: imgFounder,
      title: "Leadership strategy workshop",
      description: "Half-day or full-day workshop aligning executive teams on commercial capability, positioning and execution.",
    },
    {
      image: imgStrategic,
      title: "Ongoing founder or CEO advisory",
      description: "Retained sounding board for founders and CEOs through high-growth or transitional phases.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  return (
    <section className="w-full bg-black py-16 md:py-24 text-white select-text">
      <div className="max-w-fluid mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* ================= TOP TEXT HEADER BLOCK ================= */}
        {/* Eyebrow Accent Line */}
        <div className="flex items-center mb-3 text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
          <span>ENGAGEMENT FORMATS</span>
        </div>

        {/* Main Section Headline */}
        <h2 className="text-fluid-34 font-normal tracking-tight text-white max-w-xl leading-tight mb-3">
          How advisory engagements work
        </h2>

        {/* Informative Sub-Headline Description */}
        <p className="text-gray-300 font-light text-[14px] sm:text-[15px] tracking-wide mb-14 max-w-2xl antialiased">
          Engagements are tailored to the decision, stage and resources of your business
        </p>

        {/* ================= 3-CARD FLOW GRID WITH INTEGRATED TIMELINE ================= */}
        <div className="relative w-full pb-10">
          
          {/* Main Horizontal Timeline Wire */}
          <div className="absolute bottom-[4px] left-[16%] right-[16%] h-[2px] bg-white/10 z-0 pointer-events-none hidden md:block" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative z-10"
          >
            {cardsData.map((card, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center group relative text-left"
              >
                {/* Visual Card Core Container Frame */}
                <div className="w-full bg-[#141414] border border-white/[0.04] rounded-lg overflow-hidden flex flex-col h-full shadow-xl hover:border-white/10 transition-colors">

                  {/* Card Aspect Ratio Fitted Image Box */}
                  <div className="w-full aspect-[16/10] overflow-hidden bg-neutral-900 border-b border-white/[0.04]">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      draggable="false"
                    />
                  </div>

                  {/* Lower Text Content Block */}
                  <div className="p-5 sm:p-6 flex-grow flex flex-col justify-start">
                    <h3 className="text-white text-[15px] sm:text-[16px] font-bold leading-snug tracking-tight mb-2.5">
                      {card.title}
                    </h3>
                    <p className="text-gray-300 text-[13.5px] sm:text-[14px] font-light leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Down-Pointing Asymmetrical CSS Anchor Triangle */}
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-[10px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#141414] opacity-100 hidden md:block" />
                </div>

                {/* Individual Timeline Nodes */}
                <div className="mt-8 hidden flex-col items-center justify-center relative md:flex">
                  <div className="w-[10px] h-[10px] rounded-full bg-neutral-700 border-2 border-black ring-4 ring-black z-10" />
                </div>

              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HowAshWorks;