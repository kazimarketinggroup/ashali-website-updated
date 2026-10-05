import fs from "fs";
import path from "path";
import { Redis } from "@upstash/redis";
import { CMSData } from "../types/cms";
import { defaultCmsData } from "../data/defaultCmsData";

// Path to data file for local disk persistence
const DATA_DIR = path.join(process.cwd(), "src", "data");
const DATA_FILE = path.join(DATA_DIR, "cmsData.json");

// In-memory cache for ultra-fast response and serverless execution
let inMemoryCache: CMSData | null = null;

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

function mergeWithDefaults(partial: Partial<CMSData>): CMSData {
  return {
    ...defaultCmsData,
    ...partial,
    hero: { ...defaultCmsData.hero, ...(partial.hero || {}) },
    helpingLeaders: { ...defaultCmsData.helpingLeaders, ...(partial.helpingLeaders || {}) },
    signatureIdeas: { ...defaultCmsData.signatureIdeas, ...(partial.signatureIdeas || {}) },
    bookShowcase: { ...defaultCmsData.bookShowcase, ...(partial.bookShowcase || {}) },
    finalCta: { ...defaultCmsData.finalCta, ...(partial.finalCta || {}) },
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
 * 1. Vercel Global Config (Edge Config)
 * 2. Upstash Redis / Vercel KV
 * 3. Local JSON file + in-memory cache
 */
export async function getCmsDataAsync(): Promise<CMSData> {
  // 1. Try Vercel Global Config / Edge Config
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

  // 2. Try Upstash Redis / Vercel KV
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

  // 3. Fallback to local file / memory
  return getCmsData();
}

/**
 * Save CMS data to:
 * 1. In-memory cache
 * 2. Vercel Global Config (if token is available)
 * 3. Upstash Redis / Vercel KV (if configured)
 * 4. Local disk (when in development)
 */
export async function saveCmsData(data: CMSData): Promise<boolean> {
  data.lastUpdated = new Date().toISOString();
  inMemoryCache = data;

  // 1. Update Vercel Global Config / Edge Config via Vercel API if configured
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

  // 2. Save to Upstash Redis if configured
  if (redis) {
    try {
      await redis.set(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.warn("Failed to write CMS data to Redis:", err);
    }
  }

  // 3. Save to local disk for development persistence
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.warn("Local disk write skipped (normal in serverless read-only mode):", error);
    return true; // Still successful via in-memory, Edge Config, or Redis
  }
}
