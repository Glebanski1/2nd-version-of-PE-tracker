"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Sector } from "@/lib/types";

export function VolumeChart({ sectors }: { sectors: Sector[] }) {
  const data = [...sectors]
    .sort((a, b) => b.totalVolumeYTDBnRub - a.totalVolumeYTDBnRub)
    .map((s) => ({
      name: s.nameEn,
      ruName: s.name,
      value: s.totalVolumeYTDBnRub,
      color: s.color,
    }));

  return (
    <div className="card p-5">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-base font-semibold text-ink-900">
          Объём сделок по секторам, млрд ₽ (YTD)
        </h3>
        <span className="text-xs text-ink-500">Источник: PE Tracker DB</span>
      </div>
      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#607699" }}
              angle={-30}
              dy={16}
              interval={0}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#607699" }}
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip
              cursor={{ fill: "rgba(52, 112, 255, 0.06)" }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                boxShadow: "0 8px 24px -8px rgb(15 23 42 / 0.12)",
                fontSize: 12,
              }}
              formatter={(value: number, _name, props) => [
                `${value.toLocaleString("ru-RU", { maximumFractionDigits: 1 })} млрд ₽`,
                props.payload.ruName,
              ]}
              labelFormatter={() => ""}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
