import { Link } from "react-router-dom";
import unfairBook from "../../../assets/home/6776a560befc4f251956425f_6217cda8bc4f36f003a5c21a_61fbca6c5f70de6e39a23727_60af9261086dff53f9a6cf6a_IMG-20210527-WA0000 1.png";

export default function UnfairBookSection() {
  return (
    <section className="bg-black text-white">
      <div
        className="
          mx-auto
          flex
          max-w-[1100px]
          flex-col
          items-center
          justify-between
          gap-8
          px-5
          py-12
          sm:gap-10
          sm:py-14
          lg:flex-row
          lg:px-8
          lg:py-20
        "
      >
        {/* LEFT CONTENT */}
        <div className="w-full max-w-[500px] text-center lg:text-left">
          <h2
            className="
              text-[clamp(1.8rem,7vw,2.5rem)]
              font-light
              leading-tight
              tracking-[-0.03em]
            "
          >
            The{" "}
            <span className="font-medium text-[#d8923c]">
              Unfair
            </span>{" "}
            Advantage
          </h2>

          <p
            className="
              mt-6
              text-[13px]
              leading-[1.9]
              text-white/75
              sm:text-sm
            "
          >
            <span className="italic text-white">The Unfair Advantage</span> Challenges The Myth That Success Is
            Purely About Grit, Hustle Or Merit. It Shows How Personal
            Circumstances, Networks, Timing, Money, Intelligence,
            Location, Status And Mindset Shape Opportunity And How Anyone
            Can Learn To Identify And Use Their Own Advantages.
          </p>

          <Link
            to="/book"
            className="
              mt-8
              inline-flex
              h-[42px]
              items-center
              justify-center
              border
              border-white/30
              px-6
              text-xs
              font-medium
              tracking-wide
              text-white
              transition-all
              duration-300
              hover:border-[#d8923c]
              hover:bg-[#d8923c]
              hover:text-black
            "
          >
            Learn more about the book
          </Link>
        </div>

        {/* RIGHT IMAGE */}
        <div
          className="
            relative
            w-full
            max-w-[460px]
            overflow-hidden
            sm:max-w-[500px]
          "
        >
          <img
            src={unfairBook}
            alt="The Unfair Advantage Book"
            loading="lazy"
            className="
              h-auto
              w-full
              object-cover
            "
          />
        </div>
      </div>
    </section>
  );
}
