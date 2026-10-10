import { CMSData } from "../types/cms";

export const defaultCmsData: CMSData = {
  version: "1.0.0",
  lastUpdated: new Date().toISOString(),

  hero: {
    eyebrow: "International keynote speaker • Founder • Operator • Author",
    headline: "Find Your",
    highlightWord: "Unfair Advantage",
    headlinePart2: "In An AI Shaped World.",
    bio: "Ash Ali helps leaders and organisations turn AI disruption into sharper strategy, stronger human capability and practical competitive advantage. He brings 25+ years of experience building technology businesses, including serving as Just Eat UK's first Marketing Director, co-authoring The Unfair Advantage and co-founding Uhubs.ai.",
    location: "Based between London and Kuala Lumpur. Available globally for keynotes, leadership offsites and executive workshops.",
    ctaText: "Work with Ash",
    ctaLink: "/contact",
    heroImage: "",
    secondaryButtons: [
      { label: "Keynotes", to: "/speaking" },
      { label: "Advisory", to: "/advisory" },
      { label: "Workshops", to: "/workshops" },
    ],
  },

  helpingLeaders: {
    eyebrow: "What Ash Helps With",
    highlightWord: "Helping leaders",
    titlePart2: "build for the AI era",
    description:
      "Technology is becoming more accessible. Judgement, context, capability, relationships and execution are not. Ash helps leaders understand what AI changes, what remains deeply human and where their organisation can build an advantage that competitors cannot simply copy.",
    cards: [
      {
        id: "hl-1",
        title: "KEYNOTES",
        description:
          "Shift how people see advantage, leadership and opportunity in an AI shaped world. Story led, practical and tailored to the room.",
        buttonLabel: "Explore Keynotes",
        bgImage: "",
        to: "/speaking",
      },
      {
        id: "hl-2",
        title: "EXECUTIVE WORKSHOPS",
        description:
          "Turn the ideas into decisions, priorities and a practical 90 day direction for your leadership team.",
        buttonLabel: "Explore Workshops",
        bgImage: "",
        to: "/workshops",
      },
      {
        id: "hl-3",
        title: "ADVISORY",
        description:
          "Direct strategic advisory for founders, boards and executive leadership teams navigating the AI shift.",
        buttonLabel: "Explore Advisory",
        bgImage: "",
        to: "/advisory",
      },
    ],
  },

  signatureIdeas: {
    heading: "Three ideas built for this moment.",
    buttonText: "See the full keynotes",
    buttonLink: "/speaking",
    ideas: [
      {
        number: "01",
        title: "The Unfair Advantage in the Age of AI",
        description: "Find the assets and capabilities AI can amplify, not erase.",
      },
      {
        number: "02",
        title: "The Human Advantage",
        description:
          "Build teams that retain judgement, curiosity and adaptability as machines get smarter.",
      },
      {
        number: "03",
        title: "From Outsider to Operator",
        description:
          "Turn background, constraint and difference into momentum and commercial advantage.",
      },
    ],
  },

  bookShowcase: {
    headline: "The Unfair Advantage",
    highlightWord: "Business Book of the Year 2021",
    description:
      "Co-authored with Hasan Kubba, The Unfair Advantage won Business Book of the Year 2021 and became an international bestseller translated into 8 languages. It introduces the MILES framework to identify and leverage your hidden competitive strengths.",
    bookCoverImage: "",
    amazonLink: "https://www.amazon.co.uk/Unfair-Advantage-Startup-Success-Predict/dp/1788163311",
    tags: [
      { label: "Business Book of the Year 2021, The Business Book Awards" },
      { label: "Translated worldwide" },
      { label: "150,000+ copies sold" },
      { label: "Used in MBA & university courses" },
      { label: "The MILES framework" },
    ],
  },

  finalCta: {
    heading: "Planning a keynote, leadership offsite or executive workshop?",
    body: "Share the audience, date and outcome you want to create. We'll recommend the most suitable format and confirm availability.",
    ctaLabel: "Enquire now",
    ctaTo: "/contact",
  },

  footer: {
    brandName: "ASH ALI",
    bio: "Ash Ali is a British tech entrepreneur, investor, international keynote speaker and co-author of the award winning The Unfair Advantage. He helps leaders and organisations build practical advantage in an AI shaped world. Based between London and Kuala Lumpur; working globally.",
    locations: "London • Kuala Lumpur • Global",
    newsletterHeading: "Let's keep connected",
    newsletterSubtitle: "Ash's thinking on advantage, AI and growth, straight to your inbox.",
    linkedinUrl: "https://uk.linkedin.com/in/ashali",
    twitterUrl: "https://x.com/Ash_Ali",
    instagramUrl: "https://www.instagram.com/ashali",
    columns: [
      {
        heading: "Pages",
        links: [
          { label: "About", to: "/about" },
          { label: "Keynotes", to: "/speaking" },
          { label: "Workshops", to: "/workshops" },
          { label: "Book", to: "/unfair-advantage" },
        ],
      },
      {
        heading: "More",
        links: [
          { label: "Advisory", to: "/advisory" },
          { label: "Malaysia & Southeast Asia", to: "/malaysia-sea" },
          { label: "Impact", to: "/impact" },
        ],
      },
      {
        heading: "Elsewhere",
        links: [
          { label: "Uhubs.ai", to: "https://www.uhubs.ai/", external: true },
          { label: "The Unfair Academy", to: "https://www.theunfairacademy.com/", external: true },
          { label: "Privacy Policy", to: "/privacy" },
          { label: "Terms & Conditions", to: "/terms" },
        ],
      },
    ],
    copyright: "Ash Ali. All rights reserved.",
  },

  updates: [
    {
      id: "up-1",
      slug: "how-you-already-have-what-it-takes-to-succeed",
      title: "HOW YOU ALREADY HAVE WHAT IT TAKES TO SUCCEED",
      category: "Featured Podcast",
      date: "4 Apr 2023",
      excerpt:
        "Discover how to leverage your unique strengths for success with Hasan Kubba & Ash Ali in this Talks at Google episode.",
      content:
        "In this acclaimed Talks at Google session, Ash Ali and Hasan Kubba deconstruct the core principles of their award-winning book 'The Unfair Advantage'. They break down the MILES framework and demonstrate why grit and hard work alone are not enough — understanding your individual strengths, resources, and timing gives you an unfair edge.",
      cover: "/press/talks-google.jpg",
      podcastUi: true,
      published: true,
      featured: true,
      readTime: "6 min read",
      author: "Ash Ali & Hasan Kubba",
    },
    {
      id: "up-2",
      slug: "you-might-be-overlooking-your-unfair-advantage-heres-how-to-find-it",
      title: "YOU MIGHT BE OVERLOOKING YOUR UNFAIR ADVANTAGE: HERE'S HOW TO FIND IT",
      category: "Press Release",
      date: "4 Apr 2023",
      excerpt:
        "Many believe proper education, pedigree, and money are paramount to success. If that is the case, billionaires and icons like Oprah Winfrey never would have made their mark.",
      content:
        "Society constantly tells us that success comes down to credentials, high test scores, and deep venture pockets. Yet history consistently proves that the most revolutionary leaders broke through by identifying non-linear strengths. Explore how to audit your personal stack.",
      cover: "/press/ash-press-1.jpg",
      podcastUi: false,
      published: true,
      featured: false,
      readTime: "4 min read",
      author: "Ash Ali",
    },
    {
      id: "up-3",
      slug: "how-the-successful-leverage-their-opportunities-and-how-we-can-use-ours",
      title: "HOW THE SUCCESSFUL LEVERAGE THEIR OPPORTUNITIES AND HOW WE CAN USE OURS",
      category: "Press Release",
      date: "4 Apr 2023",
      excerpt:
        "Realistically, the authors – Ash Ali and Hasan Kubba advocate for a hybrid 'reality growth mindset.'",
      content:
        "Optimism without realism is delusion. High performers develop a Reality Growth Mindset: accepting the raw cards they have been dealt, while maintaining unconditional agency to play them with relentless precision.",
      cover: "/press/ash-press-2.jpg",
      podcastUi: false,
      published: true,
      featured: false,
      readTime: "5 min read",
      author: "Ash Ali",
    },
    {
      id: "up-4",
      slug: "are-billionaires-just-lucky",
      title: "ARE BILLIONAIRES JUST LUCKY? THE TRUTH ABOUT SUCCESS",
      category: "Articles",
      date: "12 May 2023",
      excerpt:
        "Unpacking the role of serendipity, market timing, and prepared capability in modern startup scaleups.",
      content:
        "Is success purely meritocratic, or is it fundamentally down to luck? The answer is both. By understanding how luck operates in ecosystems, founders can create larger surface areas for fortune to strike.",
      cover: "/press/fortune-feature.jpg",
      podcastUi: false,
      published: true,
      featured: false,
      readTime: "7 min read",
      author: "Ash Ali",
    },
  ],

  keynotes: [
    {
      id: "kn-1",
      title: "The Unfair Advantage: Winning in an AI-Disrupted Economy",
      subtitle: "Navigating technological transformation with human-centric competitive moats",
      badge: "Flagship Keynote",
      duration: "45–60 mins",
      targetAudience: "Enterprise Leaders, C-Suite, Global Summits, Founders",
      description:
        "In an era where AI tools are commoditised and accessible to everyone, standard best practices no longer provide an edge. Ash Ali demonstrates how organisations and individuals uncover their bespoke, defensible Unfair Advantage to out-innovate competitors.",
      takeaways: [
        "Unpack the MILES framework applied specifically to AI-augmented teams",
        "Differentiate between table-stakes AI adoption and true proprietary competitive moat",
        "Cultivate a Reality Growth Mindset across executive teams",
        "Actionable blueprint for continuous capability upgrades in rapid change",
      ],
      published: true,
      order: 1,
    },
    {
      id: "kn-2",
      title: "From Seed to Scale: Lessons from Just Eat & Beyond",
      subtitle: "Zero-to-IPO tactical growth playbook and hyper-growth scaling",
      badge: "Entrepreneurship & Growth",
      duration: "45–60 mins",
      targetAudience: "Tech Startups, Growth Teams, Investors, Accelerators",
      description:
        "Drawing on his front-line journey as Just Eat UK's first Marketing Director, Ash shares the unvarnished truth of taking an early-stage startup from turbulent early days into a multi-billion dollar publicly listed giant.",
      takeaways: [
        "Guerrilla growth tactics that beat massive incumbent competitors",
        "How to build high-velocity experimentation loops in marketing and product",
        "Maintaining founder mentality and agility during aggressive scale-up",
      ],
      published: true,
      order: 2,
    },
    {
      id: "kn-3",
      title: "Building AI-Ready Organisations and Upskilling Talent",
      subtitle: "Transforming workforce capabilities into future-proof intelligence",
      badge: "Future of Work",
      duration: "40–50 mins",
      targetAudience: "HR Executives, People Leaders, Corporate Innovation Summits",
      description:
        "How leading companies are combining human judgment with autonomous workflows to multiply team productivity without burning out talent.",
      takeaways: [
        "Frameworks for identifying high-impact AI leverage points in knowledge work",
        "Overcoming organisational inertia and fear around technological displacement",
        "Modern upskilling architectures that stick and deliver immediate ROI",
      ],
      published: true,
      order: 3,
    },
  ],

  workshops: [
    {
      id: "ws-1",
      title: "Executive Masterclass: Unfair Advantage Strategy Lab",
      tagline: "High-impact, hands-on strategic workshop for leadership teams",
      duration: "Half-Day or Full-Day",
      format: "In-Person or Interactive Virtual",
      description:
        "A rigorous, highly collaborative session where executive teams audit their organisation's core assets, identify hidden vulnerabilities, and build a concrete 12-month competitive moat.",
      keyOutcomes: [
        "Complete enterprise-level MILES audit",
        "Prioritised roadmap of strategic advantages to protect and exploit",
        "Alignment on AI adoption vs. human differentiator strategy",
      ],
      published: true,
    },
    {
      id: "ws-2",
      title: "Growth Acceleration & Rapid Scaling Lab",
      tagline: "For scaleup founders, product leaders, and marketing directors",
      duration: "Full-Day Intensive",
      format: "Executive Offsite",
      description:
        "Directly diagnose customer acquisition bottlenecks, unlock retention levers, and develop scalable distribution engines.",
      keyOutcomes: [
        "Deep-dive growth audits using Just Eat's playbook",
        "Acquisition channel prioritisation matrix",
        "Actionable 90-day execution sprints",
      ],
      published: true,
    },
  ],

  faqs: [
    {
      id: "faq-1",
      question: "What formats does Ash offer for corporate keynotes?",
      answer:
        "Ash delivers in-person keynote speeches, virtual livestreams, interactive fireside chats, and executive panel discussions. Durations typically range from 45 to 60 minutes with an optional 15-30 minute audience Q&A.",
      category: "Speaking",
      published: true,
    },
    {
      id: "faq-2",
      question: "How far in advance should we book Ash Ali?",
      answer:
        "We recommend reaching out 3 to 6 months in advance, especially for international conferences and peak conference seasons (Q2 and Q4). However, short-notice requests can sometimes be accommodated depending on Ash's travel schedule between London and Kuala Lumpur.",
      category: "Booking",
      published: true,
    },
    {
      id: "faq-3",
      question: "Can keynote presentations be tailored to our specific industry?",
      answer:
        "Yes, absolutely. Ash conducts an initial briefing call with event organisers to understand your audience profile, key event themes, and organisational goals, tailoring case studies, examples, and language to match.",
      category: "Customisation",
      published: true,
    },
    {
      id: "faq-4",
      question: "Are workshops available for executive teams?",
      answer:
        "Yes. Ash frequently facilitates half-day and full-day strategic workshops and offsites for boards, C-suite executives, and scaleup leadership teams on AI strategy and the Unfair Advantage framework.",
      category: "Workshops",
      published: true,
    },
  ],

  testimonials: [
    {
      id: "t1",
      quote:
        "Ash delivered an outstanding keynote at our Innova event, sharing valuable insights from Just Eat. Professional, insightful, and a pleasure to work with, many thanks!",
      fullName: "Freddie Monk",
      jobTitle: "",
      organisation: "EY",
      event: "Innova",
      rating: 5,
      avatarUrl: "/avatars/freddie.png",
      logoUrl: "/logos/ey.png",
      published: true,
      featuredOnHome: true,
    },
    {
      id: "t2",
      quote:
        "Ash Ali’s talk at Salesforce Tower was exceptional, sharing his experience as an entrepreneur and marketing director at Just Eat. His insights on the Unfair Advantage made it one of our best events.",
      fullName: "Cyrus Hessabi",
      jobTitle: "",
      organisation: "Salesforce",
      event: "Salesforce Tower",
      rating: 5,
      avatarUrl: "/avatars/husabi.png",
      logoUrl: "/logos/salesforce.png",
      published: true,
      featuredOnHome: true,
    },
    {
      id: "t3",
      quote:
        "I’ve attended many entrepreneur events, but Ash’s talk at TechItalia was by far one of the most authentic, inspiring, and engaging.",
      fullName: "Andrea Angella",
      jobTitle: "",
      organisation: "TechItalia",
      event: "TechItalia",
      rating: 5,
      avatarUrl: "/avatars/angella.png",
      logoUrl: "/logos/techitalia.png",
      published: true,
      featuredOnHome: true,
    },
  ],

  metrics: [
    {
      id: "m-1",
      icon: "BookOpen",
      label: "Co-author of",
      title: "The Unfair Advantage",
      sub: "Published by Profile Books & translated into 8 languages",
      row: 1,
      published: true,
    },
    {
      id: "m-2",
      icon: "Trophy",
      label: "Winner",
      title: "Business Book of the Year 2021",
      sub: "The Business Book Awards",
      row: 1,
      published: true,
    },
    {
      id: "m-3",
      icon: "Briefcase",
      label: "Former First Marketing Director at",
      title: "Just Eat",
      sub: "Scaled from seed stage to IPO valuation",
      row: 1,
      published: true,
    },
    {
      id: "m-4",
      icon: "MapPin",
      label: "International Bases",
      title: "London & Kuala Lumpur",
      sub: "Global engagement capability",
      row: 2,
      published: true,
    },
    {
      id: "m-5",
      icon: "Users",
      label: "Co-founder of",
      title: "Uhubs",
      sub: "AI-driven skills intelligence platform",
      row: 2,
      published: true,
    },
    {
      id: "m-6",
      icon: "Mic",
      label: "Global",
      title: "Keynote Speaker",
      sub: "Over 150+ worldwide keynotes",
      row: 2,
      published: true,
    },
    {
      id: "m-7",
      icon: "Sparkles",
      label: "Spoken at",
      title: "TEDx, Salesforce, EY",
      sub: "Audiences from 50 to 5,000+",
      row: 2,
      published: true,
    },
  ],

  portfolio: [
    {
      id: "p-1",
      name: "Just Eat UK",
      role: "First Marketing Director",
      metrics: "Seed to £1.4B+ IPO",
      description:
        "Led early growth and digital customer acquisition strategy, cementing Just Eat as the undisputed market leader in online food delivery across the UK.",
      url: "https://www.just-eat.co.uk/",
      status: "Exited",
      published: true,
    },
    {
      id: "p-2",
      name: "Uhubs.ai",
      role: "Co-Founder",
      metrics: "Enterprise Upskilling Platform",
      description:
        "AI-powered skills intelligence engine helping enterprise teams pinpoint human capability gaps and train workforces in high-impact competencies.",
      url: "https://www.uhubs.ai/",
      status: "Active",
      published: true,
    },
    {
      id: "p-3",
      name: "The Unfair Academy",
      role: "Founder",
      metrics: "Global Learning Community",
      description:
        "Masterclasses and community helping ambitious founders and high performers decode and build their unfair advantage.",
      url: "https://www.theunfairacademy.com/",
      status: "Active",
      published: true,
    },
    {
      id: "p-4",
      name: "WashPlus",
      role: "Advisor & Board Member",
      metrics: "Sustainable Tech Laundromat Chain",
      description:
        "Disrupting traditional urban laundromats with eco-friendly IoT connected infrastructure and automated retail operations.",
      url: "/portfolio",
      status: "Advising",
      published: true,
    },
  ],

  media: [
    {
      id: "med-1",
      title: "Talks at Google: How to Find Your Unfair Advantage",
      publication: "Google",
      type: "Video",
      url: "https://www.youtube.com/watch?v=gT8y7qQ2U0k",
      date: "2023",
      published: true,
    },
    {
      id: "med-2",
      title: "TEDx Talk: The Hidden Currency of High Performance",
      publication: "TEDx",
      type: "Video",
      url: "https://www.ted.com/",
      date: "2022",
      published: true,
    },
    {
      id: "med-3",
      title: "BBC Radio: The Changing Nature of Work and AI",
      publication: "BBC",
      type: "Podcast",
      url: "https://www.bbc.co.uk/",
      date: "2023",
      published: true,
    },
    {
      id: "med-4",
      title: "Forbes Feature: Redefining Startup Moats in an AI World",
      publication: "Forbes",
      type: "Article",
      url: "https://www.forbes.com/",
      date: "2024",
      published: true,
    },
  ],

  siteSettings: {
    siteTitle: "Ash Ali | Entrepreneur, Investor & Keynote Speaker",
    tagline: "Helping leaders & organisations turn unfair advantage into performance.",
    contactEmail: "contact@ashali.com",
    bookingEmail: "speaking@ashali.com",
    linkedinUrl: "https://www.linkedin.com/in/ashali/",
    twitterUrl: "https://twitter.com/ashali",
    instagramUrl: "https://www.instagram.com/ashaliuk/",
    youtubeUrl: "https://www.youtube.com/@AshAliOfficial",
    seoTitle: "Ash Ali | Entrepreneur, Investor & Keynote Speaker",
    seoDescription:
      "Ash Ali is an entrepreneur, investor, keynote speaker and co-author of The Unfair Advantage, helping founders, leaders and organisations build AI-ready businesses.",
    seoKeywords:
      "Ash Ali, The Unfair Advantage, Keynote Speaker, AI Strategy, Just Eat, Startup Growth, London, Kuala Lumpur",
    announcementBanner: {
      enabled: false,
      text: "Now accepting Keynote & Advisory Engagements for 2026/2027",
      link: "/contact",
    },
  },

  inquiries: [
    {
      id: "inq-101",
      name: "Marcus Vance",
      email: "m.vance@techsummit.org",
      type: "Keynotes",
      message:
        "We are organizing our annual Tech Global Summit in Singapore for November 2026 (approx 1,800 delegates). We would love to check Ash's availability for the opening morning keynote on AI & Unfair Advantage.",
      date: "2026-10-04 14:22",
      status: "New",
      details: {
        Organization: "Tech Global Summit",
        "Event Date": "November 18, 2026",
        Location: "Singapore",
      },
    },
    {
      id: "inq-102",
      name: "Sarah Jenkins",
      email: "sarah.j@vertexventures.com",
      type: "Advisory",
      message:
        "Interested in discussing an advisory engagement for our portfolio companies preparing for Series B scale in Southeast Asia.",
      date: "2026-10-02 09:45",
      status: "In Review",
      details: {
        Company: "Vertex Ventures",
        Focus: "Scaleup Go-To-Market",
      },
    },
    {
      id: "inq-103",
      name: "David Chen",
      email: "david@innovatecorp.com",
      type: "Workshops",
      message:
        "We want to book a half-day Unfair Advantage Strategic Workshop for our top 25 senior executives.",
      date: "2026-09-28 17:10",
      status: "Replied",
      details: {
        Company: "InnovateCorp UK",
        Delegates: "25 C-Suite / VPs",
      },
    },
  ],

  subscribers: [
    {
      id: "sub-1",
      email: "j.miller@fintechgroup.co.uk",
      name: "James Miller",
      date: "2026-10-04",
      source: "Homepage Footer",
      status: "Active",
    },
    {
      id: "sub-2",
      email: "elena.rostova@venture.de",
      name: "Elena Rostova",
      date: "2026-10-03",
      source: "Book Page",
      status: "Active",
    },
    {
      id: "sub-3",
      email: "tariq.almansoor@dubai-tech.ae",
      name: "Tariq Al Mansoor",
      date: "2026-10-01",
      source: "Updates Page",
      status: "Active",
    },
  ],
};
