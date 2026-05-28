import { NextRequest, NextResponse } from "next/server";
import { getLatestNews, getNewsBySector } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sector = req.nextUrl.searchParams.get("sector");
  const limit = Number(req.nextUrl.searchParams.get("limit") ?? "20") || 20;
  const items = sector
    ? await getNewsBySector(sector, limit)
    : await getLatestNews(limit);
  return NextResponse.json(
    { items, asOf: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
