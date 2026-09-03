import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { BRAND_GRADIENT_LR } from "../../constants/brandGradient";

type NavItem = { to: string; label: string; end?: boolean };

const navItems: NavItem[] = [
  // { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  // "Keynotes" is the label; the existing /speaking URL is kept.
  { to: "/speaking", label: "Keynotes" },
  { to: "/workshops", label: "Workshops" },
  { to: "/advisory", label: "Advisory" },
  // { to: "/results-media", label: "Results & Media" },
  { to: "/impact", label: "Impact" },
  { to: "/unfair-advantage", label: "Book" },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "text-[13px] font-normal tracking-wide whitespace-nowrap transition-opacity",
    isActive
      ? "bg-gradient-to-r from-[#FF781D] to-[#008080] bg-clip-text font-semibold text-transparent"
      : "text-white hover:text-white/85",
  ].join(" ");

const SiteHeader: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black">
      <div className="h-[3px] w-full shrink-0" style={{ background: BRAND_GRADIENT_LR }} aria-hidden />

      <div className="mx-auto flex max-w-fluid items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="text-[17px] font-bold tracking-[0.12em] text-white" onClick={() => setOpen(false)}>
          ASH ALI
        </NavLink>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-8 2xl:gap-10" aria-label="Primary">
          {navItems.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end === true} className={linkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <NavLink
            to="/contact"
            className="inline-block rounded-sm border border-white px-5 py-2 text-[13px] font-bold tracking-wide text-white transition-colors hover:bg-white/10"
          >
            Enquire now
          </NavLink>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-white lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black px-4 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile primary">
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end === true}
                className={({ isActive }) =>
                  `rounded-md px-3 py-3 text-[15px] ${
                    isActive
                      ? "font-semibold bg-gradient-to-r from-[#FF781D] to-[#008080] bg-clip-text text-transparent"
                      : "text-white"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              className="mt-4 rounded-sm border border-white py-3 text-center text-[14px] font-bold text-white"
              onClick={() => setOpen(false)}
            >
              Work with Ash
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
