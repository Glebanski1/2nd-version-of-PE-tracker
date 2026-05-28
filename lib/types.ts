export type SectorId =
  | "it"
  | "retail"
  | "finance"
  | "energy"
  | "realestate"
  | "industrial"
  | "pharma"
  | "telecom"
  | "agro"
  | "transport";

export interface Sector {
  id: SectorId;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  color: string;
  totalDealsYTD: number;
  totalVolumeYTDBnRub: number;
  yoyChangePct: number;
}

export interface Multiplier {
  sectorId: SectorId;
  metric: "EV/EBITDA" | "EV/Sales" | "P/E" | "P/B" | "P/S";
  median: number;
  low: number;
  high: number;
  trend: "up" | "down" | "flat";
  trendPct: number;
  updatedAt: string;
  source: string;
  sourceUrl: string;
}

export interface Deal {
  id: string;
  date: string;
  target: string;
  buyer: string;
  seller: string;
  sectorId: SectorId;
  valueBnRub: number | null;
  stakePct: number | null;
  type: "M&A" | "PE" | "LBO" | "IPO exit" | "Restructuring" | "Buyout";
  status: "Announced" | "Closed" | "Pending" | "Rumored";
  description: string;
  sourceTitle: string;
  sourceUrl: string;
  sourceOutlet: string;
}

export interface NewsItem {
  id: string;
  publishedAt: string;
  title: string;
  summary: string;
  sectorIds: SectorId[];
  source: string;
  sourceUrl: string;
  channel: string;
  importance: "high" | "medium" | "low";
  tags: string[];
}

export interface SectorSnapshot {
  sector: Sector;
  multipliers: Multiplier[];
  deals: Deal[];
  news: NewsItem[];
}

export interface MarketOverview {
  asOf: string;
  totalDealsYTD: number;
  totalVolumeYTDBnRub: number;
  avgDealSizeMnRub: number;
  yoyChangePct: number;
  topSectorByVolume: SectorId;
  topSectorByCount: SectorId;
}
