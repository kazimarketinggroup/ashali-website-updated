"use client";

import React from "react";
import { motion } from "framer-motion";

type PageHeroProps = {
  title: string;
  subtitle?: string;
};

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle }) => {
  return (
    <section className="border-b border-white/10 bg-black px-4 pb-12 pt-12 text-white sm:px-6 sm:pb-14 sm:pt-14 lg:px-8 lg:pb-16 lg:pt-16">
      <div className="mx-auto max-w-fluid">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-3xl font-medium tracking-tight sm:text-4xl lg:text-[2.5rem]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
