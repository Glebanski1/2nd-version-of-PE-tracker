import { NEWS as DEMO_NEWS } from "./news";
import {
  classifySectors,
  detectImportance,
  extractTags,
  isDealRelated,
  shortHash,
} from "./sources/classify";
import { RSS_SOURCES, fetchRssFeed } from "./sources/rss";
import { fetchTelegramChannel } from "./sources/telegram";
import { RawPost } from "./sources/types";
import { NewsItem } from "./types";

const TELEGRAM_CHANNELS = ["dealsma"];
const CACHE_TTL_MS = 5 * 60 * 1000;
const MAX_ITEMS = 80;

interface AggregatedResult {
  items: NewsItem[];
  isReal: boolean;
  fetchedAt: number;
  sourcesOk: number;
  sourcesTotal: number;
}

let cache: AggregatedResult | null = null;
let inFlight: Promise<AggregatedResult> | null = null;

function rawToNewsItem(p: RawPost): NewsItem {
  const haystack = `${p.title}\n${p.summary}`;
  const sectorIds = classifySectors(haystack);
  return {
    id: `${shortHash(p.externalId)}-${shortHash(p.publishedAt)}`,
    publishedAt: p.publishedAt,
    title: p.title,
    summary: p.summary,
    sectorIds,
    source: p.outlet,
    sourceUrl: p.link,
    channel: p.channel,
    importance: detectImportance(haystack),
    tags: extractTags(haystack, sectorIds),
  };
}

async function aggregate(): Promise<AggregatedResult> {
  const tgFetches = TELEGRAM_CHANNELS.map((ch) => fetchTelegramChannel(ch));
  const rssFetches = RSS_SOURCES.map((s) => fetchRssFeed(s));
  const results = await Promise.allSettled([...tgFetches, ...rssFetches]);

  const allRaw: RawPost[] = [];
  let sourcesOk = 0;
  for (const r of results) {
    if (r.status === "fulfilled" && r.value.length > 0) {
      sourcesOk += 1;
      allRaw.push(...r.value);
    }
  }
  const sourcesTotal = results.length;

  if (allRaw.length === 0) {
    return {
      items: DEMO_NEWS,
      isReal: false,
      fetchedAt: Date.now(),
      sourcesOk: 0,
      sourcesTotal,
    };
  }

  const seen = new Set<string>();
  const items: NewsItem[] = [];

  for (const raw of allRaw) {
    const text = `${raw.title} ${raw.summary}`;
    if (!isDealRelated(text)) continue;
    const item = rawToNewsItem(raw);
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    items.push(item);
  }

  items.sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );

  return {
    items: items.slice(0, MAX_ITEMS),
    isReal: true,
    fetchedAt: Date.now(),
    sourcesOk,
    sourcesTotal,
  };
}

export async function getAggregated(): Promise<AggregatedResult> {
  const now = Date.now();
  if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
    return cache;
  }
  if (inFlight) return inFlight;
  inFlight = aggregate()
    .then((res) => {
      cache = res;
      return res;
    })
    .catch((err) => {
      console.error("[aggregator] failed:", err);
      const fallback: AggregatedResult = {
        items: DEMO_NEWS,
        isReal: false,
        fetchedAt: Date.now(),
        sourcesOk: 0,
        sourcesTotal: TELEGRAM_CHANNELS.length + RSS_SOURCES.length,
      };
      cache = fallback;
      return fallback;
    })
    .finally(() => {
      inFlight = null;
    });
  return inFlight;
}

export async function getLiveSince(sinceMs: number): Promise<NewsItem[]> {
  const { items } = await getAggregated();
  return items.filter((i) => +new Date(i.publishedAt) > sinceMs);
}
