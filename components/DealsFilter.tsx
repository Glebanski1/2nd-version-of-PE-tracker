"use client";

import { useMemo, useState } from "react";
import { Deal, Sector } from "@/lib/types";
import { DealCard } from "./DealCard";
import { formatRub } from "@/lib/format";

export function DealsFilter({
  initialDeals,
  sectors,
}: {
  initialDeals: Deal[];
  sectors: Sector[];
}) {
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [type, setType] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return initialDeals.filter((d) => {
      if (activeSector && d.sectorId !== activeSector) return false;
      if (type !== "all" && d.type !== type) return false;
      if (status !== "all" && d.status !== status) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const hay =
          `${d.target} ${d.buyer} ${d.seller} ${d.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [activeSector, type, status, query, initialDeals]);

  const totalVol = filtered.reduce((acc, d) => acc + (d.valueBnRub ?? 0), 0);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <aside className="space-y-4 lg:col-span-1">
        <div className="card p-4">
          <div className="stat-label mb-2">Поиск</div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Компания, покупатель, описание..."
            className="w-full rounded-xl border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
        </div>

        <div className="card p-4">
          <div className="stat-label mb-2">Тип сделки</div>
          <div className="flex flex-wrap gap-1.5">
            {["all", "M&A", "PE", "LBO", "IPO exit", "Restructuring", "Buyout"].map(
              (id) => (
                <button
                  key={id}
                  onClick={() => setType(id)}
                  className={`rounded-lg border px-2.5 py-1 text-xs transition ${
                    type === id
                      ? "border-brand-500 bg-brand-50 text-brand-700"
                      : "border-ink-200 bg-white text-ink-700 hover:border-ink-300"
                  }`}
                >
                  {id === "all" ? "Все" : id}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="card p-4">
          <div className="stat-label mb-2">Статус</div>
          <div className="flex flex-wrap gap-1.5">
            {["all", "Announced", "Closed", "Pending", "Rumored"].map((id) => (
              <button
                key={id}
                onClick={() => setStatus(id)}
                className={`rounded-lg border px-2.5 py-1 text-xs transition ${
                  status === id
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-ink-200 bg-white text-ink-700 hover:border-ink-300"
                }`}
              >
                {id === "all" ? "Все" : id}
              </button>
            ))}
          </div>
        </div>

        <div className="card p-4">
          <div className="stat-label mb-2">Сектор</div>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setActiveSector(null)}
              className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm transition ${
                activeSector === null
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-700 hover:bg-ink-50"
              }`}
            >
              <span>Все секторы</span>
              <span className="text-xs text-ink-500">{initialDeals.length}</span>
            </button>
            {sectors.map((s) => {
              const count = initialDeals.filter(
                (d) => d.sectorId === s.id,
              ).length;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSector(s.id)}
                  className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm transition ${
                    activeSector === s.id
                      ? "bg-brand-50 text-brand-700"
                      : "text-ink-700 hover:bg-ink-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    {s.name}
                  </span>
                  <span className="text-xs text-ink-500">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <div className="lg:col-span-2">
        <div className="mb-3 flex items-center justify-between text-sm">
          <div className="text-ink-700">
            Найдено сделок:{" "}
            <span className="font-semibold text-ink-900">{filtered.length}</span>
          </div>
          <div className="text-ink-700">
            Суммарный объём:{" "}
            <span className="font-semibold text-ink-900">
              {formatRub(+totalVol.toFixed(1))}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="card p-6 text-center text-sm text-ink-500">
              По выбранным фильтрам сделок не найдено.
            </div>
          ) : (
            filtered.map((d) => <DealCard key={d.id} deal={d} withSector />)
          )}
        </div>
      </div>
    </div>
  );
}
