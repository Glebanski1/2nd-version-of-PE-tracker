import { Sector } from "./types";

export const SECTORS: Sector[] = [
  {
    id: "it",
    name: "IT и Технологии",
    nameEn: "IT & Technology",
    description:
      "Разработка ПО, облачные сервисы, кибербезопасность, EdTech, FinTech, маркетплейсы и сервисные платформы.",
    icon: "Cpu",
    color: "#3470ff",
    totalDealsYTD: 47,
    totalVolumeYTDBnRub: 312.4,
    yoyChangePct: 18.3,
  },
  {
    id: "retail",
    name: "Розничная торговля и FMCG",
    nameEn: "Retail & FMCG",
    description:
      "Продуктовый ритейл, non-food, e-commerce, доставка, дискаунтеры и сети магазинов у дома.",
    icon: "ShoppingCart",
    color: "#16a34a",
    totalDealsYTD: 31,
    totalVolumeYTDBnRub: 218.9,
    yoyChangePct: -4.1,
  },
  {
    id: "finance",
    name: "Финансовый сектор",
    nameEn: "Financial Services",
    description:
      "Банки, страхование, лизинг, факторинг, управляющие компании и платёжные сервисы.",
    icon: "Banknote",
    color: "#0ea5e9",
    totalDealsYTD: 24,
    totalVolumeYTDBnRub: 401.2,
    yoyChangePct: 27.8,
  },
  {
    id: "energy",
    name: "Энергетика и сырьё",
    nameEn: "Energy & Resources",
    description:
      "Нефтегаз, генерация, ВИЭ, металлургия, цветные металлы и нефтесервис.",
    icon: "Flame",
    color: "#ea580c",
    totalDealsYTD: 19,
    totalVolumeYTDBnRub: 587.5,
    yoyChangePct: 9.6,
  },
  {
    id: "realestate",
    name: "Недвижимость и девелопмент",
    nameEn: "Real Estate",
    description:
      "Жилая, коммерческая, складская недвижимость, девелоперы, REIT-аналоги.",
    icon: "Building2",
    color: "#a855f7",
    totalDealsYTD: 22,
    totalVolumeYTDBnRub: 156.3,
    yoyChangePct: 12.4,
  },
  {
    id: "industrial",
    name: "Промышленность",
    nameEn: "Industrials",
    description:
      "Машиностроение, станкостроение, химия, оборонная промышленность, упаковка.",
    icon: "Factory",
    color: "#475569",
    totalDealsYTD: 28,
    totalVolumeYTDBnRub: 245.7,
    yoyChangePct: 22.1,
  },
  {
    id: "pharma",
    name: "Фарма и здравоохранение",
    nameEn: "Pharma & Healthcare",
    description:
      "Фармпроизводители, клиники, лаборатории, дистрибуция, медтех.",
    icon: "HeartPulse",
    color: "#ec4899",
    totalDealsYTD: 14,
    totalVolumeYTDBnRub: 88.6,
    yoyChangePct: 31.5,
  },
  {
    id: "telecom",
    name: "Телеком и медиа",
    nameEn: "Telecom & Media",
    description:
      "Операторы, ЦОД, ИТ-инфраструктура, видеосервисы, медиа-холдинги.",
    icon: "Radio",
    color: "#0891b2",
    totalDealsYTD: 11,
    totalVolumeYTDBnRub: 134.8,
    yoyChangePct: 5.2,
  },
  {
    id: "agro",
    name: "АПК и пищевая",
    nameEn: "Agro & Food",
    description:
      "Растениеводство, животноводство, переработка, агрохолдинги, рыбопромысел.",
    icon: "Wheat",
    color: "#ca8a04",
    totalDealsYTD: 17,
    totalVolumeYTDBnRub: 112.4,
    yoyChangePct: 14.7,
  },
  {
    id: "transport",
    name: "Транспорт и логистика",
    nameEn: "Transport & Logistics",
    description:
      "Грузоперевозки, морские порты, ЖД, авиа, складская логистика, e-com fulfillment.",
    icon: "Truck",
    color: "#7c3aed",
    totalDealsYTD: 13,
    totalVolumeYTDBnRub: 98.2,
    yoyChangePct: 8.9,
  },
];

export function getSectorById(id: string): Sector | undefined {
  return SECTORS.find((s) => s.id === id);
}
