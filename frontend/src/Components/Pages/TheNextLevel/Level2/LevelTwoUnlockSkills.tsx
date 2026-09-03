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

function TimelineCard({
  segment,
  position,
}: {
  segment: Segment;
  position: "top" | "bottom";
}) {
  const isTop = position === "top";

  return (
    <div className="relative w-full overflow-hidden rounded-sm border border-white/[0.08] bg-[#111] transition duration-300 hover:border-white/20">

      {/* Image on top for top cards */}
      {isTop && (
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img src={segment.image} alt="" className="h-full w-full object-cover" />
        </div>
      )}

      {/* Text */}
      <div className="px-3 py-3">
        <p className="text-[9px] font-medium uppercase tracking-[0.1em] text-white/30">
          {segment.section}
        </p>
        <p className="mt-1 text-[11px] font-normal leading-snug text-white/80">
          {segment.title}
        </p>
      </div>

      {/* Image on bottom for bottom cards */}
      {!isTop && (
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img src={segment.image} alt="" className="h-full w-full object-cover" />
        </div>
      )}

      {/* Triangle pointer */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 border-x-[7px] border-x-transparent z-20
          ${isTop
            ? "top-full border-t-[7px] border-t-[#111]"
            : "bottom-full border-b-[7px] border-b-[#111]"
          }`}
      />
    </div>
  );
}

const LevelTwoUnlockSkills = () => {
  return (
    <section className="bg-black px-4 sm:px-6 py-16 md:py-20 text-white overflow-hidden">
      <div className="mx-auto max-w-[900px] xl:max-w-[1000px]">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white/90 leading-snug">
            Unlock New Skills
            <br />
            <span className="text-lg font-light text-white/55">
              with Life is Unfair
            </span>
          </h2>
        </div>

        {/* Mobile — stacked */}
        <div className="flex flex-col gap-4 md:hidden">
          {segments.map((seg) => (
            <div
              key={seg.section}
              className="w-full overflow-hidden rounded-sm border border-white/10 bg-[#111]"
            >
              <img src={seg.image} alt="" className="w-full aspect-video object-cover" />
              <div className="p-3">
                <p className="text-[9px] uppercase tracking-[0.1em] text-white/35">
                  {seg.section}
                </p>
                <p className="mt-1 text-[12px] text-white/80 leading-snug">
                  {seg.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop — zig-zag timeline */}
        <div className="relative hidden md:block">

          {/* Centre horizontal line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2" />

          <div className="relative grid grid-cols-5 gap-x-2 lg:gap-x-3">
            {segments.map((seg, i) => {
              const isTop = i % 2 === 0;
              return (
                <div key={seg.section} className="relative flex flex-col items-center">

                  {/* Top card */}
                  {isTop ? (
                    <div className="w-full pb-5">
                      <TimelineCard segment={seg} position="top" />
                    </div>
                  ) : (
                    <div
                      style={{ height: "var(--card-h, 200px)" }}
                      className="w-full"
                      ref={(el) => {
                        if (el) {
                          // sync spacer height dynamically
                          const sibling = el.parentElement?.querySelector(".card-bottom");
                          if (sibling) {
                            el.style.height = sibling.getBoundingClientRect().height + 20 + "px";
                          }
                        }
                      }}
                    />
                  )}

                  {/* Dot */}
                  <div className="relative z-10 flex h-5 w-5 items-center justify-center flex-shrink-0">
                    <div className="h-2.5 w-2.5 rounded-full bg-black border border-white/35 ring-[5px] ring-black" />
                  </div>

                  {/* Bottom card */}
                  {!isTop ? (
                    <div className="card-bottom w-full pt-5">
                      <TimelineCard segment={seg} position="bottom" />
                    </div>
                  ) : (
                    <div className="w-full" style={{ height: "200px" }} />
                  )}

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default LevelTwoUnlockSkills;