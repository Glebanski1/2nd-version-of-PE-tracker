import { Deal, SectorId } from "../types";
import { fetchWithTimeout } from "./types";
import { DEALS as DEMO_DEALS } from "../deals";

const SHEET_ID = "1uPWb4kqVsX7pGJzOIxtk0pw81Omb2CU081amsJwpktE";
const GID = "1627584247";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

const SECTOR_MAP: Record<string, SectorId> = {
  it: "it",
  "ит": "it",
  "информационные технологии": "it",
  "технологии": "it",
  finance: "finance",
  "финансы": "finance",
  "финансовый": "finance",
  "банк": "finance",
  energy: "energy",
  "энергетика": "energy",
  "нефть": "energy",
  "газ": "energy",
  retail: "retail",
  "ритейл": "retail",
  "торговля": "retail",
  realestate: "realestate",
  "real estate": "realestate",
  "недвижимость": "realestate",
  pharma: "pharma",
  "фарма": "pharma",
  "медицина": "pharma",
  "здравоохранение": "pharma",
  industry: "industrial",
  industrial: "industrial",
  "промышленность": "industrial",
  "производство": "industrial",
  media: "telecom",
  telecom: "telecom",
  "медиа": "telecom",
  "сми": "telecom",
  "телеком": "telecom",
  agro: "agro",
  "агро": "agro",
  "сельское хозяйство": "agro",
  transport: "transport",
  "транспорт": "transport",
  "логистика": "transport",
};

function mapSector(raw: string): SectorId {
  const key = raw.trim().toLowerCase();
  return SECTOR_MAP[key] ?? "it";
}

type DealType = Deal["type"];
type DealStatus = Deal["status"];

const VALID_TYPES: DealType[] = ["M&A", "PE", "LBO", "IPO exit", "Restructuring", "Buyout"];
const VALID_STATUSES: DealStatus[] = ["Announced", "Closed", "Pending", "Rumored"];

function mapType(raw: string): DealType {
  const t = raw.trim() as DealType;
  return VALID_TYPES.includes(t) ? t : "M&A";
}

function mapStatus(raw: string): DealStatus {
  const s = raw.trim() as DealStatus;
  return VALID_STATUSES.includes(s) ? s : "Announced";
}

function parseNum(raw: string): number | null {
  const cleaned = raw.replace(/[^\d.,]/g, "").replace(",", ".");
  const n = parseFloat(cleaned);
  return isNaN(n) ? null : n;
}

function parseCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      cells.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  cells.push(current.trim());
  return cells;
}

function normalizeHeader(h: string): string {
  return h.toLowerCase().replace(/[^a-zа-яё0-9]/gi, "");
}

function detectColumns(headers: string[]): Record<string, number> {
  const map: Record<string, number> = {};
  const aliases: Record<string, string[]> = {
    date: ["дата", "date"],
    target: ["объект", "target", "компания", "company"],
    buyer: ["покупатель", "buyer", "инвестор", "investor"],
    seller: ["продавец", "seller"],
    sector: ["сектор", "sector", "отрасль", "industry"],
    value: ["сумма", "value", "объем", "объём", "ценамлрдруб", "суммамлрдруб", "valuebln"],
    stake: ["доля", "stake", "пакет", "долясделки"],
    type: ["тип", "type", "видсделки"],
    status: ["статус", "status"],
    description: ["описание", "description", "комментарий"],
    sourcetitle: ["заголовок", "sourcetitle", "источниктекст", "title"],
    sourceurl: ["ссылка", "sourceurl", "url", "источникссылка"],
    sourceoutlet: ["сми", "outlet", "sourceoutlet", "источниксми", "издание"],
  };

  headers.forEach((h, idx) => {
    const norm = normalizeHeader(h);
    for (const [key, aliasList] of Object.entries(aliases)) {
      if (aliasList.some((a) => norm.includes(a.replace(/[^a-zа-яё0-9]/gi, "")))) {
        if (!(key in map)) map[key] = idx;
      }
    }
  });
  return map;
}

let cache: { deals: Deal[]; ts: number } | null = null;
const TTL = 5 * 60 * 1000;

export async function fetchDealsFromSheets(): Promise<Deal[]> {
  if (cache && Date.now() - cache.ts < TTL) return cache.deals;

  try {
    const res = await fetchWithTimeout(CSV_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const lines = text.split(/\r?\n/).filter((l) => l.trim());
    if (lines.length < 2) throw new Error("Empty sheet");

    const headers = parseCsvLine(lines[0]);
    const cols = detectColumns(headers);

    const get = (row: string[], key: string) =>
      cols[key] !== undefined ? (row[cols[key]] ?? "") : "";

    const deals: Deal[] = [];
    lines.slice(1).forEach((line, i) => {
      const row = parseCsvLine(line);
      const target = get(row, "target");
      if (!target) return;

      deals.push({
        id: `gs-${i}-${Date.now()}`,
        date: get(row, "date") || new Date().toISOString().slice(0, 10),
        target,
        buyer: get(row, "buyer") || "—",
        seller: get(row, "seller") || "—",
        sectorId: mapSector(get(row, "sector")),
        valueBnRub: parseNum(get(row, "value")),
        stakePct: parseNum(get(row, "stake")),
        type: mapType(get(row, "type") || "M&A"),
        status: mapStatus(get(row, "status") || "Announced"),
        description: get(row, "description") || target,
        sourceTitle: get(row, "sourcetitle") || target,
        sourceUrl: get(row, "sourceurl") || "",
        sourceOutlet: get(row, "sourceoutlet") || "Google Sheets",
      });
    });

    if (deals.length === 0) throw new Error("No rows parsed");
    cache = { deals, ts: Date.now() };
    return deals;
  } catch {
    // fallback to demo data if sheets is unreachable
    return DEMO_DEALS;
  }
}
