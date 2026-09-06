import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { GPU_BUDGET } from "@/data/briefing";
import { ClientOnly } from "./ClientOnly";
import { EvidenceTag } from "./EvidenceTag";
import { cn } from "@/lib/utils";

const COLORS = [
  "#0e8a84",
  "#4aa39d",
  "#7bb8b3",
  "#a3ccc8",
  "#8c7349",
  "#1a2332",
  "#5b6b73",
  "#b7c4c0",
];

export function GpuPlay() {
  const [key, setKey] = useState<(typeof GPU_BUDGET)[number]["key"]>("rl-long");
  const active = GPU_BUDGET.find((g) => g.key === key) ?? GPU_BUDGET[5];
  const data = GPU_BUDGET.map((g) => ({ name: g.label, value: g.pct, key: g.key }));

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 rounded-xl bg-surface p-4 shadow-card sm:p-6">
        <div className="mb-2 flex items-center gap-2">
          <h3 className="font-display text-xl">這 100 天花在哪</h3>
          <EvidenceTag level="estimate" />
        </div>
        <p className="mb-4 text-sm text-muted">點圖或右側列表。面積是佔用時數，不是「模型變多大」。</p>
        <ClientOnly>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={100}
                  paddingAngle={2}
                  onClick={(_, i) => {
                    const row = data[i];
                    if (row) setKey(row.key);
                  }}
                >
                  {data.map((d, i) => (
                    <Cell
                      key={d.key}
                      fill={COLORS[i]}
                      stroke={d.key === key ? "#1a2332" : "transparent"}
                      strokeWidth={d.key === key ? 2 : 0}
                      cursor="pointer"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ border: "1px solid #d7e0dd", borderRadius: 12, fontSize: 13 }}
                  formatter={(v: number) => [`${v}% 佔用`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ClientOnly>
      </div>
      <div className="lg:col-span-7 space-y-3">
        <div className="rounded-xl bg-teal-soft p-5">
          <p className="text-xs tracking-wide text-teal-ink">{active.label}</p>
          <p className="mt-2 font-display text-2xl text-ink">{active.plain}</p>
          <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
            <div>
              <dt className="text-subtle">佔用</dt>
              <dd className="tabular-nums text-ink">{active.pct}%</dd>
            </div>
            <div>
              <dt className="text-subtle">等效滿載</dt>
              <dd className="tabular-nums text-ink">{active.days} 天</dd>
            </div>
            <div>
              <dt className="text-subtle">內部成本</dt>
              <dd className="tabular-nums text-ink">${active.cost}M</dd>
            </div>
          </dl>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {GPU_BUDGET.map((g, i) => (
            <li key={g.key}>
              <button
                type="button"
                onClick={() => setKey(g.key)}
                className={cn(
                  "flex min-h-11 w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm",
                  g.key === key ? "bg-ink text-paper" : "bg-surface text-muted hover:text-ink",
                )}
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: COLORS[i] }} />
                <span className="flex-1">{g.label}</span>
                <span className="tabular-nums">{g.pct}%</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="text-xs text-subtle leading-relaxed">
          中位假設：11 萬張 GPU、佔用 100 天、內部約 $3.5 / GPU-hr，合計約 9.2 億美元。雲端現貨重置價約三倍。預訓練有效計算量與 GPT-4 同級；「最大」指的是寬度與長程訓練佔用。
        </p>
      </div>
    </div>
  );
}
