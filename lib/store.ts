import { DEALS, getDealsBySector, getRecentDeals } from "./deals";
import { MULTIPLIERS, getMultipliersBySector } from "./multipliers";
import { NEWS, getLatestNews, getNewsBySector } from "./news";
import { SECTORS, getSectorById } from "./sectors";
import {
  Deal,
  MarketOverview,
  NewsItem,
  SectorSnapshot,
} from "./types";

type LiveEvent =
  | { kind: "news"; payload: NewsItem }
  | { kind: "deal"; payload: Deal }
  | { kind: "heartbeat"; payload: { at: string } };

const LIVE_BUFFER: LiveEvent[] = [];

const SAMPLE_LIVE_NEWS: NewsItem[] = [
  {
    id: "n-live-001",
    publishedAt: new Date().toISOString(),
    title: "@dealsma: Ozon обсуждает выкуп оставшейся доли в Ozon Fintech",
    summary:
      "По данным источников, маркетплейс ведёт переговоры о консолидации 100% финтех-направления. Оценка обсуждается в диапазоне 45–55 млрд руб.",
    sectorIds: ["it", "finance"],
    source: "@dealsma",
    sourceUrl: "https://t.me/dealsma/4825",
    channel: "Telegram · DealsMA",
    importance: "high",
    tags: ["Ozon", "Финтех", "M&A"],
  },
  {
    id: "n-live-002",
    publishedAt: new Date().toISOString(),
    title: "Газпромбанк Инвестиции: понизили целевую оценку Магнита на 8%",
    summary:
      "Аналитики связывают коррекцию с падением LfL-трафика и ростом затрат на логистику. Новый таргет — 7 850 руб. за акцию.",
    sectorIds: ["retail"],
    source: "Газпромбанк Инвестиции",
    sourceUrl: "https://gazprombank.investments/analitika/magnit-may-2026",
    channel: "ГПБ Инвестиции",
    importance: "medium",
    tags: ["Магнит", "Equity Research"],
  },
  {
    id: "n-live-003",
    publishedAt: new Date().toISOString(),
    title: "@dealsma: фонд Da Vinci Capital ведёт переговоры о выходе из Cian",
    summary:
      "Размер пакета — около 12%. Среди потенциальных покупателей — стратегические игроки в недвижимости и крупные ПИФы.",
    sectorIds: ["realestate", "it"],
    source: "@dealsma",
    sourceUrl: "https://t.me/dealsma/4827",
    channel: "Telegram · DealsMA",
    importance: "high",
    tags: ["Da Vinci Capital", "Cian", "PE exit"],
  },
];

let liveCursor = 0;

export function pollLiveUpdates(sinceMs: number): {
  asOf: string;
  events: NewsItem[];
} {
  const now = Date.now();
  const shouldEmit = now - sinceMs > 8_000 && Math.random() > 0.45;
  const events: NewsItem[] = [];
  if (shouldEmit) {
    const tmpl = SAMPLE_LIVE_NEWS[liveCursor % SAMPLE_LIVE_NEWS.length];
    liveCursor += 1;
    events.push({
      ...tmpl,
      id: `${tmpl.id}-${now}`,
      publishedAt: new Date(now).toISOString(),
    });
  }
  return { asOf: new Date(now).toISOString(), events };
}

export function getMarketOverview(): MarketOverview {
  const totalDealsYTD = SECTORS.reduce((acc, s) => acc + s.totalDealsYTD, 0);
  const totalVolumeYTDBnRub = +SECTORS.reduce(
    (acc, s) => acc + s.totalVolumeYTDBnRub,
    0,
  ).toFixed(1);
  const avgDealSizeMnRub = +((totalVolumeYTDBnRub * 1000) / totalDealsYTD).toFixed(0);
  const yoyChangePct = +(
    SECTORS.reduce(
      (acc, s) => acc + s.yoyChangePct * s.totalVolumeYTDBnRub,
      0,
    ) / totalVolumeYTDBnRub
  ).toFixed(1);
  const topByVolume = [...SECTORS].sort(
    (a, b) => b.totalVolumeYTDBnRub - a.totalVolumeYTDBnRub,
  )[0];
  const topByCount = [...SECTORS].sort(
    (a, b) => b.totalDealsYTD - a.totalDealsYTD,
  )[0];
  return {
    asOf: new Date().toISOString(),
    totalDealsYTD,
    totalVolumeYTDBnRub,
    avgDealSizeMnRub,
    yoyChangePct,
    topSectorByVolume: topByVolume.id,
    topSectorByCount: topByCount.id,
  };
}

export function getSectorSnapshot(sectorId: string): SectorSnapshot | null {
  const sector = getSectorById(sectorId);
  if (!sector) return null;
  return {
    sector,
    multipliers: getMultipliersBySector(sectorId),
    deals: getDealsBySector(sectorId),
    news: getNewsBySector(sectorId),
  };
}

export {
  DEALS,
  MULTIPLIERS,
  NEWS,
  SECTORS,
  getDealsBySector,
  getRecentDeals,
  getMultipliersBySector,
  getNewsBySector,
  getLatestNews,
  getSectorById,
};
