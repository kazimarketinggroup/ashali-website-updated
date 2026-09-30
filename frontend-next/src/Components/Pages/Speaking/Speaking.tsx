import React from "react";
// import { motion, easeOut } from "framer-motion";

// import { brandGradientTextStyle } from "../../../constants/brandGradient";

// import digitalDnaConference from "../../../assets/speaking/digitalDnaConferrence.png";
// import digitalDnaLogo from "../../../assets/speaking/digitaldna.png";
// import eventMalaysia from "../../../assets/speaking/eventmalaysia.png";
// import eventPakistan from "../../../assets/speaking/eventinpakistan.png";
// import in5Dubai from "../../../assets/speaking/int5Dubai.png";
// import salesforcePhoto from "../../../assets/speaking/inspiringInsight.png";
// import salesforceLogo from "../../../assets/speaking/salesforce.png";
// import tedxLogo from "../../../assets/speaking/theroyalholloway.png";
// import atrivaLogo from "../../../assets/speaking/techitalia-logo.png";
// import worqLogo from "../../../assets/speaking/worq-logo.png";
// import in5Logo from "../../../assets/speaking/u5logo.png";

// import GradientBorderLink from "./GradientBorderLink";
// import SpeakingEducation from "./SpeakingEducation";
// import SpeakingFeatureRow from "./SpeakingFeatureRow";
// import SpeakingHero from "./SpeakingHero";
// import SpeakingLogoStrip from "./SpeakingLogoStrip";
import SpeakingThoughts from "./SpeakingThoughts";
// import VideoHero from "./VideoHero";
import KeynotesSection from "./KeynotesSection";
import SpeakerBioSection from "./SpeakerBioSection";
// import { SignatureTalks } from "./SignatureTalks";
// import UnlockNewsletterSection from "../Home/UnlockNewsletterSection";
// import SpeakerMediaSection from "./SpeakerMediaSection";
// import EducationalLogoStrip from "./EducationalLogoStrip";
import KeynotesBanner from "../Home/KeynotesBanner";
import FlagshipKeynotes from "./FlagshipKeynotes";
import AdditionalFormats from "./AdditionalFormat";
import FinalCta from "../Home/FinalCta";
import KeynoteLogoMarquee from "./KeynoteLogoMarquee";
import SupportingVideos from "./SupportingVideos";

// function GradHeading({ children }: { children: React.ReactNode }) {
//   return (
//     <h2 className="text-xl font-bold leading-tight sm:text-2xl md:text-3xl" style={brandGradientTextStyle}>
//       {children}
//     </h2>
//   );
// }

const Speaking: React.FC = () => {
  return (
    <div className="min-w-0 bg-black font-sans text-white">
        {/* <VideoHero/>
         */}
         <KeynotesBanner/>
          <KeynoteLogoMarquee/>
        <KeynotesSection/>
        <SpeakerBioSection/>

<FlagshipKeynotes/>

<AdditionalFormats/>
        {/* <SignatureTalks /> */}
 {/* <SpeakingLogoStrip /> */}

 {/* <EducationalLogoStrip/> */}
        {/* <SpeakerMediaSection/> */}
{/*  */}
<SupportingVideos/>
     
      {/* <SpeakingHero /> */}

      {/* <SpeakingFeatureRow
        title={<GradHeading>Unpacking Your &apos;Unfair Advantage&apos;</GradHeading>}
        logoSrc={tedxLogo}
        logoAlt="TEDx Royal Holloway"
        location="London, UK"
        flag="🇬🇧"
        body="In this inspiring talk, he reveals how to shift focus from limitations to opportunities, leveraging personal strengths to create success. With real world insights and practical strategies, Ash empowers individuals to unlock their full potential and gain an edge in business and life."
        mediaAlt="TEDx talk"
        videoUrl="https://www.youtube.com/embed/rMB2lFUMXpY"
        delay={0}
      /> */}

      {/* <SpeakingFeatureRow
        title={<GradHeading>Inspiring Insights At Salesforce</GradHeading>}
        logoSrc={salesforceLogo}
        logoAlt="Salesforce"
        location="London, UK"
        flag="🇬🇧"
        body="Ash Ali recently spoke to the Salesforce and Salesforce Marketing Cloud teams, sharing authentic insights, real world experiences, and practical lessons. The audience appreciated his engaging approach and high energy delivery. If you're looking for a dynamic speaker with deep digital expertise, get in touch!"
        mediaSrc={salesforcePhoto}
        mediaAlt="Ash Ali at Salesforce"
        mediaLeft
        delay={0.05}
      /> */}

      {/* <SpeakingFeatureRow
        title={<GradHeading>Shares The MILES Framework At In5 Dubai</GradHeading>}
        logoSrc={in5Logo}
        logoAlt="in5"
        location="Dubai, UAE"
        flag="🇦🇪"
        body="Ash Ali recently spoke at in5 Dubai, engaging with global founders and introducing the MILES framework from his upcoming book The Unfair Advantage. Do you know what your unfair advantage is?"
        mediaSrc={in5Dubai}
        mediaAlt="in5 Dubai event"
        delay={0.08}
      /> */}
{/* 
      <SpeakingFeatureRow
        title={<GradHeading>Keynote On Startup Growth At Digital DNA Belfast</GradHeading>}
        logoSrc={digitalDnaLogo}
        logoAlt="Digital DNA"
        location="Belfast, Northern Ireland"
        flag="🇮🇪"
        body="Ash Ali delivered a keynote at Digital DNA Belfast, sharing insights on scaling startups from his experience as Just Eat's first marketing director. He discussed innovative marketing strategies, customer behavior, and leveraging unique advantages for rapid growth in competitive markets."
        mediaSrc={digitalDnaConference}
        mediaAlt="Digital DNA Belfast"
        mediaLeft
        delay={0.1}
      /> */}

      {/* <SpeakingFeatureRow
        title={
          <h2 className="text-xl font-bold leading-tight sm:text-2xl md:text-3xl">
            <span style={brandGradientTextStyle}>First Speaking Event</span> <span className="text-white">In</span>{" "}
            <span style={brandGradientTextStyle}>Pakistan</span>
          </h2>
        }
        logoSrc={atrivaLogo}
        logoAlt="ATRiVA"
        location="Pakistan"
        flag="🇵🇰"
        body="Ash delivered a hands-on session for founders and operators on building repeatable revenue motions, storytelling, and practical GTM plays drawn from two decades in the field."
        mediaSrc={eventPakistan}
        mediaAlt="Speaking event in Pakistan"
        delay={0.05}
      /> */}

      {/* <SpeakingFeatureRow
        title={
          <h2 className="text-xl font-bold leading-tight sm:text-2xl md:text-3xl">
            <span style={brandGradientTextStyle}>Inspired Entrepreneurs</span> <span className="text-white">In</span>{" "}
            <span style={brandGradientTextStyle}>Malaysia</span>
          </h2>
        }
        logoSrc={worqLogo}
        logoAlt="worq"
        location="Kuala Lumpur, Malaysia"
        flag="🇲🇾"
        body="An energetic room of entrepreneurs explored how to turn unfair advantages into momentum, from positioning to community-led growth, with frameworks Ash uses with leadership teams worldwide."
        mediaSrc={eventMalaysia}
        mediaAlt="Event in Malaysia"
        mediaLeft
        delay={0.08}
      /> */}
      <SpeakingThoughts />

      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, ease: easeOut }}
        className=" bg-black"
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-10 text-center md:py-12">
          <h2 className="text-xl font-semibold text-white sm:text-2xl md:text-3xl">Inspire your Audience</h2>
          <div className="mt-5 md:mt-6">
            <GradientBorderLink to="/contact" linkClassName="px-10 py-2.5 sm:text-sm md:text-base">
              Enquire Now
            </GradientBorderLink>
          </div>
        </div>
      </motion.div> */}

      {/* <SpeakingEducation /> */}
      {/* <UnlockNewsletterSection /> */}
      <FinalCta
        heading="Planning a keynote, leadership offsite or executive workshop?"
        body="Share the audience, date and outcome you want to create. We'll recommend the most suitable format and confirm availability."
        ctaLabel="Enquire now"
      />
    </div>
  );
};

export default Speaking;
