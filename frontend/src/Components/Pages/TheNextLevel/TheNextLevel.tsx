import React, { useState } from "react";
import { Link } from "react-router-dom";

import { brandGradientTextStyle } from "../../../constants/brandGradient";

import heroImg from "../../../assets/nextLevel/nextLevelHero.png";
import level1Img from "../../../assets/nextLevel/level1.png";
import level2Img from "../../../assets/nextLevel/level2.png";
import level3Img from "../../../assets/nextLevel/level3.png";
import jenkinsAvatar from "../../../assets/nextLevel/jenkins.png";
import juniorAvatar from "../../../assets/nextLevel/junior.png";
import yaronAvatar from "../../../assets/nextLevel/yaron.png";

type LevelCard = {
  id: string;
  heading: string;
  title: string;
  subtitle: string;
  bullets: string[];
  image: string;
  reverse?: boolean;
  url: string;
};


const levelCards: LevelCard[] = [
  {
    id: "level1",
    heading: "Level 1:",
    title: "The Growth Games",
    subtitle: "Ideal For Startup Founders And Fully Funded Startups",
    bullets: [
      "Mindset: Develop the right mindset for success.",
      "The People: Build and manage a high performing team.",
      "Growth Hacking: Implement effective growth strategies and tactics.",
      "The Business: Optimise your operations for sustainable growth.",
    ],
    image: level1Img,
    url: "/the-next-level/level-1",
  },
  {
    id: "level2",
    heading: "Level 2:",
    title: "Life Is Unfair",
    subtitle: "Ideal For Founders",
    bullets: [
      "Mindset and Money: Develop the right mindset and identify the true meaning of money.",
      "Intelligence and Insight: Identify your intelligence and utilising insights.",
      "Location and Luck: Find out how you can utilise your location and context levels.",
      "Status: How to capitalise on your status.",
    ],
    image: level2Img,
    reverse: true,
    url: "/the-next-level/level-2",
  },
  {
    id: "level3",
    heading: "Level 3:",
    title: "Leadership Development",
    subtitle: "Ideal for Individuals who are in leadership positions",
    bullets: [
      "Leadership Styles: Identify & understand different leadership approaches.",
      "Emotional Intelligence: Develop self awareness, empathy, and social skills.",
      "Communication & Influence: Improve listening, feedback, and persuasion.",
      "High-Performing Teams: Foster collaboration and motivate for success.",
    ],
    image: level3Img,
    url: "/the-next-level/level-3",
  },
];

type Thought = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

const thoughts: Thought[] = [
  {
    quote:
      "Ash was a great speaker at TechBravo. Very energising with lots of practical hints and tips on maximizing this year's numbers via a whole lot of wow!",
    name: "Claire Jenkins",
    role: "(TableCrowd)",
    avatar: jenkinsAvatar,
  },
  {
    quote:
      "Ash is a very dynamic and authentic speaker. He’s the experienced brick and managed and always keeps the audience motivated, inspired and hungry for more.",
    name: "Junior Gyurmyan",
    role: "(Entrepreneur Academy)",
    avatar: juniorAvatar,
  },
  {
    quote:
      "Ash’s talk at Furling London was outstanding, with great takeouts. His clear, engaging style makes him highly recommended for any event.",
    name: "Yaron Saghiv",
    role: "(Furling Events)",
    avatar: yaronAvatar,
  },
];

const TheNextLevel: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState("level1");

  return (
    <main className="bg-black font-sans text-white">
      <section className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center px-6 py-16 md:py-20 lg:grid-cols-[460px_1fr] lg:px-8">
        <div className="flex justify-center lg:justify-start">
          <img src={heroImg} alt="Ash Ali" className="h-auto w-full max-w-[460px] object-contain object-left" />
        </div>
        <div className="mt-6 lg:mt-0">
          <h1 className="text-2xl font-semibold leading-snug sm:text-3xl md:text-[1.85rem] lg:text-4xl">
            <span className="text-white">It&apos;s Time For An </span>
            <span style={brandGradientTextStyle}>Upgrade...</span>
          </h1>
          <p className="mt-2 text-sm text-white/90 sm:text-base">Gain Knowledge From Ash Ali Himself</p>
          <Link
            to="/contact"
            className="mt-5 inline-block border border-white/50 px-5 py-2 text-xs text-white transition-colors hover:border-white hover:bg-white hover:text-black sm:text-sm"
          >
            View Pathways
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] space-y-7 px-6 pb-10 lg:px-8">
        {levelCards.map((card) => (
          <article
            key={card.id}
            className="rounded-sm border border-white/10 bg-[#111111] px-5 py-6 shadow-[0_18px_48px_rgba(0,0,0,0.45)] sm:px-7 sm:py-7 lg:px-8"
          >
            <div className={`grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8 ${card.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div>
                <p className="text-base font-bold leading-none sm:text-lg" style={brandGradientTextStyle}>
                  {card.heading}
                </p>
                <h2 className="mt-1.5 text-xl font-semibold leading-tight sm:text-2xl">{card.title}</h2>
                <p className="mt-2 text-sm text-white/75 sm:text-[0.9375rem]">{card.subtitle}</p>
                <div className="mt-3 space-y-1.5">
                  {card.bullets.map((b) => {
                    const [bold, rest] = b.split(":");
                    return (
                      <p key={b} className="text-sm leading-relaxed text-white/85 sm:text-[0.9375rem]">
                        <span className="font-semibold text-white">{bold}:</span> {rest?.trim()}
                      </p>
                    );
                  })}
                </div>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <Link
                    to={card.url}
                    className="inline-block border border-white/40 px-4 py-1.5 text-xs transition-colors hover:border-white hover:bg-white hover:text-black sm:px-5 sm:py-2 sm:text-sm"
                  >
                    Learn More
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-block border border-white/40 px-4 py-1.5 text-xs transition-colors hover:border-white hover:bg-white hover:text-black sm:px-5 sm:py-2 sm:text-sm"
                  >
                    Player Ready
                  </Link>
                </div>
              </div>
              <div className="overflow-hidden rounded-sm border border-white/10 bg-zinc-900">
                <img src={card.image} alt={card.title} className="h-full w-full object-cover object-center" />
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-10 lg:px-8">
        <div className="rounded-sm border border-white/10 bg-[#101010] px-5 py-6 text-center sm:px-8 sm:py-8 md:px-10">
          <p className="text-lg font-bold leading-none sm:text-xl md:text-2xl" style={brandGradientTextStyle}>
            Secret Level
          </p>
          <h2 className="mt-1.5 text-xl font-semibold leading-tight sm:text-2xl md:text-3xl">Tailored Development</h2>
          <div className="mt-5 grid grid-cols-1 gap-3 text-left sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
            {[
              ["Personalised Solutions", "Addressing your unique needs and challenges"],
              ["Collaborative Approach", "Working together to design the perfect outcome"],
              ["Hands-On Learning", "Gain practical skills and knowledge"],
              ["Tailored Content", "Focused on your industry and goals"],
              ["Actionable insights", "Take away strategies to implement"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-sm font-semibold text-white sm:text-[0.9375rem]">{k}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-white/70 sm:text-sm">{v}</p>
              </div>
            ))}
          </div>
          <Link
            to="/the-next-level/secret-level"
            className="mt-5 inline-block border border-white/40 px-5 py-1.5 text-xs transition-colors hover:border-white hover:bg-white hover:text-black sm:py-2 sm:text-sm"
          >
            Player Ready
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-10 lg:px-8">
        <div className="rounded-sm border border-white/10 bg-[#101010] px-5 py-6 sm:px-8 sm:py-8 md:px-10">
          <h3 className="text-xl font-bold sm:text-2xl" style={brandGradientTextStyle}>
            Thoughts...
          </h3>
          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            {thoughts.map((t) => (
              <article key={t.name} className="rounded-2xl border border-white/10 bg-[#0B0B0B] p-4 shadow-[0_16px_32px_rgba(0,0,0,0.35)] sm:p-5">
                <p className="text-sm leading-relaxed text-white/90 sm:text-[0.9375rem]">&quot;{t.quote}&quot;</p>
                <div className="mt-4 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full border border-white/20 object-cover sm:h-14 sm:w-14" />
                  <div>
                    <p className="text-sm font-semibold text-white sm:text-base">{t.name}</p>
                    <p className="text-xs text-white/65 sm:text-sm">{t.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-14 lg:px-8">
        <div className="rounded-sm border border-white/10 bg-[#101010] px-5 py-8 sm:px-8 md:px-10">
          <h3 className="text-center text-2xl font-semibold sm:text-3xl">Start your journey</h3>
          <form className="mx-auto mt-6 max-w-4xl">
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
              <input className="h-11 border border-white/10 bg-[#1a1a1a] px-3 text-sm text-white placeholder:text-white/35 sm:h-12 sm:px-4 sm:text-base" placeholder="Your Name" />
              <input className="h-11 border border-white/10 bg-[#1a1a1a] px-3 text-sm text-white placeholder:text-white/35 sm:h-12 sm:px-4 sm:text-base" placeholder="Your Email" />
              <input className="h-11 border border-white/10 bg-[#1a1a1a] px-3 text-sm text-white placeholder:text-white/35 sm:h-12 sm:px-4 sm:text-base" placeholder="Phone Number" />
              <div className="relative">
                <select className="h-11 w-full appearance-none border border-white/10 bg-[#1a1a1a] px-3 pr-9 text-sm text-white/80 sm:h-12 sm:px-4 sm:text-base">
                  <option>country</option>
                  <option>United Kingdom</option>
                  <option>United Arab Emirates</option>
                  <option>Pakistan</option>
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/55">▾</span>
              </div>
              <input className="h-11 border border-white/10 bg-[#1a1a1a] px-3 text-sm text-white placeholder:text-white/35 sm:h-12 sm:px-4 sm:text-base" placeholder="Company Name" />
              <input className="h-11 border border-white/10 bg-[#1a1a1a] px-3 text-sm text-white placeholder:text-white/35 sm:h-12 sm:px-4 sm:text-base" placeholder="Address" />
            </div>

            <div className="mt-6 max-w-md border-t border-white/30 pt-3">
              {[
                ["level1", "Level 1: The Growth Games"],
                ["level2", "Level 2: Life is Unfair"],
                ["level3", "Level 3: Leadership Development"],
                ["secret", "Secret Level: Tailored Development"],
              ].map(([value, label]) => (
                <label key={value} className="mt-1.5 flex cursor-pointer items-center gap-2.5 text-sm sm:text-base">
                  <input
                    type="radio"
                    name="journey-level"
                    value={value}
                    checked={selectedLevel === value}
                    onChange={() => setSelectedLevel(value)}
                    className="h-3.5 w-3.5 accent-[#FF781D] sm:h-4 sm:w-4"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                type="button"
                className="border border-white px-10 py-2.5 text-base font-medium transition-colors hover:bg-white hover:text-black sm:text-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default TheNextLevel;