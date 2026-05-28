import Link from "next/link";
import { Activity, BarChart3, Layers, Newspaper } from "lucide-react";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white shadow-soft">
            <BarChart3 className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <div className="text-base font-semibold text-ink-900">
              PE Tracker
            </div>
            <div className="text-[11px] uppercase tracking-wider text-ink-500">
              Russia PE / M&A · Live
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-ink-50"
          >
            <span className="inline-flex items-center gap-2">
              <Layers className="h-4 w-4" /> Секторы
            </span>
          </Link>
          <Link
            href="/news"
            className="rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-ink-50"
          >
            <span className="inline-flex items-center gap-2">
              <Newspaper className="h-4 w-4" /> Новости
            </span>
          </Link>
          <Link
            href="/deals"
            className="rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-ink-50"
          >
            <span className="inline-flex items-center gap-2">
              <Activity className="h-4 w-4" /> Сделки
            </span>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <span className="badge border-emerald-200 bg-emerald-50 text-emerald-700">
            <span className="live-dot" />
            LIVE
          </span>
        </div>
      </div>
    </header>
  );
}
