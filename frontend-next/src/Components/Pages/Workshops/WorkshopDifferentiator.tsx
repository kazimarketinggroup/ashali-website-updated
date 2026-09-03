import React from "react";

import { Body, GradientText, Reveal, Section, SectionHeading } from "../../Shared/SectionKit";

/** §3 — "Insight is useful. A shared decision is more valuable." */
const WorkshopDifferentiator: React.FC = () => (
  <Section>
    <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
      <SectionHeading>
        <GradientText>Insight is useful.</GradientText> A shared decision is more valuable.
      </SectionHeading>
      <Body className="max-w-2xl">
        The sessions combine Ash&apos;s operating experience, the MILES framework, structured
        exercises and—where appropriate—capability data from Uhubs. Teams leave with a shared view
        of the opportunity, the risks and the priorities they will act on.
      </Body>
    </Reveal>
  </Section>
);

export default WorkshopDifferentiator;
