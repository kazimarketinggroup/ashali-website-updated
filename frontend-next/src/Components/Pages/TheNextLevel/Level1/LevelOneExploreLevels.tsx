import Link from "next/link";

import thumbL2 from "../../../../assets/level1/bottom1.png";
import thumbL3 from "../../../../assets/level1/bottom2.png";
import thumbSecret from "../../../../assets/level1/bottom3.png";

type Card = {
  title: string;
  subtitle: string;
  image: string;
  to: string;
};

const cards: Card[] = [
  { title: "Level 2", subtitle: "Life Is Unfair", image: thumbL2.src, to: "/the-next-level/level-2" },
  { title: "Level 3", subtitle: "Leadership Development", image: thumbL3.src, to: "/the-next-level" },
  { title: "Secret Level", subtitle: "Tailored Development", image: thumbSecret.src, to: "/contact" },
];

const LevelOneExploreLevels = () => {
  return (
    <section className="bg-black px-6 py-16 md:py-20 pb-20 text-white lg:pb-24">
      <div className="mx-auto max-w-[920px]">
        <p className="text-center text-[10px] font-normal uppercase tracking-[0.22em] text-white/38">More pathways</p>
        <h2 className="mt-3 text-center text-xl font-normal tracking-[0.02em] text-white/92 md:text-[1.35rem]">
          Explore other levels
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.to}
              className="group flex aspect-square flex-col items-center justify-center rounded-md border border-white/[0.06] bg-[#0a0a0a] px-5 py-7 ring-1 ring-white/[0.03] transition-[border-color,background-color] duration-300 hover:border-white/[0.12] hover:bg-[#0c0c0c]"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center overflow-hidden rounded-sm opacity-90">
                <img src={card.image} alt="" className="h-full w-full object-contain" />
              </div>
              <p className="text-[13px] font-normal tracking-[0.02em] text-white/88">{card.title}</p>
              <p className="mt-1 text-center text-[12px] font-normal text-white/42">{card.subtitle}</p>
              <span className="mt-5 text-[10px] font-normal uppercase tracking-[0.14em] text-white/38 transition-colors group-hover:text-white/52">
                Explore now ›
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LevelOneExploreLevels;
