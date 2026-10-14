"use client";

import React from "react";
import {
  Body,
  Card,
  Reveal,
  Section,
  SectionHeading,
  SecondaryLink,
} from "../../Shared/SectionKit";
import { useCMS } from "../../../context/CMSContext";

const defaultIdeas = [
  {
    number: "01",
    title: "The Unfair Advantage in the Age of AI",
    description: "Find the assets and capabilities AI can amplify, not erase.",
  },
  {
    number: "02",
    title: "The Human Advantage",
    description:
      "Build teams that retain judgement, curiosity and adaptability as machines get smarter.",
  },
  {
    number: "03",
    title: "From Outsider to Operator",
    description:
      "Turn background, constraint and difference into momentum and commercial advantage.",
  },
];

/** §1 — "Three ideas built for this moment." */
const SignatureIdeas: React.FC = () => {
  const { cmsData } = useCMS();
  const si = cmsData?.signatureIdeas;

  const heading = si?.heading || "Three ideas built for this moment.";
  const buttonText = si?.buttonText || "See the full keynotes";
  const buttonLink = si?.buttonLink || "/speaking";
  const ideas = si?.ideas && si.ideas.length > 0 ? si.ideas : defaultIdeas;

  return (
    <Section>
      <div className="flex flex-col items-center gap-12">
        <Reveal className="text-center">
          <SectionHeading>{heading}</SectionHeading>
        </Reveal>

        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
          {ideas.map((idea, i) => (
            <Reveal key={idea.number || i} delay={i * 0.08} className="h-full">
              <Card className="flex h-full flex-col">
                <span className="text-[11px] font-medium tracking-[0.2em] text-[#d97736]">
                  {idea.number}
                </span>
                <h3 className="mt-4 text-[15px] font-semibold leading-snug tracking-wide text-white sm:text-[16px]">
                  {idea.title}
                </h3>
                <Body className="mt-4">{idea.description}</Body>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <SecondaryLink to={buttonLink}>{buttonText}</SecondaryLink>
        </Reveal>
      </div>
    </Section>
  );
};

export default SignatureIdeas;
