import React from "react";
import { BRAND_GRADIENT_LR } from "../../../constants/brandGradient";
import Link from "next/link";

const highlights = [
  {
    title: "Young talent",
    description:
      "A fast-rising generation hungry for opportunity & ideas.",
  },
  {
    title: "AI acceleration",
    description:
      "Rapid adoption reshaping how companies build & compete.",
  },
  {
    title: "Startup growth",
    description:
      "A maturing founder ecosystem with global ambition.",
  },
  {
    title: "East–West bridge",
    description:
      "A meeting point of markets, capital and culture.",
  },
];

const audienceRow1 = [
  "Corporates",
  "Universities & business schools",
  "Accelerators",
  "Founder communities",
];

const audienceRow2 = [
  "Innovation programmes",
  "Muslim business networks",
  "Private CEO groups",
];

const MalaysiaRegionSection: React.FC = () => {
  return (
    <section className="bg-black py-16 md:py-20">
      <div className="max-w-fluid mx-auto px-6">

        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">

          {/* LEFT */}
          <div>
            {/* LABEL */}
            <div className="flex items-center gap-3 mb-8">
             
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                Why Malaysia & SEA
              </span>
            </div>

            {/* HEADING */}
            <h2 className="text-fluid-30 font-medium leading-[1.35] text-white">
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: BRAND_GRADIENT_LR }}
              >
                A region at
              </span>
              <br />
              an important moment.
            </h2>

            {/* TEXT */}
            <p className="mt-8 max-w-[520px] text-white/75 text-[15px] leading-8">
              Young talent, fast digital adoption, AI acceleration,
              startup growth and rising regional ambition create a
              natural bridge between East and West. Ash helps
              organisations and communities here build advantage on
              their own terms.
            </p>

            {/* BUTTON */}
           <Link href="/contact?type=sea" className="inline-block mt-10">
              <button
                type="button"
                className="px-8 py-3 bg-white text-black font-semibold text-[13px] tracking-wide rounded-[2px] shadow-lg transition-colors duration-150"
              >
                Work with Ash
              </button>
            </Link>
          </div>

          {/* RIGHT CARDS */}
          <div className="grid md:grid-cols-2 gap-6">

            {highlights.map((item) => (
              <div
                key={item.title}
                className="
                  border
                  border-[#f97316]
                  p-8
                  min-h-[140px]
                  bg-black
                "
              >
                <h3 className="text-white text-xl font-semibold mb-6">
                  {item.title}
                </h3>

                <p className="text-white/75 text-[15px] leading-7">
                  {item.description}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-20 sm:mt-24">

          {/* LABEL */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-white/50 font-medium">
              WHO ASH WORKS WITH
            </span>
          </div>

          {/* TAGS — 2 balanced rows matching design */}
          <div className="flex flex-col gap-3 sm:gap-3.5">
            {/* Row 1 */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {audienceRow1.map((item) => (
                <div
                  key={item}
                  className="bg-[#181818] border border-white/[0.06] text-white px-5 py-3 rounded-md text-[13.5px] sm:text-[14.5px] font-normal tracking-wide shadow-sm hover:border-white/10 transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {audienceRow2.map((item) => (
                <div
                  key={item}
                  className="bg-[#181818] border border-white/[0.06] text-white px-5 py-3 rounded-md text-[13.5px] sm:text-[14.5px] font-normal tracking-wide shadow-sm hover:border-white/10 transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MalaysiaRegionSection;