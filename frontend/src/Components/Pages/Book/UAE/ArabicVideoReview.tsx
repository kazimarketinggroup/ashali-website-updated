import React from "react";
import { motion } from "framer-motion";

const ArabicVideoReview: React.FC = () => {
  return (
    <section
      className="w-full bg-[#0b0b0b] px-4 sm:px-6 py-16 md:py-20 text-white"
      dir="rtl"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-8 md:grid-cols-2">

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-right"
          >
            <p className="mb-5 text-[14px] font-normal text-white/55">
              مراجعة من أنبوب القراءة
            </p>

            <h2 className="text-fluid-26 font-semibold leading-[1.7] text-white">
              سر النجاح في أصعب الظروف ؟؟
              <br />
              كتاب : الميزة غير العادلة
            </h2>
          </motion.div>

          {/* Left — YouTube Video */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center md:justify-end"
          >
            <div className="w-full max-w-[460px] overflow-hidden rounded-xl border border-white/[0.07] bg-[#141414] shadow-2xl">
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/WZ0wKi5RMDE"
                  title="Arabic Book Review"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ArabicVideoReview;