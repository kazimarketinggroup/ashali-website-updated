
// import AdvisesOnSection from "./AdvisesOnSection";
import FinalCta from "../Home/FinalCta";
import AdvisesSection from "./AdvisesSection";
import AdvisoryHero from "./AdvisoryHero";
import HowAshWorks from "./HowAshWorks";
// import UnlockNewsletterSection from "./UnlockNewsLetterSection";
// import StartConversation from "./StartConversation";
import WhyAshSection from "./WhyAshSection";

const Advisory = () => {
    return (
        <div>
            <AdvisoryHero/>
            <AdvisesSection/>
            {/* <AdvisesOnSection/> */}
            <WhyAshSection/>
            <HowAshWorks/>
            {/* <StartConversation/> */}
           <FinalCta
        heading="Looking for a sounding board, strategic advisor or board member?"
        body="Let's discuss where you are and where you need to get to. We'll recommend the most suitable engagement format and confirm Ash's availability."
        ctaLabel="Start a conversation"
      />
        </div>
    );
};

export default Advisory;