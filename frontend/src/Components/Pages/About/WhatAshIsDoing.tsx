import React from "react";
import { motion } from "framer-motion";
// import { brandGradientTextStyle } from "../../../constants/brandGradient";
// import { Link } from "react-router-dom";



// Gradient token utility used specifically to style the 4 subtle card card borders
const BRAND_GRADIENT_BORDER = "linear-gradient(135deg, #008080 0%, #14b8a6 40%, #d97736 80%, #FF781D 100%)";

interface ActivityCardProps {
  title: string;
  description: string;
}

// Reusable micro-card subcomponent featuring a fine gradient border framework
const ActivityCard: React.FC<ActivityCardProps> = ({ title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative rounded-lg mb-10 p-[1px] h-[145px] sm:h-[155px] md:h-[165px] transition-transform duration-200 hover:scale-[1.015]"
      style={{ background: BRAND_GRADIENT_BORDER }}
    >
      {/* Inner card structural background fill masking */}
      <div className="w-full h-full bg-[#050505] rounded-[7px] p-6 sm:p-7 flex flex-col justify-start text-left">
        <h3 className="text-white text-[15px] sm:text-[16px] md:text-[17px] font-bold tracking-tight mb-3">
          {title}
        </h3>
        <p className="text-gray-400 font-light text-[12.5px] sm:text-[13px] md:text-[13.5px] leading-relaxed tracking-wide antialiased">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export const WhatAshIsDoing: React.FC = () => {
  // Cascading animation stagger targets for smooth element presentation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 }
    }
  };

  return (
    // Bottom spacing comes from each card's own `mb-10`, so only the top is padded here.
    <section className="w-full bg-black pt-16 md:pt-20 px-4 sm:px-6 md:px-12 lg:px-28 text-white select-text">
      <div className="max-w-fluid mx-auto gap-12 lg:gap-16 items-center">
        
        {/* ================= LEFT SIDE: HEADLINE & CTAs ================= */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="lg:col-span-5 flex flex-col items-start text-left"
        >
          {/* Eyebrow Segment Accent Marker */}
          {/* <div className="flex items-center mb-3 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-400 uppercase"> */}
            {/* <span>Now</span> */}
          {/* </div> */}

          {/* Heading Component deploying the custom brandGradientTextStyle inline */}
          {/* <h2 className="text-fluid-30  tracking-tight leading-[1.15] mb-8">
            What Ash <br />
            Is <span style={brandGradientTextStyle}>Doing Today.</span>
          </h2> */}

          {/* Paragraph copy extracted from image_c614d6.png */}
          {/* <p className="text-gray-400 font-light text-[13.5px] sm:text-[14px] leading-[1.75] tracking-wide mb-10 max-w-sm antialiased">
            Building Uhubs, speaking globally, and advising a selected group of founders and leadership teams — while keeping a clear line to the impact work that started it all.
          </p> */}

          {/* Solid call-to-action button structure */}
         {/* <Link to="/contact" className="inline-block">
             <button
            type="button"
            className="px-6 py-3 bg-white text-black font-semibold text-[12.5px] tracking-wide rounded-[2px] transition-colors duration-150 hover:bg-gray-100 shadow-md"
          >
            Work with Ash
          </button>
          </Link> */}
        </motion.div>

        {/* ================= RIGHT SIDE: MATRIX FOCUS GRID ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full"
        >
          <ActivityCard 
            title="Building Uhubs" 
            description="Sales capability and the Global Sales Capability Index." 
          />
          <ActivityCard 
            title="Speaking globally" 
            description="Keynotes across the UK, Malaysia, SEA and beyond." 
          />
          <ActivityCard 
            title="Advising founders" 
            description="A small number of leadership teams each year." 
          />
          <ActivityCard 
            title="Impact work" 
            description="Pro-bono talks for young people who need them most." 
          />
        </motion.div>

      </div>
    </section>
  );
};

export default WhatAshIsDoing;