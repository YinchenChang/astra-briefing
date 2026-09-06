import { useState } from "react";
import {
  LOOP_HITS,
  LOOP_HOLES,
  LOOP_MIX,
  LOOP_PAPERS,
  LOOP_PATHS,
  LOOP_R,
} from "@/data/briefing";
import { EvidenceTag } from "./EvidenceTag";
import { Verdict } from "./Verdict";
import { cn } from "@/lib/utils";

export function LoopDepth() {
  const [paper, setPaper] = useState<(typeof LOOP_PAPERS)[number]["key"]>("smelt");
  const [hit, setHit] = useState<(typeof LOOP_HITS)[number]["key"]>("safety");
  const p = LOOP_PAPERS.find((x) => x.key === paper) ?? LOOP_PAPERS[2];
  const h = LOOP_HITS.find((x) => x.key === hit) ?? LOOP_HITS[3];

  return (
    <div className="mt-10 space-y-14">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-xl text-ink">兩條花算力的路，不要混</h3>
          <EvidenceTag level="official" />
        </div>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted">
          循環深度、Looped Transformer、潛空間迴圈，講的是同一件事：同一組層被走多次，參數不隨深度線性成長。它跟現在定了價的「把思考寫成字」，是正交的第二個旋鈕。
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {LOOP_PATHS.map((path) => (
            <article key={path.key} className="rounded-xl bg-surface p-5 shadow-card sm:p-6">
              <p className="text-xs tracking-wide text-teal-ink">{path.sub}</p>
              <h4 className="mt-2 font-display text-2xl leading-snug">{path.t}</h4>
              <dl className="mt-5 space-y-4">
                {path.rows.map(([k, v]) => (
                  <div key={k} className="text-sm">
                    <dt className="text-subtle">{k}</dt>
                    <dd className="mt-1 text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-xl text-ink">三篇不是互搶，是同一條軸的三層</h3>
          <EvidenceTag level="official" />
        </div>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted">
          Huginn 證明可以在腦子裡想；DeepLoop 告訴你圈數加下去怎麼才不炸；SMELT 把三本帳釘平，量化值不值得做。點一篇看它實際主張什麼。
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {LOOP_PAPERS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setPaper(item.key)}
              className={cn(
                "min-h-36 rounded-xl p-5 text-left transition-colors",
                paper === item.key ? "bg-teal text-paper" : "bg-surface shadow-card hover:ring-1 hover:ring-line",
              )}
            >
              <p className="text-xs tracking-wide opacity-80">
                {item.when} · {item.role}
              </p>
              <p className="mt-2 font-display text-xl">{item.who}</p>
              <p className={cn("mt-3 text-sm leading-relaxed", paper === item.key ? "text-paper/90" : "text-muted")}>
                {item.role === "能不能做"
                  ? "存在性：推理不必寫成字。"
                  : item.role === "怎麼加得下去"
                    ? "穩定性：讓迴圈加得下去。"
                    : "縮放律：帳算平之後仍淨贏。"}
              </p>
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-surface p-5 shadow-card sm:p-6">
          <p className="text-xs tracking-wide text-teal-ink">
            {p.who} · {p.role}
          </p>
          <p className="mt-3 leading-relaxed text-ink">{p.claim}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{p.caveat}</p>
          <p className="mt-4 font-display text-lg leading-snug text-teal-ink">{p.punch}</p>
        </div>
      </div>

      <div>
        <h3 className="font-display text-xl text-ink">圈數不是免費旋鈕</h3>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted">
          SMELT 與開源的 Nanbeige 獨立得到同一句：預算對齊時，兩圈最好。第三、四圈逼模型變瘦，損失回升。
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {LOOP_R.map((item) => (
            <div
              key={item.r}
              className={cn(
                "rounded-xl p-5",
                item.tone === "teal" ? "bg-teal text-paper" : "bg-surface shadow-card",
              )}
            >
              <p className={cn("font-display text-3xl tabular-nums", item.tone === "teal" ? "text-paper" : "text-ink")}>
                {item.r}
              </p>
              <p className="mt-2 font-display text-lg">{item.t}</p>
              <p className={cn("mt-2 text-sm", item.tone === "teal" ? "text-paper/85" : "text-muted")}>{item.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {LOOP_MIX.map((item) => (
            <article key={item.key} className="rounded-xl bg-surface p-5 shadow-card sm:p-6">
              <h4 className="font-display text-lg">{item.t}</h4>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.d}</p>
            </article>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-xl text-ink">產業上已經不是紙</h3>
        <ol className="mt-6 flex flex-wrap gap-2">
          {[
            "Huginn 2025.02",
            "Ouro 2025.10",
            "DeepLoop / SMELT 2026 夏",
            "Nanbeige 開源",
            "Astra 傳聞 2026.09",
          ].map((step, i, arr) => (
            <li key={step} className="flex items-center gap-2 text-sm">
              <span className="rounded-full bg-surface px-3 py-2 shadow-card">{step}</span>
              {i < arr.length - 1 ? <span className="text-subtle">→</span> : null}
            </li>
          ))}
        </ol>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-xl bg-surface p-5 shadow-card sm:p-6">
            <p className="text-xs tracking-wide text-teal-ink">ByteDance · Ouro</p>
            <p className="mt-2 leading-relaxed text-ink">
              14 億參數、走四圈，數學上打過 40 億的對照組。優勢被消融成「知識怎麼操作」，不是「知識有多少」。
            </p>
          </article>
          <article className="rounded-xl bg-surface p-5 shadow-card sm:p-6">
            <p className="text-xs tracking-wide text-teal-ink">Nanbeige 4.2</p>
            <p className="mt-2 leading-relaxed text-ink">
              22 層走兩遍＝44 有效層。作者也說兩遍是最好折衷，更多遍幾乎不漲、訓練更貴——跟 SMELT 同構。
            </p>
          </article>
        </div>
      </div>

      <div>
        <h3 className="font-display text-xl text-ink">會改哪一層，不會改哪一層</h3>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted">
          不會是 Transformer 取代舊架構、或 o1 那種跳躍。幅度是「同算力省一成上下 + 小模型當大模型用」，不是 10 倍。點一層看含義。
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {LOOP_HITS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setHit(item.key)}
              className={cn(
                "min-h-11 rounded-full px-4 text-sm",
                hit === item.key ? "bg-teal text-paper" : "bg-surface text-muted ring-1 ring-line hover:text-ink",
              )}
            >
              {item.t}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-surface p-5 shadow-card sm:p-6">
          <p className="font-display text-2xl">{h.t}</p>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">{h.d}</p>
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-xl text-ink">跟 Astra 對得上什麼</h3>
          <EvidenceTag level="unconfirmed" />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              t: "若屬實，是淺層",
              d: "Pachocki 只保證計算圖深度仍在 GPT-4 的兩倍內。這跟「兩到四圈、中間層重用」同構，不是 Huginn 那種 32 圈。",
            },
            {
              t: "能解釋的部分",
              d: "「不思考」仍有 35%，可能是單步被走得更深。那是地板，不是嚴考天花板。",
            },
            {
              t: "解釋不了的部分",
              d: "嚴考從 8% 到 63%，是便條裡的世界模型。兩圈層重用解釋不了這一截。",
            },
          ].map((c) => (
            <article key={c.t} className="rounded-xl bg-surface p-5 shadow-card sm:p-6">
              <h4 className="font-display text-lg">{c.t}</h4>
              <p className="mt-3 text-sm leading-relaxed text-muted">{c.d}</p>
            </article>
          ))}
        </div>
      </div>

      <Verdict kicker="迴圈結論" stamp="維持主結論">
        不是新範式，是第二個旋鈕。帳算平之後兩圈最好，省的是一成上下的訓練算力，不是 10 倍智能。Astra
        若用了，最多抬「不思考」的地板；嚴考那一跳仍是便條裡的世界模型。
      </Verdict>

      <div>
        <h3 className="font-display text-xl text-ink">三篇還沒關掉的洞</h3>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {LOOP_HOLES.map((item) => (
            <li key={item} className="rounded-xl bg-surface p-5 text-sm leading-relaxed text-muted shadow-card">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
