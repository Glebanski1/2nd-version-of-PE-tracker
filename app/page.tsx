import {
  Activity,
  Briefcase,
  LineChart,
  Newspaper,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  getLatestNews,
  getMarketOverview,
  getRecentDeals,
  SECTORS,
  getSectorById,
} from "@/lib/store";
import { StatCard } from "@/components/StatCard";
import { SectorCard } from "@/components/SectorCard";
import { DealCard } from "@/components/DealCard";
import { LiveFeed } from "@/components/LiveFeed";
import { VolumeChart } from "@/components/VolumeChart";
import { DemoBanner } from "@/components/DemoBanner";
import { formatPct, formatRub } from "@/lib/format";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function HomePage() {
  const overview = getMarketOverview();
  const recentDeals = getRecentDeals(6);
  const latestNews = getLatestNews(8);
  const topVolume = getSectorById(overview.topSectorByVolume);
  const topCount = getSectorById(overview.topSectorByCount);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <DemoBanner />
      <section className="mt-6 rounded-2xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-6 text-white shadow-soft sm:p-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-100">
          <Sparkles className="h-4 w-4" />
          Russia PE / M&A · Live dashboard
        </div>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
          Аналитика российского рынка Private Equity и M&A
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-brand-100">
          Сделки, мультипликаторы, новости и тренды — в разрезе секторов. Лента
          обновляется в режиме реального времени, включая публикации @dealsma,
          Коммерсантъ, Ведомости, РБК, Forbes, аналитику SberCIB, ВТБ Капитал,
          Газпромбанк Инвестиции и ЦБ РФ. По каждой записи доступна ссылка на
          первоисточник.
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">
            {SECTORS.length} секторов
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">
            {overview.totalDealsYTD} сделок YTD
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">
            {formatRub(overview.totalVolumeYTDBnRub)} объём YTD
          </span>
          <span className="rounded-full bg-emerald-500/30 px-3 py-1 backdrop-blur">
            LIVE
          </span>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Сделок YTD"
          value={overview.totalDealsYTD}
          icon={<Briefcase className="h-4 w-4" />}
          trend={{
            value: formatPct(overview.yoyChangePct),
            direction: overview.yoyChangePct >= 0 ? "up" : "down",
          }}
          hint="к аналогичному периоду 2025"
        />
        <StatCard
          label="Объём YTD"
          value={formatRub(overview.totalVolumeYTDBnRub)}
          icon={<TrendingUp className="h-4 w-4" />}
          hint={`средний чек ≈ ${formatRub(overview.avgDealSizeMnRub, "млн")}`}
        />
        <StatCard
          label="Топ-сектор по объёму"
          value={topVolume?.name ?? "—"}
          icon={<LineChart className="h-4 w-4" />}
          hint={topVolume ? formatRub(topVolume.totalVolumeYTDBnRub) : ""}
        />
        <StatCard
          label="Топ-сектор по числу сделок"
          value={topCount?.name ?? "—"}
          icon={<Activity className="h-4 w-4" />}
          hint={topCount ? `${topCount.totalDealsYTD} сделок` : ""}
        />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <VolumeChart sectors={SECTORS} />
        </div>
        <div className="card p-5">
          <div className="mb-3 flex items-center gap-2">
            <Newspaper className="h-4 w-4 text-brand-600" />
            <h3 className="text-base font-semibold text-ink-900">
              Ключевые публикации сегодня
            </h3>
          </div>
          <div className="space-y-3">
            {latestNews.slice(0, 4).map((n) => (
              <a
                key={n.id}
                href={n.sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="block rounded-xl border border-ink-100 p-3 transition hover:border-ink-200 hover:bg-ink-50/40"
              >
                <div className="text-xs text-ink-500">{n.channel}</div>
                <div className="mt-0.5 line-clamp-2 text-sm font-medium text-ink-900">
                  {n.title}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-ink-900">
            Секторы рынка
          </h2>
          <p className="text-xs text-ink-500">
            Нажмите на сектор, чтобы открыть мультипликаторы, сделки и
            новости по нему
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SECTORS.map((s) => (
            <SectorCard key={s.id} sector={s} />
          ))}
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-ink-900">
              Последние сделки
            </h2>
            <a href="/deals" className="text-xs link">
              Все сделки →
            </a>
          </div>
          <div className="space-y-3">
            {recentDeals.map((d) => (
              <DealCard key={d.id} deal={d} withSector />
            ))}
          </div>
        </div>

        <div>
          <LiveFeed initialItems={latestNews} />
        </div>
      </section>
    </div>
  );
}
