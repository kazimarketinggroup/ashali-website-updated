// import AboutNewsletter from "../../About/AboutNewsletter";
import BookThoughts from "../BookThoughts";
import AvailableInUSA from "./AvailableInUsa";
import BookDetails from "./BookDetails";
import BookHeroYellow from "./BookHeroYellow";
import UsaBookAwards from "./UsaBookAwards";


const UsaBook = () => {
    return (
        <div>
            <BookHeroYellow />
            <AvailableInUSA />
            <BookDetails/>
            <BookThoughts/>
            <UsaBookAwards/>
              {/* <AboutNewsletter/> */}
        </div>
    );
};

export default UsaBook;