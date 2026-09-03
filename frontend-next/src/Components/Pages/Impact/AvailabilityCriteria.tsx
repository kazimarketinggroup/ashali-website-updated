import React from "react";
import { ArrowRight } from "lucide-react";
import { BRAND_GRADIENT_LR } from "../../../constants/brandGradient";
import Link from "next/link";

const criteria = [
  {
    title: "Limited each year",
    description:
      "A small, intentional number of pro-bono talks.",
  },
  {
    title: "Prioritised by need",
    description:
      "Underrepresented, underserved & low-opportunity communities first.",
  },
  {
    title: "Consent & safeguarding",
    description:
      "All sessions and imagery follow consent and safeguarding requirements.",
  },
];

const AvailabilityCriteria: React.FC = () => {
  return (
    <section className="bg-black py-16 md:py-20">
      <div className="max-w-fluid mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT SIDE */}
          <div>

            {/* Label */}
            <div className="flex items-center gap-3 mb-8">
              
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/50">
                Availability Criteria
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-white text-fluid-30 font-medium leading-[1.2] max-w-xl">
              A{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: BRAND_GRADIENT_LR }}
              >
                Limited Number Of
              </span>
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: BRAND_GRADIENT_LR }}
              >
                Sessions
              </span>{" "}
              Given Carefully.
            </h2>

            {/* Description */}
            <p className="mt-10 text-white/65 text-[15px] leading-8 max-w-lg">
              To protect the time and keep the impact real, pro-bono
              sessions are limited each year and prioritised for
              underrepresented, underserved or low-opportunity communities.
            </p>

            {/* Button */}
            <Link href="/contact" className="inline-block mt-10">
              <button
              className="
                mt-12
                inline-flex
                items-center
                gap-2
                bg-white
                text-black
                px-6
                py-3
                text-sm
                font-medium
                transition-all
                duration-300
                hover:scale-105
              "
            >
              Work with Ash
              <ArrowRight size={16} />
            </button>
            </Link>
          </div>

          {/* RIGHT SIDE */}
          <div
            className="border p-8 lg:p-10"
            style={{
              borderImage: `${BRAND_GRADIENT_LR} 1`,
            }}
          >
            <div className="space-y-10">
              {criteria.map((item) => (
                <div key={item.title}>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-3 h-[2px]"
                      style={{
                        background: BRAND_GRADIENT_LR,
                      }}
                    />

                    <h3 className="text-white ">
                      {item.title}
                    </h3>
                  </div>

                  <p className="pl-6 text-white/65 text-[15px] leading-7">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AvailabilityCriteria;