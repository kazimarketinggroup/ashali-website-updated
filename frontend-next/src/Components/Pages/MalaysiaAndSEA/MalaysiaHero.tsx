import React from "react";
import { BRAND_GRADIENT_LR } from "../../../constants/brandGradient";

import malaysiaHero from "../../../assets/malaysia/ash-ali-hasan-kubba-bba-2022-malaysia.png";
import Link from "next/link";

const MalaysiaHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden min-h-[600px] lg:min-h-[600px]">

      {/* Background Image */}
      <img
        src={malaysiaHero.src}
        alt="Malaysia & Southeast Asia"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/72" />

      {/* Left Side Dark Gradient */}
      <div
        className="
          absolute inset-y-0 left-0
          w-[65%]
          bg-gradient-to-r
          from-black via-black/80 to-transparent
        "
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 35%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-fluid mx-auto px-6 lg:px-10 h-full">
        <div className="flex items-center min-h-[600px] ">

          <div className="max-w-[620px]">

            {/* Label */}
            <div className="flex items-center gap-3 mb-8">
              

              <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                Malaysia & Southeast Asia
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-white font-medium leading-[1.18] text-fluid-30 max-w-[760px]">

              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: BRAND_GRADIENT_LR }}
              >
                Speaking, Advisory And Impact <br /> Work  {}
              </span>

          

               Across Malaysia And

              <br />

              Southeast Asia.
            </h1>

            {/* Description */}
            <p
              className="
                mt-8
                max-w-[560px]
                text-white/78
                text-[15px]
                leading-[1.9]
              "
            >
              Based Between London And Kuala Lumpur, Ash Brings A Global
              Founder/Operator Perspective To Organisations And Communities
              Across The UK, Malaysia And Southeast Asia.
            </p>

            {/* CTA */}
            <div className="mt-10">
              <Link
                href="/contact"
                className="
                  inline-flex
                  items-center
                  justify-center
                  bg-white
                  text-black
                  px-7
                  py-3.5
                  text-sm
                  
                  transition-all
                  duration-300
                  hover:bg-[#f3f3f3]
                "
              >
                Malaysia & SEA enquiries
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default MalaysiaHero;