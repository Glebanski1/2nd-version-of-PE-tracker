import { NextRequest, NextResponse } from "next/server";
import { MULTIPLIERS, getMultipliersBySector } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sector = req.nextUrl.searchParams.get("sector");
  const items = sector ? getMultipliersBySector(sector) : MULTIPLIERS;
  return NextResponse.json(
    { items, asOf: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
