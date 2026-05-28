import { DealsFilter } from "@/components/DealsFilter";
import { DemoBanner } from "@/components/DemoBanner";
import { getRecentDeals, SECTORS } from "@/lib/store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function DealsPage() {
  const all = getRecentDeals(80);
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4">
        <DemoBanner />
      </div>
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-ink-900">База сделок</h1>
        <p className="mt-1 text-sm text-ink-600">
          Все зафиксированные сделки PE / M&A с привязкой к сектору, типу,
          статусу и источнику. Сортировка — по дате анонсирования.
        </p>
      </div>
      <DealsFilter initialDeals={all} sectors={SECTORS} />
    </div>
  );
}
