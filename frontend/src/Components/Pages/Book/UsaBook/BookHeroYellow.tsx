import React from "react";
import { motion } from "framer-motion";

import heroImage from "../../../../assets/bookusa/heroimage.png";
import aliAvatar from "../../../../assets/bookusa/ali.png";
import derekAvatar from "../../../../assets/bookusa/derek.png";

/* ───────── YELLOW CARD ───────── */
const YellowCard: React.FC<{
  quote: string;
  avatar: string;
  name: string;
  role: string;
  delay?: number;
}> = ({ quote, avatar, name, role, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    className="
      w-full
      max-w-[320px] sm:max-w-[360px] md:max-w-[380px]
      rounded-2xl bg-[#FFD600]
      px-4 py-4 sm:px-5 sm:py-5
      shadow-xl
    "
  >
    <p className="text-[12px] sm:text-sm font-medium leading-relaxed text-black/85">
      "{quote}"
    </p>

    <div className="mt-4 flex items-center gap-3">
      <img
        src={avatar}
        alt={name}
        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border-2 border-black/10"
      />
      <div>
        <p className="text-sm font-bold text-black leading-tight">
          {name}
        </p>
        <p className="text-[11px] text-black/60 leading-snug">
          {role}
        </p>
      </div>
    </div>
  </motion.div>
);

/* ───────── MAIN COMPONENT ───────── */
const BookHeroYellow: React.FC = () => {
  return (
    <>
      {/* ───────── MOBILE ───────── */}
      <section className="block sm:hidden bg-black">
        <div className="relative w-full">
          <img
            src={heroImage}
            alt="The Unfair Advantage"
            className="w-full h-[260px] object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="flex flex-col gap-4 px-4 py-6">
          <YellowCard
            quote="A powerful way to think about success as an entrepreneur."
            avatar={aliAvatar}
            name="Ali Abdaal"
            role="Productivity YouTuber, Podcaster & Ex-Doctor"
          />
          <YellowCard
            quote="Crucial business advice that you won't get anywhere else."
            avatar={derekAvatar}
            name="Derek Sivers"
            role="Entrepreneur & Author of 'Anything You Want'"
          />
        </div>
      </section>

      {/* ───────── DESKTOP / TABLET ───────── */}
      <section
        className="
          hidden sm:block
          relative w-full
          bg-black overflow-hidden
        "
        style={{
          height: "100dvh",        // ✅ real viewport height (mobile safe)
          minHeight: "600px",      // ✅ fallback for small screens
        }}
      >
        {/* Background Image */}
        <img
          src={heroImage}
          alt="The Unfair Advantage"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* LEFT CARD */}
        <div
          className="
            absolute z-10
            bottom-6 left-1/2 -translate-x-1/2
            sm:left-6 sm:translate-x-0
            md:left-8 lg:left-12 xl:left-16
          "
        >
          <YellowCard
            quote="A powerful way to think about success as an entrepreneur."
            avatar={aliAvatar}
            name="Ali Abdaal"
            role="Productivity YouTuber, Podcaster & Ex-Doctor"
            delay={0.2}
          />
        </div>

        {/* RIGHT CARD */}
        <div
          className="
            absolute z-10
            top-6 left-1/2 -translate-x-1/2
            sm:left-auto sm:right-6 sm:translate-x-0
            md:right-8 lg:right-12 xl:right-16
          "
        >
          <YellowCard
            quote="Crucial business advice that you won't get anywhere else."
            avatar={derekAvatar}
            name="Derek Sivers"
            role="Entrepreneur & Author of 'Anything You Want'"
            delay={0.3}
          />
        </div>
      </section>
    </>
  );
};

export default BookHeroYellow;