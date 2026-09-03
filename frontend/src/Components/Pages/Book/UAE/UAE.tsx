// import AboutNewsletter from "../../About/AboutNewsletter";
import InspireCTA from "../SouthEastAsia/InspireCta";
import UsaBookAwards from "../UsaBook/UsaBookAwards";
import ArabicReviews from "./ArabicReviews";
import ArabicTestimonialsHero from "./ArabicTestmonial";
import ArabicVideoReview from "./ArabicVideoReview";
import AvailableInUae from "./AvailableInUae";
import UaeBookDetails from "./UaeBookDetails";


const UAE = () => {
    return (
        <div>
            <ArabicTestimonialsHero/>
            <AvailableInUae/>
            <UaeBookDetails/>
<ArabicVideoReview/>
<ArabicReviews/>
             <UsaBookAwards/>
             <InspireCTA/>
              {/* <AboutNewsletter/> */}
        </div>
    );
};

export default UAE;