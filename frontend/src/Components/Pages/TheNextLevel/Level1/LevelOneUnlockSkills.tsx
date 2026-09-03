import card1 from "../../../../assets/level2/6789312d9ad3a0aa0bfdf794_HEro.png";
import card2 from "../../../../assets/level2/untitled-00147.png";
import card3 from "../../../../assets/level2/untitled-00611.png";
import card4 from "../../../../assets/level2/1708507682480 1.png";
import card5 from "../../../../assets/level2/FFxtCDMXEAYMKJA.png";

type Segment = {
  section: string;
  title: string;
  image: string;
};

const segments: Segment[] = [
  { section: "Section 1", title: "Introduction to 'life is unfair'", image: card2 },
  { section: "Section 2", title: "Developing the right mindset and harness money's potential", image: card5 },
  { section: "Section 3", title: "Identify strengths and use insights for smarter decisions", image: card1 },
  { section: "Section 4", title: "Leverage your network and environment for success", image: card3 },
  { section: "Section 5", title: "Turn your status into a growth tool", image: card4 },
];

function TimelineCard({ segment, pointer }: { segment: Segment; pointer: "down" | "up" }) {
  const pointerDown = pointer === "down";
  return (
    <div className="relative flex w-full max-w-[220px] flex-col rounded-md border border-white/[0.06] bg-[#0a0a0a] shadow-none ring-1 ring-white/[0.03]">
      {!pointerDown && (
        <div
          className="absolute left-1/2 top-full z-10 -translate-x-1/2 border-x-[10px] border-t-[12px] border-x-transparent border-t-[#0a0a0a]"
          aria-hidden
        />
      )}
      <div className="aspect-[4/3] w-full overflow-hidden border-b border-white/[0.06]">
        <img src={segment.image} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="px-3 py-3 text-left">
        <p className="text-[10px] font-normal uppercase tracking-[0.14em] text-white/38">
          {segment.section}
        </p>
        <p className="mt-2 text-[13px] font-normal leading-snug text-white/72">
          {segment.title}
        </p>
      </div>
      {pointerDown && (
        <div
          className="absolute bottom-full left-1/2 z-10 -translate-x-1/2 border-x-[10px] border-b-[12px] border-x-transparent border-b-[#0a0a0a]"
          aria-hidden
        />
      )}
    </div>
  );
}

const LevelTwoUnlockSkills = () => {
  return (
    <section className="border-b border-white/[0.06] bg-black px-6 py-16 md:py-20 text-white">
      <div className="mx-auto max-w-[1100px]">

        {/* Header */}
        <div className="text-center">
          <p className="text-[10px] font-normal uppercase tracking-[0.22em] text-white/38">
            Curriculum
          </p>
          <h2 className="mt-3 text-xl font-normal tracking-[0.02em] text-white/92 md:text-[1.35rem]">
            Unlock New Skills
          </h2>
          <p className="mt-2 text-[13px] font-normal text-white/48">With Life is Unfair</p>
        </div>

        {/* Mobile: stacked cards */}
        <div className="mt-12 flex flex-col items-center gap-8 md:hidden">
          {segments.map((segment) => (
            <article
              key={segment.section}
              className="w-full max-w-sm rounded-md border border-white/[0.06] bg-[#0a0a0a] ring-1 ring-white/[0.03]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden border-b border-white/[0.06]">
                <img src={segment.image} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="px-3 py-3">
                <p className="text-[10px] font-normal uppercase tracking-[0.14em] text-white/38">
                  {segment.section}
                </p>
                <p className="mt-2 text-[13px] font-normal text-white/72">{segment.title}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Desktop: alternating timeline */}
        <div className="relative mx-auto mt-14 hidden md:block md:max-w-[1050px]">
          <div className="relative grid grid-cols-5 grid-rows-[auto_auto_auto] gap-x-3 lg:gap-x-4">
            {segments.map((segment, i) => {
              const row = i % 2 === 0 ? 1 : 3;
              return (
                <div
                  key={segment.section}
                  className="flex justify-center"
                  style={{ gridColumn: i + 1, gridRow: row }}
                >
                  <TimelineCard segment={segment} pointer={i % 2 === 0 ? "down" : "up"} />
                </div>
              );
            })}

            {/* Centre line + dots */}
            <div
              className="relative z-0 flex items-center justify-between px-[6%]"
              style={{ gridColumn: "1 / -1", gridRow: 2 }}
            >
              <div className="pointer-events-none absolute left-[8%] right-[8%] top-1/2 z-0 h-px -translate-y-1/2 bg-white/[0.08]" />
              {segments.map((s) => (
                <div key={`dot-${s.section}`} className="relative z-10 flex flex-1 justify-center">
                  <span className="h-3 w-3 shrink-0 rounded-full border border-white/25 bg-black ring-4 ring-black" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LevelTwoUnlockSkills;