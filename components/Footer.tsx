export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-ink-500 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
          <div>
            PE Tracker · Дашборд российского рынка PE / M&A. Данные собираются
            из открытых источников: @dealsma, Коммерсантъ, Ведомости, РБК,
            Forbes, SberCIB, ВТБ Капитал, ЦБ РФ и других.
          </div>
          <div className="text-ink-400">
            Источники проверяются, но информация носит обзорный характер и не
            является инвестрекомендацией.
          </div>
        </div>
      </div>
    </footer>
  );
}
