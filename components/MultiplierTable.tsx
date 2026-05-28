import { ExternalLink, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { Multiplier } from "@/lib/types";
import { formatPct, formatDate } from "@/lib/format";

function TrendIcon({ trend }: { trend: Multiplier["trend"] }) {
  if (trend === "up") return <TrendingUp className="h-3.5 w-3.5" />;
  if (trend === "down") return <TrendingDown className="h-3.5 w-3.5" />;
  return <Minus className="h-3.5 w-3.5" />;
}

export function MultiplierTable({ items }: { items: Multiplier[] }) {
  if (items.length === 0) {
    return (
      <div className="card p-8 text-center text-sm text-ink-500">
        По этому сектору пока нет публичных мультипликаторов.
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-ink-50/70 text-xs uppercase tracking-wider text-ink-500">
            <tr>
              <th className="px-4 py-3 text-left">Метрика</th>
              <th className="px-4 py-3 text-right">Медиана</th>
              <th className="px-4 py-3 text-right">Диапазон</th>
              <th className="px-4 py-3 text-right">Тренд</th>
              <th className="px-4 py-3 text-left">Обновлено</th>
              <th className="px-4 py-3 text-left">Источник</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {items.map((m) => {
              const trendClass =
                m.trend === "up"
                  ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                  : m.trend === "down"
                    ? "text-rose-700 bg-rose-50 border-rose-200"
                    : "text-ink-600 bg-ink-50 border-ink-200";
              return (
                <tr key={`${m.sectorId}-${m.metric}`} className="hover:bg-ink-50/40">
                  <td className="px-4 py-3 font-medium text-ink-900">
                    {m.metric}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums text-ink-900">
                    {m.median.toLocaleString("ru-RU", {
                      maximumFractionDigits: 2,
                    })}x
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-ink-600">
                    {m.low.toLocaleString("ru-RU", {
                      maximumFractionDigits: 2,
                    })}
                    x – {m.high.toLocaleString("ru-RU", { maximumFractionDigits: 2 })}x
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`badge ${trendClass} justify-end`}
                    >
                      <TrendIcon trend={m.trend} />
                      {formatPct(m.trendPct)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-600">
                    {formatDate(m.updatedAt)}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={m.sourceUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 link"
                    >
                      <span className="max-w-[260px] truncate">{m.source}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
