import { ReactNode } from "react";

export function StatCard({
  label,
  value,
  hint,
  trend,
  icon,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  trend?: { value: string; direction: "up" | "down" | "flat" };
  icon?: ReactNode;
}) {
  const trendClass =
    trend?.direction === "up"
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : trend?.direction === "down"
        ? "text-rose-700 bg-rose-50 border-rose-200"
        : "text-ink-600 bg-ink-50 border-ink-200";

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div className="stat-label">{label}</div>
        {icon ? <div className="text-ink-400">{icon}</div> : null}
      </div>
      <div className="mt-2 stat-value">{value}</div>
      <div className="mt-2 flex items-center gap-2 text-xs text-ink-500">
        {trend ? (
          <span className={`badge ${trendClass}`}>{trend.value}</span>
        ) : null}
        {hint ? <span>{hint}</span> : null}
      </div>
    </div>
  );
}
