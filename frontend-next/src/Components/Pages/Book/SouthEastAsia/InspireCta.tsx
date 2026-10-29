"use client";

import React from "react";
import { motion } from "framer-motion";

import Link from "next/link";

export const BRAND_GRADIENT_LR = "linear-gradient(90deg, #FF781D 0%, #008080 100%)";

interface InspireCTAProps {
  enquireUrl?: string;
}

const InspireCTA: React.FC<InspireCTAProps> = ({ enquireUrl = "/contact" }) => {
  const isInternal = enquireUrl.startsWith("/");

  return (
    <section className="w-full bg-[#0d0d0d] flex flex-col items-center justify-center px-6 py-16 md:py-20 min-h-[160px]">

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="text-fluid-24 font-semibold text-white tracking-[0.01em] mb-6 text-center"
      >
        Inspire your Audience
      </motion.h2>

      {/* Gradient-border button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="relative rounded-[4px] p-[1px] group"
        style={{ background: BRAND_GRADIENT_LR }}
      >
        {isInternal ? (
          <Link
            href={enquireUrl}
            className="relative block px-[22px] py-[9px] text-[13px] font-medium text-white tracking-[0.03em] rounded-[3px] bg-[#0d0d0d] transition-all duration-200 group-hover:bg-transparent"
          >
            Enquire Now
          </Link>
        ) : (
          <a
            href={enquireUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block px-[22px] py-[9px] text-[13px] font-medium text-white tracking-[0.03em] rounded-[3px] bg-[#0d0d0d] transition-all duration-200 group-hover:bg-transparent"
          >
            Enquire Now
          </a>
        )}
      </motion.div>

    </section>
  );
};

export default InspireCTA;