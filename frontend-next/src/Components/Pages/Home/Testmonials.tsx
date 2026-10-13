"use client";

import React from "react";
import Image, { type StaticImageData } from "next/image";

import angellaAvatar from "../../../assets/speaking/angella.png";
import cyrusAvatar from "../../../assets/speaking/husabi.png";
import freddieAvatar from "../../../assets/speaking/monk.png";
import eyLogo from "../../../assets/speaking/ey-logo.png";
import salesforceLogo from "../../../assets/speaking/salesforce.png";
import techItaliaLogo from "../../../assets/speaking/techitalia-logo.png";

import { Card, Reveal, Section, SectionHeading } from "../../Shared/SectionKit";
import { useCMS } from "../../../context/CMSContext";

export type Testimonial = {
  id: string;
  quote: string;
  fullName: string;
  organisation: string;
  avatar: StaticImageData;
  logo: StaticImageData;
};

const VERIFIED_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    fullName: "Freddie Monk",
    organisation: "EY",
    avatar: freddieAvatar,
    logo: eyLogo,
    quote:
      "Ash delivered an outstanding keynote at our Innova event, sharing valuable insights from Just Eat. Professional, insightful, and a pleasure to work with, many thanks!",
  },
  {
    id: "t2",
    fullName: "Cyrus Hessabi",
    organisation: "Salesforce",
    avatar: cyrusAvatar,
    logo: salesforceLogo,
    quote:
      "Ash Ali's talk at Salesforce Tower was exceptional, sharing his experience as an entrepreneur and marketing director at Just Eat. His insights on the Unfair Advantage made it one of our best events.",
  },
  {
    id: "t3",
    fullName: "Andrea Angella",
    organisation: "TechItalia",
    avatar: angellaAvatar,
    logo: techItaliaLogo,
    quote:
      "I've attended many entrepreneur events, but Ash's talk at TechItalia was by far one of the most authentic, inspiring, and engaging.",
  },
];

const Testimonials: React.FC = () => {
  const { cmsData } = useCMS();

  // Map CMS overrides over verified records if present
  const items = VERIFIED_TESTIMONIALS.map((verified) => {
    const cmsItem = cmsData?.testimonials?.find(
      (t) => t.id === verified.id || t.fullName?.toLowerCase().includes(verified.fullName.toLowerCase().split(" ")[0])
    );
    return {
      ...verified,
      quote: cmsItem?.quote || verified.quote,
      fullName: cmsItem?.fullName || verified.fullName,
      organisation: cmsItem?.organisation || verified.organisation,
    };
  });

  return (
    <Section className="lg:px-14">
      <div className="flex flex-col items-center gap-12">
        <Reveal className="text-center">
          <SectionHeading>
            Trusted to bring experience, honesty and practical value to the room.
          </SectionHeading>
        </Reveal>

        {/* 3 Approved Testimonials matching Image 1 & Section F01 */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08} className="h-full">
              <Card className="flex h-full flex-col justify-between bg-[#141414] border border-white/[0.08] p-6 sm:p-7 rounded-[8px]">
                <blockquote className="text-[13px] font-light leading-[1.8] tracking-wide text-gray-300 antialiased sm:text-[14px]">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                {/* Profile row matching Image 1: Circular Avatar + Name + Company Logo */}
                <figcaption className="mt-8 flex items-center gap-4 border-t border-white/[0.08] pt-5">
                  <Image
                    src={item.avatar}
                    alt={item.fullName}
                    width={52}
                    height={52}
                    loading="lazy"
                    className="h-13 w-13 shrink-0 rounded-full border border-white/20 object-cover"
                    draggable="false"
                  />
                  <div className="min-w-0 flex flex-col justify-center">
                    <p className="text-[14px] font-semibold tracking-wide text-white">
                      {item.fullName}
                    </p>
                    <div className="mt-1.5 flex items-center">
                      <Image
                        src={item.logo}
                        alt={item.organisation}
                        loading="lazy"
                        width={90}
                        height={24}
                        className="h-6 w-auto max-w-[90px] object-contain object-left filter brightness-95"
                        draggable="false"
                      />
                    </div>
                  </div>
                </figcaption>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Testimonials;
