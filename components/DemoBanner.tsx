import { Info } from "lucide-react";

export function DemoBanner() {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
      <div className="flex items-start gap-3">
        <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
        <div className="space-y-1">
          <div className="font-semibold">
            Демо-режим: синтетические данные
          </div>
          <p className="text-amber-800">
            Это демонстрационная версия дашборда. Сделки, новости и
            мультипликаторы — сгенерированный пример. Ссылки ведут на главные
            страницы и разделы реальных изданий (Коммерсантъ, Ведомости, РБК,
            Forbes, ТАСС, CNews, SberCIB, ЦБ РФ и др.), а не на конкретные
            статьи — конкретных публикаций не существует.
          </p>
          <p className="text-amber-800">
            <span className="font-medium">Чтобы подключить реальные данные:</span>{" "}
            интегрируйте Telegram Bot API для канала{" "}
            <a
              href="https://t.me/dealsma"
              target="_blank"
              rel="noreferrer noopener"
              className="underline underline-offset-2 hover:text-amber-700"
            >
              @dealsma
            </a>{" "}
            и RSS-фиды изданий в{" "}
            <code className="rounded bg-amber-100 px-1 py-0.5 font-mono text-xs">
              lib/store.ts
            </code>
            . Подробности — в README.
          </p>
        </div>
      </div>
    </div>
  );
}
