import { useState } from "react";
import { cn } from "@/lib/utils";

const NODES = [
  {
    id: "model",
    label: "模型",
    body: "會思考的引擎。Astra 比 Sol 更會把規則寫成符號，但單獨不夠。",
  },
  {
    id: "data",
    label: "企業資料",
    body: "沒有公司自己的文件、權限與流程，模型只是通才。",
  },
  {
    id: "harness",
    label: "Harness",
    body: "記憶怎麼留、上下文怎麼切。同一顆 Astra，嚴考 63%、開官方記憶 99%。",
  },
  {
    id: "tools",
    label: "工具與環境",
    body: "瀏覽器、終端機、票務系統。沒有手，再聰明也做不完活。",
  },
  {
    id: "verifier",
    label: "驗證器",
    body: "誰來判定做對了。程式測試、數學答案、可回滾的變更，才容易閉環。",
  },
  {
    id: "gov",
    label: "治理",
    body: "權限、稽核、人可以打斷。Astra 被標成 Critical 網安，先限企業，就是這層。",
  },
] as const;

export function AgentGraph() {
  const [id, setId] = useState<(typeof NODES)[number]["id"]>("harness");
  const node = NODES.find((n) => n.id === id) ?? NODES[2];

  return (
    <div className="space-y-6">
      <p className="max-w-3xl text-muted leading-relaxed">
        企業裡的 Agent 不是「換一顆更強的大腦」就完成。六項相乘，任一項是零，產出就是零。點每個環節。
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {NODES.map((n, i) => (
          <span key={n.id} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setId(n.id)}
              className={cn(
                "min-h-11 rounded-full px-4 text-sm font-medium",
                n.id === id ? "bg-teal text-paper" : "bg-surface text-muted ring-1 ring-line hover:text-ink",
              )}
            >
              {n.label}
            </button>
            {i < NODES.length - 1 ? <span className="text-subtle">×</span> : null}
          </span>
        ))}
      </div>
      <div className="rounded-xl bg-surface p-6 shadow-card">
        <p className="font-display text-2xl text-ink">{node.label}</p>
        <p className="mt-3 max-w-2xl text-muted leading-relaxed">{node.body}</p>
      </div>
    </div>
  );
}
