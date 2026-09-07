import { useState } from "react";
import { CHAIN } from "@/data/briefing";
import { cn } from "@/lib/utils";

export function LoopMap() {
  const [id, setId] = useState<(typeof CHAIN)[number]["id"]>("firm");
  const node = CHAIN.find((c) => c.id === id) ?? CHAIN[1];

  return (
    <div className="space-y-6">
      <h3 className="font-display text-xl text-ink">產品服務這條鏈還沒收口</h3>
      <p className="max-w-3xl leading-relaxed text-muted">
        上次那張圖的意思是：中上游自己在轉，下游還沒閉環。實線是已經在轉的錢，虛線是還沒閉上的購買和導入。
      </p>
      <div className="flex flex-wrap items-stretch justify-center gap-2">
        {CHAIN.map((c, i) => (
          <span key={c.id} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setId(c.id)}
              className={cn(
                "min-h-11 min-w-28 rounded-md px-4 py-2 text-sm font-medium",
                c.id === id
                  ? "bg-teal text-paper"
                  : c.closed
                    ? "bg-surface text-muted ring-1 ring-line hover:text-ink"
                    : "bg-paper text-muted ring-1 ring-dashed ring-line-strong hover:text-ink",
              )}
            >
              {c.label}
            </button>
            {i < CHAIN.length - 1 ? (
              <span className={cn("text-xs", CHAIN[i + 1]?.closed ? "text-teal-ink" : "text-subtle")}>
                {CHAIN[i + 1]?.closed ? "→" : "╌→"}
              </span>
            ) : null}
          </span>
        ))}
      </div>
      <div className="rounded-xl bg-surface p-6 shadow-card">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-display text-2xl text-ink">{node.label}</p>
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs",
              node.closed ? "bg-teal-soft text-teal-ink" : "bg-warn-soft text-warn",
            )}
          >
            {node.closed ? "中上游 · 已在轉" : "下游 · 未閉環"}
          </span>
        </div>
        <p className="mt-1 text-sm text-subtle">{node.hop}</p>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">{node.body}</p>
      </div>
      <p className="text-sm text-muted">
        投資未來、中游需求高速成長，與「企業導入 / 變現困難」可以同時成立。
      </p>
    </div>
  );
}
