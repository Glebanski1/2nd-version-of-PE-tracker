"use client";

import {
  Banknote,
  Building2,
  Cpu,
  Factory,
  Flame,
  HeartPulse,
  Radio,
  ShoppingCart,
  Truck,
  Wheat,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Cpu,
  ShoppingCart,
  Banknote,
  Flame,
  Building2,
  Factory,
  HeartPulse,
  Radio,
  Wheat,
  Truck,
};

export function SectorIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Cpu;
  return <Icon className={className} />;
}
