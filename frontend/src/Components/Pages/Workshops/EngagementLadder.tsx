import React from "react";

import { Body, Card, Reveal, Section, SectionHeading } from "../../Shared/SectionKit";

const steps = [
  {
    step: "1",
    format: "45–60 minute keynote",
    outcome: "Shared language and a shift in thinking",
  },
  {
    step: "2",
    format: "Keynote + 60–90 minute workshop",
    outcome: "Ideas translated into team priorities",
  },
  {
    step: "3",
    format: "Half-day or full-day leadership lab",
    outcome: "Facilitated decisions and tangible outputs",
  },
  {
    step: "4",
    format: "Diagnostic-led programme",
    outcome: "Capability baseline, roadmap and follow-through",
  },
];

/** §3 — "From a shift in thinking to a measured programme." */
const EngagementLadder: React.FC = () => (
  <Section className="lg:px-14">
    <div className="flex flex-col gap-12">
      <Reveal className="mx-auto max-w-3xl text-center">
        <SectionHeading>From a shift in thinking to a measured programme.</SectionHeading>
      </Reveal>

      <Reveal delay={0.06}>
        <Card className="p-0 sm:p-0">
          <ul className="divide-y divide-white/[0.06]">
            {steps.map((item) => (
              <li
                key={item.step}
                className="grid grid-cols-1 gap-3 p-6 sm:grid-cols-12 sm:items-center sm:gap-6 sm:p-7"
              >
                <span className="text-[11px] font-medium tracking-[0.2em] text-[#d97736] sm:col-span-1">
                  {item.step}
                </span>
                <p className="text-[14px] font-semibold tracking-wide text-white sm:col-span-5 sm:text-[15px]">
                  {item.format}
                </p>
                <Body className="sm:col-span-6">{item.outcome}</Body>
              </li>
            ))}
          </ul>
        </Card>
      </Reveal>
    </div>
  </Section>
);

export default EngagementLadder;
