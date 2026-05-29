import { DealsFilter } from "@/components/DealsFilter";
import { DemoBanner } from "@/components/DemoBanner";
import { getDataSourceStatus, getDealsFromSheets, SECTORS } from "@/lib/store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DealsPage() {
  const [all, status] = await Promise.all([
    getDealsFromSheets(200),
    getDataSourceStatus(),
  ]);
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
          Структурированный реестр сделок загружается из Google Sheets — обновляйте таблицу,
          и данные подтянутся автоматически (кэш 5 минут). Для актуального потока публикаций
          смотрите{" "}
          <a href="/news" className="link">
            ленту новостей
          </a>
          .
        </p>
      </div>
      <DealsFilter initialDeals={all} sectors={SECTORS} />
    </div>
  );
}
