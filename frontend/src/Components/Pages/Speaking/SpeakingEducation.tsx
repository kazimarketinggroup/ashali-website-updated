import React from "react";
import { motion, easeOut } from "framer-motion";

import warwickBg from "../../../assets/speaking/41329447_656719284728022_3471088475799814144_n 1.png";
import digitalDnaBg from "../../../assets/speaking/digitalDnaConferrence.png";
import in5Bg from "../../../assets/speaking/int5Dubai.png";
import imperialLogo from "../../../assets/speaking/logo-negative-1024x437 1.png";
import loughboroughLogo from "../../../assets/speaking/logo-negative-1024x437 4.png";
import escpLogo from "../../../assets/speaking/logo-negative-1024x437 5.png";
import warwickLogo from "../../../assets/speaking/170821-Warwick-logo-White 2.png";
import royalLogo from "../../../assets/speaking/royal-holloway-logo-579E793B40-seeklogo.com 2.png";
import uclLogo from "../../../assets/speaking/ucl-logo-1 1.png";
import salesforceBg from "../../../assets/speaking/inspiringInsight.png";
import eventMy from "../../../assets/speaking/eventmalaysia.png";

import { brandGradientTextStyle } from "../../../constants/brandGradient";

import GradientBorderLink from "./GradientBorderLink";

function IconPin({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 21s7-4.35 7-10a7 7 0 10-14 0c0 5.65 7 10 7 10z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCalendar({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

type EduEntry = {
  uni: string;
  location: string;
  date: string;
  desc: string;
  logo: string;
  logoAlt: string;
  bg: string;
};

const entries: EduEntry[] = [
  {
    uni: "University of Warwick",
    location: "London, UK",
    date: "January 2023",
    desc: "Delivered a lecture on his journey as Just Eat's first marketing director. He discussed how individuals can discover and leverage their unique strengths, turning them into competitive advantages for success in business and life.",
    logo: warwickLogo,
    logoAlt: "University of Warwick",
    bg: warwickBg,
  },
  {
    uni: "Royal Holloway University",
    location: "London, UK",
    date: "October 2022",
    desc: "Lectured about utilising the 'Unfair Advantage'. He shared how individuals can identify their unique strengths, whether through personal experiences, skills, or mindset, and use them to gain a competitive edge in their future careers.",
    logo: royalLogo,
    logoAlt: "Royal Holloway University of London",
    bg: digitalDnaBg,
  },
  {
    uni: "UCL School of Management",
    location: "London, UK",
    date: "January 2021",
    desc: "Spoke about Imposter Syndrome, highlighting its signs, psychological barriers, and strategies to overcome self-doubt by recognising personal strengths and unique experiences.",
    logo: uclLogo,
    logoAlt: "UCL School of Management",
    bg: in5Bg,
  },
  {
    uni: "Loughborough University",
    location: "London, UK",
    date: "April 2020",
    desc: "Shared his personal experiences and discussed how to turn unfair situations into advantages. He explored strategies on leveraging unique strengths and finding solutions to unlocking one's potential.",
    logo: loughboroughLogo,
    logoAlt: "Loughborough University",
    bg: salesforceBg,
  },
  {
    uni: "Imperial College Business School",
    location: "London, UK",
    date: "March 2020",
    desc: "Spoke about the MILES Framework, a model for identifying and leveraging personal unfair advantages. He explored five key elements; Money, Intelligence, Location & Luck, Education & Expertise, and Status; guiding students on how to use their unique strengths to gain a competitive edge in business and entrepreneurship.",
    logo: imperialLogo,
    logoAlt: "Imperial College Business School",
    bg: eventMy,
  },
  {
    uni: "ESCP Business School",
    location: "London, UK",
    date: "March 2019",
    desc: "Taught the students on identifying one's Unfair Advantage. He shared insights on recognising personal strengths, leveraging unique experiences, and turning obstacles into opportunities.",
    logo: escpLogo,
    logoAlt: "ESCP Business School",
    bg: warwickBg,
  },
];

const SpeakingEducation: React.FC = () => (
  <section className="border-t border-white/10 bg-black px-6 py-16 md:py-20">
    <div className="mx-auto max-w-fluid">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="mb-6 text-xl font-bold leading-tight tracking-tight sm:text-2xl md:mb-7 md:text-[1.65rem]"
        style={brandGradientTextStyle}
      >
        Keynotes at Educational Institutes
      </motion.h2>

      <div className="flex flex-col gap-5 md:gap-6">
        {entries.map((e, i) => (
          <motion.div
            key={e.uni}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: easeOut, delay: i * 0.04 }}
            className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(140px,240px)] lg:gap-8"
          >
            <div className="relative min-h-[160px] overflow-hidden rounded-md border border-white/10 bg-zinc-950 md:min-h-[170px]">
              <img
                src={e.bg}
                alt=""
                className="absolute left-1/2 top-1/2 z-0 block min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center opacity-[0.2]"
              />
              <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/85 via-black/75 to-black/60" />
              <div className="relative z-10 p-4 md:p-5 lg:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1">
                  <h3 className="text-base font-bold text-white md:text-lg">{e.uni}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/55 md:text-sm">
                    <span className="inline-flex items-center gap-1.5">
                      <IconPin className="shrink-0 text-white/45" />
                      {e.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <IconCalendar className="shrink-0 text-white/45" />
                      {e.date}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-[1.65] text-white/85 md:text-[15px]">{e.desc}</p>
              </div>
            </div>
            <div className="flex min-h-[100px] items-center justify-end rounded-md border border-white/10 bg-black/50 px-4 py-4 lg:min-h-0">
              <img
                src={e.logo}
                alt={e.logoAlt}
                className="max-h-12 w-auto max-w-[180px] object-contain object-right sm:max-h-14 md:max-h-16"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="mt-10 flex flex-col items-center text-center md:mt-12"
      >
        <p className="text-lg font-medium text-white md:text-xl">Level up your next university lecture!</p>
        <div className="mt-5">
          <GradientBorderLink to="/contact" linkClassName="px-10 py-3 sm:text-base">
            Enquire Now
          </GradientBorderLink>
        </div>
      </motion.div>
    </div>
  </section>
);

export default SpeakingEducation;
