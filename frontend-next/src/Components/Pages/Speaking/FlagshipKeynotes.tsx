import React from "react";

import keynoteStage from "../../../assets/speaking/int5Dubai.png";
import keynoteTeam from "../../../assets/speaking/inspiringInsight.png";
import keynoteCandid from "../../../assets/speaking/eventinpakistan.png";
import { ANALYTICS_EVENTS } from "../../../utils/analytics";
import {
  Body,
  Card,
  CheckList,
  MediaFrame,
  PrimaryLink,
  Reveal,
  Section,
  SectionHeading,
} from "../../Shared/SectionKit";

type Keynote = {
  number: string;
  title: string;
  promise: string;
  description: string;
  outcomes: string[];
  bestFor: string;
  image: string;
  imageAlt: string;
};

const keynotes: Keynote[] = [
  {
    number: "01",
    title: "The Unfair Advantage in the age of AI",
    promise:
      "How leaders identify the advantages they already possess, and use AI to amplify rather than erase them.",
    description:
      "AI is changing how advantage is created, but not every organisation needs the same tools or strategy. In this keynote, Ash shows leaders how to identify the assets, context, relationships, judgement and capabilities that competitors cannot easily copy, and how to use AI to multiply their value.",
    outcomes: [
      "Distinguish genuine competitive advantage from AI theatre",
      "Apply the MILES framework to an individual, team or organisation",
      "Identify where AI creates leverage and where it risks eroding differentiation",
      "Choose practical next steps rather than accumulating more tools",
    ],
    bestFor:
      "Executive audiences, innovation events, founder conferences, strategy days and organisations navigating AI driven change.",
    image: keynoteStage.src,
    imageAlt:
      "Ash Ali presenting the MILES framework to a seated audience at in5 Dubai",
  },
  {
    number: "02",
    title: "The human advantage: leading when AI changes the work",
    promise: "What must stay human when machines become faster, cheaper and more capable.",
    description:
      "AI can increase output while quietly weakening judgement, curiosity and ownership. Ash explores the capabilities leaders must protect and strengthen, and how to build teams that use AI confidently without outsourcing their thinking.",
    outcomes: [
      "Recognise the human capabilities that become more valuable as AI spreads",
      "Separate productive augmentation from passive dependence",
      "Create an environment that rewards curiosity, judgement and experimentation",
      "Translate AI anxiety into practical leadership choices",
    ],
    bestFor:
      "Leadership conferences, people and talent programmes, future-of-work events, transformation teams and management offsites.",
    image: keynoteTeam.src,
    imageAlt:
      "Ash Ali speaking to a team at Salesforce with The Unfair Advantage on screen behind him",
  },
  {
    number: "03",
    title: "From outsider to operator: building advantage without the usual access",
    promise:
      "A candid founder story about background, reinvention, judgement and creating opportunity before anyone gives permission.",
    description:
      "Raised in inner-city Birmingham, Ash left college twice, taught himself digital skills and went on to help build one of the UK's defining technology growth stories. This is not an overnight-success tale. It is a practical account of curiosity, constraint, access, mistakes and learning how to turn difference into momentum.",
    outcomes: [
      "See background and identity as potential sources of advantage",
      "Understand the role of access, timing, networks and self-belief",
      "Take action before certainty or permission arrives",
      "Build a more honest definition of success and resilience",
    ],
    bestFor:
      "Company-wide events, founder communities, business schools, talent programmes, diversity and social-mobility events.",
    image: keynoteCandid.src,
    imageAlt:
      "Ash Ali working through ideas at a whiteboard with a small group of founders",
  },
];

/** §2 — Three flagship keynotes. */
const FlagshipKeynotes: React.FC = () => (
  <Section id="keynotes" className="lg:px-14">
    <div className="flex flex-col gap-12">
      <Reveal className="mx-auto max-w-3xl text-center">
        <SectionHeading>
          Three keynotes, each built around a decision the room needs to make.
        </SectionHeading>
      </Reveal>

      <div className="flex flex-col gap-5">
        {keynotes.map((keynote, i) => (
          <Reveal key={keynote.number} delay={i * 0.06}>
            <Card>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-7">
                  <span className="text-[11px] font-medium tracking-[0.2em] text-[#d97736]">
                    {keynote.number}
                  </span>
                  <h3 className="mt-4 text-[17px] font-semibold leading-snug tracking-tight text-white sm:text-[19px]">
                    {keynote.title}
                  </h3>
                  <p className="mt-4 text-[13px] font-normal leading-[1.75] tracking-wide text-gray-300 antialiased sm:text-[14px]">
                    {keynote.promise}
                  </p>
                  <Body className="mt-4">{keynote.description}</Body>

                  <div className="mt-6">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
                      Best for
                    </p>
                    <Body className="mt-2">{keynote.bestFor}</Body>
                  </div>

                  <div className="mt-7">
                    <PrimaryLink to="/contact" event={ANALYTICS_EVENTS.keynoteEnquiryClick}>
                      Enquire about a keynote
                    </PrimaryLink>
                  </div>
                </div>

                <div className="flex flex-col gap-5 lg:col-span-5">
                  <MediaFrame src={keynote.image} alt={keynote.imageAlt} ratio="aspect-[16/10]" />

                  <div className="rounded-[4px] border border-white/[0.06] bg-[#141414] p-5 sm:p-6">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
                      Audiences leave able to
                    </p>
                    <CheckList className="mt-4" items={keynote.outcomes} />
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

export default FlagshipKeynotes;
