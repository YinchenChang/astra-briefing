import { useState } from "react";
import { WALLS } from "@/data/briefing";
import { EvidenceTag } from "./EvidenceTag";
import { cn } from "@/lib/utils";

const STAGES = [
  { label: "流言起點", range: "10 兆參數？", width: "100%" },
  { label: "過資訊牆", range: "總參數 2–5 兆", width: "70%" },
  { label: "過服務牆", range: "每次醒來 1,000–2,200 億", width: "48%" },
  { label: "過資料牆", range: "約 3 兆 / 1,500 億醒來", width: "32%" },
] as const;

export function ParamWalls() {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-xl text-ink">三道牆，把數字收窄</h3>
          <EvidenceTag level="estimate" />
        </div>
        <p className="mt-3 max-w-3xl text-muted leading-relaxed">
          官方不公布參數。我們不能假裝知道精確數字，但可以把不可能的區間劃掉。點每一道牆看它砍掉什麼。
        </p>
      </div>
      <div className="space-y-3">
        {STAGES.map((s, i) => (
          <div key={s.label} className="space-y-1">
            <div className="flex justify-between text-xs text-subtle">
              <span>{s.label}</span>
              <span className="tabular-nums">{s.range}</span>
            </div>
            <div className="h-3 rounded-full bg-stone-soft">
              <div
                className="h-3 rounded-full bg-teal transition-[width] duration-500"
                style={{ width: s.width }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {WALLS.map((w, i) => (
          <button
            key={w.title}
            type="button"
            onClick={() => setOpen(i)}
            className={cn(
              "rounded-xl p-5 text-left transition-colors min-h-44",
              open === i ? "bg-teal text-paper" : "bg-surface shadow-card hover:ring-1 hover:ring-line",
            )}
          >
            <p className="text-xs tracking-wide opacity-80">第 {i + 1} 道</p>
            <p className="mt-2 font-display text-lg">{w.title}</p>
            <p className={cn("mt-3 text-sm leading-relaxed", open === i ? "text-paper/90" : "text-muted")}>
              {open === i ? w.body : w.cuts}
            </p>
          </button>
        ))}
      </div>
      <p className="text-sm text-muted leading-relaxed">
        中心估計：混合專家架構，總參數約 2.8–3.2 兆，每次真正醒來約 1,400–1,700 億。循環深度若存在，也只是淺層 2–4 圈，官方未承認。
      </p>
    </div>
  );
}
