import Parser from "rss-parser";
import { RawPost, fetchWithTimeout } from "./types";

const parser = new Parser({
  customFields: {
    item: ["description", "content:encoded"],
  },
});

export interface RssSource {
  url: string;
  outlet: string;
  channel: string;
}

export const RSS_SOURCES: RssSource[] = [
  {
    url: "https://www.kommersant.ru/RSS/news.xml",
    outlet: "Коммерсантъ",
    channel: "Коммерсантъ",
  },
  {
    url: "https://www.vedomosti.ru/rss/news",
    outlet: "Ведомости",
    channel: "Ведомости",
  },
  {
    url: "https://www.interfax.ru/rss.asp",
    outlet: "Интерфакс",
    channel: "Интерфакс",
  },
  {
    url: "https://rssexport.rbc.ru/rbcnews/news/30/full.rss",
    outlet: "РБК",
    channel: "РБК",
  },
  {
    url: "https://www.forbes.ru/newrss.xml",
    outlet: "Forbes Россия",
    channel: "Forbes Россия",
  },
];

function stripHtml(input: string): string {
  return input
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function fetchRssFeed(src: RssSource): Promise<RawPost[]> {
  try {
    const res = await fetchWithTimeout(src.url);
    if (!res.ok) {
      console.warn(`[rss:${src.outlet}] HTTP ${res.status}`);
      return [];
    }
    const xml = await res.text();
    const feed = await parser.parseString(xml);
    return (feed.items ?? []).map((item) => {
      const rawSummary =
        item.contentSnippet ??
        item.content ??
        item.summary ??
        (item as any).description ??
        "";
      const summary = stripHtml(String(rawSummary)).slice(0, 500);
      const link = item.link ?? "";
      const id = item.guid ?? link ?? `${src.outlet}-${item.title}`;
      const publishedAt =
        item.isoDate ??
        (item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString());
      const title = (item.title ?? "").trim();
      return {
        externalId: `rss:${id}`,
        publishedAt,
        title,
        summary: summary || title,
        link,
        outlet: src.outlet,
        channel: src.channel,
      };
    });
  } catch (err) {
    console.warn(`[rss:${src.outlet}] fetch failed:`, (err as Error).message);
    return [];
  }
}
