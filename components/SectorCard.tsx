import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectorIcon } from "./SectorIcon";
import { Sector } from "@/lib/types";
import { formatPct, formatRub } from "@/lib/format";

export function SectorCard({ sector }: { sector: Sector }) {
  const trendClass =
    sector.yoyChangePct > 0
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : sector.yoyChangePct < 0
        ? "text-rose-700 bg-rose-50 border-rose-200"
        : "text-ink-600 bg-ink-50 border-ink-200";

  return (
    <Link
      href={`/sector/${sector.id}`}
      className="card group block p-5 transition hover:shadow-soft hover:border-ink-200"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span
            className="grid h-10 w-10 place-items-center rounded-xl text-white"
            style={{ backgroundColor: sector.color }}
          >
            <SectorIcon name={sector.icon} className="h-5 w-5" />
          </span>
          <div>
            <div className="text-sm font-semibold text-ink-900">
              {sector.name}
            </div>
            <div className="text-[11px] uppercase tracking-wider text-ink-500">
              {sector.nameEn}
            </div>
          </div>
        </div>
        <ArrowUpRight className="h-4 w-4 text-ink-400 transition group-hover:text-brand-600" />
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-ink-600">
        {sector.description}
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div>
          <div className="text-ink-500">Сделок YTD</div>
          <div className="text-sm font-semibold text-ink-900 tabular-nums">
            {sector.totalDealsYTD}
          </div>
        </div>
        <div>
          <div className="text-ink-500">Объём YTD</div>
          <div className="text-sm font-semibold text-ink-900 tabular-nums">
            {formatRub(sector.totalVolumeYTDBnRub)}
          </div>
        </div>
        <div>
          <div className="text-ink-500">YoY</div>
          <div>
            <span className={`badge ${trendClass}`}>
              {formatPct(sector.yoyChangePct)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
