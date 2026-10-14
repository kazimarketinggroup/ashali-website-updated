import React from 'react';
import Image from 'next/image';
import { brandGradientTextStyle } from '../../../constants/brandGradient';
import ashImage from '../../../assets/speaking/updatedSpeakingimage.png';
import Link from "next/link";

export const KeynotesBanner: React.FC = () => {

  // const fadeUpVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: { duration: 0.7, ease: 'easeOut' },
  //   },
  // };

  return (
   <section className="w-full min-h-[min(100vh,760px)] bg-[#0F0F0F] overflow-hidden select-none">
  <div className="max-w-fluid mx-auto min-h-[min(100vh,760px)] flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 gap-8 lg:gap-14">

    {/* IMAGE */}
    <div className="flex-shrink-0 flex items-end self-end justify-center w-full md:w-auto">
      <Image
        src={ashImage}
        alt="Ash Ali delivering a keynote presentation on unfair advantage and AI strategy"
        priority
        fetchPriority="high"
        sizes="(max-width: 640px) 70vw, (max-width: 1024px) 50vw, 550px"
        className="h-[340px] sm:h-[420px] md:h-[min(85vh,680px)] w-auto object-contain object-bottom"
        draggable={false}
      />
    </div>

    {/* CONTENT */}
    <div
      className="flex flex-col items-start justify-center flex-1 py-12 md:py-0"
    >
        <div className="flex items-center mb-3 text-[11px] sm:text-[12px] font-medium tracking-[0.2em] text-gray-400 uppercase">
              <span>KEYNOTES FOR LEADERS, FOUNDERS AND ORGANISATIONS</span>
            </div>
      <h1 className="text-white text-fluid-34 font-semibold leading-[1.25] max-w-xl text-balance">
        Keynotes that shift how{" "}
        <span style={brandGradientTextStyle}>
          leaders think and
        </span>{" "}
        what they do next
      </h1>

      <div className="mt-8">
        <Link
          href="/contact"
          className="min-h-[44px] inline-flex items-center justify-center px-8 py-3 bg-white text-black font-semibold text-[13px] tracking-wide rounded-[2px] shadow-lg transition-transform hover:scale-[1.02]"
        >
          Enquire about a keynote
        </Link>
      </div>
    </div>

  </div>
</section>
  );
};

export default KeynotesBanner;