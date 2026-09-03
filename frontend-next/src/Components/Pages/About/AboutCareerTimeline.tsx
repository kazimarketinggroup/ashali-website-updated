"use client";

import React from "react";
import { Home, MapPin } from "lucide-react";
import { motion, type Variants } from "framer-motion";

import img1999 from "../../../assets/home/timeline1.png";
import img2001 from "../../../assets/home/timeline2.png";
import img2008 from "../../../assets/home/timeline3.png";
import shadow1999 from "../../../assets/home/shadow1.png";
import shadow2001 from "../../../assets/home/shadow2.png";
import shadow2008 from "../../../assets/home/shadow3.png";

import imgBookPair from "../../../assets/about/timeline-fare-exchange.png";
import imgSigning from "../../../assets/about/timeline-washplus.png";
import imgFare from "../../../assets/about/timeline-book-signing.png";
import imgWash from "../../../assets/about/timeline-award-books.png";
import imgUhubs from "../../../assets/about/uhubs-logo-white.png";

import logoFare from "../../../assets/about/fare-exchange-logo.png";
import logoWash from "../../../assets/about/washplus-logo.png";
import logoUhubs from "../../../assets/about/uhubslogo.png";
import logoWarwick from "../../../assets/about/warwick-university-logo.png";
import logoRoyal from "../../../assets/about/royal-holloway-logo.png";
import logoLoughborough from "../../../assets/about/loughborough-university-logo.png";
import logoImperial from "../../../assets/about/imperial-college-logo.png";
import logoTedx from "../../../assets/about/tedx-logo.png";
import logoSalesforce from "../../../assets/about/salesforce-logo.png";
import logoEy from "../../../assets/about/ey-logo.png";
import logoWework from "../../../assets/about/wework-logo-white.png";
import logoNatwest from "../../../assets/about/natwest-logo-white.png";
import logoKanguru from "../../../assets/about/kanguru-id-logo.png";
import logoWorq from "../../../assets/about/worq-logo.png";

import railTedx from "../../../assets/about/ash-tedx-talk-stage.png";
import railSalesforce from "../../../assets/about/ash-salesforce-tower-talk.png";
import railEy from "../../../assets/about/ash-ey-innova-event.png";
import railDubai from "../../../assets/about/ash-salesforce-tower-talk.png";
import railBelfast from "../../../assets/about/ash-ey-innova-event.png";
import railWework from "../../../assets/about/ash-wework-london-talk.png";
import railLondonTalk from "../../../assets/about/ash-london-tech-week.png";
import railBirmingham from "../../../assets/about/ash-birmingham-natwest-talk.png";
import railIndonesia from "../../../assets/about/ash-indonesia-speaking.png";
import railMalaysia from "../../../assets/about/ash-malaysia-speaking.png";

import { brandGradientTextStyle } from "../../../constants/brandGradient";

type Side = "left" | "right";

type RailItem = {
  image: string;
  location: string;
  brand: React.ReactNode;
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const smallRailItems: RailItem[] = [
  { image: railTedx.src, location: "London, UK", brand: <img src={logoTedx.src} alt="TEDx Royal Holloway" className="h-[clamp(5px,1.3vw,11px)] w-auto" /> },
  { image: railSalesforce.src, location: "London, UK", brand: <img src={logoSalesforce.src} alt="Salesforce" className="h-[clamp(8px,2.3vw,19px)] w-auto" /> },
  { image: railEy.src, location: "London, UK", brand: <img src={logoEy.src} alt="EY" className="h-[clamp(6px,1.55vw,13px)] w-auto" /> },
];

const mainRailItems: RailItem[] = [
  { image: railDubai.src, location: "Dubai, UAE", brand: <span className="text-[clamp(9px,2.65vw,22px)] font-black leading-none tracking-[-0.12em] text-white">ios</span> },
  { image: railBelfast.src, location: "Belfast, Northern Ireland", brand: <span className="text-[clamp(5px,1.45vw,12px)] font-black leading-none text-[#d94cff]">syncNI</span> },
  { image: railWework.src, location: "London, UK", brand: <img src={logoWework.src} alt="WeWork" className="h-[clamp(5px,1.3vw,11px)] w-auto" /> },
  { image: railLondonTalk.src, location: "London, UK", brand: <span className="text-[clamp(4px,1.05vw,9px)] font-black uppercase leading-none text-white">TECH WEEK</span> },
  { image: railBirmingham.src, location: "Birmingham, UK", brand: <img src={logoNatwest.src} alt="NatWest" className="h-[clamp(5px,1.45vw,12px)] w-auto" /> },
  { image: railIndonesia.src, location: "Indonesia", brand: <img src={logoKanguru.src} alt="Kanguru id" className="h-[clamp(7px,1.8vw,15px)] w-auto" /> },
  { image: railMalaysia.src, location: "Kuala Lumpur, Malaysia", brand: <img src={logoWorq.src} alt="Worq" className="h-[clamp(7px,1.9vw,16px)] w-auto" /> },
];

function Location({ children, align = "left" }: { children: React.ReactNode; align?: Side }) {
  return (
    <div className={`mb-[clamp(4px,1vw,8px)] flex items-center gap-[clamp(2px,0.55vw,5px)] text-[clamp(5px,1.05vw,9px)] font-medium text-white ${align === "right" ? "justify-end" : ""}`}>
      <MapPin className="h-[clamp(5px,1.05vw,9px)] w-[clamp(5px,1.05vw,9px)] fill-white stroke-white" strokeWidth={2.6} />
      <span>{children}</span>
    </div>
  );
}

function PhotoFrame({ src, alt, edge = "left", size = "normal" }: { src: string; alt: string; edge?: Side; size?: "small" | "normal" | "large" }) {
  const dimensions =
    size === "small"
      ? "h-[clamp(58px,16vw,154px)] w-[clamp(58px,16vw,154px)]"
      : size === "large"
        ? "h-[clamp(78px,20.5vw,202px)] w-[clamp(78px,20.5vw,202px)]"
        : "h-[clamp(68px,18vw,178px)] w-[clamp(68px,18vw,178px)]";

  return (
    <div className={`relative ${dimensions}`}>
      <span className={`absolute top-[-5px] h-[5px] w-[78%] bg-[#ff781d] sm:top-[-7px] sm:h-[7px] ${edge === "left" ? "left-[-5px] sm:left-[-7px]" : "right-[-5px] sm:right-[-7px]"}`} />
      <span className={`absolute bottom-[-5px] h-[5px] w-[34%] bg-[#00a59d] sm:bottom-[-7px] sm:h-[7px] ${edge === "left" ? "left-[-5px] sm:left-[-7px]" : "right-[-5px] sm:right-[-7px]"}`} />
      <span className={`absolute bottom-[-5px] top-[-5px] w-[5px] bg-[#00a59d] sm:bottom-[-7px] sm:top-[-7px] sm:w-[7px] ${edge === "left" ? "left-[-5px] sm:left-[-7px]" : "right-[-5px] sm:right-[-7px]"}`} />
      <img src={src} alt={alt} className="relative z-[1] h-full w-full object-cover" />
    </div>
  );
}

function CopyBlock({
  children,
  align = "left",
  className = "",
}: {
  children: React.ReactNode;
  align?: Side;
  className?: string;
}) {
  return (
    <div className={`relative z-[2] max-w-[clamp(102px,27vw,246px)] text-[clamp(6.2px,1.22vw,11.5px)] font-light leading-[1.5] text-white/90 ${align === "right" ? "text-right" : "text-left"} ${className}`}>
      {children}
    </div>
  );
}

function Rail({ items, topLine = false }: { items: RailItem[]; topLine?: boolean }) {
  return (
    <aside className="relative flex w-[clamp(44px,13vw,106px)] shrink-0 flex-col items-center gap-[clamp(7px,1.9vw,16px)]">
      {topLine ? (
        <>
          <span className="absolute -left-[clamp(24px,8vw,72px)] top-[clamp(46px,11.8vw,98px)] h-px w-[clamp(24px,8vw,72px)] bg-white/45" />
          <span className="absolute left-0 top-[clamp(46px,11.8vw,98px)] h-[clamp(86px,23vw,188px)] w-px bg-white/45" />
        </>
      ) : null}
      {items.map((item, index) => (
        <div key={`${item.location}-${index}`} className="text-center">
          <img src={item.image} alt={item.location} className="mx-auto h-[clamp(28px,8vw,66px)] w-[clamp(38px,10.8vw,88px)] object-cover" />
          <p className="mt-[clamp(2px,0.6vw,5px)] text-[clamp(4px,0.85vw,7px)] font-semibold leading-[1.1] text-white">{item.location}</p>
          <div className="mt-[clamp(1px,0.45vw,4px)] flex h-[clamp(8px,2.1vw,17px)] items-center justify-center [&_img]:max-h-full [&_img]:max-w-full">{item.brand}</div>
        </div>
      ))}
    </aside>
  );
}

function GuestLecturerRail() {
  return (
    <aside className="relative block w-[clamp(46px,14vw,120px)] shrink-0">
      <span className="absolute left-[46%] top-0 h-px w-[clamp(26px,9vw,76px)] bg-white/45" />
      <span className="absolute left-[46%] top-0 h-[clamp(130px,37vw,306px)] w-px bg-white/45" />
      <div className="flex w-full flex-col items-center gap-[clamp(7px,2vw,17px)] pt-[clamp(16px,4.4vw,36px)]">
        <p className="text-[clamp(4.5px,1vw,9px)] font-semibold leading-none text-white">Guest Lecturer</p>
        <img src={logoWarwick.src} alt="Warwick" className="h-[clamp(10px,3vw,25px)] w-auto object-contain" />
        <img src={logoRoyal.src} alt="Royal Holloway" className="h-[clamp(12px,3.4vw,29px)] w-auto object-contain" />
        <span className="text-[clamp(13px,3.5vw,29px)] font-black leading-none tracking-[-0.04em] text-white">UCL</span>
        <img src={logoLoughborough.src} alt="Loughborough University" className="h-[clamp(8px,2.2vw,18px)] w-auto object-contain" />
        <img src={logoImperial.src} alt="Imperial College Business School" className="h-[clamp(12px,3.4vw,29px)] w-auto object-contain" />
        <span className="text-[clamp(11px,2.9vw,24px)] font-light leading-none tracking-[0.04em] text-white">ESCP</span>
      </div>
    </aside>
  );
}

function JustEatLogo() {
  return (
    <span className="mb-[clamp(3px,0.9vw,8px)] inline-flex items-center gap-[clamp(2px,0.5vw,4px)] text-[clamp(7px,1.55vw,13px)] font-black uppercase italic leading-none text-[#ff781d]">
      <Home className="h-[clamp(8px,1.8vw,15px)] w-[clamp(8px,1.8vw,15px)] fill-[#ff781d] stroke-[#ff781d]" strokeWidth={2.5} />
      JUST EAT
    </span>
  );
}

function IntroTimeline() {
  return (
    <div className="mx-auto flex max-w-[820px] gap-[clamp(8px,2.2vw,19px)] px-[clamp(10px,2.3vw,18px)] pt-[clamp(18px,4.2vw,36px)] lg:px-0">
      <div className="w-[clamp(46px,14vw,120px)] shrink-0">
        {/* <h2 className="w-[clamp(132px,35vw,290px)] text-[clamp(10px,2.9vw,24px)] font-medium leading-[1.13] text-white">
          From practitioner to <span style={brandGradientTextStyle}>thought</span>
          <br />
          <span style={brandGradientTextStyle}>leader</span>
        </h2> */}
      </div>

      <div className="relative min-w-0 flex-1 pb-[clamp(6px,1.5vw,12px)]">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <p className="mb-[clamp(10px,2.5vw,22px)] text-center text-[clamp(14px,4vw,34px)] font-black leading-none tracking-[-0.04em]">1999-2000</p>
          <div className="grid grid-cols-2 gap-0">
            <div className="flex justify-end border-r border-white/35 pr-[clamp(12px,3.7vw,31px)]">
              <PhotoFrame src={img1999.src} alt="Ash Ali in 1999" edge="left" size="normal" />
            </div>
            <div className="relative flex justify-start pl-[clamp(12px,3.7vw,31px)]">
              <img src={shadow1999.src} alt="" className="absolute left-[70px] top-[-44px] hidden h-[164px] w-[164px] object-cover opacity-[0.14] blur-[1px] lg:block" />
              <CopyBlock>
                <h3 className="mb-[clamp(3px,0.9vw,7px)] text-[clamp(6px,1.35vw,11px)] font-black uppercase leading-[1.18] text-white">
                  CHASING AMBITION
                  <br />
                  WITH NOTHING BUT A DREAM
                </h3>
                <Location>Small Heath, Birmingham</Location>
                <p>Packed his bags and moved to London with nothing, determined to break into the world of marketing and startups. Self-taught and relentless, he carved his own path without a university degree.</p>
              </CopyBlock>
            </div>
          </div>
        </motion.div>

        <motion.div className="mt-[clamp(14px,3.2vw,28px)]" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <p className="mb-[clamp(10px,2.5vw,22px)] text-center text-[clamp(14px,4vw,34px)] font-black leading-none tracking-[-0.04em]">2001-2007</p>
          <div className="grid grid-cols-2 gap-0">
            <div className="relative flex justify-end border-r border-white/35 pr-[clamp(12px,3.7vw,31px)]">
              <img src={shadow2001.src} alt="" className="absolute right-[86px] top-[-26px] hidden h-[150px] w-[150px] object-cover opacity-[0.12] blur-[1px] lg:block" />
              <CopyBlock align="right">
                <h3 className="mb-[clamp(3px,0.9vw,7px)] text-[clamp(6px,1.35vw,11px)] font-black uppercase leading-[1.18] text-white">
                  VARIOUS MARKETING
                  <br />
                  EXECUTIVE ROLES
                </h3>
                <Location align="right">London</Location>
                <p>Worked across various marketing roles, honing expertise in digital strategy, growth hacking, and brand positioning. Helped multiple companies scale their online presence.</p>
              </CopyBlock>
            </div>
            <div className="flex justify-start pl-[clamp(12px,3.7vw,31px)]">
              <PhotoFrame src={img2001.src} alt="Ash Ali in 2001" edge="right" size="normal" />
            </div>
          </div>
        </motion.div>

        <motion.div className="mt-[clamp(15px,3.4vw,30px)]" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <p className="mb-[clamp(10px,2.5vw,22px)] text-center text-[clamp(14px,4vw,34px)] font-black leading-none tracking-[-0.04em]">2008</p>
          <div className="grid grid-cols-2 gap-0">
            <div className="flex justify-end border-r border-white/35 pr-[clamp(12px,3.7vw,31px)]">
              <PhotoFrame src={img2008.src} alt="Ash Ali at Just Eat" edge="left" size="normal" />
            </div>
            <div className="relative flex justify-start pl-[clamp(12px,3.7vw,31px)]">
              <img src={shadow2008.src} alt="" className="absolute left-[48px] top-[-34px] hidden h-[168px] w-[168px] object-cover opacity-[0.12] blur-[1px] lg:block" />
              <CopyBlock>
                <JustEatLogo />
                <h3 className="mb-[clamp(3px,0.9vw,7px)] text-[clamp(6px,1.35vw,11px)] font-black uppercase leading-[1.18] text-white">
                  BECOMING JUST EAT'S
                  <br />
                  FIRST MARKETING DIRECTOR
                </h3>
                <Location>London</Location>
                <p>Joined Just Eat as the first marketing director, pioneering growth strategies that led to a GBP 1.5 billion IPO, the UK's biggest tech IPO of the decade.</p>
              </CopyBlock>
            </div>
          </div>
        </motion.div>
      </div>

      <Rail items={smallRailItems} topLine />
    </div>
  );
}

function MiddleTimeline() {
  return (
    <div className="mx-auto mt-[clamp(0px,0.7vw,6px)] flex max-w-[820px] gap-[clamp(8px,2.2vw,19px)] px-[clamp(10px,2.3vw,18px)] lg:px-0">
      <GuestLecturerRail />

      <div className="relative min-w-0 flex-1 pb-[16px]">
        <span className="pointer-events-none absolute bottom-0 left-1/2 top-[clamp(22px,5.8vw,48px)] w-px -translate-x-1/2 bg-white/20" />

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <p className="mb-[clamp(10px,2.5vw,22px)] text-center text-[clamp(14px,4.1vw,35px)] font-black leading-none tracking-[-0.04em]">2012-2016</p>
          <div className="grid grid-cols-2 gap-0">
            <div className="flex justify-end border-r border-white/35 pr-[clamp(12px,3.6vw,30px)]">
              <CopyBlock align="right">
                <div className="mb-[8px] flex justify-end">
                  <img src={logoFare.src} alt="Fare Exchange" className="h-[clamp(10px,2.65vw,22px)] w-auto object-contain" />
                </div>
                <h3 className="mb-[clamp(3px,0.9vw,7px)] text-[clamp(6px,1.35vw,11px)] font-black uppercase leading-[1.18] text-white">
                  FOUNDED
                  <br />
                  FAIR EXCHANGE
                </h3>
                <Location align="right">London</Location>
                <p>Founded and launched a mobile performance based lead generation service for phone call tracking in the taxi and private minicab sector. At the end of his journey, he successfully scaled the business and sold Fare Exchange for a seven-figure sum.</p>
              </CopyBlock>
            </div>
            <div className="flex justify-start pl-[clamp(12px,3.6vw,30px)]">
              <PhotoFrame src={imgFare.src} alt="Ash Ali during Fare Exchange" edge="right" size="normal" />
            </div>
          </div>
        </motion.div>

        <motion.div className="mt-[clamp(18px,4.1vw,36px)]" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <p className="mb-[clamp(10px,2.5vw,22px)] text-center text-[clamp(14px,4.1vw,35px)] font-black leading-none tracking-[-0.04em]">2015-2018</p>
          <div className="grid grid-cols-2 gap-0">
            <div className="flex justify-end border-r border-white/35 pr-[clamp(12px,3.6vw,30px)]">
              <PhotoFrame src={imgWash.src} alt="Ash Ali building WashPlus" edge="left" size="normal" />
            </div>
            <div className="relative flex justify-start pl-[clamp(12px,3.6vw,30px)]">
              <img src={imgWash.src} alt="" className="absolute left-[78px] top-[-34px] hidden h-[172px] w-[172px] object-cover opacity-[0.11] blur-[1px] lg:block" />
              <CopyBlock>
                <div className="mb-[7px] flex items-start gap-[9px]">
                  <h3 className="text-[clamp(6px,1.35vw,11px)] font-black uppercase leading-[1.18] text-white">
                    BUILDING
                    <br />
                    WASHPLUS
                  </h3>
                  <img src={logoWash.src} alt="WashPlus" className="h-[clamp(9px,2.2vw,18px)] w-auto object-contain" />
                </div>
                <Location>UAE, Dubai</Location>
                <p>Co-founded Washplus, an on demand eco-friendly laundry and dry cleaning startup, bringing innovation to the industry with a tech-driven approach. At the end of his journey, he successfully scaled the business and sold Washplus for a seven-figure sum.</p>
              </CopyBlock>
            </div>
          </div>
        </motion.div>

        <motion.div className="mt-[clamp(22px,5.1vw,44px)]" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.16 }}>
          <p className="mb-[clamp(12px,3vw,26px)] text-center text-[clamp(14px,4.1vw,35px)] font-black leading-none tracking-[-0.04em]">2020-2021</p>
          <div className="grid grid-cols-2 gap-0">
            <div className="relative flex justify-end border-r border-white/35 pr-[clamp(16px,5.1vw,42px)] pt-[clamp(28px,7.5vw,62px)]">
              <img src={imgBookPair.src} alt="" className="absolute right-[104px] top-[4px] hidden h-[172px] w-[172px] object-cover opacity-[0.1] blur-[1px] lg:block" />
              <CopyBlock align="right" className="max-w-[clamp(105px,30vw,254px)]">
                <h3 className="mb-[clamp(3px,0.9vw,7px)] text-[clamp(6px,1.35vw,11px)] font-black uppercase leading-[1.18] text-white">
                  CO-AUTHOR
                  <br />
                  OF THE BEST SELLING BOOK
                  <br />
                  THE UNFAIR ADVANTAGE
                </h3>
                <Location align="right">London</Location>
                <p>Co-authored 'The Unfair Advantage', a powerful book helping entrepreneurs discover and leverage their unique strengths.</p>
              </CopyBlock>
            </div>
            <div className="flex justify-start pl-[clamp(16px,5.3vw,44px)]">
              <PhotoFrame src={imgSigning.src} alt="Ash Ali signing The Unfair Advantage" edge="right" size="large" />
            </div>
          </div>

          <div className="mt-[clamp(30px,8.6vw,72px)] grid grid-cols-2 gap-0">
            <div className="flex justify-end border-r border-white/35 pr-[clamp(16px,5.1vw,42px)]">
              <PhotoFrame src={imgBookPair.src} alt="Ash Ali holding The Unfair Advantage" edge="right" size="large" />
            </div>
            <div className="flex justify-start pl-[clamp(16px,5.3vw,44px)] pt-[clamp(12px,3.2vw,26px)]">
              <CopyBlock className="max-w-[clamp(110px,33vw,276px)]">
                <h3 className="mb-[clamp(3px,0.9vw,7px)] text-[clamp(6px,1.35vw,11px)] font-black uppercase leading-[1.18] text-white">
                  AWARDED BUSINESS
                  <br />
                  BOOK OF THE YEAR - 2021
                </h3>
                <Location>London</Location>
                <p>The Unfair Advantage was picked from a shortlist of over 250 books and was chosen over the course of an intensive six-month judging process and was awarded Business Book of the Year 2021.</p>
              </CopyBlock>
            </div>
          </div>
        </motion.div>
      </div>

      <Rail items={mainRailItems} />
    </div>
  );
}

function UhubsTimeline() {
  return (
    <motion.div
      className="mx-auto mt-[clamp(14px,2.9vw,26px)] max-w-[600px] px-[clamp(10px,2.3vw,18px)] pb-[clamp(28px,6.2vw,52px)] lg:px-0"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <p className="mb-[clamp(14px,3.3vw,28px)] text-center text-[clamp(15px,4vw,34px)] font-black leading-none tracking-[-0.04em]">2019-Present</p>
      <div className="grid grid-cols-2 gap-0">
        <div className="flex justify-end border-r border-white/35 pr-[clamp(14px,4.2vw,34px)]">
          <PhotoFrame src={imgUhubs.src} alt="Ash Ali and Uhubs co-founder" edge="left" size="large" />
        </div>
        <div className="relative flex justify-start pl-[clamp(14px,4.2vw,34px)]">
          <img src={imgUhubs.src} alt="" className="absolute left-[58px] top-[-34px] hidden h-[170px] w-[170px] object-cover opacity-[0.08] blur-[1px] lg:block" />
          <CopyBlock>
            <div className="mb-[clamp(4px,1vw,9px)] flex items-start gap-[clamp(5px,1.45vw,12px)]">
              <h3 className="text-[clamp(6px,1.35vw,11px)] font-black uppercase leading-[1.18] text-white">
                CO-FOUNDED
                <br />
                UHUBS
              </h3>
              <span className="inline-flex items-center gap-[clamp(3px,0.85vw,7px)] text-[clamp(9px,2.55vw,21px)] font-semibold leading-none text-white">
                <img src={logoUhubs.src} alt="" className="h-[clamp(9px,2.65vw,22px)] w-[clamp(9px,2.65vw,22px)] object-contain" />
                Uhubs
              </span>
            </div>
            <Location>London</Location>
            <p>Uhubs helps revenue leaders assess and improve their sales team's performance with data-driven capability scores, identify strengths, pinpoint skill gaps, and unlock growth potential with real-time insights.</p>
          </CopyBlock>
        </div>
      </div>
    </motion.div>
  );
}

const AboutCareerTimeline: React.FC = () => {
  return (
    <section className="overflow-hidden bg-black text-white">
      <div className="mx-auto w-full max-w-[860px] px-[clamp(10px,2.3vw,18px)] pt-[clamp(20px,4.4vw,38px)] lg:px-0">
        <h2 className="w-[clamp(150px,37vw,320px)] text-[clamp(11px,3.15vw,28px)] font-medium leading-[1.14] text-white">
          From practitioner to <span style={brandGradientTextStyle}>thought</span>
          <br />
          <span style={brandGradientTextStyle}>leader</span>
        </h2>
      </div>
      <IntroTimeline />
      <MiddleTimeline />
      <UhubsTimeline />
    </section>
  );
};

export default AboutCareerTimeline;
