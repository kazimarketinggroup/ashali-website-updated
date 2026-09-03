import React from "react";
import { BRAND_GRADIENT_LR } from "../../../constants/brandGradient";
import { Link } from "react-router-dom";

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

const audiences = [
  "Corporates",
  "Universities & Business Schools",
  "Accelerators",
  "Founder Communities",
  "Innovation Programmes",
  "Muslim Business Networks",
  "Private CEO Groups",
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
                A Region At
              </span>
              <br />
              An Important Moment.
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
           <Link  to="/contact" className="inline-block mt-10">
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
        <div className="mt-24">

          {/* LABEL */}
          <div className="flex items-center gap-3 mb-8">
          
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
              Who Ash Works With
            </span>
          </div>

          {/* TAGS — ~2 balanced lines up to xl, single line on 2xl+ */}
          <div className="flex flex-wrap gap-4 lg:max-w-[900px] 2xl:max-w-none 2xl:flex-nowrap">
            {audiences.map((item) => (
              <div
                key={item}
                className="
                  bg-[#1c1c1c]
                  text-white
                  whitespace-nowrap
                  px-6 py-4
                  rounded
                  text-[15px]
                  font-medium
                 
                  transition-all
                "
              >
                {item}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default MalaysiaRegionSection;