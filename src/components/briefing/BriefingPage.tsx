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
          <p className="text-sm tracking-[0.18em] text-teal-ink">相對 2026.08.25 的更新</p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.15] text-ink sm:text-5xl">
            失效線還沒過。
            <span className="mt-2 block text-teal-ink">嚴格版本已到 62.7%，比 8 月快一截。</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            8 月 25 日我們把 ARC-AGI-3 Semi-Private 80 分訂成技術突破的失效線。Astra 嚴格版本 62.7%，還沒過；OpenAI
            自己的 Adapter 約 99%。比我當時預期的快，但指標 02 不能算觸發。
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
          <p className="text-sm tracking-wide text-teal-ink">相對 8 月 25 日</p>
          <h2 className="mt-2 font-display text-3xl">哪些要改，哪些我維持</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                n: "修正",
                t: "嚴格版本從個位數到 63%",
                d: "Sol 最長 7.8%，Astra 最長 62.7%。把規則寫進便條的能力，比我 8 月估的快。",
              },
              {
                n: "維持",
                t: "80 分這條線我仍用",
                d: "嚴格版本沒過 80。Adapter 99% 是另一套規則，不能拿來宣告指標 02 已觸發。",
              },
              {
                n: "補充",
                t: "分數差很大程度在 harness",
                d: "同一顆 Astra：嚴格版本 63%，特製 harness 約 99%。價值捕捉那三條，並沒有被 99% 推翻。",
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
          <p className="text-sm tracking-wide text-teal-ink">8 月 25 日框架</p>
          <h2 className="mt-2 font-display text-3xl">8 月那套判斷結構還能用</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">
            下面把上次簡報的圖和公式併進來。Astra 改的是指標 02 的讀數，這套結構我沒改。
          </p>
          <div className="mt-10">
            <LoopMap />
          </div>
          <div className="mt-14">
            <RoiFormula />
          </div>
          <div className="mt-14 space-y-5">
            <h3 className="font-display text-xl text-ink">市場仍可能高估 OpenAI 的價值捕捉</h3>
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
          <h2 className="mt-2 font-display text-3xl">ARC-AGI-3 在考什麼</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">
            ARC-AGI-3 不給說明書。人類冷啟動過得去，模型在今年初幾乎是零。兩種分數先分開看。
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <article className="rounded-xl bg-surface p-6 shadow-card">
              <p className="text-xs tracking-wide text-teal-ink">規則</p>
              <h3 className="mt-2 font-display text-xl">99% 跟 63% 不能直接比</h3>
              <p className="mt-3 leading-relaxed text-muted">
                嚴格版本裡，每步刪掉私有思考，只留便條。Adapter 把思考留過下一回合。失效指標對的是前者。
              </p>
            </article>
            <article className="rounded-xl bg-surface p-6 shadow-card">
              <p className="text-xs tracking-wide text-teal-ink">定價</p>
              <h3 className="mt-2 font-display text-xl">標價對齊旗艦，推不出體積</h3>
              <p className="mt-3 leading-relaxed text-muted">
                Astra 賣 $10 / $50，對齊 Claude 旗艦，是 Sol 原價的兩倍。這比較像產品線卡位，我不會用它反推模型大了
                2.5 倍。
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
                  <th className="px-4 py-3 font-medium">嚴格版本分數</th>
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
          <p className="mt-3 text-xs text-subtle">嚴格版本分數為 ARC-AGI-3 Standard Harness 半私有集。</p>
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
            <h3 className="font-display text-2xl">主因我認為是便條上的世界模型</h3>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted">
              Sol 不是不會想。官方把記憶打開，公開集從 13% 升到 38%。嚴格版本下，這條通道被關掉，只剩便條。Astra
              連「不思考」都有 35%，已經高過 Sol 拼盡全力的 8%。
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  t: "主因",
                  d: "現場發明一套簡譜，把物件、座標、規則和未完成計畫記在便條上。寫得夠密，下一步才接得住。",
                },
                {
                  t: "次因",
                  d: "從零預訓練的先驗比較強。不開長思考，單步定向就超過舊旗艦。",
                },
                {
                  t: "放大",
                  d: "計分用平方懲罰冤枉路。世界模型一對，步數下來，分數和成本會一起改善。",
                },
              ].map((c) => (
                <article key={c.t} className="rounded-xl bg-surface p-6 shadow-card">
                  <h4 className="font-display text-lg">{c.t}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{c.d}</p>
                </article>
              ))}
            </div>
            <PullQuote className="mt-10" by="François Chollet" role="ARC Prize">
              這種符號建模，以前只在精巧的外掛系統裡見過。現在 harness 的能力正在進到模型本身。
            </PullQuote>
            <div className="mt-6">
              <Verdict kicker="這段的判斷">
                嚴格版本從 8% 到 63%，我歸給便條上的世界模型，參數變大解釋不了這一截。就算有淺層循環深度，也一樣。
              </Verdict>
            </div>
            <p className="mt-4 text-sm text-subtle">
              社群在傳 Astra 用了循環深度。來源可信，官方沒承認。Pachocki 只保證計算圖深度仍在 GPT-4
              的兩倍內。若屬實，比較可能墊高「不思考」那一檔，撐不起嚴格版本的上限。
              <a href="#loop" className="ml-1 text-teal-ink underline-offset-2 hover:underline">
                三篇論文的對讀在後面
              </a>
            </p>
          </div>
        </section>

        <section id="size" className="scroll-mt-24 border-t border-line py-16">
          <p className="text-sm tracking-wide text-teal-ink">規模</p>
          <h2 className="mt-2 font-display text-3xl">大概多大，十萬張卡花在哪</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">
            總參數是掛名的專家人數；每次呼叫真正用到的（active）才決定服務成本。2026
            年能線上賣的旗艦，多數專家都是睡著的。
          </p>
          <div className="mt-10">
            <ParamWalls />
          </div>
          <div className="mt-16">
            <h3 className="font-display text-2xl">十萬張卡，大部分沒花在預訓練</h3>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted">
              Aidan Clark 說這是史上最大訓練。用我們估的尺寸去算，語料讀完只要數天。剩下的時間，比較像讓模型在陌生環境裡做長程實習。
            </p>
            <div className="mt-10">
              <GpuPlay />
            </div>
          </div>
        </section>

        <section id="invest" className="scroll-mt-24 border-t border-line py-16">
          <p className="text-sm tracking-wide text-teal-ink">含義</p>
          <h2 className="mt-2 font-display text-3xl">三條認知，以及概念性組合</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">
            我仍認為市場高估 OpenAI 的價值捕捉。Astra 把機制寫得更清楚，沒有把這條推翻。以下不是買賣建議。
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
          <h2 className="mt-2 font-display text-3xl">循環深度跟這次分數有沒有關係</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">
            社群在傳 Astra 用了 recurrent depth。下面三篇處理的是同一條問題的不同層：能不能做、怎麼加得穩、值不值得做。讀完以後，我對主結論的修正只有一句：就算真的用了，也解釋不了嚴格版本那一跳。
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
            標「官方」的可以直接引用。標「推估」的請連同區間一起講，中心值不是規格。這裡不構成證券買賣建議。
          </p>
        </section>
      </main>
      <footer className="border-t border-line py-8 text-center text-xs text-subtle">
        {import.meta.env.VITE_OFFLINE ? (
          "內部研究更新 · 離線版 · 相對 2026-08-25 認知稿 · 非買賣建議"
        ) : (
          <>
            內部研究更新 · 相對 2026-08-25 認知稿 · 非買賣建議
            {" · "}
            <a
              href="/Astra-briefing-offline.html"
              download="Astra-briefing-offline.html"
              className="text-teal-ink underline-offset-2 hover:underline"
            >
              下載離線版
            </a>
          </>
        )}
      </footer>
    </div>
  );
}
