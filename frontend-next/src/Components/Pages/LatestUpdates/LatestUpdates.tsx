import React from "react";

// import AboutNewsletter from "../About/AboutNewsletter";
import EnquiryNow from "./EnquiryNow";
import LatestUpdatesGrid from "./LatestUpdatesGrid";
import LatestUpdatesHero from "./LatestUpdatesHero";

const LatestUpdates: React.FC = () => {
  return (
    <main className="min-w-0 bg-black font-sans text-white">
      <LatestUpdatesHero />
      <LatestUpdatesGrid />
      <EnquiryNow />
      {/* <AboutNewsletter /> */}
    </main>
  );
};

export default LatestUpdates;