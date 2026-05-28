export interface RawPost {
  externalId: string;
  publishedAt: string;
  title: string;
  summary: string;
  link: string;
  outlet: string;
  channel: string;
}

export const USER_AGENT =
  "Mozilla/5.0 (compatible; PE-Tracker/2.0; +https://github.com/Glebanski1/2nd-version-of-pe-tracker)";

export const FETCH_TIMEOUT_MS = 8000;

export async function fetchWithTimeout(
  url: string,
  init?: RequestInit,
): Promise<Response> {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...init,
      signal: ctrl.signal,
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "*/*",
        ...(init?.headers ?? {}),
      },
      cache: "no-store",
    });
  } finally {
    clearTimeout(id);
  }
}
