import { useState } from "react";
import { BOARD_CALLS } from "@/data/briefing";
import { EvidenceTag } from "./EvidenceTag";
import { Verdict } from "./Verdict";
import { cn } from "@/lib/utils";

export function BoardOpen() {
  const [key, setKey] = useState<(typeof BOARD_CALLS)[number]["key"]>("standard");
  const active = BOARD_CALLS.find((c) => c.key === key) ?? BOARD_CALLS[1];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-display text-xl text-ink">這張圖是這次更新的起點</h3>
        <EvidenceTag level="official" />
      </div>
      <figure className="overflow-hidden rounded-xl bg-ink shadow-card">
        <img
          src="/arc-agi3-board.png"
          alt="ARC-AGI-3 官方排行榜：Astra Standard 折線約 63%，Provider Adapter 群集約 99%，Sol 最長約 8%"
          width={1254}
          height={809}
          className="block h-auto w-full"
        />
        <figcaption className="px-4 py-3 text-xs leading-relaxed text-paper/70">
          ARC Prize 官方排行榜截圖。橫軸是這次考試花費（對數），縱軸是分數。黃折線 = Standard；頂端黃雲 =
          Provider Adapter。圖中沒有 80% 線，那是我們上次自己訂的失效指標。
        </figcaption>
      </figure>
      <div className="grid gap-2 sm:grid-cols-3">
        {BOARD_CALLS.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setKey(c.key)}
            className={cn(
              "min-h-11 rounded-md px-4 py-3 text-left transition-colors",
              c.key === key ? "bg-teal text-paper" : "bg-surface text-muted shadow-card hover:text-ink",
            )}
          >
            <p className="text-xs tracking-wide opacity-80">{c.kicker}</p>
            <p className="mt-1 font-display text-base">{c.title}</p>
            <p className="mt-1 font-display text-lg tabular-nums">{c.score}</p>
          </button>
        ))}
      </div>
      <Verdict kicker={active.kicker} stamp={active.score}>
        {active.line}
      </Verdict>
      <p className="text-sm leading-relaxed text-muted">{active.body}</p>
    </div>
  );
}
