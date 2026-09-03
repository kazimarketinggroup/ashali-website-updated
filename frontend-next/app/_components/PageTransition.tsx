"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/*
  Reproduces the entry animation from the Vite build's MainLayout:

      <main key={location.pathname} className="site-entry ...">

  The `key` is what makes it work — remounting <main> on every navigation
  restarts the `site-entry` CSS animation. Without it the animation plays once
  on first load and never again, which is a silent, easy-to-miss regression.
  App Router layouts are server components and cannot read the pathname, so this
  thin client wrapper carries the key instead.

  Note this component renders <main> itself, so pages must not add their own.
*/
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <main key={pathname} className="site-entry min-w-0 flex-1">
      {children}
    </main>
  );
}
