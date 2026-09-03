import React from "react";

import angellaAvatar from "../../../assets/speaking/angella.png";
import cyrusAvatar from "../../../assets/speaking/husabi.png";
import freddieAvatar from "../../../assets/speaking/monk.png";
import eyLogo from "../../../assets/speaking/ey-logo.png";
import salesforceLogo from "../../../assets/speaking/salesforce.png";
import techItaliaLogo from "../../../assets/speaking/techitalia-logo.png";

import { Card, PendingBadge, Reveal, Section, SectionHeading } from "../../Shared/SectionKit";

/*
  Testimonials.

  These three quotes, names, avatars and organisation logos are the real
  feedback carried over from the pre-rebuild site (they also render on the
  Keynotes page). Job titles were never recorded for them, so `jobTitle` is
  optional — a card publishes once it has a quote, a full name, an organisation
  and an event.

  Do NOT add an entry without all four of those. Anything less falls back to the
  placeholder state rather than going live with partial attribution.
*/

export type Testimonial = {
  id: string;
  quote?: string;
  fullName?: string;
  /** Optional — not recorded for the migrated quotes. */
  jobTitle?: string;
  organisation?: string;
  event?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Organisation logo, shown beneath the name where available. */
  logoSrc?: string;
  logoAlt?: string;
};

function isPublishable(t: Testimonial): boolean {
  return Boolean(
    t.quote?.trim() && t.fullName?.trim() && t.organisation?.trim() && t.event?.trim(),
  );
}

const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Ash delivered an outstanding keynote at our Innova event, sharing valuable insights from Just Eat. Professional, insightful, and a pleasure to work with — many thanks!",
    fullName: "Freddie Monk",
    organisation: "EY",
    event: "Innova",
    imageSrc: freddieAvatar.src,
    imageAlt: "Freddie Monk",
    logoSrc: eyLogo.src,
    logoAlt: "EY",
  },
  {
    id: "t2",
    quote:
      "Ash Ali's talk at Salesforce Tower was exceptional, sharing his experience as an entrepreneur and marketing director at Just Eat. His insights on the Unfair Advantage made it one of our best events.",
    fullName: "Cyrus Hessabi",
    organisation: "Salesforce",
    event: "Salesforce Tower",
    imageSrc: cyrusAvatar.src,
    imageAlt: "Cyrus Hessabi",
    logoSrc: salesforceLogo.src,
    logoAlt: "Salesforce",
  },
  {
    id: "t3",
    quote:
      "I've attended many entrepreneur events, but Ash's talk at TechItalia was by far one of the most authentic, inspiring, and engaging.",
    fullName: "Andrea Angella",
    organisation: "TechItalia",
    event: "TechItalia",
    imageSrc: angellaAvatar.src,
    imageAlt: "Andrea Angella",
    logoSrc: techItaliaLogo.src,
    logoAlt: "TechItalia",
  },
];

const Testimonials: React.FC = () => (
  <Section className="lg:px-14">
    <div className="flex flex-col items-center gap-12">
      <Reveal className="text-center">
        <SectionHeading>
          Trusted to bring experience, honesty and practical value to the room.
        </SectionHeading>
      </Reveal>

      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
        {testimonials.map((item, i) => {
          const live = isPublishable(item);
          return (
            <Reveal key={item.id} delay={i * 0.08} className="h-full">
              <Card className="flex h-full flex-col justify-between">
                {live ? (
                  <>
                    <blockquote className="text-[13px] font-light leading-[1.8] tracking-wide text-gray-300 antialiased sm:text-[14px]">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-8 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                      {item.imageSrc && (
                        <img
                          src={item.imageSrc}
                          alt={item.imageAlt ?? ""}
                          width={48}
                          height={48}
                          loading="lazy"
                          decoding="async"
                          className="h-12 w-12 shrink-0 rounded-full border border-white/20 object-cover"
                          draggable="false"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold tracking-wide text-white">
                          {item.fullName}
                        </p>
                        {item.logoSrc ? (
                          <img
                            src={item.logoSrc}
                            alt={item.logoAlt ?? item.organisation ?? ""}
                            loading="lazy"
                            decoding="async"
                            className="mt-1.5 h-6 w-auto max-w-[100px] object-contain object-left"
                            draggable="false"
                          />
                        ) : (
                          <p className="mt-1 text-[12px] font-light leading-[1.6] text-gray-500">
                            {item.organisation} • {item.event}
                          </p>
                        )}
                      </div>
                    </figcaption>
                  </>
                ) : (
                  <>
                    <p className="text-[13px] font-light leading-[1.8] tracking-wide text-gray-600 antialiased sm:text-[14px]">
                      Approved quote to be added.
                    </p>
                    <div className="mt-8 border-t border-white/[0.06] pt-5">
                      <PendingBadge>Attribution to confirm</PendingBadge>
                      <p className="mt-3 text-[12px] font-light leading-[1.7] text-gray-500">
                        Full name to confirm · Job title · Organisation • Event
                      </p>
                    </div>
                  </>
                )}
              </Card>
            </Reveal>
          );
        })}
      </div>
    </div>
  </Section>
);

export default Testimonials;
