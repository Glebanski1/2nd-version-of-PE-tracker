"use client";

import {
  Cell,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Multiplier } from "@/lib/types";

export function MultipliersChart({
  items,
  color,
}: {
  items: Multiplier[];
  color: string;
}) {
  if (items.length === 0) return null;
  const data = items.map((m) => ({
    metric: m.metric,
    median: m.median,
    high: m.high,
  }));

  return (
    <div className="card p-5">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-base font-semibold text-ink-900">
          Профиль мультипликаторов
        </h3>
        <span className="text-xs text-ink-500">Медиана vs верх диапазона</span>
      </div>
      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <RadarChart data={data} outerRadius={90}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fontSize: 12, fill: "#21283a" }}
            />
            <PolarRadiusAxis
              tick={{ fontSize: 10, fill: "#8094b1" }}
              angle={90}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                fontSize: 12,
              }}
              formatter={(value: number) => `${value.toFixed(1)}x`}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Radar
              name="Медиана"
              dataKey="median"
              stroke={color}
              fill={color}
              fillOpacity={0.35}
            />
            <Radar
              name="Верх диапазона"
              dataKey="high"
              stroke="#9ca3af"
              fill="#9ca3af"
              fillOpacity={0.08}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
