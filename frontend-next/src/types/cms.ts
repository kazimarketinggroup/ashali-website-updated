export type CMSCategory =
  | "All Topics"
  | "Featured Podcast"
  | "Press Release"
  | "Articles"
  | "Keynotes"
  | "Case Study";

export interface HeroContent {
  eyebrow: string;
  headline: string;
  highlightWord: string;
  headlinePart2: string;
  bio: string;
  location: string;
  ctaText: string;
  ctaLink: string;
  heroImage?: string;
  secondaryButtons: Array<{ label: string; to: string }>;
}

export interface ServiceCardItem {
  id: string;
  title: string;
  description: string;
  buttonLabel: string;
  bgImage: string;
  to: string;
}

export interface HelpingLeadersContent {
  eyebrow: string;
  highlightWord: string;
  titlePart2: string;
  description: string;
  cards: ServiceCardItem[];
}

export interface IdeaItem {
  number: string;
  title: string;
  description: string;
}

export interface SignatureIdeasContent {
  heading: string;
  buttonText: string;
  buttonLink: string;
  ideas: IdeaItem[];
}

export interface BookTagItem {
  label: string;
}

export interface BookShowcaseContent {
  headline: string;
  highlightWord: string;
  description: string;
  bookCoverImage: string;
  amazonLink: string;
  previewLink?: string;
  tags: BookTagItem[];
}

export interface FinalCtaContent {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaTo: string;
}

export interface FooterLinkItem {
  label: string;
  to: string;
  external?: boolean;
}

export interface FooterColumnItem {
  heading: string;
  links: FooterLinkItem[];
}

export interface FooterContent {
  brandName: string;
  bio: string;
  locations: string;
  newsletterHeading: string;
  newsletterSubtitle: string;
  linkedinUrl: string;
  twitterUrl: string;
  instagramUrl?: string;
  columns: FooterColumnItem[];
  copyright: string;
}

export interface UpdateItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  cover: string;
  podcastUi?: boolean;
  published: boolean;
  featured?: boolean;
  readTime?: string;
  author?: string;
}

export interface KeynoteItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  duration: string;
  targetAudience: string;
  description: string;
  takeaways: string[];
  published: boolean;
  order: number;
}

export interface WorkshopItem {
  id: string;
  title: string;
  tagline: string;
  duration: string;
  format: string;
  description: string;
  keyOutcomes: string[];
  published: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  published: boolean;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  fullName: string;
  jobTitle?: string;
  organisation: string;
  event: string;
  rating?: number;
  avatarUrl?: string;
  logoUrl?: string;
  published: boolean;
  featuredOnHome: boolean;
}

export interface MetricItem {
  id: string;
  icon: string;
  label?: string;
  title: string;
  sub?: string;
  row: 1 | 2;
  published: boolean;
}

export interface PortfolioItem {
  id: string;
  name: string;
  role: string;
  metrics: string;
  description: string;
  url: string;
  logoUrl?: string;
  status: "Active" | "Exited" | "Advising" | "Invested";
  published: boolean;
}

export interface MediaItem {
  id: string;
  title: string;
  publication: string;
  type: "Video" | "Article" | "Podcast" | "Interview";
  url: string;
  thumbnailUrl?: string;
  date: string;
  published: boolean;
}

export interface SiteSettings {
  siteTitle: string;
  tagline: string;
  contactEmail: string;
  bookingEmail: string;
  linkedinUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  announcementBanner: {
    enabled: boolean;
    text: string;
    link: string;
  };
}

export interface InquiryItem {
  id: string;
  name: string;
  email: string;
  type: string;
  message: string;
  details?: Record<string, string>;
  date: string;
  status: "New" | "In Review" | "Replied" | "Archived";
  notes?: string;
}

export interface SubscriberItem {
  id: string;
  email: string;
  name?: string;
  date: string;
  source?: string;
  status: "Active" | "Unsubscribed";
}

export interface CMSData {
  version: string;
  lastUpdated: string;
  hero: HeroContent;
  helpingLeaders: HelpingLeadersContent;
  signatureIdeas: SignatureIdeasContent;
  bookShowcase: BookShowcaseContent;
  finalCta: FinalCtaContent;
  footer: FooterContent;
  updates: UpdateItem[];
  keynotes: KeynoteItem[];
  workshops: WorkshopItem[];
  faqs: FaqItem[];
  testimonials: TestimonialItem[];
  metrics: MetricItem[];
  portfolio: PortfolioItem[];
  media: MediaItem[];
  siteSettings: SiteSettings;
  inquiries: InquiryItem[];
  subscribers: SubscriberItem[];
}
