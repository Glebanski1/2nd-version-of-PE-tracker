import { NewsFilter } from "@/components/NewsFilter";
import { DemoBanner } from "@/components/DemoBanner";
import { getDataSourceStatus, getLatestNews, SECTORS } from "@/lib/store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NewsPage() {
  const [all, status] = await Promise.all([
    getLatestNews(60),
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
        <h1 className="text-2xl font-semibold text-ink-900">Новости рынка</h1>
        <p className="mt-1 text-sm text-ink-600">
          Лента публикаций по российскому PE / M&A: @dealsma, деловые СМИ,
          аналитические обзоры. Источник каждой записи указан и кликабелен.
          Лента обновляется автоматически.
        </p>
      </div>
      <NewsFilter initialItems={all} sectors={SECTORS} />
    </div>
  );
}
