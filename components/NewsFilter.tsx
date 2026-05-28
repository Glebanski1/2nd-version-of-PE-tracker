"use client";

import { useMemo, useState } from "react";
import { NewsItem, Sector } from "@/lib/types";
import { NewsItemView } from "./NewsItem";
import { LiveFeed } from "./LiveFeed";

export function NewsFilter({
  initialItems,
  sectors,
}: {
  initialItems: NewsItem[];
  sectors: Sector[];
}) {
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [importance, setImportance] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return initialItems.filter((n) => {
      if (activeSector && !n.sectorIds.includes(activeSector as any))
        return false;
      if (importance !== "all" && n.importance !== importance) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const hay = `${n.title} ${n.summary} ${n.tags.join(" ")} ${n.channel}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [activeSector, importance, query, initialItems]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <aside className="space-y-4 lg:col-span-1">
        <div className="card p-4">
          <div className="stat-label mb-2">Поиск</div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Компания, тег, источник..."
            className="w-full rounded-xl border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
        </div>

        <div className="card p-4">
          <div className="stat-label mb-2">Важность</div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "all", label: "Все" },
              { id: "high", label: "Важно" },
              { id: "medium", label: "Средние" },
              { id: "low", label: "Обзор" },
            ].map((i) => (
              <button
                key={i.id}
                onClick={() => setImportance(i.id)}
                className={`rounded-lg border px-2.5 py-1 text-xs transition ${
                  importance === i.id
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-ink-200 bg-white text-ink-700 hover:border-ink-300"
                }`}
              >
                {i.label}
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
              <span className="text-xs text-ink-500">{initialItems.length}</span>
            </button>
            {sectors.map((s) => {
              const count = initialItems.filter((n) =>
                n.sectorIds.includes(s.id),
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
        <LiveFeed
          initialItems={filtered}
          sectorId={activeSector ?? undefined}
        />
        {filtered.length === 0 && (
          <div className="card mt-3 p-6 text-center text-sm text-ink-500">
            По выбранным фильтрам ничего не найдено.
          </div>
        )}
      </div>
    </div>
  );
}
