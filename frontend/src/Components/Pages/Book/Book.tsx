import React from "react";

import BookAwards from "./BookAwards";
import BookHero from "./BookHero";
import BookQuote from "./BookQuote";
import BookRetailers from "./BookRetailers";
import BookThoughts from "./BookThoughts";
import BookShowcase from "../Home/BookShowcase";
import MilesFramework from "./MilesFramework";
import WhoItsFor from "./WhoItsFor";
import UnfairAdvantageQuote from "./UnfairAdvantageQuote";
// import AboutNewsletter from "../About/AboutNewsletter";

const Book: React.FC = () => {
  return (
    <main className="min-w-0 bg-black font-sans text-white">
      <BookHero />
      <UnfairAdvantageQuote/>
      <BookShowcase/>
     
      <BookQuote />
      <BookAwards />
      <MilesFramework/>
<WhoItsFor/>
 <BookRetailers />
      <BookThoughts />
      {/* <AboutNewsletter/> */}
    </main>
  );
};

export default Book;