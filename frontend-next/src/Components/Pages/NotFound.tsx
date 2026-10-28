import React from "react";
import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-black px-4 text-center text-white">
      <p className="text-sm font-medium text-neutral-500">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Page not found</h1>
      <p className="mt-3 max-w-md text-sm text-neutral-400">
        That route doesn&apos;t exist yet. Explore Ash&apos;s keynote talks, get in touch, or return to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-md border border-white/20 bg-white/5 px-6 py-2.5 text-xs sm:text-sm font-medium text-white transition-all hover:border-white/60 hover:bg-white/10"
        >
          Back to home
        </Link>
        <Link
          href="/speaking"
          className="rounded-md bg-white px-6 py-2.5 text-xs sm:text-sm font-semibold text-black transition-colors hover:bg-gray-100 shadow-md"
        >
          Explore Keynotes
        </Link>
        <Link
          href="/contact"
          className="rounded-md border border-white/20 bg-transparent px-6 py-2.5 text-xs sm:text-sm font-medium text-white transition-all hover:border-white/60 hover:bg-white/10"
        >
          Contact Ash
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
