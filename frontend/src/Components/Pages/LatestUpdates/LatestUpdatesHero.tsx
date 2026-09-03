import React from "react";
import { motion, easeOut } from "framer-motion";

import heroBg from "../../../assets/latestupdates/heroBG.png";

const LatestUpdatesHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="relative">
        <img
          src={heroBg}
          alt=""
          className="block h-[420px] w-full object-cover object-center sm:h-[260px] md:h-[500px]"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 flex items-center justify-center px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.55, ease: easeOut }}
            className="mx-auto max-w-2xl"
          >
            <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl md:text-3xl">Latest Updates</h1>
            <p className="mt-3 text-xs leading-relaxed text-white/85 sm:text-sm md:text-base">
              Explore Ash Ali’s latest insights on entrepreneurship, innovation, and growth strategies that will motivate and empower
              you to succeed.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LatestUpdatesHero;

