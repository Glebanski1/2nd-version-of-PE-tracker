import Link from "next/link";
import { ArrowLeft, Briefcase, Layers, Newspaper, TrendingUp } from "lucide-react";
import { notFound } from "next/navigation";
import { getSectorSnapshot, SECTORS } from "@/lib/store";
import { SectorIcon } from "@/components/SectorIcon";
import { StatCard } from "@/components/StatCard";
import { MultiplierTable } from "@/components/MultiplierTable";
import { MultipliersChart } from "@/components/MultipliersChart";
import { DealCard } from "@/components/DealCard";
import { LiveFeed } from "@/components/LiveFeed";
import { DemoBanner } from "@/components/DemoBanner";
import { formatPct, formatRub } from "@/lib/format";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateStaticParams() {
  return SECTORS.map((s) => ({ id: s.id }));
}

export default function SectorPage({ params }: { params: { id: string } }) {
  const snapshot = getSectorSnapshot(params.id);
  if (!snapshot) return notFound();
  const { sector, multipliers, deals, news } = snapshot;

  const medianEvEbitda = multipliers.find((m) => m.metric === "EV/EBITDA");
  const medianPE = multipliers.find((m) => m.metric === "P/E");

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-ink-600 hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" /> Все секторы
      </Link>

      <div className="mt-4">
        <DemoBanner />
      </div>

      <section
        className="mt-4 rounded-2xl p-6 text-white shadow-soft sm:p-8"
        style={{
          background: `linear-gradient(135deg, ${sector.color} 0%, ${sector.color}cc 50%, ${sector.color}99 100%)`,
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/15 backdrop-blur">
                <SectorIcon name={sector.icon} className="h-6 w-6" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/80">
                  {sector.nameEn}
                </div>
                <h1 className="text-2xl font-semibold sm:text-3xl">
                  {sector.name}
                </h1>
              </div>
            </div>
            <p className="mt-3 max-w-2xl text-sm text-white/90">
              {sector.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">
              {sector.totalDealsYTD} сделок YTD
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">
              {formatRub(sector.totalVolumeYTDBnRub)} YTD
            </span>
            <span
              className={`rounded-full px-3 py-1 backdrop-blur ${
                sector.yoyChangePct >= 0 ? "bg-emerald-400/30" : "bg-rose-400/30"
              }`}
            >
              YoY {formatPct(sector.yoyChangePct)}
            </span>
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Сделок YTD"
          value={sector.totalDealsYTD}
          icon={<Briefcase className="h-4 w-4" />}
        />
        <StatCard
          label="Объём YTD"
          value={formatRub(sector.totalVolumeYTDBnRub)}
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{
            value: formatPct(sector.yoyChangePct),
            direction: sector.yoyChangePct >= 0 ? "up" : "down",
          }}
        />
        <StatCard
          label="Медиана EV/EBITDA"
          value={medianEvEbitda ? `${medianEvEbitda.median.toFixed(1)}x` : "—"}
          hint={
            medianEvEbitda
              ? `Диапазон ${medianEvEbitda.low.toFixed(1)}x – ${medianEvEbitda.high.toFixed(1)}x`
              : ""
          }
          icon={<Layers className="h-4 w-4" />}
          trend={
            medianEvEbitda
              ? {
                  value: formatPct(medianEvEbitda.trendPct),
                  direction: medianEvEbitda.trend,
                }
              : undefined
          }
        />
        <StatCard
          label="Медиана P/E"
          value={medianPE ? `${medianPE.median.toFixed(1)}x` : "—"}
          hint={
            medianPE
              ? `Диапазон ${medianPE.low.toFixed(1)}x – ${medianPE.high.toFixed(1)}x`
              : ""
          }
          icon={<Newspaper className="h-4 w-4" />}
          trend={
            medianPE
              ? {
                  value: formatPct(medianPE.trendPct),
                  direction: medianPE.trend,
                }
              : undefined
          }
        />
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className="mb-3 text-lg font-semibold text-ink-900">
            Мультипликаторы сектора
          </h2>
          <MultiplierTable items={multipliers} />
          <p className="mt-2 text-xs text-ink-500">
            Все мультипликаторы агрегируются из публичных аналитических обзоров —
            ссылка на источник доступна в таблице. Обновление осуществляется при
            выходе новых отчётов брокеров и регуляторов.
          </p>
        </div>
        <div className="lg:col-span-2">
          <MultipliersChart items={multipliers} color={sector.color} />
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-ink-900">
              Сделки сектора
            </h2>
            <span className="text-xs text-ink-500">{deals.length} в базе</span>
          </div>
          <div className="space-y-3">
            {deals.length === 0 ? (
              <div className="card p-6 text-sm text-ink-500">
                В этом секторе пока нет зафиксированных сделок за выбранный
                период.
              </div>
            ) : (
              deals.map((d) => <DealCard key={d.id} deal={d} />)
            )}
          </div>
        </div>

        <div>
          <LiveFeed initialItems={news} sectorId={sector.id} />
        </div>
      </section>
    </div>
  );
}
