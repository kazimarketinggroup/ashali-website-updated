import React from "react";

import { ANALYTICS_EVENTS } from "../../../utils/analytics";
import {
  Body,
  Card,
  CheckList,
  PrimaryLink,
  Reveal,
  Section,
  SectionHeading,
} from "../../Shared/SectionKit";

type Workshop = {
  number: string;
  title: string;
  promise: string;
  bestFor: string;
  description?: string;
  helps: string[];
  outputs: string[];
  formats: string;
};

const workshops: Workshop[] = [
  {
    number: "01",
    title: "The AI Advantage Lab",
    promise:
      "Identify where your organisation can use AI to create leverage without becoming indistinguishable from everyone else.",
    bestFor:
      "Executive teams, innovation leaders, transformation teams and strategy offsites.",
    helps: [
      "Separate genuine business advantage from generic AI adoption",
      "Map the organisation's existing assets using the MILES framework",
      "Prioritise AI opportunities by value, differentiation and feasibility",
      "Agree what should remain human-led and where AI should augment the work",
    ],
    outputs: [
      "Organisational Advantage Map",
      "AI opportunity and risk matrix",
      "Three to five priority experiments",
      "Draft 90-day action direction",
    ],
    formats: "90-minute executive session · Half-day lab · Full-day strategy workshop",
  },
  {
    number: "02",
    title: "The Human Advantage Leadership Lab",
    promise:
      "Build the leadership habits and team capabilities that become more valuable as AI changes the work.",
    bestFor:
      "Leadership teams, people leaders, functional heads and organisations redesigning roles or capability.",
    helps: [
      "Identify the human capabilities AI makes more—not less—valuable",
      "Recognise where AI is strengthening output but weakening judgement or ownership",
      "Define leadership principles for responsible augmentation",
      "Design practical team experiments that build confidence and capability",
    ],
    outputs: [
      "Human Capability Priority Map",
      "Leadership principles for AI-enabled work",
      "Team experiment backlog",
      "30/60/90-day leadership actions",
    ],
    formats: "90-minute leadership session · Half-day lab · Full-day offsite",
  },
  {
    number: "03",
    title: "The AI-Era Sales Transformation Lab",
    promise:
      "Redesign the people, capability and AI layer of sales performance—not just the tech stack.",
    bestFor:
      "CROs, sales leadership teams, enablement leaders, revenue operations and transformation sponsors.",
    description:
      "Many companies are adding AI tools without a shared view of the sales capabilities, behaviours and workflows that need to change. This workshop helps revenue leaders identify the human and AI capabilities that matter next, using the Uhubs Pulse and Global Sales Capability Index where appropriate.",
    helps: [
      "Diagnose the capability constraints behind current sales performance",
      "Map which work should be human-led, AI-assisted or increasingly agentic",
      "Prioritise the use cases that create value in the sales workflow",
      "Align leadership, enablement and technology priorities around one roadmap",
    ],
    outputs: [
      "Capability baseline or Pulse diagnostic readout",
      "Human/AI sales-work map",
      "Priority capability and use-case matrix",
      "90-day transformation roadmap",
      "Optional executive debrief and follow-on programme design",
    ],
    formats: "Half-day leadership lab · Full-day transformation workshop · Diagnostic-led programme",
  },
];

/** §3 — Three labs, one practical outcome each. */
const WorkshopLabs: React.FC = () => (
  <Section id="workshops" className="lg:px-14">
    <div className="flex flex-col gap-12">
      <Reveal className="mx-auto max-w-3xl text-center">
        <SectionHeading>Three labs. One practical outcome each.</SectionHeading>
      </Reveal>

      <div className="flex flex-col gap-5">
        {workshops.map((workshop, i) => (
          <Reveal key={workshop.number} delay={i * 0.06}>
            <Card>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-6">
                  <span className="text-[11px] font-medium tracking-[0.2em] text-[#d97736]">
                    {workshop.number}
                  </span>
                  <h3 className="mt-4 text-[17px] font-semibold leading-snug tracking-tight text-white sm:text-[19px]">
                    {workshop.title}
                  </h3>
                  <p className="mt-4 text-[13px] font-normal leading-[1.75] tracking-wide text-gray-300 antialiased sm:text-[14px]">
                    {workshop.promise}
                  </p>
                  {workshop.description && <Body className="mt-4">{workshop.description}</Body>}

                  <div className="mt-6">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
                      Best for
                    </p>
                    <Body className="mt-2">{workshop.bestFor}</Body>
                  </div>

                  <div className="mt-6">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
                      Helps the team
                    </p>
                    <CheckList className="mt-4" items={workshop.helps} />
                  </div>

                  <div className="mt-7">
                    <PrimaryLink to="/contact" event={ANALYTICS_EVENTS.workshopEnquiryClick}>
                      Discuss a workshop
                    </PrimaryLink>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="rounded-[4px] border border-white/[0.06] bg-[#141414] p-5 sm:p-6">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
                      Tangible outputs
                    </p>
                    <CheckList className="mt-4" items={workshop.outputs} />

                    <div className="mt-6 border-t border-white/[0.06] pt-5">
                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
                        Formats
                      </p>
                      <Body className="mt-2">{workshop.formats}</Body>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  </Section>
);

export default WorkshopLabs;
