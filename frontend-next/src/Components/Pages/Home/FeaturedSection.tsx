import googleLogo from "../../../assets/home/logos/google.png";
import bbcLogo from "../../../assets/home/logos/bbc.png";
import entrepreneurLogo from "../../../assets/home/logos/enterprenur.png";
import fortuneLogo from "../../../assets/home/logos/fortune.png";
import forbesLogo from "../../../assets/home/logos/forbes.png";
import incLogo from "../../../assets/home/logos/inc.png";

const logos = [
  { name: "Google", src: googleLogo.src },
  { name: "BBC", src: bbcLogo.src },
  { name: "Entrepreneur", src: entrepreneurLogo.src },
  { name: "Fortune", src: fortuneLogo.src },
  { name: "Forbes", src: forbesLogo.src },
  { name: "Inc", src: incLogo.src },
];

const FeaturedSection: React.FC = () => {
  return (
    <section className="w-full bg-black py-16 md:py-20">
      <div className="mx-auto max-w-fluid px-4 sm:px-6 lg:px-8 text-center">

        <p className="text-white text-base sm:text-lg font-bold mb-8 tracking-widest uppercase">
          Featured In
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-6 items-center justify-items-center gap-y-8 gap-x-4">
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center w-full">
              <img
                src={logo.src}
                alt={logo.name}
                className="h-6 sm:h-7 w-auto max-w-[90px] sm:max-w-[100px] object-contain opacity-100 transition duration-300"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedSection;