import React from "react";

import { Body, Card, Reveal, Section, SectionHeading } from "../../Shared/SectionKit";

const formats = [
  {
    title: "Founder lessons from the messy middle",
    description: "Fireside chat / founder-session format",
  },
  {
    title: "Executive briefing",
    description: "Shorter, high-trust session for a board or leadership team",
  },
  {
    title: "Keynote-to-action",
    description: "Keynote followed by a facilitated 60-90 minute workshop",
  },
  {
    title: "Panels, podcasts and media",
    description:
      "Operator insight on AI, advantage, sales transformation and entrepreneurship",
  },
];

/** §2 — Other ways Ash works with an audience. */
const AdditionalFormats: React.FC = () => (
  <Section className="lg:px-14 py-0">
    <div className="flex flex-col items-center gap-12">
      <Reveal className="text-center">
        <SectionHeading>Other ways Ash works with an audience.</SectionHeading>
      </Reveal>

      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
        {formats.map((format, i) => (
          <Reveal key={format.title} delay={i * 0.06} className="h-full">
            <Card className="h-full">
              <h3 className="text-[15px] font-semibold leading-snug tracking-wide text-white sm:text-[16px]">
                {format.title}
              </h3>
              <Body className="mt-3">{format.description}</Body>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  </Section>
);

export default AdditionalFormats;
