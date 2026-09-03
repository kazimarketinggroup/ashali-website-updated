import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import img1999 from "../../../assets/home/timeline1.png";
import img2001 from "../../../assets/home/timeline2.png";
import img2008 from "../../../assets/home/timeline3.png";
import shadow1999 from "../../../assets/home/shadow1.png";
import shadow2001 from "../../../assets/home/shadow2.png";
import shadow2008 from "../../../assets/home/shadow3.png";

import { BRAND_GRADIENT_LR, BRAND_ORANGE, BRAND_TEAL, brandGradientTextStyle } from "../../../constants/brandGradient";

const timelineData = [
  {
    year: "1999-2000",
    img: img1999,
    shadow: shadow1999,
    title: "CHASING AMBITION\nWITH NOTHING BUT A DREAM",
    location: "Small Heath, Birmingham",
    desc: "Packed his bags and moved to London with nothing, determined to break into the world of marketing and startups. Self taught and relentless, he carved his own path without a university degree.",
  },
  {
    year: "2001-2007",
    img: img2001,
    shadow: shadow2001,
    title: "VARIOUS MARKETING\nEXECUTIVE ROLES",
    location: "London",
    desc: "Worked across various marketing roles, honing expertise in digital strategy, growth hacking, and brand positioning. Helped multiple companies scale their online presence.",
  },
  {
    year: "2008",
    img: img2008,
    shadow: shadow2008,
    title: "BECOMING JUST EAT'S\nFIRST MARKETING DIRECTOR",
    location: "London",
    desc: "Joined Just Eat as the first marketing director, pioneering growth strategies that led to a GBP 1.5 billion IPO, the UK's biggest tech IPO of the decade.",
  },
];

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const fadeRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const TimelineSection: React.FC = () => {
  return (
    <section className="bg-[#0a0a0a] text-white py-16 md:py-20 font-sans overflow-hidden">

      {/* HEADER */}
      <div className="max-w-fluid mx-auto px-4 sm:px-6 mb-14 sm:mb-18 lg:mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-lg font-medium leading-snug tracking-tight sm:text-xl md:text-2xl lg:text-[2rem]"
        >
          Joke Of The Family To Tech{" "}
          <span style={brandGradientTextStyle}>Millionaire</span>
          <br />
          And Serial Entrepreneur
        </motion.h1>
      </div>

      {/* TIMELINE */}
      <div className="relative max-w-fluid mx-auto px-4 sm:px-6">

        {/* Centre line */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

        {timelineData.map((item, idx) => {
          const isLeft = idx % 2 === 0;
          /** Equal inset from the centre spine — avoids uneven gaps when alternating sides */
          const spineGapImage = isLeft ? "lg:pr-10 xl:pr-14 2xl:pr-16" : "lg:pl-10 xl:pl-14 2xl:pl-16";
          const spineGapText = isLeft ? "lg:pl-10 xl:pl-14 2xl:pl-16" : "lg:pr-10 xl:pr-14 2xl:pr-16";

          return (
            <div key={idx} className="mb-20 sm:mb-24 lg:mb-28 relative">

              {/* YEAR */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10 sm:mb-12 lg:mb-14"
              >
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  {item.year}
                </h2>
              </motion.div>

              {/* ROW — tops aligned to spine; horizontal spacing symmetric via spineGap* */}
              <div
                className={`flex flex-col lg:flex-row lg:items-start gap-10 sm:gap-12 lg:gap-0 ${
                  isLeft ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* ── IMAGE BOX ── */}
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={isLeft ? fadeLeft : fadeRight}
                  className={`w-full lg:w-1/2 flex justify-center ${spineGapImage} ${
                    isLeft ? "lg:justify-end" : "lg:justify-start"
                  }`}
                >
                  {/* Offset corner borders + image */}
                  <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[260px] md:h-[260px] xl:w-[280px] xl:h-[280px]">
                    {/* Orange top-left border */}
                    <div
                      className="absolute inset-0 border-l-[2.5px] border-t-[2.5px] pointer-events-none"
                      style={{
                        borderColor: BRAND_ORANGE,
                        transform: "translate(-10px, -10px)",
                      }}
                    />
                    {/* Teal bottom-right border */}
                    <div
                      className="absolute inset-0 border-r-[2.5px] border-b-[2.5px] pointer-events-none"
                      style={{
                        borderColor: BRAND_TEAL,
                        transform: "translate(10px, 10px)",
                      }}
                    />
                    <img
                      src={item.img}
                      alt={item.year}
                      className="relative z-10 w-full h-full object-cover grayscale-[15%] brightness-90"
                    />
                  </div>
                </motion.div>

                {/* ── TEXT BOX ── */}
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={isLeft ? fadeRight : fadeLeft}
                  className={`relative w-full lg:w-1/2 min-h-[200px] sm:min-h-[220px] lg:min-h-[280px] flex lg:items-start items-center overflow-hidden ${spineGapText} ${
                    isLeft ? "lg:justify-start" : "lg:justify-end"
                  }`}
                >
                  {/* Shadow watermark — vignette asset, feathered into section bg */}
                  <div
                    className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
                    aria-hidden
                  >
                    <img
                      src={item.shadow}
                      alt=""
                      className="w-[min(100%,28rem)] max-h-[min(24rem,88%)] object-contain opacity-[0.42] sm:opacity-[0.48]"
                      style={{
                        filter: "blur(2px)",
                        maskImage:
                          "radial-gradient(ellipse 82% 78% at 50% 50%, #000 18%, rgba(0,0,0,0.85) 52%, transparent 88%)",
                        WebkitMaskImage:
                          "radial-gradient(ellipse 82% 78% at 50% 50%, #000 18%, rgba(0,0,0,0.85) 52%, transparent 88%)",
                      }}
                    />
                  </div>

                  <div className="relative z-10 w-full max-w-[360px] pt-4 pb-6 sm:pt-5 sm:pb-8 lg:pt-0 lg:pb-0 text-left">
                    <motion.h3
                      variants={fadeUp}
                      className="text-sm sm:text-base font-bold tracking-[0.06em] leading-snug mb-3 uppercase whitespace-pre-line"
                    >
                      {item.title}
                    </motion.h3>

                    <motion.div variants={fadeUp} className="flex items-center gap-1.5 mb-4">
                      <span className="text-sm" style={brandGradientTextStyle}>
                        Location: {item.location}
                      </span>
                    </motion.div>

                    <motion.p
                      variants={fadeUp}
                      className="text-[#a1a1a1] text-sm sm:text-[0.92rem] leading-[1.7] font-light"
                    >
                      {item.desc}
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}

        {/* SEE FULL TIMELINE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12 relative z-10"
        >
          <button className="text-xs sm:text-sm font-semibold tracking-widest uppercase flex flex-col items-center mx-auto group">
            <span
              className="bg-clip-text text-transparent transition-opacity group-hover:opacity-70"
              style={{ backgroundImage: BRAND_GRADIENT_LR }}
            >
              See Full Timeline
            </span>
            <div
              className="h-px w-full mt-1"
              style={{ background: BRAND_GRADIENT_LR }}
            />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default TimelineSection;
