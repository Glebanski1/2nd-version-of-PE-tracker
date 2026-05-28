import { DEALS, getDealsBySector, getRecentDeals } from "./deals";
import { MULTIPLIERS, getMultipliersBySector } from "./multipliers";
import { NEWS } from "./news";
import { SECTORS, getSectorById } from "./sectors";
import { getAggregated, getLiveSince } from "./aggregator";
import {
  Deal,
  MarketOverview,
  NewsItem,
  SectorSnapshot,
} from "./types";

export async function getLatestNews(limit = 12): Promise<NewsItem[]> {
  const { items } = await getAggregated();
  return items.slice(0, limit);
}

export async function getNewsBySector(
  sectorId: string,
  limit?: number,
): Promise<NewsItem[]> {
  const { items } = await getAggregated();
  const filtered = items.filter((n) =>
    n.sectorIds.includes(sectorId as any),
  );
  return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
}

export async function getDataSourceStatus(): Promise<{
  isReal: boolean;
  fetchedAt: number;
  sourcesOk: number;
  sourcesTotal: number;
}> {
  const { isReal, fetchedAt, sourcesOk, sourcesTotal } = await getAggregated();
  return { isReal, fetchedAt, sourcesOk, sourcesTotal };
}

export async function pollLiveUpdatesReal(sinceMs: number): Promise<{
  asOf: string;
  events: NewsItem[];
}> {
  const events = await getLiveSince(sinceMs);
  return { asOf: new Date().toISOString(), events };
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

export async function getSectorSnapshot(
  sectorId: string,
): Promise<SectorSnapshot | null> {
  const sector = getSectorById(sectorId);
  if (!sector) return null;
  return {
    sector,
    multipliers: getMultipliersBySector(sectorId),
    deals: getDealsBySector(sectorId),
    news: await getNewsBySector(sectorId),
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
  getSectorById,
};
