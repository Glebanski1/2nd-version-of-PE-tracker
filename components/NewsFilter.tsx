"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RefreshCw, Radio } from "lucide-react";
import { NewsItem, Sector } from "@/lib/types";
import { NewsItemView } from "./NewsItem";

export function NewsFilter({
  initialItems,
  sectors,
}: {
  initialItems: NewsItem[];
  sectors: Sector[];
}) {
  const [items, setItems] = useState<NewsItem[]>(initialItems);
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [importance, setImportance] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [isLive, setIsLive] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newCount, setNewCount] = useState(0);
  const sinceRef = useRef<number>(Date.now());
  const liveIdsRef = useRef<Set<string>>(new Set());

  async function tick(manual = false) {
    if (manual) setIsRefreshing(true);
    try {
      const url = new URL("/api/live", window.location.origin);
      url.searchParams.set("since", String(sinceRef.current));
      const res = await fetch(url.toString(), { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { events: NewsItem[] };
      if (data.events.length > 0) {
        setItems((prev) => {
          const existing = new Set(prev.map((p) => p.id));
          const fresh = data.events.filter((e) => !existing.has(e.id));
          fresh.forEach((e) => liveIdsRef.current.add(e.id));
          if (fresh.length === 0) return prev;
          setNewCount((c) => c + fresh.length);
          return [...fresh, ...prev].slice(0, 200);
        });
      }
      sinceRef.current = Date.now();
    } catch {
      // ignore polling errors
    } finally {
      if (manual) setIsRefreshing(false);
    }
  }

  useEffect(() => {
    if (!isLive) return;
    const id = setInterval(() => tick(false), 6000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLive]);

  const filtered = useMemo(() => {
    return items.filter((n) => {
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
  }, [activeSector, importance, query, items]);

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
          {query && (
            <button
              onClick={() => setQuery("")}
              className="mt-2 text-xs text-ink-500 hover:text-ink-700"
            >
              Очистить
            </button>
          )}
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
              <span className="text-xs text-ink-500">{items.length}</span>
            </button>
            {sectors.map((s) => {
              const count = items.filter((n) =>
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
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Radio className="h-4 w-4 text-emerald-600" />
            {isLive ? (
              <span className="badge border-emerald-200 bg-emerald-50 text-emerald-700">
                <span className="live-dot" /> LIVE
              </span>
            ) : (
              <span className="badge border-ink-200 bg-ink-50 text-ink-700">
                Пауза
              </span>
            )}
            <span className="text-sm text-ink-700">
              Показано{" "}
              <span className="font-semibold text-ink-900">{filtered.length}</span>{" "}
              из{" "}
              <span className="font-semibold text-ink-900">{items.length}</span>
            </span>
            {newCount > 0 ? (
              <span className="badge border-brand-200 bg-brand-50 text-brand-700">
                +{newCount} новых
              </span>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => tick(true)}
              className="btn-ghost text-xs"
              disabled={isRefreshing}
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Обновить
            </button>
            <button
              onClick={() => setIsLive((v) => !v)}
              className="btn-ghost text-xs"
            >
              {isLive ? (
                <>
                  <Pause className="h-3.5 w-3.5" /> Пауза
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" /> Старт
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="card p-6 text-center text-sm text-ink-500">
              По выбранным фильтрам ничего не найдено.
              {(activeSector || importance !== "all" || query.trim()) && (
                <button
                  onClick={() => {
                    setActiveSector(null);
                    setImportance("all");
                    setQuery("");
                  }}
                  className="ml-2 link"
                >
                  Сбросить фильтры
                </button>
              )}
            </div>
          ) : (
            filtered.map((item) => (
              <NewsItemView
                key={item.id}
                item={item}
                isLive={liveIdsRef.current.has(item.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
