import React from "react";
import { motion } from "framer-motion";

import aboutImage from "../../../assets/book/updatedimage.png";

const ORANGE = "#FF781D";

const BookQuote: React.FC = () => {
  return (
    <section className="bg-black px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-white select-none">
      <div className="mx-auto flex flex-col md:flex-row items-center gap-10 lg:gap-16 max-w-fluid">

        {/* IMAGE — wide landscape crop, compact height */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="flex-shrink-0 w-full md:w-[46%] lg:w-[48%]"
        >
          <img
            src={aboutImage}
            alt="Ash Ali and Hasan Kubba holding awards and The Unfair Advantage book"
            className="w-full h-[300px] sm:h-[360px] md:h-[420px] lg:h-[460px] rounded-2xl object-contain shadow-2xl"
            draggable="false"
          />
        </motion.div>

        {/* CONTENT NARRATIVE PANEL */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
          className="text-left flex flex-col justify-center items-start flex-1 select-text"
        >
          {/* Minimalist Top Eyebrow Track */}
          <div className="flex items-center mb-3 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-400 uppercase">
            <span>The Core Idea</span>
          </div>

          {/* Main Accurate Headline */}
          <h2 className="text-fluid-30  tracking-tight text-white leading-tight mb-6">
            <span style={{ color: ORANGE }}>Success</span> was never just about hard work.
          </h2>

          {/* Core Long Form Description Copy Block */}
          <p className="text-gray-400 font-light text-[13px] sm:text-[14px] leading-[1.8] tracking-wide antialiased">
            It's shaped by context, timing, access, skills, mindset and networks and by knowing how 
            to use what you already have. Everyone holds advantages they've never recognised. The 
            skill isn't working harder. It's seeing your real edge clearly, and using it.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default BookQuote;