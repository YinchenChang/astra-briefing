import { useState } from "react";
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
import { EFFORTS } from "@/data/briefing";
import { ClientOnly } from "./ClientOnly";
import { EvidenceTag } from "./EvidenceTag";
import { cn } from "@/lib/utils";

export function ScorePlay() {
  const [idx, setIdx] = useState(5);
  const [mode, setMode] = useState<"standard" | "adapter">("standard");
  const row = EFFORTS[idx] ?? EFFORTS[5];
  const astra = mode === "standard" ? row.standard : row.adapter;
  const data = [
    { name: "Sol 最長", score: 7.8, fill: "#b7c4c0" },
    { name: "Opus 5 高", score: 30.2, fill: "#8a969c" },
    { name: `Astra ${row.label}`, score: astra, fill: "#0e8a84" },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="space-y-5 lg:col-span-4">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-xl text-ink">同一套最嚴的考法</h3>
          <EvidenceTag level="official" />
        </div>
        <p className="leading-relaxed text-muted">
          Standard：每走一步，私有思考被刪，只留便條。Adapter：官方記憶系統，思考可留過下一回合。失效指標用的是左邊。
        </p>
        <div className="flex gap-2">
          {(
            [
              ["standard", "嚴考 Standard"],
              ["adapter", "特製 Adapter"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setMode(k)}
              className={cn(
                "min-h-11 flex-1 rounded-md px-3 text-sm font-medium",
                mode === k ? "bg-teal text-paper" : "bg-surface text-muted ring-1 ring-line hover:text-ink",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="block text-sm text-muted">
          拖動思考長度
          <input
            type="range"
            min={0}
            max={EFFORTS.length - 1}
            value={idx}
            onChange={(e) => setIdx(Number(e.target.value))}
            className="mt-3 w-full accent-teal"
          />
          <div className="mt-2 flex justify-between text-xs text-subtle">
            {EFFORTS.map((e) => (
              <span key={e.key} className={cn(e.key === row.key && "font-medium text-teal-ink")}>
                {e.label}
              </span>
            ))}
          </div>
        </label>
        <dl className="grid grid-cols-2 gap-3">
          <Stat
            label={mode === "standard" ? "嚴考分數" : "Adapter 分數"}
            value={`${astra}%`}
          />
          <Stat
            label={mode === "standard" ? "Adapter 對照" : "嚴考對照"}
            value={`${mode === "standard" ? row.adapter : row.standard}%`}
            hint="不是同一考法"
          />
          <Stat label="這次考試花費" value={`$${row.cost}k`} hint={mode === "adapter" ? "花費列的是嚴考" : undefined} />
          <Stat
            label="這檔位"
            value={
              mode === "adapter"
                ? "幾乎貼頂"
                : row.key === "low"
                  ? "低 < 不思考"
                  : "越想越省錢"
            }
          />
        </dl>
        <p className="text-sm leading-relaxed text-muted">
          {mode === "adapter"
            ? "記憶一留過下一回合，分數就停在 97% 以上。這證明 harness 仍是開關，不是模型已經「等於」80 分突破。"
            : row.key === "low"
              ? "低思考會把半套錯誤理論寫進便條，比不寫更糟。"
              : "想得夠清楚，走的冤枉路更少，嚴考總花費反而下降。"}
        </p>
      </div>
      <div className="rounded-xl bg-surface p-4 shadow-card sm:p-6 lg:col-span-8">
        <ClientOnly>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                <CartesianGrid stroke="#d7e0dd" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#5b6b73", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#5b6b73", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                  unit="%"
                />
                <Tooltip
                  cursor={{ fill: "rgba(14,138,132,0.06)" }}
                  contentStyle={{
                    border: "1px solid #d7e0dd",
                    borderRadius: 12,
                    fontSize: 13,
                  }}
                  formatter={(value) => [`${value}%`, "分數"]}
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {data.map((d) => (
                    <Cell key={d.name} fill={d.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ClientOnly>
        <p className="mt-3 text-xs text-subtle">
          Sol、Opus 始終是嚴考分數，方便對照。切到 Adapter 時，只有 Astra 這根會跳到約 99%。
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-md bg-paper px-3 py-3">
      <dt className="text-xs text-subtle">{label}</dt>
      <dd className="mt-1 font-display text-lg tabular-nums text-ink">{value}</dd>
      {hint ? <p className="mt-1 text-xs text-subtle">{hint}</p> : null}
    </div>
  );
}
