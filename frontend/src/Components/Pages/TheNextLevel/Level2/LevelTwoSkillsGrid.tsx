const columns: { title: string; items: string[] }[] = [
  {
    title: "Mindset and Money",
    items: [
      "Develop the right mindset for navigating unfair situations",
      "Clarify what money means for you and your venture",
      "Align decisions with long-term leverage, not noise",
    ],
  },
  {
    title: "Intelligence and Insight",
    items: [
      "Identify the intelligence types that drive your strengths",
      "Turn signals into insight and faster experiments",
      "Build judgment loops your team can repeat",
    ],
  },
  {
    title: "Location and Luck",
    items: [
      "Use geography and networks as multipliers",
      "Engineer luck surface area without magical thinking",
      "Adapt plays when context shifts overnight",
    ],
  },
  {
    title: "Status and Scale",
    items: [
      "Understand how status opens or closes doors",
      "Communicate credibility without overselling",
      "Compound reputation into repeatable opportunities",
    ],
  },
];

function CheckIcon() {
  return (
    <svg className="mt-[3px] h-3 w-3 shrink-0 text-teal-500/55" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.082l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const LevelTwoSkillsGrid = () => {
  return (
    <section className="border-b border-white/[0.06] bg-black px-6 py-16 md:py-20 text-white">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-center text-[10px] font-normal uppercase tracking-[0.22em] text-white/38">Outcomes</p>
        <h2 className="mt-3 text-center text-xl font-normal tracking-[0.02em] text-white/92 md:text-[1.35rem]">
          Leveling your skills
        </h2>
        <div className="mt-11 grid grid-cols-1 gap-9 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-[13px] font-normal leading-snug text-white/78">{col.title}</h3>
              <div className="mt-3 border-t border-white/[0.08] pt-3.5">
                <ul className="space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[13px] font-normal leading-relaxed text-white/48">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LevelTwoSkillsGrid;
