"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Trophy, Briefcase, MapPin, Users, Mic, Sparkles } from "lucide-react";

import googleLogo from "../../../assets/home/logos/google.png";
import bbcLogo from "../../../assets/home/logos/bbc.png";
import entrepreneurLogo from "../../../assets/home/Entrepreneur_logo.png";
import fortuneLogo from "../../../assets/home/logos/fortune.png";
import forbesLogo from "../../../assets/home/logos/forbes.png";
import incLogo from "../../../assets/home/logos/inc.png";

const logos = [
  { name: "Google",       src: googleLogo.src,      className: "h-5 sm:h-6" },
  { name: "BBC",          src: bbcLogo.src,          className: "h-[22px] sm:h-[26px]" },
  { name: "Entrepreneur", src: entrepreneurLogo.src, },
  { name: "Fortune",      src: fortuneLogo.src,      className: "h-4 sm:h-5" },
  { name: "Forbes",       src: forbesLogo.src,       className: "h-[18px] sm:h-[21px]" },
  { name: "Inc",          src: incLogo.src,          className: "h-[18px] sm:h-[22px]" },
];

/* ── Fixed metric card definitions ── */
type CardDef = {
  icon: React.ElementType;
  label?: string | null;
  title: string;
  sub?: string | null;
  w: string;
};

// Cards grow to fill each row so both rows share the exact same total width.
// basis sets relative proportions (bigger label/title -> larger basis).
const row1Cards: CardDef[] = [
  {
    icon: BookOpen,
    label: "Co-author of",
    title: "*The Unfair Advantage*",
    sub: null,
    w: "w-full sm:grow sm:basis-0",
  },
  {
    icon: Trophy,
    label: "Winner",
    title: "Business Book of the Year 2021, The Business Book Awards",
    sub: null,
    w: "w-full sm:grow sm:basis-0",
  },
  {
    icon: Briefcase,
    label: "Former First Marketing Director at",
    title: "Just Eat",
    sub: null,
    w: "w-full sm:grow sm:basis-0",
  },
];

const row2Cards: CardDef[] = [
  {
    icon: MapPin,
    label: "International Bases",
    title: "London & Kuala Lumpur",
    sub: null,
    w: "w-full sm:grow sm:basis-[240px]",
  },
  {
    icon: Users,
    label: "Co-founder of",
    title: "Uhubs",
    sub: null,
    w: "w-full sm:grow sm:basis-[165px]",
  },
  {
    icon: Mic,
    label: "Global",
    title: "Keynote Speaker",
    sub: null,
    w: "w-full sm:grow sm:basis-[200px]",
  },
  {
    icon: Sparkles,
    label: "Spoken at",
    title: "TEDx, Salesforce, EY",
    sub: null,
    w: "w-full sm:grow sm:basis-[215px]",
  },
];

const MetricCard: React.FC<{
  icon: React.ElementType;
  label?: string | null;
  title: string;
  sub?: string | null;
  wClass: string;
}> = ({ icon: Icon, label, title, sub, wClass }) => (
  <div
    className={`
      bg-[#151515] border border-white/[0.06] p-4 rounded-lg
      flex items-center gap-3
      text-left h-[76px] shadow-md
      ${wClass}
    `}
  >
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#d97736]/12 text-[#d97736]">
      <Icon size={18} strokeWidth={1.8} />
    </span>
    <div className="min-w-0 flex flex-col justify-center">
      {label && (
        <span className="text-[10px] text-gray-400 font-medium leading-tight mb-0.5">
          {label}
        </span>
      )}
      <strong className="text-[13px] font-bold tracking-tight text-white leading-tight">
        {title}
      </strong>
      {sub && (
        <span className="text-[11px] text-gray-400 font-light mt-0.5">{sub}</span>
      )}
    </div>
  </div>
);

const FeaturedMetricsSection: React.FC = () => {
  return (
    <section className="bg-black py-16 md:py-20 text-white select-none">
      <div className="mx-auto w-full max-w-fluid px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col items-center"
        >
          {/* Featured In heading */}
          <p className="text-white text-[18px] font-medium tracking-wide text-center mb-8">
            Featured In
          </p>

          {/* Logo strip */}
          <div className="
            grid grid-cols-3 lg:grid-cols-6
            items-center justify-items-center
            gap-x-6 gap-y-5 sm:gap-x-10
            w-full max-w-5xl pb-10 border-b-2 border-white
          ">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex h-10 w-full items-center justify-center filter brightness-110 contrast-125"
              >
                <img
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  className={`${logo.className} w-auto object-contain opacity-85 hover:opacity-100 transition-opacity duration-200`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Metric cards — icon + text, fixed height per card */}
          <div className="w-full max-w-5xl flex flex-col gap-4 mt-10">

            {/* Row 1 */}
            <div className="flex flex-wrap gap-4 w-full">
              {row1Cards.map((c) => (
                <MetricCard key={c.title} icon={c.icon} label={c.label} title={c.title} sub={c.sub} wClass={c.w} />
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex flex-wrap gap-4 w-full">
              {row2Cards.map((c) => (
                <MetricCard key={c.title} icon={c.icon} label={c.label} title={c.title} sub={c.sub} wClass={c.w} />
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturedMetricsSection;
