import { useState } from "react";

const workshops = [
  { value: "level1", label: "Level 1: The Growth Games" },
  { value: "level2", label: "Level 2: Life is Unfair" },
  { value: "level3", label: "Level 3: Leadership Development" },
  { value: "secret", label: "Secret Level: Tailored Development" },
] as const;

const LevelTwoJourneyForm = () => {
  const [workshop, setWorkshop] = useState<(typeof workshops)[number]["value"]>("level2");

  return (
    <section className="border-b border-white/[0.06] bg-[#0E0E0E] px-6 py-16 md:py-20 text-white">
      <div className="mx-auto max-w-[640px]">
        <p className="text-center text-[10px] font-normal uppercase tracking-[0.22em] text-white/38">Enquiry</p>
        <h2 className="mt-3 text-center text-xl font-normal tracking-[0.02em] text-white/92 md:text-[1.35rem]">
          Start your journey
        </h2>
        <form className="mt-9" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-x-4 md:gap-y-2.5">
            <input
              className="h-10 rounded-sm border border-white/[0.08] bg-[#0E0E0E] px-3 text-[13px] font-normal text-white placeholder:text-white/28 md:h-11"
              placeholder="Your Name"
              name="name"
              autoComplete="name"
            />
            <input
              type="email"
              className="h-10 rounded-sm border border-white/[0.08] bg-[#0E0E0E] px-3 text-[13px] font-normal text-white placeholder:text-white/28 md:h-11"
              placeholder="Your Email"
              name="email"
              autoComplete="email"
            />
            <input
              type="tel"
              className="h-10 rounded-sm border border-white/[0.08] bg-[#0E0E0E] px-3 text-[13px] font-normal text-white placeholder:text-white/28 md:h-11"
              placeholder="Phone Number"
              name="phone"
              autoComplete="tel"
            />
            <div className="relative">
              <select
                className="h-10 w-full appearance-none rounded-sm border border-white/[0.08] bg-[#0E0E0E] px-3 pr-10 text-[13px] font-normal text-white/65 md:h-11"
                name="country"
                defaultValue=""
              >
                <option value="" disabled>
                  Country
                </option>
                <option value="uk">United Kingdom</option>
                <option value="uae">United Arab Emirates</option>
                <option value="pk">Pakistan</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/35">
                ▾
              </span>
            </div>
            <input
              className="h-10 rounded-sm border border-white/[0.08] bg-[#0E0E0E] px-3 text-[13px] font-normal text-white placeholder:text-white/28 md:h-11"
              placeholder="Company Name"
              name="company"
            />
            <input
              className="h-10 rounded-sm border border-white/[0.08] bg-[#0E0E0E] px-3 text-[13px] font-normal text-white placeholder:text-white/28 md:h-11"
              placeholder="Address"
              name="address"
              autoComplete="street-address"
            />
          </div>

          <div className="mt-9 border-t border-white/[0.08] pt-6">
            <p className="text-[10px] font-normal uppercase tracking-[0.18em] text-white/38">Choose the workshop</p>
            <div className="mt-4 space-y-2.5">
              {workshops.map((w) => (
                <label key={w.value} className="flex cursor-pointer items-center gap-3 text-[13px] font-normal text-white/58">
                  <input
                    type="radio"
                    name="workshop"
                    value={w.value}
                    checked={workshop === w.value}
                    onChange={() => setWorkshop(w.value)}
                    className="h-3.5 w-3.5 accent-[#FF781D]"
                  />
                  <span>{w.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-9 flex justify-center">
            <button
              type="submit"
              className="border border-white/22 px-12 py-2 text-[11px] font-normal uppercase tracking-[0.16em] text-white/85 transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LevelTwoJourneyForm;
