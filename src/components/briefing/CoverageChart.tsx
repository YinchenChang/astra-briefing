import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PUBLIC_GAMES } from "@/data/briefing";
import { ClientOnly } from "./ClientOnly";
import { EvidenceTag } from "./EvidenceTag";

export function CoverageChart() {
  return (
    <div className="rounded-xl bg-surface p-4 shadow-card sm:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <h3 className="font-display text-xl text-ink">同一批公開遊戲，覆蓋差在哪</h3>
        <EvidenceTag level="official" />
      </div>
      <p className="mb-4 max-w-3xl text-sm text-muted leading-relaxed">
        不是每關都進步 10%。Sol 幾乎過不了的關，Astra 一次打滿；兩邊都零分的關（如 G50T）仍然零分。這是質變，不是微調。
      </p>
      <ClientOnly>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[...PUBLIC_GAMES]} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
              <CartesianGrid stroke="#d7e0dd" vertical={false} />
              <XAxis dataKey="id" tick={{ fill: "#5b6b73", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: "#5b6b73", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                unit="%"
              />
              <Tooltip
                contentStyle={{ border: "1px solid #d7e0dd", borderRadius: 12, fontSize: 13 }}
                formatter={(v: number, n: string) => [`${v}%`, n === "sol" ? "Sol 最長" : "Astra 最長"]}
              />
              <Legend formatter={(v) => (v === "sol" ? "Sol" : "Astra")} />
              <Bar dataKey="sol" fill="#b7c4c0" radius={[6, 6, 0, 0]} />
              <Bar dataKey="astra" fill="#0e8a84" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ClientOnly>
    </div>
  );
}
