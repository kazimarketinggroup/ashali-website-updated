import React from "react";
import { motion } from "framer-motion";

export const BRAND_GRADIENT_LR = "linear-gradient(90deg, #FF781D 0%, #008080 100%)";

interface ButtonConfig {
  label: string;
  onClick?: () => void;
  href?: string;
}

interface HeroWithIconProps {
  icon?: string;          // image src path
  iconAlt?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryBtn?: ButtonConfig;
  secondaryBtn?: ButtonConfig;
  className?: string;
}

const BtnOutline: React.FC<ButtonConfig> = ({ label, onClick, href }) => {
  const cls =
    "inline-block border border-white/40 text-white text-xs sm:text-sm px-5 sm:px-6 py-2 sm:py-2.5 tracking-wide hover:bg-white hover:text-black transition duration-300 cursor-pointer whitespace-nowrap";
  if (href) return <a href={href} className={cls}>{label}</a>;
  return <button onClick={onClick} className={cls}>{label}</button>;
};

const HeroWithIcon: React.FC<HeroWithIconProps> = ({
  icon,
  iconAlt = "icon",
  title = "The Growth Games",
  subtitle = "Ash Ali",
  description = "The Growth Game is a workshop for startup founders and funded startups, covering mindset, team building, growth strategies, and business optimisation. Gain the tools and insights to scale your startup and drive long-term success.",
  primaryBtn = { label: "Player Ready" },
  secondaryBtn = { label: "Explore Levels" },
  className = "",
}) => {
  return (
    <section
      className={`w-full bg-[#0a0a0a] text-white py-12 sm:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-fluid xl:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* LEFT — Icon image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-start"
        >
          {icon ? (
            <img
              src={icon}
              alt={iconAlt}
              className="w-[140px] sm:w-[180px] md:w-[200px] lg:w-[220px] xl:w-[240px] h-auto object-contain"
            />
          ) : (
            // Fallback gradient arrow SVG if no image provided
            <svg
              viewBox="0 0 160 130"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[140px] sm:w-[180px] md:w-[200px] lg:w-[220px] xl:w-[240px]"
            >
              <defs>
                <linearGradient id="arrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF781D" />
                  <stop offset="100%" stopColor="#008080" />
                </linearGradient>
              </defs>
              <polyline
                points="10,110 60,55 100,80 148,18"
                stroke="url(#arrowGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <polyline
                points="118,12 150,18 144,48"
                stroke="url(#arrowGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          )}
        </motion.div>

        {/* RIGHT — Text content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center lg:text-left"
        >
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-semibold tracking-tight text-white">
            {title}
          </h1>

          {/* Gradient line + Subtitle */}
          <div className="mt-3 flex items-center gap-3 justify-center lg:justify-start">
            <div
              className="h-px w-10 sm:w-14 flex-shrink-0"
              style={{ background: BRAND_GRADIENT_LR }}
            />
            <p className="text-sm sm:text-base text-white/60 tracking-wide">
              {subtitle}
            </p>
            <div
              className="h-px w-10 sm:w-14 flex-shrink-0"
              style={{ background: BRAND_GRADIENT_LR }}
            />
          </div>

          {/* Description */}
          <p className="mt-5 sm:mt-6 text-sm sm:text-base text-white/70 leading-relaxed max-w-xl mx-auto lg:mx-0">
            {description}
          </p>

          {/* Buttons */}
          {(primaryBtn || secondaryBtn) && (
            <div className="mt-7 sm:mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
              {primaryBtn && <BtnOutline {...primaryBtn} />}
              {secondaryBtn && <BtnOutline {...secondaryBtn} />}
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
};

export default HeroWithIcon;