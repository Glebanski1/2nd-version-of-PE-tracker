import { NewsItem, SectorId } from "../types";

const SECTOR_KEYWORDS: Record<SectorId, string[]> = {
  it: [
    "IT", "айти", "Яндекс", "yandex", "VK", "ВК", "Mail.ru", "Ozon", "Wildberries",
    "Wildberris", "Selectel", "Softline", "Софтлайн", "1С", "1c", "касперск",
    "kaspersky", "Positive Technologies", "Group-IB", "F.A.C.C.T.", "Cian", "Авито",
    "Avito", "Headhunter", "HeadHunter", "HH.ru", "Skillbox", "GeekBrains",
    "облач", "cloud", "SaaS", "Diasoft", "Диасофт", "Astra Linux", "Rutube",
    "stack", "цод", "data center", "data-center", "ЦОД", "Yandex Cloud",
    "MTS Cloud", "разработ", "программн", "софт", "ИТ-", "ИТ ", "АйТи",
    "стартап", "венчур", "iOS", "Android", "приложен", "платформ", "EdTech",
    "FinTech", "финтех", "кибербез", "хост", "интегратор", "телемед",
    "edtech", "fintech",
  ],
  retail: [
    "X5", "Магнит", "magnit", "Пятёрочка", "Пятерочка", "Перекрёсток", "Перекресток",
    "Вкусвилл", "ВкусВилл", "Лента", "Окей", "О'кей", "Глобус", "Метро", "Metro",
    "Auchan", "Ашан", "DNS", "ДНС", "М.Видео", "М.видео", "Эльдорадо", "Eldorado",
    "Детский мир", "Спортмастер", "L'Etoile", "Лэтуаль", "Fix Price", "Fix-Price",
    "Светофор", "Чижик", "ВкусВил", "ритейл", "retail", "FMCG", "FMCG-",
    "торговая сеть", "сеть магазин", "продуктов", "e-commerce", "маркетплейс",
    "marketplace", "online retail", "дискаунтер", "Wildberries",
  ],
  finance: [
    "банк", "bank", "Сбер", "Sber", "ВТБ", "VTB", "Тинькофф", "Тинькоф", "T-Bank",
    "Т-Банк", "Тбанк", "Альфа-Банк", "Альфа-банк", "Альфабанк", "Газпромбанк",
    "Россельхозбанк", "РСХБ", "МКБ", "Совкомбанк", "Открытие", "ФК Открытие",
    "Райффайзен", "Юникредит", "QIWI", "Киви", "Точка", "финанс", "финтех",
    "factor", "leasing", "лизинг", "факторинг", "страховани", "Ингосстрах",
    "Согаз", "СОГАЗ", "АльфаСтрахование", "Ренессанс Страхование", "ВСК",
    "инвестфонд", "ЦБ", "Центральный банк", "Банк России", "ставк", "ключевая ставка",
    "брокер", "broker", "управляющ", "asset management",
  ],
  energy: [
    "нефт", "oil", "газ ", " газа", "Газпром", "Gazprom", "Роснефть", "Rosneft",
    "ЛУКОЙЛ", "Лукойл", "Lukoil", "Сургутнефтегаз", "Татнефть", "Tatneft",
    "Башнефть", "Новатэк", "НОВАТЭК", "Транснефть", "Transneft", "Газпром нефть",
    "Газпромнефть", "энергет", "energy", "электр", "генерац", "ВИЭ",
    "Россети", "Русгидро", "Интер РАО", "ТГК", "ОГК", "уголь",
    "металлург", "сталь", "Северсталь", "НЛМК", "ММК", "EVRAZ", "ЕВРАЗ",
    "Норникель", "РУСАЛ", "Алроса", "Полюс", "Полиметалл", "цветмет",
  ],
  realestate: [
    "недвижим", "real estate", "девелопер", "developer", "застройщик", "ПИК", "Пик",
    "Самолёт", "Самолет", "Эталон", "ЛСР", "А101", "Setl", "Сэтл", "Гранель",
    "Инград", "ФСК", "MR Group", "ИНТЕКО", "ДОНСТРОЙ", "Capital Group",
    "склад", "warehouse", "БЦ ", "офис", "ТЦ ", "торговый центр", "ЖК ",
    "жилой комплекс", "апарт-отел", "DOM.RF", "Дом.РФ", "ЗПИФ", "СПИК",
  ],
  industrial: [
    "промышл", "industrial", "машиностро", "Ростех", "Rostec", "ОАК", "ОДК",
    "КАМАЗ", "Камаз", "АвтоВАЗ", "ГАЗ", "УАЗ", "СОЛЛЕРС", "Sollers",
    "Алмаз-Антей", "Уралмаш", "Уралхим", "ФосАгро", "Акрон", "химия",
    "Сибур", "СИБУР", "химпром", "ОПК", "оборонн", "станкостро",
    "упаков", "package", "цемент", "Евроцемент", "ЛафаржХолсим",
  ],
  pharma: [
    "фарм", "pharma", "Медси", "Медси", "Мать и дитя", "EMC", "ЕМС",
    "Инвитро", "INVITRO", "Хеликс", "Helix", "Гемотест", "клиник",
    "медицин", "Фармстандарт", "Pharmstandard", "Биокад", "BIOCAD",
    "Р-Фарм", "R-Pharm", "Озон Фарм", "Промомед", "Фармасинтез",
    "Pharmasyntez", "Vita", "ВИТА", "Эркафарм", "Ригла", "36.6",
    "ASNA", "АСНА", "аптек", "pharmacy", "лекарств", "drug", "препарат",
    "дженерик", "вакцин", "медтех", "медицинск",
  ],
  telecom: [
    "МТС", "MTS", "Мегафон", "МегаФон", "MegaFon", "Билайн", "Beeline", "Tele2",
    "Теле2", "Ростелеком", "Rostelecom", "ЭР-Телеком", "Дом.ru", "телеком",
    "telecom", "оператор связи", "IXcellerate", "DataPro", "DataLine",
    "OneFactor", "медиахолдинг", "СТС Медиа", "Газпром-Медиа", "ВГТРК",
    "телекомпан", "Кинопоиск", "ivi", "Okko", "Premier", "Wink",
  ],
  agro: [
    "АПК", "агропром", "agro", "Мираторг", "Miratorg", "Черкизово", "Cherkizovo",
    "Русагро", "Rusagro", "Эконива", "EcoNiva", "Содружество", "Damate", "Дамате",
    "ПродИмпорт", "Агрокомплекс", "Степь", "Прогресс Агро", "молочн",
    "мясо", "птицеводств", "зерно", "пшениц", "урожай", "сельхоз", "agri",
    "Россельхоз", "удобрени", "fertilizer", "ИКАР", "OneSoil",
  ],
  transport: [
    "логист", "logistic", "перевоз", "transport", "транспортн", "ЖД ", "РЖД",
    "Globaltrans", "Глобалтранс", "Совкомфлот", "FESCO", "ФЕСКО", "ПЭК",
    "СДЭК", "CDEK", "Деловые Линии", "Boxberry", "Почта России", "Russian Post",
    "Аэрофлот", "Aeroflot", "S7", "Победа", "Уральские Авиалинии",
    "контейнерн", "container", "терминал", "порт ", "stevedoring",
    "Группа Дело", "Global Ports", "Глобал Портс", "Wildberries Логистика",
    "Ozon Логистика", "fulfilment", "фулфилмент", "fulfillment",
  ],
};

const DEAL_KEYWORDS = [
  "сделк", "приобр", "выкуп", "купил", "купит", "покуп", "продаж", "продал",
  "продаст", "продаёт", "продает", "merger", "acquisition", "LBO", "MBO",
  "private equity", "PE-фонд", "PE фонд", "венчур", "venture", "IPO",
  "поглощ", "слияни", "консолидац", "доля в", "пакет акций", "стратегическ",
  "инвестор", "investor", "вошёл в капитал", "вошел в капитал", "раунд",
  "round", "финансиров", "funding", "fund-raising", "M&A", "M & A",
  "buyout", "buy-out", "exit", "выход из", "доп. эмисси", "допэмисси",
  "размещени", "placement", "выпуск акций",
];

export function classifySectors(text: string): SectorId[] {
  const lower = text.toLowerCase();
  const matched: SectorId[] = [];
  for (const [sectorId, kws] of Object.entries(SECTOR_KEYWORDS)) {
    if (kws.some((kw) => lower.includes(kw.toLowerCase()))) {
      matched.push(sectorId as SectorId);
    }
  }
  return matched;
}

export function isDealRelated(text: string): boolean {
  const lower = text.toLowerCase();
  return DEAL_KEYWORDS.some((w) => lower.includes(w.toLowerCase()));
}

const VOLUME_HINT = /(\d+[\s ]*(?:млрд|миллиард|bn|bln|млн|миллион|тыс|тысяч|трлн|триллион))/i;

export function detectImportance(text: string): NewsItem["importance"] {
  if (/\b\d{2,}\s*млрд/i.test(text) || /\bтрлн\b/i.test(text)) return "high";
  if (VOLUME_HINT.test(text)) return "medium";
  return "low";
}

export function extractTags(text: string, sectors: SectorId[]): string[] {
  const tags = new Set<string>();
  const lower = text.toLowerCase();
  const companyMatches = text.match(
    /([«"][^»"]{2,40}[»"])|([A-ZА-ЯЁ][A-Za-zА-Яа-яёЁ0-9.\-]{2,25})/g,
  );
  if (companyMatches) {
    companyMatches.slice(0, 5).forEach((m) => {
      const clean = m.replace(/[«»"]/g, "").trim();
      if (clean.length >= 3 && clean.length <= 30) tags.add(clean);
    });
  }
  if (lower.includes("ipo")) tags.add("IPO");
  if (lower.includes("m&a") || lower.includes("слияни") || lower.includes("поглощ"))
    tags.add("M&A");
  if (lower.includes("pe ") || lower.includes("private equity")) tags.add("PE");
  if (lower.includes("ipo")) tags.add("IPO");
  if (lower.includes("фас")) tags.add("ФАС");
  if (lower.includes("цб") || lower.includes("банк россии")) tags.add("ЦБ");
  if (sectors.length > 0) tags.add(sectors[0]);
  return Array.from(tags).slice(0, 6);
}

export function shortHash(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36);
}
