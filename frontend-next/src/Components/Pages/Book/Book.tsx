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
    <div className="min-w-0 bg-black font-sans text-white">
      <BookHero />
      <UnfairAdvantageQuote/>
      {/* h1 for this page: BookHero above is images only, so this is the
          first real heading on /unfair-advantage. */}
      <BookShowcase as="h1"/>
     
      <BookQuote />
      <BookAwards />
      <MilesFramework/>
<WhoItsFor/>
 <BookRetailers />
      <BookThoughts />
      {/* <AboutNewsletter/> */}
    </div>
  );
};

export default Book;