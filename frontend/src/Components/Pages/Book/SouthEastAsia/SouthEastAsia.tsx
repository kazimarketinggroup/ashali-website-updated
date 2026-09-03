// import AboutNewsletter from "../../About/AboutNewsletter";
import UsaBookAwards from "../UsaBook/UsaBookAwards";
import AvailableInSouthAsia from "./AvailableInSouthAsia";
import EventHero from "./EventHero";
import InspireCTA from "./InspireCta";
import PemikiranSection from "./PemikiranSection";
import SouthAsiaBookDetails from "./SouthAsiaBookDetails";
import TikTokReview from "./TikTokReviewSection";


const SouthEastAsia = () => {
    return (
        <div>
            <EventHero/>
            <AvailableInSouthAsia/>
            <SouthAsiaBookDetails/>
            <TikTokReview/>
            <PemikiranSection/>

             <UsaBookAwards/>
             <InspireCTA/>
              {/* <AboutNewsletter/> */}
        </div>
    );
};

export default SouthEastAsia;