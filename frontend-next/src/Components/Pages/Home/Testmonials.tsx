"use client";

import React from "react";
import Image, { type StaticImageData } from "next/image";

import angellaAvatar from "../../../assets/speaking/angella.png";
import cyrusAvatar from "../../../assets/speaking/husabi.png";
import freddieAvatar from "../../../assets/speaking/monk.png";
import eyLogo from "../../../assets/speaking/ey-logo.png";
import salesforceLogo from "../../../assets/speaking/salesforce.png";
import techItaliaLogo from "../../../assets/speaking/techitalia-logo.png";

import { Card, PendingBadge, Reveal, Section, SectionHeading } from "../../Shared/SectionKit";
import { useCMS } from "../../../context/CMSContext";

export type Testimonial = {
  id: string;
  quote?: string;
  fullName?: string;
  jobTitle?: string;
  organisation?: string;
  event?: string;
  image?: StaticImageData | string;
  imageAlt?: string;
  logo?: StaticImageData | string;
  logoAlt?: string;
};

const DEFAULT_AVATARS: Record<string, StaticImageData> = {
  t1: freddieAvatar,
  t2: cyrusAvatar,
  t3: angellaAvatar,
};

const DEFAULT_LOGOS: Record<string, StaticImageData> = {
  t1: eyLogo,
  t2: salesforceLogo,
  t3: techItaliaLogo,
};

const Testimonials: React.FC = () => {
  const { cmsData } = useCMS();

  const activeTestimonials = (cmsData?.testimonials || []).filter(
    (t) => t.published !== false && t.featuredOnHome !== false
  );

  return (
    <Section className="lg:px-14">
      <div className="flex flex-col items-center gap-12">
        <Reveal className="text-center">
          <SectionHeading>
            Trusted to bring experience, honesty and practical value to the room.
          </SectionHeading>
        </Reveal>

        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
          {activeTestimonials.map((item, i) => {
            const hasQuote = Boolean(item.quote?.trim() && item.fullName?.trim());
            const staticAvatar = DEFAULT_AVATARS[item.id];
            const staticLogo = DEFAULT_LOGOS[item.id];

            return (
              <Reveal key={item.id} delay={i * 0.08} className="h-full">
                <Card className="flex h-full flex-col justify-between">
                  {hasQuote ? (
                    <>
                      <blockquote className="text-[13px] font-light leading-[1.8] tracking-wide text-gray-300 antialiased sm:text-[14px]">
                        &ldquo;{item.quote}&rdquo;
                      </blockquote>
                      <figcaption className="mt-8 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                        {staticAvatar ? (
                          <Image
                            src={staticAvatar}
                            alt={item.fullName ?? ""}
                            width={48}
                            height={48}
                            loading="lazy"
                            className="h-12 w-12 shrink-0 rounded-full border border-white/20 object-cover"
                            draggable="false"
                          />
                        ) : item.avatarUrl ? (
                          <img
                            src={item.avatarUrl}
                            alt={item.fullName ?? ""}
                            className="h-12 w-12 shrink-0 rounded-full border border-white/20 object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 shrink-0 rounded-full border border-white/20 bg-neutral-800 text-white font-bold flex items-center justify-center text-xs">
                            {item.fullName.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold tracking-wide text-white">
                            {item.fullName}
                          </p>
                          {staticLogo ? (
                            <Image
                              src={staticLogo}
                              alt={item.organisation ?? ""}
                              loading="lazy"
                              width={100}
                              height={24}
                              className="mt-1.5 h-6 w-auto max-w-[100px] object-contain object-left"
                              draggable="false"
                            />
                          ) : item.logoUrl ? (
                            <img
                              src={item.logoUrl}
                              alt={item.organisation ?? ""}
                              className="mt-1.5 h-6 w-auto max-w-[100px] object-contain object-left"
                            />
                          ) : (
                            <p className="mt-1 text-[12px] font-light leading-[1.6] text-gray-500">
                              {item.organisation} {item.event ? `• ${item.event}` : ""}
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
};

export default Testimonials;
