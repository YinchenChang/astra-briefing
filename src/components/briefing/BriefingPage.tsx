import { useEffect, useState } from "react";
import { BOOK, MODEL_COMPARE, NAV, THESES } from "@/data/briefing";
import { AgentGraph } from "./AgentGraph";
import { AmnesiaPlay } from "./AmnesiaPlay";
import { BoardOpen } from "./BoardOpen";
import { CoverageChart } from "./CoverageChart";
import { EvidenceTag } from "./EvidenceTag";
import { GpuPlay } from "./GpuPlay";
import { KillWatch } from "./KillWatch";
import { LoopDepth } from "./LoopDepth";
import { LoopMap } from "./LoopMap";
import { ParamWalls } from "./ParamWalls";
import { RoiFormula } from "./RoiFormula";
import { ScorePlay } from "./ScorePlay";
import { SiteNav } from "./SiteNav";
import { PullQuote } from "./PullQuote";
import { Verdict } from "./Verdict";

export function BriefingPage() {
  const [active, setActive] = useState("open");

  useEffect(() => {
    const nodes = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]?.target.id) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.4, 0.7] },
    );
    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-bg text-ink">
      <SiteNav active={active} />
      <main className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <section id="open" className="scroll-mt-24 py-16 sm:py-24">
          <p className="text-sm tracking-[0.18em] text-teal-ink">更新簡報 · 相對 2026.08.25</p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.15] text-ink sm:text-5xl">
            失效線還沒過。
            <span className="mt-2 block text-teal-ink">圖已經換了一張。</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            上次寫：2026 年底前若有模型在 ARC-AGI-3 Semi-Private 拿到 80 分，代表技術突破。Astra
            嚴考 62.7%，還沒到 80；特製 harness 到了 99%。超預期，但不是失效。
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-soft px-3 py-1.5 text-xs text-teal-ink">
              <EvidenceTag level="official" /> 系統卡與 ARC Prize
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-sand-soft px-3 py-1.5 text-xs text-sand">
              <EvidenceTag level="estimate" /> 參數與成本為收斂推估
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-stone-soft px-3 py-1.5 text-xs text-stone">
              <EvidenceTag level="unconfirmed" /> 循環深度未獲官方承認
            </span>
          </div>
          <div className="mt-12">
            <BoardOpen />
          </div>
        </section>

        <section id="delta" className="scroll-mt-24 border-t border-line py-16">
          <p className="text-sm tracking-wide text-teal-ink">本週總結</p>
          <h2 className="mt-2 font-display text-3xl">相對上次，改了什麼、沒改什麼</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                n: "改了",
                t: "嚴考從個位數到 63%",
                d: "Sol 最長 7.8%，Astra 最長 62.7%。模型把世界模型寫進便條的能力，明顯超預期。",
              },
              {
                n: "沒改",
                t: "80 分失效線仍有效",
                d: "嚴考沒過線。Adapter 99% 是另一種考法，不能拿來宣告指標 02 已觸發。",
              },
              {
                n: "看清楚了",
                t: "Harness 仍是分數開關",
                d: "同一顆 Astra，嚴考 63%、特製 harness 99%。價值捕捉三條沒有被 99% 推翻。",
              },
            ].map((c) => (
              <li key={c.n} className="flex flex-col rounded-xl bg-surface p-6 shadow-card">
                <p className="text-xs tracking-widest text-teal-ink">{c.n}</p>
                <p className="mt-3 font-display text-2xl leading-snug">{c.t}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{c.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <KillWatch />
          </div>
        </section>

        <section id="frame" className="scroll-mt-24 border-t border-line py-16">
          <p className="text-sm tracking-wide text-teal-ink">8 月 25 日框架 · 仍適用</p>
          <h2 className="mt-2 font-display text-3xl">一圖一公式：AI 還沒閉環</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">
            以下併入上次簡報正文。這次 Astra 改的是指標 02 的讀數，不是這套骨架。
          </p>
          <div className="mt-10">
            <LoopMap />
          </div>
          <div className="mt-14">
            <RoiFormula />
          </div>
          <div className="mt-14 space-y-5">
            <h3 className="font-display text-xl text-ink">認知 1：市場高估 OpenAI 價值捕捉</h3>
            {THESES.map((t) => (
              <article key={t.key} className="rounded-xl bg-surface p-5 shadow-card sm:p-6">
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-display text-lg">{t.t}</h4>
                  <p className="text-xs tracking-wide text-subtle">8 月 25 日原文在下</p>
                </div>
                <Verdict stamp={t.verdict}>{t.now}</Verdict>
                <p className="mt-4 text-sm leading-relaxed text-subtle">{t.last}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="score" className="scroll-mt-24 border-t border-line py-16">
          <p className="text-sm tracking-wide text-teal-ink">機制</p>
          <h2 className="mt-2 font-display text-3xl">一場專門製造失憶的考試</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">
            ARC-AGI-3 不給說明書。人類冷啟動能過；模型在 2026 年初幾乎是零。讀分數前先分清兩種考法。
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <article className="rounded-xl bg-surface p-6 shadow-card">
              <p className="text-xs tracking-wide text-teal-ink">容易誤讀 1</p>
              <h3 className="mt-2 font-display text-xl">99% 不是同一場考試</h3>
              <p className="mt-3 leading-relaxed text-muted">
                嚴考刪思考、只留便條。Adapter 把思考留過下一回合。失效指標對的是前者。
              </p>
            </article>
            <article className="rounded-xl bg-surface p-6 shadow-card">
              <p className="text-xs tracking-wide text-teal-ink">容易誤讀 2</p>
              <h3 className="mt-2 font-display text-xl">標價是檔位，不是體重</h3>
              <p className="mt-3 leading-relaxed text-muted">
                Astra 賣 $10 / $50，對齊 Claude 旗艦，是 Sol 原價的兩倍。那是產品線卡位，不能反推模型大了 2.5 倍。
              </p>
            </article>
          </div>
          <div className="mt-8 overflow-x-auto rounded-xl bg-surface shadow-card">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="border-b border-line text-xs text-subtle">
                <tr>
                  <th className="px-4 py-3 font-medium">模型</th>
                  <th className="px-4 py-3 font-medium">API 價（百萬 token）</th>
                  <th className="px-4 py-3 font-medium">上下文</th>
                  <th className="px-4 py-3 font-medium">嚴考分數</th>
                  <th className="px-4 py-3 font-medium">備註</th>
                </tr>
              </thead>
              <tbody>
                {MODEL_COMPARE.map((m) => (
                  <tr key={m.name} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 font-medium">{m.name}</td>
                    <td className="px-4 py-3 tabular-nums text-muted">{m.price}</td>
                    <td className="px-4 py-3 tabular-nums text-muted">{m.context}</td>
                    <td className="px-4 py-3 tabular-nums">{m.arc3}%</td>
                    <td className="px-4 py-3 text-muted">{m.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-subtle">嚴考分數為 ARC-AGI-3 Standard Harness 半私有集。</p>
          <div className="mt-12">
            <ScorePlay />
          </div>
          <div className="mt-12">
            <AmnesiaPlay />
          </div>
          <div className="mt-12">
            <CoverageChart />
          </div>
          <div className="mt-14">
            <h3 className="font-display text-2xl">主因：把世界模型寫進便條</h3>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted">
              Sol 其實已經會想。把官方記憶打開，公開集從 13% 升到 38%。差在嚴考時記憶通道只剩便條。Astra
              連「不思考」都有 35%，已經高過 Sol 拼盡全力的 8%。
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  t: "主因",
                  d: "現場發明一套簡譜，記錄物件、座標、規則與未完成計畫。便條夠密，下一步才接得住。",
                },
                {
                  t: "次因",
                  d: "從零預訓練的先驗更強。不開長思考，單步定向就超過舊旗艦。",
                },
                {
                  t: "放大",
                  d: "計分懲罰冤枉路（平方）。世界模型一對，步數下降，分數與成本一起改善。",
                },
              ].map((c) => (
                <article key={c.t} className="rounded-xl bg-surface p-6 shadow-card">
                  <h4 className="font-display text-lg">{c.t}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{c.d}</p>
                </article>
              ))}
            </div>
            <PullQuote className="mt-10" by="François Chollet" role="ARC Prize">
              我們以前只在精巧的外掛系統裡看過這種符號建模。Harness 的能力，正在進到模型本身。
            </PullQuote>
            <div className="mt-6">
              <Verdict kicker="機制結論">
                嚴考從 8% 到 63%，是便條裡的世界模型，不是更大的參數。循環深度若存在，也解釋不了這一截。
              </Verdict>
            </div>
            <p className="mt-4 text-sm text-subtle">
              網路上說 Astra 用了循環深度。可信但未證實；OpenAI 首席科學家只保證計算圖深度仍在 GPT-4
              的兩倍內。它最多抬高「不思考」的地板。
              <a href="#loop" className="ml-1 text-teal-ink underline-offset-2 hover:underline">
                論文對讀在〈迴圈〉
              </a>
            </p>
          </div>
        </section>

        <section id="size" className="scroll-mt-24 border-t border-line py-16">
          <p className="text-sm tracking-wide text-teal-ink">規模</p>
          <h2 className="mt-2 font-display text-3xl">它大概有多大，十萬張卡花在哪</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">
            總參數是掛名的專家人數；每次醒來（active）才是這次進會議室的人。2026
            年能線上服務的旗艦，都把大多數專家保持睡著。
          </p>
          <div className="mt-10">
            <ParamWalls />
          </div>
          <div className="mt-16">
            <h3 className="font-display text-2xl">十萬張卡，不是為了蓋更大的樓</h3>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted">
              Aidan Clark 說這是史上最大訓練。用我們的模型尺寸去算，把書讀完只需數天。剩下的時間，是讓模型在陌生環境裡實習。
            </p>
            <div className="mt-10">
              <GpuPlay />
            </div>
          </div>
        </section>

        <section id="invest" className="scroll-mt-24 border-t border-line py-16">
          <p className="text-sm tracking-wide text-teal-ink">含義</p>
          <h2 className="mt-2 font-display text-3xl">三條認知與概念性組合</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">
            Astra 沒有推翻「市場高估 OpenAI 價值捕捉」。它把機制寫硬了。本節不是投資建議。
          </p>
          <div className="mt-8 space-y-3">
            {THESES.map((t) => (
              <Verdict key={t.key} kicker={t.t} stamp={t.verdict}>
                {t.now}
              </Verdict>
            ))}
          </div>
          <div className="mt-10">
            <AgentGraph />
          </div>
          <div className="mt-10 overflow-x-auto rounded-xl bg-surface shadow-card">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="border-b border-line text-xs text-subtle">
                <tr>
                  <th className="px-4 py-3 font-medium">方向</th>
                  <th className="px-4 py-3 font-medium">標的</th>
                  <th className="px-4 py-3 font-medium">權重</th>
                  <th className="px-4 py-3 font-medium">角色</th>
                  <th className="px-4 py-3 font-medium">Astra 之後</th>
                </tr>
              </thead>
              <tbody>
                {BOOK.map((r) => (
                  <tr key={r.name} className="border-b border-line last:border-0">
                    <td className="px-4 py-3">{r.dir}</td>
                    <td className="px-4 py-3 font-medium">{r.name}</td>
                    <td className="px-4 py-3 tabular-nums">{r.weight}</td>
                    <td className="px-4 py-3 text-muted">{r.role}</td>
                    <td className="px-4 py-3 text-muted">{r.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-subtle">概念性組合，非買賣建議。權重沿用 8 月 25 日簡報，方向未改。</p>
        </section>

        <section id="loop" className="scroll-mt-24 border-t border-line py-16">
          <p className="text-sm tracking-wide text-teal-ink">附錄 · 架構</p>
          <h2 className="mt-2 font-display text-3xl">同一組層，走第二遍</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">
            網路上說 Astra 用了循環深度。下面三篇不是互搶的技術，是同一條軸的三層：能不能做、怎麼加得下去、值不值得做。讀完對主結論的影響只有一句：就算真的用了，也解釋不了嚴考那一跳。
          </p>
          <LoopDepth />
        </section>

        <section id="notes" className="scroll-mt-24 border-t border-line py-16">
          <h2 className="font-display text-3xl">來源與讀法</h2>
          <ul className="mt-6 max-w-3xl list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
            <li>8 月 25 日內部簡報〈AI 經濟循環與企業 ROI〉：一圖一公式、失效指標、價值捕捉三條、多空組合。</li>
            <li>OpenAI〈GPT-6 Astra〉發布頁、系統卡、Aidan Clark 記者會（Axios）。</li>
            <li>ARC Prize〈OpenAI's GPT-6 Astra on ARC-AGI-3〉與官方排行榜截圖（開場圖）。</li>
            <li>OpenAI〈How enabling two settings tripled our ARC-AGI-3 scores〉（Sol 的記憶實驗）。</li>
            <li>Jakub Pachocki 關於計算圖深度的公開說明；循環深度僅《The Information》單源。</li>
            <li>
              Huginn（Geiping et al., 2025）、DeepLoop（Li et al., 2026）、SMELT（ByteDance Seed, 2026）：潛空間迴圈三層對讀，見〈迴圈〉。
            </li>
            <li>EU AI Act 訓練內容公開摘要（文字超過 10T）。開源對照：Kimi K3、Qwen 3.8。</li>
            <li>成本為園區內部經濟假設，不是 OpenAI 財報。</li>
          </ul>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-subtle">
            標示「官方」者可引用；標示「推估」者請連同區間一起轉述，不要把中心值說成規格。作者對證券買賣不提供建議。
          </p>
        </section>
      </main>
      <footer className="border-t border-line py-8 text-center text-xs text-subtle">
        內部研究更新 · 相對 2026-08-25 認知稿 · 非買賣建議
      </footer>
    </div>
  );
}
