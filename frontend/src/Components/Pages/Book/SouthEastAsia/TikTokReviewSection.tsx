import React from "react";
import { motion } from "framer-motion";

const TikTokReview: React.FC = () => {
  return (
    <section className="w-full bg-[#0b0b0b] px-4 sm:px-6 py-16 md:py-20 text-white">
      <div className="mx-auto grid max-w-4xl items-center gap-12 md:grid-cols-2 md:gap-32">

        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center md:justify-start text-center md:text-left"
        >
          <div className="max-w-[340px]">
            <p className="text-[15px] leading-[2] text-white/75 md:text-[16px]">
              Ulasan daripada Saluran
              <br />
              TikTok{" "}
              <span className="font-medium text-white">
                explainedbyjq
              </span>{" "}
              tentang
              <br />
              Kelebihan Tidak Adil
            </p>
          </div>
        </motion.div>

        {/* RIGHT VIDEO */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center md:justify-end"
        >
          {/*
            The embed is capped rather than fixed at 320px: on a 360px phone a
            hard 320px iframe plus the section gutter overflows the viewport.
          */}
          <div className="w-full max-w-[320px] md:max-w-[340px] overflow-hidden rounded-2xl border border-white/10 bg-[#151515] shadow-[0_20px_50px_rgba(0,0,0,0.45)]">

            {/* TikTok Embed */}
            <iframe
              src="https://www.tiktok.com/embed/v2/7340702320310619398"
              className="block h-[540px] w-full md:h-[580px]"
              allowFullScreen
              title="TikTok Review"
            />

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TikTokReview;