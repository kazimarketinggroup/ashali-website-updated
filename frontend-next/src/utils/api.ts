import axios from "axios";

/*
  Was `import.meta.env.VITE_API_URL` under Vite. Next has no `import.meta.env`,
  and only variables prefixed NEXT_PUBLIC_ are inlined into the client bundle.

  This must be read as a full static property access — `process.env.NEXT_PUBLIC_API_URL`
  — because Next substitutes the literal at build time. Destructuring or
  dynamic indexing (`process.env[key]`) would yield undefined in the browser.
  Same localhost fallback as before.
*/
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getApiErrorMessage = (error: unknown, fallback: string): string => {
  if (axios.isAxiosError(error)) {
    return (error.response?.data as { message?: string } | undefined)?.message || fallback;
  }
  return fallback;
};
