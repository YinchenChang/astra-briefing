import { useState } from "react";
import { KILLS, MARKERS } from "@/data/briefing";
import { EvidenceTag } from "./EvidenceTag";
import { Verdict } from "./Verdict";
import { cn } from "@/lib/utils";

const TONE = {
  mute: "bg-line-strong",
  teal: "bg-teal",
  warn: "bg-warn",
  sand: "bg-sand",
} as const;

export function KillWatch() {
  const [key, setKey] = useState<(typeof KILLS)[number]["key"]>("arc");
  const [mark, setMark] = useState<(typeof MARKERS)[number]["key"]>("astra");
  const row = KILLS.find((k) => k.key === key) ?? KILLS[1];
  const marker = MARKERS.find((m) => m.key === mark) ?? MARKERS[2];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-display text-xl text-ink">三條失效指標現在走到哪</h3>
        <EvidenceTag level="official" />
      </div>
      <p className="max-w-3xl leading-relaxed text-muted">
        這三條是 8 月 25 日簡報原句。任一條觸發，原先對技術節奏或落地速度的判斷就要改。點分數或指標看現在怎麼讀。
      </p>

      <div className="rounded-xl bg-surface p-5 shadow-card sm:p-6">
        <div className="flex items-end justify-between gap-3">
          <p className="text-xs tracking-wide text-subtle">ARC-AGI-3 Semi-Private</p>
          <p className="text-xs text-warn">軸上短線 = 上次訂的 80 分</p>
        </div>
        <div className="relative mt-6 h-3 rounded-full bg-stone-soft">
          <div className="absolute inset-y-0 z-[1] w-px bg-warn" style={{ left: "80%" }} aria-hidden />
          {MARKERS.map((m) => (
            <span
              key={m.key}
              className={cn(
                "absolute top-1/2 z-[2] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-surface",
                TONE[m.tone],
                m.key === mark && "ring-ink",
              )}
              style={{ left: `${Math.min(m.score, 97)}%` }}
              aria-hidden
            />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {MARKERS.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => {
                setMark(m.key);
                if (m.key === "adapter" || m.key === "astra" || m.key === "line") setKey("arc");
              }}
              className={cn(
                "min-h-11 rounded-full px-3 text-sm tabular-nums",
                m.key === mark ? "bg-ink text-paper" : "bg-paper text-muted ring-1 ring-line hover:text-ink",
              )}
            >
              {m.label} {m.score}
            </button>
          ))}
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted">
          目前對準：<span className="font-medium text-ink">{marker.label}</span> {marker.score}%
          {marker.key === "line"
            ? "。這是失效線本身，不是某家的分數。"
            : marker.key === "adapter"
              ? "。過線了，但規則是特製 harness，不計入指標 02。"
              : marker.key === "astra"
                ? "。離 80 還有 17.3 個百分點；相對 Sol 已經差一個數量級。"
                : "。這是嚴格版本下可比較的對照組。"}
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {KILLS.map((k) => (
          <button
            key={k.key}
            type="button"
            onClick={() => setKey(k.key)}
            className={cn(
              "min-h-44 rounded-xl p-5 text-left transition-colors",
              k.key === key ? "bg-teal text-paper" : "bg-surface shadow-card hover:ring-1 hover:ring-line",
            )}
          >
            <p className="text-xs tracking-wide opacity-80">指標 {k.n}</p>
            <p className="mt-2 font-display text-lg leading-snug">{k.title}</p>
            <p className={cn("mt-3 text-sm", k.key === key ? "text-paper/85" : "text-muted")}>{k.status}</p>
          </button>
        ))}
      </div>
      <div className="space-y-3">
        <Verdict kicker="現在怎麼讀" stamp={row.status}>
          {row.now}
        </Verdict>
        <p className="text-sm leading-relaxed text-subtle">
          <span className="tracking-wide">8 月 25 日原句　</span>
          {row.last}
        </p>
      </div>
    </div>
  );
}
