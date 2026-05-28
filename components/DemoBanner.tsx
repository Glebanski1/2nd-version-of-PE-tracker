import { CheckCircle2, Info } from "lucide-react";

export function DemoBanner({
  isReal,
  sourcesOk,
  sourcesTotal,
  fetchedAt,
}: {
  isReal: boolean;
  sourcesOk: number;
  sourcesTotal: number;
  fetchedAt: number;
}) {
  if (isReal) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
          <div className="space-y-1">
            <div className="font-semibold">
              Реальные данные · источники активны: {sourcesOk}/{sourcesTotal}
            </div>
            <p className="text-emerald-800">
              Лента собирается из публичных источников: Telegram-канал{" "}
              <a
                href="https://t.me/dealsma"
                target="_blank"
                rel="noreferrer noopener"
                className="underline underline-offset-2 hover:text-emerald-700"
              >
                @dealsma
              </a>{" "}
              + RSS-фиды Коммерсанта, Ведомостей, Интерфакса, РБК, Forbes. Кэш
              обновляется каждые 5 минут. Сделки и мультипликаторы
              по секторам — справочные (обновляются вручную).
            </p>
            <p className="text-emerald-700 text-xs" suppressHydrationWarning>
              Последний фетч:{" "}
              {new Date(fetchedAt).toLocaleString("ru-RU", {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
      <div className="flex items-start gap-3">
        <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
        <div className="space-y-1">
          <div className="font-semibold">
            Источники недоступны · показываются демо-данные
          </div>
          <p className="text-amber-800">
            Не удалось подключиться к источникам (
            {sourcesOk}/{sourcesTotal} активны). Это бывает, если:
            (а) среда исполнения блокирует внешний трафик (как Claude Code
            online sandbox); (б) у вас нет интернета; (в) источник временно
            отдаёт 4xx/5xx. Запустите проект локально (`npm run dev` на вашем
            Mac) — там сеть открыта, и парсер выкачает реальные посты из{" "}
            <a
              href="https://t.me/dealsma"
              target="_blank"
              rel="noreferrer noopener"
              className="underline underline-offset-2 hover:text-amber-700"
            >
              @dealsma
            </a>{" "}
            и RSS-лент Коммерсанта, Ведомостей, Интерфакса, РБК, Forbes.
          </p>
          <p className="text-amber-700 text-xs" suppressHydrationWarning>
            Последняя проверка:{" "}
            {new Date(fetchedAt).toLocaleString("ru-RU", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
