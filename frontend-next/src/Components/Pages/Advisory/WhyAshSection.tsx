"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Trophy, Briefcase, MapPin, Users, Mic, Sparkles } from "lucide-react";

type CardDef = {
  icon: React.ElementType;
  label?: string | null;
  title: string;
  w: string;
};

// `grow` makes cards stretch to fill the full row width (max-w-fluid).
// `basis` sets their relative starting proportion so widths stay balanced.
const row1Cards: CardDef[] = [
  {
    icon: BookOpen,
    label: "Co-author of",
    title: "*The Unfair Advantage*",
    w: "w-full sm:flex-1 sm:basis-0",
  },
  {
    icon: Trophy,
    label: "Winner",
    title: "Business Book of the Year 2021, The Business Book Awards",
    w: "w-full sm:flex-1 sm:basis-0",
  },
  {
    icon: Briefcase,
    label: "Former First Marketing Director at",
    title: "Just Eat",
    w: "w-full sm:flex-1 sm:basis-0",
  },
];

const row2Cards: CardDef[] = [
  {
    icon: MapPin,
    label: "International Bases",
    title: "London & Kuala Lumpur",
    w: "w-full sm:grow sm:basis-[270px]",
  },
  {
    icon: Users,
    label: "Co-founder of",
    title: "Uhubs",
    w: "w-full sm:grow sm:basis-[185px]",
  },
  {
    icon: Mic,
    label: "Global",
    title: "Keynote Speaker",
    w: "w-full sm:grow sm:basis-[215px]",
  },
  {
    icon: Sparkles,
    label: "Spoken at",
    title: "TEDx, Salesforce, EY",
    w: "w-full sm:grow sm:basis-[240px]",
  },
];

const InfoCard: React.FC<{
  icon: React.ElementType;
  label?: string | null;
  title: string;
  wClass: string;
}> = ({ icon: Icon, label, title, wClass }) => (
  <div
    className={`
      bg-[#151515] border border-white/[0.06] p-4 sm:p-5 rounded-xl
      flex items-center gap-3 sm:gap-4
      text-left min-h-[92px] shadow-md
      ${wClass}
    `}
  >
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#d97736]/12 text-[#d97736]">
      <Icon size={22} strokeWidth={1.8} />
    </span>
    <div className="min-w-0 flex flex-col justify-center">
      {label && (
        <span className="text-[12px] text-gray-400 font-medium leading-tight mb-1">
          {label}
        </span>
      )}
      <strong className="text-[15px] font-bold tracking-tight text-white leading-tight">
        {title}
      </strong>
    </div>
  </div>
);

const WhyAshSection: React.FC = () => {
  return (
    <section className="bg-black py-16 md:py-20">
      <div className="max-w-fluid mx-auto px-4 sm:px-6 lg:px-8">

        {/* Eyebrow */}
        <div className="flex items-center mb-3 text-[11px] font-medium tracking-[0.2em] text-gray-400 uppercase">
          <span>Why Ash</span>
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-white text-fluid-30 font-semibold tracking-tight"
        >
          Built through experience, not theory.
        </motion.h2>
        <p className="text-xs mb-8 mt-2 max-w-4xl text-gray-300">Ash brings the pattern recognition of 25+ years spent building, operating, advising and investing. The value is not another framework deck. It is an external perspective that can challenge assumptions, sharpen the story and help leaders see the decision more clearly.</p>

        {/* Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col gap-4 w-full"
        >
          {/* Row 1 */}
          <div className="flex flex-wrap gap-4 w-full">
            {row1Cards.map((c) => (
              <InfoCard key={c.title} icon={c.icon} label={c.label} title={c.title} wClass={c.w} />
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap gap-4 w-full">
            {row2Cards.map((c) => (
              <InfoCard key={c.title} icon={c.icon} label={c.label} title={c.title} wClass={c.w} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyAshSection;
