import icon1 from "../../../../assets/level1/icon1.png";
import icon2 from "../../../../assets/level1/icon2.png";
import icon3 from "../../../../assets/secretlevel/Vector.png";
import icon4 from "../../../../assets/level1/icon4.png";

const SecretLevelFeatureStripPrimary = () => {
  const items = [
    {
      title: "Customized",
      description: "Address your unique challenges",
      icon: icon1,
    },
    {
      title: "Practical",
      description: "Learn through hands on experience",
      icon: icon2,
    },
    {
      title: "Expertise",
      description: "Get insights and content relevant to your sector",
      icon: icon3,
    },
    {
      title: "Actionable",
      description: " Apply what you learn instantly",
      icon: icon4,
    },
  ];

  return (
    <section className="border-b border-white/[0.06] bg-[#0E0E0E] px-6 py-16 md:py-20 text-white">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col items-center text-center">
            <img
              src={item.icon}
              alt=""
              className="mx-auto h-[52px] w-auto max-w-[120px] object-contain"
            />
            <h3 className="mt-5 text-[15px] font-medium tracking-tight text-white/92">{item.title}</h3>
            <p className="mt-2 max-w-[260px] text-[13px] font-normal leading-relaxed text-white/48">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SecretLevelFeatureStripPrimary;
