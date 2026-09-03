import React from "react";
import { motion } from "framer-motion";

// Replace these placeholders with your actual image assets from image_c5ab9e.png
import imgPrivate from "../../../assets/advisory/image1.png";
import imgStrategic from "../../../assets/advisory/image2.png";
import imgFounder from "../../../assets/advisory/image3.png";
import imgLongTerm from "../../../assets/advisory/image4.png";

interface FormCard {
  image: string;
  title: string;
}

export const HowAshWorks: React.FC = () => {
  const cardsData: FormCard[] = [
    {
      image: imgPrivate,
      title: "Private one-to-one sessions",
    },
    {
      image: imgStrategic,
      title: "Strategic workshops with leadership teams",
    },
    {
      image: imgFounder,
      title: "Founder and CEO advisory conversations",
    },
    {
      image: imgLongTerm,
      title: "Selected longer-term advisory engagements",
    },
  ];

  // Cascading reveal variants for a premium layout entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.65, ease: "easeOut" },
//     },
//   };

  return (
    <section className="w-full bg-black py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-24 text-white select-text">
      <div className="max-w-fluid mx-auto flex flex-col items-start text-left">
        
        {/* ================= TOP TEXT HEADER BLOCK ================= */}
        {/* Eyebrow Accent Line */}
        <div className="flex items-center mb-3 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-400 uppercase">
          <span>How Ash Works</span>
        </div>

        {/* Main Section Headline */}
        <h2 className="text-fluid-38 font-normal tracking-tight text-white/90 max-w-xl leading-tight mb-8">
          Premium And Selective A <br className="hidden sm:block" />
          Few Formats.
        </h2>

        {/* Informative Sub-Headline Description */}
        <p className="text-gray-400 font-light text-[13px] sm:text-[14px] tracking-wide mb-14 max-w-2xl antialiased">
          Engagements Are Kept Deliberately Selective So Each One Gets Real Attention:
        </p>

        {/* ================= 4-CARD FLOW GRID WITH INTEGRATED TIMELINE ================= */}
        <div className="relative w-full pb-10">
          
          {/* Main Horizontal Timeline Wire */}
          <div className="absolute bottom-[4px] left-[10%] right-[10%] h-[2px] bg-white/10 z-0 pointer-events-none hidden md:block" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 w-full relative z-10"
          >
            {cardsData.map((card, index) => (
              <motion.div
                key={index}
                // variants={cardVariants}
                className="flex flex-col items-center group relative"
              >
                {/* Visual Card Core Container Frame */}
                <div className="w-full bg-[#141414] border border-white/[0.03] rounded-sm overflow-hidden flex flex-col h-full shadow-xl">

                  {/* Card Aspect Ratio Fitted Image Box */}
                  <div className="w-full aspect-[1.48/1] overflow-hidden bg-neutral-900 border-b border-white/[0.02]">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      draggable="false"
                    />
                  </div>

                  {/* Lower Text Content Padding Block */}
                  <div className="p-5 sm:p-6 flex-grow flex items-start text-left min-h-[95px]">
                    <h3 className="text-gray-200 text-[13.5px] sm:text-[14.5px] font-normal leading-snug tracking-wide">
                      {card.title}
                    </h3>
                  </div>

                  {/* Down-Pointing Asymmetrical CSS Anchor Triangle (Visible only on Desktop Screens) */}
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-[10px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#141414] opacity-100 hidden md:block" />
                </div>

                {/* Individual Timeline Nodes (Perfectly synchronized with the card layout centers) */}
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