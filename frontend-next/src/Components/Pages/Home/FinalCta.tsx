import React from "react";

import type { AnalyticsEvent } from "../../../utils/analytics";
import { Body, PrimaryLink, Reveal, Section, SectionHeading } from "../../Shared/SectionKit";

type FinalCtaProps = {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaTo?: string;
  /** Analytics event fired when the CTA is clicked. */
  event?: AnalyticsEvent;
};

/**
 * The shared closing CTA block used on the homepage, keynotes, workshops,
 * about, Malaysia/SEA and results pages. Same tokens as the rest of the site.
 */
const FinalCta: React.FC<FinalCtaProps> = ({
  heading,
  body,
  ctaLabel,
  ctaTo = "/contact",
  event,
}) => (
  <Section>
    <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
      <SectionHeading>{heading}</SectionHeading>
      <Body className="max-w-2xl">{body}</Body>
      <PrimaryLink to={ctaTo} event={event}>
        {ctaLabel}
      </PrimaryLink>
    </Reveal>
  </Section>
);

export default FinalCta;
