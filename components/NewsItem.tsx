import { ExternalLink } from "lucide-react";
import { NewsItem as NewsItemType } from "@/lib/types";
import { getSectorById } from "@/lib/sectors";
import { RelativeTime } from "./RelativeTime";

const IMPORTANCE_STYLE: Record<NewsItemType["importance"], string> = {
  high: "border-rose-200 bg-rose-50 text-rose-700",
  medium: "border-amber-200 bg-amber-50 text-amber-800",
  low: "border-ink-200 bg-ink-50 text-ink-700",
};

const IMPORTANCE_LABEL: Record<NewsItemType["importance"], string> = {
  high: "Важно",
  medium: "Среднее",
  low: "Обзор",
};

export function NewsItemView({
  item,
  isLive = false,
}: {
  item: NewsItemType;
  isLive?: boolean;
}) {
  const sectors = item.sectorIds.map(getSectorById).filter(Boolean);
  return (
    <article
      className={`card p-4 transition ${isLive ? "ring-2 ring-emerald-400/60 ring-offset-2 ring-offset-white" : ""}`}
    >
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className={`badge ${IMPORTANCE_STYLE[item.importance]}`}>
          {IMPORTANCE_LABEL[item.importance]}
        </span>
        <span className="badge border-ink-200 bg-white text-ink-700">
          {item.channel}
        </span>
        {sectors.map((s) =>
          s ? (
            <span
              key={s.id}
              className="badge bg-white"
              style={{ color: s.color, borderColor: `${s.color}55` }}
            >
              {s.name}
            </span>
          ) : null,
        )}
        <span className="ml-auto text-ink-500">
          <RelativeTime iso={item.publishedAt} />
        </span>
      </div>

      <h3 className="mt-2 text-base font-semibold text-ink-900">
        {item.title}
      </h3>
      <p className="mt-1 text-sm text-ink-700">{item.summary}</p>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-ink-50 px-1.5 py-0.5 text-[11px] text-ink-600"
            >
              #{tag}
            </span>
          ))}
        </div>
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 text-xs link"
        >
          Источник: {item.source}
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}
