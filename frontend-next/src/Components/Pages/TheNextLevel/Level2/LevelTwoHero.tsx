import Link from "next/link";

import heroGraphic from "../../../../assets/level2/homeVector.png";
import { BRAND_GRADIENT_LR } from "../../../../constants/brandGradient";

const LevelTwoHero = () => {
  return (
    <section className="border-b border-white/[0.06] bg-black text-white">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-16 px-6 py-16 md:gap-28 lg:flex-row lg:justify-center lg:gap-32 xl:gap-32 lg:py-20">
        <div className="flex w-full shrink-0 justify-center lg:w-auto lg:justify-start">
          <img
            src={heroGraphic.src}
            alt=""
            className="h-auto w-full max-w-[250px] object-contain sm:max-w-[290px] lg:max-w-[min(340px,32vw)]"
          />
        </div>

        <div className="flex w-full flex-col items-center text-center md:max-w-2xl">
          <h1 className="text-[clamp(1.5rem,2.6vw,1.9rem)] font-medium leading-snug tracking-tight text-white">
            Life Is Unfair
          </h1>

          <div
            className="mx-auto mt-4 h-px w-[4.5rem] rounded-full"
            style={{ background: BRAND_GRADIENT_LR }}
            aria-hidden
          />

          <p className="mt-4 text-sm font-normal text-white/65 sm:text-[15px]">Ash Ali</p>

          <p className="mt-5 text-sm font-normal leading-[1.65] text-white/52 sm:text-[15px]">
            <span className="block">
              A workshop for founders ready to rethink advantage: mindset and money, intelligence and insight,
            </span>
            <span className="mt-1.5 block">location and luck, and how status shapes outcomes.</span>
            <span className="mt-1.5 block">
              Gain practical frameworks to navigate unfairness and compound what works for you.
            </span>
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-none border border-white px-5 py-2 text-sm font-normal text-white transition-colors duration-300 hover:bg-white hover:text-black sm:text-[15px]"
            >
              Player Ready
            </Link>
            <Link
              href="/the-next-level"
              className="rounded-none border border-white px-5 py-2 text-sm font-normal text-white transition-colors duration-300 hover:bg-white hover:text-black sm:text-[15px]"
            >
              Explore Levels
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LevelTwoHero;
