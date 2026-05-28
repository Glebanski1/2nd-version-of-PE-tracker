import { NextRequest, NextResponse } from "next/server";
import { getSectorSnapshot } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const snapshot = await getSectorSnapshot(params.id);
  if (!snapshot) {
    return NextResponse.json({ error: "Sector not found" }, { status: 404 });
  }
  return NextResponse.json(
    { ...snapshot, asOf: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
