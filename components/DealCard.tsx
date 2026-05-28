import { ExternalLink } from "lucide-react";
import { Deal } from "@/lib/types";
import { formatDate, formatPct, formatRub } from "@/lib/format";
import { getSectorById } from "@/lib/sectors";

const STATUS_STYLE: Record<Deal["status"], string> = {
  Announced: "border-amber-200 bg-amber-50 text-amber-800",
  Closed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Pending: "border-sky-200 bg-sky-50 text-sky-700",
  Rumored: "border-ink-200 bg-ink-50 text-ink-700",
};

const TYPE_STYLE: Record<Deal["type"], string> = {
  "M&A": "border-brand-200 bg-brand-50 text-brand-700",
  PE: "border-violet-200 bg-violet-50 text-violet-700",
  LBO: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700",
  "IPO exit": "border-emerald-200 bg-emerald-50 text-emerald-700",
  Restructuring: "border-rose-200 bg-rose-50 text-rose-700",
  Buyout: "border-indigo-200 bg-indigo-50 text-indigo-700",
};

export function DealCard({
  deal,
  withSector = false,
}: {
  deal: Deal;
  withSector?: boolean;
}) {
  const sector = withSector ? getSectorById(deal.sectorId) : null;
  return (
    <article className="card p-4">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className={`badge ${TYPE_STYLE[deal.type]}`}>{deal.type}</span>
        <span className={`badge ${STATUS_STYLE[deal.status]}`}>
          {deal.status}
        </span>
        {sector ? (
          <span
            className="badge border-ink-200 bg-white text-ink-700"
            style={{ color: sector.color, borderColor: `${sector.color}33` }}
          >
            {sector.name}
          </span>
        ) : null}
        <span className="ml-auto text-ink-500">{formatDate(deal.date)}</span>
      </div>

      <h3 className="mt-2 text-base font-semibold text-ink-900">
        {deal.target}
      </h3>
      <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-ink-600">
        <div>
          <span className="text-ink-500">Покупатель:</span> {deal.buyer}
        </div>
        <div>
          <span className="text-ink-500">Продавец:</span> {deal.seller}
        </div>
      </div>

      <p className="mt-2 text-sm text-ink-700">{deal.description}</p>

      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <div className="rounded-lg border border-ink-100 bg-ink-50/60 px-2 py-1.5">
          <div className="text-ink-500">Сумма</div>
          <div className="font-semibold text-ink-900 tabular-nums">
            {formatRub(deal.valueBnRub)}
          </div>
        </div>
        <div className="rounded-lg border border-ink-100 bg-ink-50/60 px-2 py-1.5">
          <div className="text-ink-500">Доля</div>
          <div className="font-semibold text-ink-900 tabular-nums">
            {deal.stakePct === null ? "н/д" : formatPct(deal.stakePct, false)}
          </div>
        </div>
        <div className="rounded-lg border border-ink-100 bg-ink-50/60 px-2 py-1.5">
          <div className="text-ink-500">Источник</div>
          <div className="truncate font-medium text-ink-900">
            {deal.sourceOutlet}
          </div>
        </div>
      </div>

      <a
        href={deal.sourceUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-3 inline-flex items-center gap-1 text-xs link"
      >
        {deal.sourceTitle}
        <ExternalLink className="h-3 w-3" />
      </a>
    </article>
  );
}
