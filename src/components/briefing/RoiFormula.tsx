import { useState } from "react";
import { cn } from "@/lib/utils";

const PARTS = [
  {
    id: "roi",
    label: "企業 AI-ROI",
    body: "（可驗證 AI 收益 − 直接與間接投入）÷ 直接與間接投入。分子必須是驗證過的收益。示範或內部滿意度不算。",
  },
  {
    id: "cap",
    label: "AI 能力",
    body: "f(模型能力, Harness, 治理, …)。預訓練的邊際效益在遞減；現在主要吃的是需要高質量、可驗證數據的後訓練。",
  },
  {
    id: "harness",
    label: "Harness",
    body: "Context、工具呼叫、驗證。可以大幅抬升模型表現，而且不一定要由模型商來做。代價是不易規模化，除非有人把它寫進權重。",
  },
  {
    id: "tasks",
    label: "完成任務數",
    body: "f(能力, 採用率, 任務庫)。即使能力上升，採用率與可驗證任務的存量不夠，ROI 仍轉不正。",
  },
] as const;

export function RoiFormula() {
  const [id, setId] = useState<(typeof PARTS)[number]["id"]>("harness");
  const part = PARTS.find((p) => p.id === id) ?? PARTS[2];

  return (
    <div className="space-y-6">
      <h3 className="font-display text-xl text-ink">為什麼 ROI 只在少數領域轉正</h3>
      <p className="max-w-3xl leading-relaxed text-muted">
        上次寫：資料夠、結果能驗證的領域，企業 AI-ROI 比較容易轉正。目前仍是 coding、math。點公式裡的項。
      </p>
      <div className="rounded-xl bg-surface p-6 shadow-card">
        <p className="text-xs tracking-wide text-subtle">企業 AI-ROI</p>
        <p className="mt-3 font-display text-xl leading-relaxed text-ink sm:text-2xl">
          =（可驗證收益 − 全載投入）／ 全載投入
        </p>
        <p className="mt-5 text-sm leading-relaxed text-muted">
          可驗證收益 ≈ 完成任務數 × 單位任務收益。完成任務數取決於能力與採用；能力又取決於模型與 Harness。
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {PARTS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setId(p.id)}
              className={cn(
                "min-h-11 rounded-full px-4 text-sm font-medium",
                p.id === id ? "bg-teal text-paper" : "bg-paper text-muted ring-1 ring-line hover:text-ink",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted">{part.body}</p>
      </div>
    </div>
  );
}
