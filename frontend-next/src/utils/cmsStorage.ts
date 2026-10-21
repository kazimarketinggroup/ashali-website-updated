import fs from "fs";
import path from "path";
import { Redis } from "@upstash/redis";
import { MongoClient } from "mongodb";
import { CMSData, HeroContent } from "../types/cms";
import { defaultCmsData } from "../data/defaultCmsData";

// Path to data file for local disk persistence
const DATA_DIR = path.join(process.cwd(), "src", "data");
const DATA_FILE = path.join(DATA_DIR, "cmsData.json");

// In-memory cache for ultra-fast response and serverless execution
let inMemoryCache: CMSData | null = null;

/**
 * Clear the in-memory cache so next read fetches fresh from MongoDB.
 * Called by the GET /api/cms route to ensure live data is always served.
 */
export function clearInMemoryCache(): void {
  inMemoryCache = null;
}

// MongoDB Atlas persistent cloud database connection
const MONGODB_URI =
  process.env.DATABASE_URL ||
  process.env.MONGODB_URI ||
  "mongodb+srv://mahbubkhandakar_db_user:70wEqGuA4KalVG3S@cluster0.rujexep.mongodb.net/ash-ali?appName=Cluster0";

let mongoClientPromise: Promise<MongoClient> | null = null;

function getMongoClient(): Promise<MongoClient> | null {
  if (!MONGODB_URI) return null;
  if (!mongoClientPromise) {
    try {
      const client = new MongoClient(MONGODB_URI, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
      });
      mongoClientPromise = client.connect().catch((err) => {
        console.warn("MongoDB client connection error, resetting client promise:", err);
        mongoClientPromise = null;
        throw err;
      });
    } catch (err) {
      console.warn("MongoDB client initialization error:", err);
      mongoClientPromise = null;
    }
  }
  return mongoClientPromise;
}

// Dynamic import of Edge Config / Global Config getter
let edgeConfigGet: (<T = unknown>(key: string) => Promise<T | undefined>) | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ec = require("@vercel/edge-config");
  if (ec && typeof ec.get === "function") {
    edgeConfigGet = ec.get;
  }
} catch {
  // Edge config SDK optional
}

// Upstash Redis / Vercel KV connection (automatically active when env vars exist)
const redis =
  (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) ||
  (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
    ? new Redis({
        url: (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL)!,
        token: (process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN)!,
      })
    : null;

const STORAGE_KEY = "ashali_cms_live_data";

export function mergeWithDefaults(partial: Partial<CMSData>): CMSData {
  if (!partial) return defaultCmsData;

  // Detect outdated hero that had old "Find Your" title and missing line prefixes
  const isOutdatedHero =
    partial.hero?.headline === "Find Your" && !partial.hero?.headlineLine1Prefix;

  const mergedHero: HeroContent = isOutdatedHero
    ? defaultCmsData.hero
    : {
        ...defaultCmsData.hero,
        ...(partial.hero || {}),
        statCard: {
          stat: partial.hero?.statCard?.stat || defaultCmsData.hero.statCard?.stat || "76%",
          text: partial.hero?.statCard?.text || defaultCmsData.hero.statCard?.text || "",
          source: partial.hero?.statCard?.source || defaultCmsData.hero.statCard?.source || "",
        },
        credibilityCards:
          partial.hero?.credibilityCards && partial.hero.credibilityCards.length > 0
            ? partial.hero.credibilityCards
            : defaultCmsData.hero.credibilityCards,
      };

  // Detect outdated keynotes from old seed
  const hasOutdatedKeynotes =
    !partial.keynotes ||
    partial.keynotes.length === 0 ||
    partial.keynotes.some(
      (k) => k.id === "kn-1" && k.title?.includes("Winning in an AI-Disrupted Economy")
    );

  // Detect outdated workshops from old seed
  const hasOutdatedWorkshops =
    !partial.workshops ||
    partial.workshops.length === 0 ||
    partial.workshops.some(
      (w) => w.id === "ws-1" && w.title?.includes("Unfair Advantage Strategy Lab")
    );

  // Detect outdated faqs from old seed
  const hasOutdatedFaqs =
    !partial.faqs ||
    partial.faqs.length === 0 ||
    partial.faqs.some(
      (f) => f.id === "faq-1" && f.question?.includes("formats does Ash offer")
    );

  return {
    ...defaultCmsData,
    ...partial,
    version: "2.1.0",
    hero: mergedHero,
    watchAshSpeak: { ...defaultCmsData.watchAshSpeak, ...(partial.watchAshSpeak || {}) } as CMSData["watchAshSpeak"],
    helpingLeaders: { ...defaultCmsData.helpingLeaders, ...(partial.helpingLeaders || {}) },
    signatureIdeas: { ...defaultCmsData.signatureIdeas, ...(partial.signatureIdeas || {}) },
    bookShowcase: { ...defaultCmsData.bookShowcase, ...(partial.bookShowcase || {}) },
    capabilityIndex: { ...defaultCmsData.capabilityIndex, ...(partial.capabilityIndex || {}) } as CMSData["capabilityIndex"],
    salesKickoff: { ...defaultCmsData.salesKickoff, ...(partial.salesKickoff || {}) } as CMSData["salesKickoff"],
    buildingBridges: { ...defaultCmsData.buildingBridges, ...(partial.buildingBridges || {}) } as CMSData["buildingBridges"],
    finalCta: { ...defaultCmsData.finalCta, ...(partial.finalCta || {}) },
    footer: { ...defaultCmsData.footer, ...(partial.footer || {}) },
    siteSettings: { ...defaultCmsData.siteSettings, ...(partial.siteSettings || {}) },
    privacyPolicy: { ...defaultCmsData.privacyPolicy, ...(partial.privacyPolicy || {}) },
    termsConditions: { ...defaultCmsData.termsConditions, ...(partial.termsConditions || {}) },
    keynotes: hasOutdatedKeynotes ? defaultCmsData.keynotes : (partial.keynotes || defaultCmsData.keynotes),
    workshops: hasOutdatedWorkshops ? defaultCmsData.workshops : (partial.workshops || defaultCmsData.workshops),
    faqs: hasOutdatedFaqs ? defaultCmsData.faqs : (partial.faqs || defaultCmsData.faqs),
  };
}

/**
 * Synchronous read with safe merge.
 */
export function getCmsData(): CMSData {
  if (inMemoryCache) {
    return inMemoryCache;
  }

  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(content) as CMSData;
      inMemoryCache = mergeWithDefaults(parsed);
      return inMemoryCache;
    }
  } catch (error) {
    console.warn("Could not read local CMS file:", error);
  }

  inMemoryCache = defaultCmsData;
  return inMemoryCache;
}

/**
 * Asynchronous read checking:
 * 1. MongoDB Atlas cloud database
 * 2. Vercel Global Config (Edge Config)
 * 3. Upstash Redis / Vercel KV
 * 4. Local JSON file + in-memory cache
 */
export async function getCmsDataAsync(): Promise<CMSData> {
  // 1. Try MongoDB Atlas (persistent cloud storage)
  try {
    const clientPromise = getMongoClient();
    if (clientPromise) {
      const client = await clientPromise;
      const db = client.db("ash-ali");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const doc = await db.collection("cms_content").findOne({ _id: "live_cms_data" as any });
      if (doc && doc.data) {
        inMemoryCache = mergeWithDefaults(doc.data as CMSData);
        return inMemoryCache;
      }
    }
  } catch (mongoErr) {
    console.warn("MongoDB Atlas CMS read failed, falling back to secondary sources:", mongoErr);
  }

  // 2. Try Vercel Global Config / Edge Config
  if (edgeConfigGet && (process.env.EDGE_CONFIG || process.env.GLOBAL_CONFIG)) {
    try {
      const edgeData = await edgeConfigGet<CMSData>(STORAGE_KEY);
      if (edgeData) {
        inMemoryCache = mergeWithDefaults(edgeData);
        return inMemoryCache;
      }
    } catch (edgeErr) {
      console.warn("Global Config read error, falling back to storage:", edgeErr);
    }
  }

  // 3. Try Upstash Redis / Vercel KV
  if (redis) {
    try {
      const remoteData = await redis.get<CMSData>(STORAGE_KEY);
      if (remoteData) {
        inMemoryCache = mergeWithDefaults(remoteData);
        return inMemoryCache;
      }
    } catch (err) {
      console.warn("Redis read failed, falling back to local storage:", err);
    }
  }

  // 4. Fallback to local file / memory
  return getCmsData();
}

/**
 * Save CMS data to:
 * 1. In-memory cache
 * 2. MongoDB Atlas persistent cloud database
 * 3. Vercel Global Config (if token is available)
 * 4. Upstash Redis / Vercel KV (if configured)
 * 5. Local disk (when in development)
 */
export async function saveCmsData(data: CMSData): Promise<boolean> {
  data.lastUpdated = new Date().toISOString();
  inMemoryCache = data;

  // 1. Save to MongoDB Atlas (cloud persistence)
  try {
    const clientPromise = getMongoClient();
    if (clientPromise) {
      const client = await clientPromise;
      const db = client.db("ash-ali");
      await db.collection("cms_content").updateOne(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { _id: "live_cms_data" as any },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { $set: { _id: "live_cms_data" as any, data, lastUpdated: data.lastUpdated } },
        { upsert: true }
      );
    }
  } catch (mongoWriteErr) {
    console.warn("MongoDB Atlas CMS save failed:", mongoWriteErr);
  }

  // 2. Update Vercel Global Config / Edge Config via Vercel API if configured
  const edgeConfigUrl = process.env.EDGE_CONFIG || process.env.GLOBAL_CONFIG;
  const vercelToken =
    process.env.VERCEL_API_TOKEN ||
    process.env.VERCEL_TOKEN ||
    process.env.VERCEL_OIDC_TOKEN;

  if (edgeConfigUrl && vercelToken) {
    try {
      const match = edgeConfigUrl.match(/ecfg_[a-zA-Z0-9_-]+/);
      if (match) {
        const edgeConfigId = match[0];
        await fetch(`https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${vercelToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: [
              {
                operation: "upsert",
                key: STORAGE_KEY,
                value: data,
              },
            ],
          }),
        });
      }
    } catch (edgeWriteErr) {
      console.warn("Failed to write to Vercel Global Config:", edgeWriteErr);
    }
  }

  // 3. Save to Upstash Redis if configured
  if (redis) {
    try {
      await redis.set(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.warn("Failed to write CMS data to Redis:", err);
    }
  }

  // 4. Save to local disk for development persistence
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.warn("Local disk write skipped (normal in serverless read-only mode):", error);
  }

  return true;
}
