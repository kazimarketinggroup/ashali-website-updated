// import Section from "./AboutSection";
// import LatestUpdatesGrid from "../LatestUpdates/LatestUpdatesGrid";
import AshAliHero from "./AshAliHero";
// import BeyondBusiness from "./BeyondBusiness";
import BookShowcase from "./BookShowcase";
import BuildingBridges from "./BuildingBridges";
import CapabilityIndexSection from "./CapabilityIndexSection";
import FinalCta from "./FinalCta";
import HelpingLeadersSection from "./HelpingLeaderSection";
import SignatureIdeas from "./SignatureIdeas";
import Testimonials from "./Testmonials";
// import KeynotesSection from "./KeynotesSection";
// import FeaturedSection from "./FeaturedSection";
// import HeroSection from "./HomeHero";
// import LatestUpdatesSection from "./LatestUpdatesSection";
// import UnfairAdvantageSection from "./ThaUnfairBook";
// import TimeLineSection from "./TimeLineSection";
// import UnlockNewsletterSection from "./UnlockNewsletterSection";
// import WhoHeWorksWith from "./WhoHeWorksWith";





const Home = () => {
    return (
        <div className="min-w-0 overflow-x-clip bg-black">
{/*    
       <HeroSection/>
       <FeaturedSection/> */}

       {/* version two here */}
       <AshAliHero/>
       {/* <UnfairAdvantageSection/> */}
       {/*  */}
       {/* <KeynotesSection/> */}
<HelpingLeadersSection/>
{/* \\

card hobe

*/}
<SignatureIdeas/>


       <BookShowcase/>
       {/* <Section/> */}
       <CapabilityIndexSection/>
       <BuildingBridges/> 
       {/* <TimeLineSection/> */}
       {/* <BeyondBusiness/> */}
      

<Testimonials/>

<FinalCta
        heading="Planning a keynote, leadership offsite or executive workshop?"
        body="Share the audience, date and outcome you want to create. We'll recommend the most suitable format and confirm availability."
        ctaLabel="Enquire now"
      />
      {/* <WhoHeWorksWith/> */}
       {/* <LatestUpdatesGrid />
       <UnlockNewsletterSection/> */}
        </div>
    );
};

export default Home;
