import icon1 from "../../../../assets/level2/icon1.png";
import icon2 from "../../../../assets/level2/icon2.png";
import icon3 from "../../../../assets/level2/icon3.png";
import icon4 from "../../../../assets/level2/icon4.png";

const LevelOneFeatureStripSecondary = () => {
  const items = [
    {
      title: "Mindset & Money",
      description: "Develop the right mindset and unlock money's true potential for growth.",
      icon: icon1,
    },
    {
      title: "Adaptable",
      description: "Advance at a pace that works for you.",
      icon: icon2,
    },
    {
      title: "Q & A",
      description: "Get feedback and answers directly from Ash Ali.",
      icon: icon3,
    },
    {
      title: "Tailored",
      description: "Perfect for visionary founders ready to unlock their full potential.",
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

export default LevelOneFeatureStripSecondary;
