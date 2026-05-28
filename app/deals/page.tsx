import { DealsFilter } from "@/components/DealsFilter";
import { DemoBanner } from "@/components/DemoBanner";
import { getDataSourceStatus, getRecentDeals, SECTORS } from "@/lib/store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DealsPage() {
  const all = getRecentDeals(80);
  const status = await getDataSourceStatus();
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4">
        <DemoBanner
          isReal={status.isReal}
          sourcesOk={status.sourcesOk}
          sourcesTotal={status.sourcesTotal}
          fetchedAt={status.fetchedAt}
        />
      </div>
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-ink-900">База сделок</h1>
        <p className="mt-1 text-sm text-ink-600">
          Структурированный реестр сделок с привязкой к сектору, типу и
          статусу. Эти карточки обновляются вручную, потому что извлечь
          сумму/долю/покупателя из произвольной прозы — задача отдельная.
          Для актуального потока публикаций смотрите{" "}
          <a href="/news" className="link">
            ленту новостей
          </a>{" "}
          — там реальный фид из @dealsma и RSS деловых СМИ.
        </p>
      </div>
      <DealsFilter initialDeals={all} sectors={SECTORS} />
    </div>
  );
}
