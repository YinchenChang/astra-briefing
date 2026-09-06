import { useState } from "react";
import { cn } from "@/lib/utils";
import { EvidenceTag } from "./EvidenceTag";

const TURNS = [
  {
    title: "第 1 步",
    think: "粉紅色半邊對了。藍條可能控制旋轉。下一步點 (46, 4)。",
    note: "轉盤在右上。藍 = 旋轉？",
    keep: "便條留下",
    lose: "推理被刪",
  },
  {
    title: "第 2 步",
    think: "等等，旋轉是什麼意思？我好像推過，但只剩一句便條。重想一遍。",
    note: "轉盤在右上。藍 = 旋轉？ 失敗一次。",
    keep: "便條變長一點",
    lose: "上一步的計畫沒了",
  },
  {
    title: "第 3 步",
    think: "若便條夠密：L8 hub q2。extend8 to3。可直接執行。若便條太稀：又從像素開始猜。",
    note: "Astra 會寫成代數：Turn 5 P=(24,20) facing west",
    keep: "可執行的小模型",
    lose: "Sol 多半沒寫夠，只能重推",
  },
] as const;

export function AmnesiaPlay() {
  const [i, setI] = useState(0);
  const t = TURNS[i];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-display text-xl text-ink">失憶規則，走一次看看</h3>
        <EvidenceTag level="official" />
      </div>
      <p className="max-w-3xl text-muted leading-relaxed">
        把模型想成一位棋手。裁判規定：每下一子，就把他腦中的推演清掉，桌上只准留一張便條。誰能把棋局壓縮成便條上的符號，誰就能繼續下。誰把計畫留在腦子裡，下一步就從零開始。
      </p>
      <div className="flex gap-2">
        {TURNS.map((step, idx) => (
          <button
            key={step.title}
            type="button"
            onClick={() => setI(idx)}
            className={cn(
              "min-h-11 flex-1 rounded-md px-3 text-sm font-medium transition-colors",
              idx === i
                ? "bg-teal text-paper"
                : "bg-surface text-muted ring-1 ring-line hover:text-ink",
            )}
          >
            {step.title}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-warn-soft p-5">
          <p className="text-xs font-medium tracking-wide text-warn">私有思考 · 這步結束後刪除</p>
          <p className="mt-3 font-display text-lg leading-snug text-ink">{t.think}</p>
          <p className="mt-4 text-sm text-warn">{t.lose}</p>
        </div>
        <div className="rounded-xl bg-teal-soft p-5">
          <p className="text-xs font-medium tracking-wide text-teal-ink">可見便條 · 唯一活過下一回合</p>
          <p className="mt-3 font-display text-lg leading-snug text-ink">{t.note}</p>
          <p className="mt-4 text-sm text-teal-ink">{t.keep}</p>
        </div>
      </div>
    </div>
  );
}
