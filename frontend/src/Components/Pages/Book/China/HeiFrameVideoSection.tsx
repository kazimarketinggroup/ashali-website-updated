import React from "react";
import { motion } from "framer-motion";

// Proper YouTube embed URL
const VIDEO_EMBED_URL =
  "https://www.youtube.com/embed/kjQyqkDYmHw?start=119";

const HeiFrameVideoSection: React.FC = () => {
  return (
    <section className="w-full bg-[#0d0d0d] px-4 sm:px-6 py-16 md:py-20 text-white md:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-12 md:flex-row md:gap-16">

        {/* LEFT — TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex w-full justify-center md:w-1/2 md:justify-start"
        >
          <div className="max-w-[360px] text-center md:text-left">
            <p className="text-[15px] font-medium leading-[1.9] text-white/80 md:text-[16px]">
              HEI FRAME –
              <br />
              我研究了 “不公平优势” 19 天。
              <br />
              这是一些创业的真相（捷径）
            </p>
          </div>
        </motion.div>

        {/* RIGHT — VIDEO */}
        <motion.div
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex w-full justify-center md:w-1/2 md:justify-end"
        >
          <div className="relative w-full max-w-[560px] overflow-hidden rounded-xl border border-white/10 bg-[#171717] shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
            
            <div className="relative aspect-video">
              <iframe
                src={VIDEO_EMBED_URL}
                title="HEI FRAME Video Review"
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeiFrameVideoSection;