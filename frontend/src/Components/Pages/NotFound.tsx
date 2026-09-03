import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-black px-4 text-center text-white">
      <p className="text-sm font-medium text-neutral-500">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Page not found</h1>
      <p className="mt-3 max-w-md text-sm text-neutral-400">
        That route doesn&apos;t exist yet. Head back home or open the menu to pick another page.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-md border border-white px-8 py-2.5 text-sm font-medium transition-colors hover:bg-white/10"
      >
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;
