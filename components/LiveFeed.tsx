"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RefreshCw, Radio } from "lucide-react";
import { NewsItem } from "@/lib/types";
import { NewsItemView } from "./NewsItem";

export function LiveFeed({
  initialItems,
  sectorId,
}: {
  initialItems: NewsItem[];
  sectorId?: string;
}) {
  const [items, setItems] = useState<NewsItem[]>(initialItems);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>(
    new Date().toISOString(),
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newCount, setNewCount] = useState(0);
  const sinceRef = useRef<number>(Date.now());
  const liveIdsRef = useRef<Set<string>>(new Set());

  async function tick(manual = false) {
    if (manual) setIsRefreshing(true);
    try {
      const url = new URL("/api/live", window.location.origin);
      url.searchParams.set("since", String(sinceRef.current));
      if (sectorId) url.searchParams.set("sector", sectorId);
      const res = await fetch(url.toString(), { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as {
        asOf: string;
        events: NewsItem[];
      };
      if (data.events.length > 0) {
        setItems((prev) => {
          const existing = new Set(prev.map((p) => p.id));
          const filtered = data.events.filter((e) => !existing.has(e.id));
          filtered.forEach((e) => liveIdsRef.current.add(e.id));
          if (filtered.length === 0) return prev;
          setNewCount((c) => c + filtered.length);
          return [...filtered, ...prev].slice(0, 30);
        });
      }
      sinceRef.current = Date.now();
      setLastUpdated(data.asOf);
    } catch {
      // ignore network errors during polling
    } finally {
      if (manual) setIsRefreshing(false);
    }
  }

  useEffect(() => {
    if (!isLive) return;
    const id = setInterval(() => {
      tick(false);
    }, 6000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLive, sectorId]);

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio className="h-4 w-4 text-emerald-600" />
          <h2 className="text-lg font-semibold text-ink-900">
            Лента в реальном времени
          </h2>
          {isLive ? (
            <span className="badge border-emerald-200 bg-emerald-50 text-emerald-700">
              <span className="live-dot" /> LIVE
            </span>
          ) : (
            <span className="badge border-ink-200 bg-ink-50 text-ink-700">
              Пауза
            </span>
          )}
          {newCount > 0 ? (
            <span className="badge border-brand-200 bg-brand-50 text-brand-700">
              +{newCount} новых
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-ink-500 md:inline">
            Обновлено{" "}
            {new Date(lastUpdated).toLocaleTimeString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
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
        {items.map((item) => (
          <NewsItemView
            key={item.id}
            item={item}
            isLive={liveIdsRef.current.has(item.id)}
          />
        ))}
      </div>
    </section>
  );
}
