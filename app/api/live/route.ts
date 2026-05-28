import { NextRequest, NextResponse } from "next/server";
import { pollLiveUpdatesReal } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const since = Number(req.nextUrl.searchParams.get("since") ?? "0") || 0;
  const sector = req.nextUrl.searchParams.get("sector");
  const { asOf, events } = await pollLiveUpdatesReal(since);
  const filtered = sector
    ? events.filter((e) => e.sectorIds.includes(sector as any))
    : events;
  return NextResponse.json(
    { asOf, events: filtered },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
