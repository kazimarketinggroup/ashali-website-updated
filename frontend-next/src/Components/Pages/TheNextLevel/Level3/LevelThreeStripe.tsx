import icon1 from "../../../../assets/level1/icon1.png";
import icon2 from "../../../../assets/level1/icon2.png";
import icon3 from "../../../../assets/level3/level3-feature-icon.png";
import icon4 from "../../../../assets/level1/icon4.png";

const LevelThreeFeatureStripPrimary = () => {
  const items = [
    {
      title: "Leadership",
      description: "Master leadership styles to enhance influence.",
      icon: icon1.src,
    },
    {
      title: "Empathy",
      description: "Build emotional intelligence to connect with your team.",
      icon: icon2.src,
    },
    {
      title: "Communication",
      description: "Improve listening and persuasion for stronger teams.",
      icon: icon3.src,
    },
    {
      title: "Collaboration",
      description: "Inspire teamwork and boost team performance.",
      icon: icon4.src,
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

export default LevelThreeFeatureStripPrimary;
