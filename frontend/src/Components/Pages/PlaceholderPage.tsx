import React from "react";
import { Link } from "react-router-dom";

import { brandGradientTextStyle } from "../../constants/brandGradient";

type PlaceholderPageProps = {
  title: string;
};

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <section className="min-h-[50vh] bg-black px-4 pb-24 pt-28 text-center text-white sm:pt-32">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
      <p className="mx-auto mt-4 max-w-md text-sm text-neutral-400">This page is coming soon.</p>
      <Link
        to="/"
        className="mt-10 inline-block text-sm font-medium underline-offset-4 hover:underline"
        style={brandGradientTextStyle}
      >
        Back to home
      </Link>
    </section>
  );
};

export default PlaceholderPage;
