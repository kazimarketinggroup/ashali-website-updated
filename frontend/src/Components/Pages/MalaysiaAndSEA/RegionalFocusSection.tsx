import React from "react";
import { motion } from "framer-motion";

import ashSeaImg from "../../../assets/malaysia/Rectangle 23965.png";

const topics = [
  {
    title: "The Unfair Advantage for Malaysia's Next Generation",
    desc: "Helping young talent see and use the advantages they already hold.",
  },
  {
    title: "AI, Human Potential and the Future of Work in SEA",
    desc: "What AI means for the region's careers, companies and competitiveness.",
  },
  {
    title: "Building Global Companies from Regional Advantage",
    desc: "How SEA founders build world-class companies without leaving home.",
  },
  {
    title: "Social Mobility and Reinvention",
    desc: "Turning background and circumstance into momentum.",
  },
];

const RegionalFocusSection: React.FC = () => {
  return (
    <section className="bg-black text-white px-5 py-16 md:py-20 md:px-24 select-none">
      <div className="mx-auto w-full max-w-fluid">

        {/* ================= TOP: IMAGE + REGIONAL TOPICS ================= */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">

          {/* Left image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden rounded-lg"
          >
            <img
              src={ashSeaImg}
              alt="Ash Ali holding The Unfair Advantage in Southeast Asia"
              className="aspect-[4/3] w-full object-cover"
              draggable="false"
            />
          </motion.div>

          {/* Right content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.05 }}
          >
            {/* Eyebrow */}
            <div className="mb-3 flex items-center text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
              <span>Regional Topics</span>
            </div>

            {/* Heading */}
            <h2 className="mb-8 text-fluid-22 tracking-tight text-white">
              Talks tuned to the region.
            </h2>

            {/* Topics list */}
            <div className="flex flex-col gap-6">
              {topics.map((t) => (
                <div key={t.title}>
                  <h3 className="text-[15px] sm:text-[16px] text-white">
                    {t.title}
                  </h3>
                  <p className="mt-1 text-[13px] sm:text-[14px] font-light leading-relaxed text-white/60">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* ================= BOTTOM: CENTERED QUOTE ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="mt-20 flex flex-col items-center text-center"
        >
          {/* Eyebrow */}
          <div className="mb-3 flex items-center text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
            <span>London &amp; Kuala Lumpur</span>
          </div>

          {/* Quote */}
          <p className="max-w-4xl text-fluid-30  text-white">
            "Based Between London And Kuala Lumpur, Ash Brings <br /> A{" "}
            <span className="bg-gradient-to-r from-[#008080] to-[#FF781D] bg-clip-text text-transparent">
              Global Founder/Operator Perspective
            </span>{" "}
            To Organisations And Communities Across The UK, Malaysia And Southeast Asia."
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default RegionalFocusSection;