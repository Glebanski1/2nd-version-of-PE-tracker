export function formatRub(value: number | null, unit: "млрд" | "млн" = "млрд"): string {
  if (value === null) return "н/д";
  const v = unit === "млрд" ? value : value / 1000;
  return `${v.toLocaleString("ru-RU", {
    maximumFractionDigits: 1,
  })} ${unit} ₽`;
}

export function formatPct(value: number, withSign = true): string {
  const sign = withSign ? (value > 0 ? "+" : "") : "";
  return `${sign}${value.toLocaleString("ru-RU", {
    maximumFractionDigits: 1,
  })}%`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function relativeTime(iso: string): string {
  const diff = Date.now() - +new Date(iso);
  const sec = Math.round(diff / 1000);
  if (sec < 60) return `${sec} сек назад`;
  const min = Math.round(sec / 60);
  if (min < 60) return `${min} мин назад`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h} ч назад`;
  const d = Math.round(h / 24);
  if (d < 7) return `${d} дн назад`;
  return formatDate(iso);
}
