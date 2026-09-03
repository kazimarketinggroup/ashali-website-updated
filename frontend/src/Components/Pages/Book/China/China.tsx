// import AboutNewsletter from "../../About/AboutNewsletter";
import InspireCTA from "../SouthEastAsia/InspireCta";
import UsaBookAwards from "../UsaBook/UsaBookAwards";
import AvailableInChina from "./AvailableInChina";
import BookHeroZh from "./BookHeroZh";
import ChinaBookDetails from "./ChinaBookDetails";
import HeiFrameVideoSection from "./HeiFrameVideoSection";
import ChinaTestmonialSection from "./TestMonial";


const China = () => {
    return (
        <div>
            <BookHeroZh/>
            <AvailableInChina/>
            <ChinaBookDetails/>
<HeiFrameVideoSection/>
<ChinaTestmonialSection/>
            <UsaBookAwards/>
             <InspireCTA/>
              {/* <AboutNewsletter/> */}
        </div>
    );
};

export default China;