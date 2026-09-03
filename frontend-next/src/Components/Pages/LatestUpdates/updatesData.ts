import featuredPodcastImg from "../../../assets/latestupdates/blog1.png";
import pressPhoto1 from "../../../assets/latestupdates/blog2.png";
import pressPhoto2 from "../../../assets/latestupdates/blog3.png";
// import fortuneLogo from "../../../assets/latestupdates/blog4.png";
// import entrepreneurLogo from "../../../assets/latestupdates/blog5.png";
// import businessStandardLogo from "../../../assets/latestupdates/blog6.png";

// export type UpdateCategory = "All Topics" | "Featured Podcast" | "Press Release" | "Blogs";

export type UpdatePost = {
  slug: string;
  title: string;
  // category: Exclude<UpdateCategory, "All Topics">;
  date: string;
  excerpt: string;
  cover: string;
  /** When true, show play button + “Talks at Google” label */
  podcastUi?: boolean;
};

// export const UPDATE_TABS: UpdateCategory[] = ["All Topics", "Featured Podcast", "Press Release", "Blogs"];

export const UPDATE_POSTS: UpdatePost[] = [
  {
    slug: "how-you-already-have-what-it-takes-to-succeed",
    title: "HOW YOU ALREADY HAVE WHAT IT TAKES TO SUCCEED",
    // category: "Featured Podcast",
    date: "4 Apr 2023",
    excerpt:
      "Discover how to leverage your unique strengths for success with Hasan Kubba & Ash Ali in this Talks at Google episode.",
    cover: featuredPodcastImg.src,
    podcastUi: true,
  },
  {
    slug: "you-might-be-overlooking-your-unfair-advantage-heres-how-to-find-it",
    title: "YOU MIGHT BE OVERLOOKING YOUR UNFAIR ADVANTAGE: HERE'S HOW TO FIND IT",
    // category: "Press Release",
    date: "4 Apr 2023",
    excerpt:
      "Many believe proper education, pedigree, and money are paramount to success. If that is the case, billionaires and icons like Oprah Winfrey never would have made their mark.",
    cover: pressPhoto1.src,
  },
  {
    slug: "how-the-successful-leverage-their-opportunities-and-how-we-can-use-ours",
    title: "HOW THE SUCCESSFUL LEVERAGE THEIR OPPORTUNITIES AND HOW WE CAN USE OURS",
    // category: "Press Release",
    date: "4 Apr 2023",
    excerpt:
      "Realistically, the authors – Ash Ali and Hasan Kubba advocate for a hybrid 'reality growth mindset.'",
    cover: pressPhoto2.src,
  },
  // {
  //   slug: "are-billionaires-just-lucky",
  //   title: "ARE BILLIONAIRES JUST LUCKY?",
  //   category: "Press Release",
  //   date: "4 Apr 2023",
  //   excerpt:
  //     "All eyes are on Elon Musk. His every tweet and move generate a metric ton of headlines. He's a highly polarizing figure, but...",
  //   cover: fortuneLogo,
  // },
  // {
  //   slug: "its-time-to-disrupt-yourself",
  //   title: "IT'S TIME TO DISRUPT YOURSELF",
  //   category: "Blogs",
  //   date: "4 Apr 2023",
  //   excerpt:
  //     "Here's the thing: Sure, these principles can help business...",
  //   cover: entrepreneurLogo,
  // },
  // {
  //   slug: "everyone-has-unfair-advantages-so-learn-to-leverage-yours",
  //   title: "EVERYONE HAS UNFAIR ADVANTAGES, SO LEARN TO LEVERAGE YOURS",
  //   category: "Blogs",
  //   date: "4 Apr 2023",
  //   excerpt:
  //     "Imagine two identical applicants for the same job, Sally and James. They have the same experience...",
  //   cover:businessStandardLogo,
  // },
];

