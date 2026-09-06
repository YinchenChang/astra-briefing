export type Evidence = "official" | "estimate" | "unconfirmed";

export const evidenceLabel: Record<Evidence, string> = {
  official: "官方",
  estimate: "推估",
  unconfirmed: "未證實",
};

export const NAV = [
  { id: "open", label: "開場" },
  { id: "delta", label: "有何不同" },
  { id: "frame", label: "框架" },
  { id: "score", label: "考試" },
  { id: "size", label: "規模" },
  { id: "invest", label: "含義" },
  { id: "loop", label: "迴圈" },
  { id: "notes", label: "來源" },
] as const;

export const EFFORTS = [
  { key: "none", label: "不思考", standard: 35.2, adapter: 96.7, cost: 49.8 },
  { key: "low", label: "低", standard: 17.5, adapter: 98.0, cost: 38.2 },
  { key: "medium", label: "中", standard: 38.6, adapter: 98.4, cost: 48.1 },
  { key: "high", label: "高", standard: 54.8, adapter: 99.9, cost: 40.7 },
  { key: "xhigh", label: "很高", standard: 59.3, adapter: 98.4, cost: 37.3 },
  { key: "max", label: "最長", standard: 62.7, adapter: 98.6, cost: 26.1 },
] as const;

export const MODEL_COMPARE = [
  { name: "GPT-5.5", price: "5 / 30", context: "1.05M", arc3: 0.4, note: "前代思考模型" },
  { name: "GPT-5.6 Sol", price: "4 / 20（促銷）", context: "1.05M", arc3: 7.8, note: "上一顆旗艦 · 嚴考" },
  { name: "Claude Opus 5", price: "約 5 / 25", context: "1M", arc3: 30.2, note: "對照組（High）· 嚴考" },
  { name: "GPT-6 Astra", price: "10 / 50", context: "1.05M", arc3: 62.7, note: "嚴考；Adapter 約 99%" },
] as const;

export const PUBLIC_GAMES = [
  { id: "S5I5", sol: 0, astra: 100 },
  { id: "SB26", sol: 0.2, astra: 100 },
  { id: "TR87", sol: 0.2, astra: 100 },
  { id: "FT09", sol: 87, astra: 100 },
  { id: "LP85", sol: 39, astra: 100 },
  { id: "CD82", sol: 4.8, astra: 83 },
  { id: "LS20", sol: 3.6, astra: 84 },
  { id: "G50T", sol: 0, astra: 0 },
] as const;

export const GPU_BUDGET = [
  {
    key: "pretrain",
    label: "從零預訓練",
    pct: 10,
    days: 10,
    cost: 92,
    flop: "4×10²⁵",
    plain: "把書讀完。很快，因為模型沒有想像中巨大。",
  },
  {
    key: "mid",
    label: "長上下文續訓",
    pct: 5,
    days: 5,
    cost: 46,
    flop: "1.5×10²⁵",
    plain: "練習讀很長的文件。",
  },
  {
    key: "synth",
    label: "前代模型當教師",
    pct: 8,
    days: 8,
    cost: 74,
    flop: "1×10²⁵",
    plain: "用 Sol 等前代模型出練習題與解答。",
  },
  {
    key: "sft",
    label: "格式與指令",
    pct: 3,
    days: 3,
    cost: 28,
    flop: "0.5×10²⁵",
    plain: "學會怎麼回答、怎麼用工具。",
  },
  {
    key: "rl-short",
    label: "短程推理訓練",
    pct: 18,
    days: 18,
    cost: 166,
    flop: "6×10²⁵",
    plain: "數學、程式這類對完答案就能打分數的題。",
  },
  {
    key: "rl-long",
    label: "長程任務訓練",
    pct: 35,
    days: 35,
    cost: 323,
    flop: "8×10²⁵",
    plain: "真正吃卡的地方：玩陌生遊戲、操作電腦、找漏洞。",
  },
  {
    key: "align",
    label: "對齊與價值",
    pct: 8,
    days: 8,
    cost: 74,
    flop: "2×10²⁵",
    plain: "練習什麼該做、什麼不該做。",
  },
  {
    key: "overhead",
    label: "重啟與評測開銷",
    pct: 11,
    days: 11,
    cost: 102,
    flop: "—",
    plain: "十萬張卡同步失敗、存檔、考試的稅。",
  },
] as const;

export const WALLS = [
  {
    title: "資訊牆",
    body: "官方吹 10 萬張 GPU，從不公布參數。若真是 10 兆參數，那會當標題。",
    cuts: "砍掉「10 兆參數」這種行銷數字",
  },
  {
    title: "服務牆",
    body: "要能線上賣、讀一百萬字上下文。開源旗艦都落在約 3 兆總參數、約 1,000 億每次醒來。",
    cuts: "active 大約 1,200–2,000 億",
  },
  {
    title: "資料牆",
    body: "高品質文字有限。書不夠，就不該雇更多人，而該讓同一個人把書讀很多遍。",
    cuts: "把 Chinchilla 的 20 倍反過來：active 往下壓，不是往上加",
  },
] as const;

export const BOARD_CALLS = [
  {
    key: "adapter",
    title: "頂端黃雲",
    kicker: "Provider Adapter",
    score: "≈ 97–99%",
    line: "99% 過了 80 分，但不是失效指標用的考法。",
    body: "OpenAI 自己的記憶與壓縮系統：思考可以留過下一回合。特製 harness 仍能把嚴考的 63 拉到 99。",
  },
  {
    key: "standard",
    title: "右側黃折線",
    kicker: "Standard Harness",
    score: "17.5 → 62.7%",
    line: "可比較的分數是 62.7%，還在 80 下面。",
    body: "每走一步就刪掉私有思考，只留便條。這才是 Semi-Private 可比較的分數。折線先掉再爬，是「低思考」那一格：半套錯誤理論寫進便條，比不寫更糟。",
  },
  {
    key: "line",
    title: "我們上次畫的線",
    kicker: "失效指標 02",
    score: "80 分",
    line: "超預期，尚未宣告突破。",
    body: "原圖沒畫這條。請對一下：折線頂點 62.7% 仍在 80 下面；雲團 99% 在上面，但考法不同。",
  },
] as const;

export const KILLS = [
  {
    key: "hard",
    n: "01",
    title: "不易驗證領域出現顯著回報",
    last: "臨床、實體實驗、投資等若出現顯著回報，代表有新技術且落地超預期。",
    now: "仍未看到可規模化的顯著回報。coding / math 以外的閉環沒有被這次成績改寫。",
    status: "未觸發",
    tone: "hold" as const,
  },
  {
    key: "arc",
    n: "02",
    title: "2026 年底前，ARC-AGI-3 Semi-Private ≥ 80",
    last: "有模型達到 80 分，代表 AI 技術有新突破。",
    now: "Astra 嚴考 62.7%：從個位數跳到六十，超預期，未過線。Adapter 99% 是另一種考法，不計入這條。",
    status: "超預期 · 未失效",
    tone: "watch" as const,
  },
  {
    key: "scale",
    n: "03",
    title: "可驗證領域大規模實現顯著回報",
    last: "若 coding、math 等大規模轉成企業利潤，代表 Harness 推廣超預期。",
    now: "可驗證任務上的能力繼續拉開。從任務效果到企業 EBIT，仍缺普遍證據。",
    status: "未觸發",
    tone: "hold" as const,
  },
] as const;

export const MARKERS = [
  { key: "sol", label: "Sol 最長", score: 7.8, tone: "mute" as const },
  { key: "opus", label: "Opus 5 高", score: 30.2, tone: "mute" as const },
  { key: "astra", label: "Astra 嚴考", score: 62.7, tone: "teal" as const },
  { key: "line", label: "失效線", score: 80, tone: "warn" as const },
  { key: "adapter", label: "Astra Adapter", score: 98.6, tone: "sand" as const },
] as const;

export const CHAIN = [
  {
    id: "consumer",
    label: "終端消費者",
    hop: "$(AI) 產品服務",
    closed: false,
    body: "下游。大規模為 AI 產品付費並形成回購，還沒發生。虛線停在這裡。",
  },
  {
    id: "firm",
    label: "企業 / 商家",
    hop: "模型與系統導入",
    closed: false,
    body: "有資料、能驗證、錯了可回滾的任務，ROI 較易轉正。其餘導入仍然困難。",
  },
  {
    id: "model",
    label: "模型 / 平台商",
    hop: "$ 模型採購 $",
    closed: true,
    body: "中游。API 與系統銷售在轉。這層需求高速成長，不代表下游已經閉環。",
  },
  {
    id: "infra",
    label: "基礎設施",
    hop: "$ 算力採購 $",
    closed: true,
    body: "中上游自己玩：GPU、HBM、網路、電力。資本與訂單在這裡轉得最快。",
  },
] as const;

export const THESES = [
  {
    key: "form",
    t: "能力形成",
    verdict: "強化",
    last: "AI 進步正由單純擴大預訓練，轉向後訓練、測試時運算與完整 Agent 系統。對企業而言，Agent 能力應理解為 Model × 企業資料 × Harness × Tools／Environment × Verifier × Governance 的聯合系統。只有知識充分、可低成本驗證、錯誤可逆且全載成本合理的任務，才較容易形成可靠閉環；目前以 coding、math、IT Ops 最明確，但 Harness 的泛化與規模化仍未確立。",
    now: "嚴考 63% 對 Adapter 99%，是 Harness 最乾淨的實證。部分 harness 正被長程訓練寫進權重，但缺口仍在，系統層還沒被取代。",
  },
  {
    key: "value",
    t: "價值穿透",
    verdict: "維持",
    last: "模型能力、Agent 用量與傑文斯數量效應，都不自動等於企業利潤。任務效果必須穿透流程、成本移除與價值捕捉，且其經濟性應以每個經驗證成功任務的全載成本衡量。目前從任務效果到企業 EBIT 與自由現金流，仍缺乏普遍證據。",
    now: "每任務更便宜、標價更高，仍不是企業 EBIT。不要被 99.9% 行銷帶跑；那是特製 harness 的分數。",
  },
  {
    key: "cap",
    t: "資本捕捉",
    verdict: "強化",
    last: "模型單位經濟為正不代表公司自由現金流為正。OpenAI 的風險主要來自消費補貼、資本承諾、融資需求與價值捕捉，而非 AI 必然無法獲利；若融資依賴持續，風險可能向高槓桿供應商傳導。核心保留是市場可能高估企業 P&L 穿透率及 OpenAI 的最終價值捕捉率。",
    now: "這次「最大訓練」不是蓋完就停，而是會一再出現的 GPU 帳單，而且跑在自己園區。NeoCloud 接到的是剩單。若嚴考 63% 和 Adapter 99% 的差距收太快，代表外掛能力被模型吃進去，OpenAI 能留下的價值可能比我們估的高，空頭要減碼。",
  },
] as const;

export const BOOK = [
  {
    dir: "Long",
    name: "NVIDIA（NVDA）",
    weight: "+7.5%",
    role: "推論運算與完整平台",
    after: "訓練仍是 Blackwell；自研推論晶片是中期雜音，維持低配",
  },
  {
    dir: "Long",
    name: "台積電 ADR（TSM）",
    weight: "+10%",
    role: "先進製程與先進封裝瓶頸",
    after: "先進封裝與產能仍是最乾淨的瓶頸",
  },
  {
    dir: "Long",
    name: "Micron（MU）",
    weight: "+10%",
    role: "HBM、Server DRAM 與 AI 儲存",
    after: "長程訓練吃記憶體，方向不變",
  },
  {
    dir: "Long",
    name: "Arista Networks（ANET）",
    weight: "+10%",
    role: "AI cluster 高速網路",
    after: "十萬張卡的叢集網路不是一次性需求",
  },
  {
    dir: "Long",
    name: "Vertiv（VRT）",
    weight: "+10%",
    role: "電力、散熱與液冷",
    after: "園區訓練把電力散熱的訂單寫得更實",
  },
  {
    dir: "Short",
    name: "Oracle（ORCL）",
    weight: "−12%",
    role: "RPO、資本支出與現金流錯配",
    after: "訓練單更實，盯的是現金轉換不是有沒有單",
  },
  {
    dir: "Short",
    name: "CoreWeave（CRWV）",
    weight: "−8%",
    role: "高槓桿 GPU cloud 與利息負擔",
    after: "旗艦訓練離開 NeoCloud",
  },
  {
    dir: "Short",
    name: "Nebius（NBIS）",
    weight: "−10%",
    role: "高估值、高資本投入 AI cloud",
    after: "同上，吃的是剩單",
  },
  {
    dir: "Short",
    name: "Applied Digital（APLD）",
    weight: "−10%",
    role: "資本密集資料中心與融資依賴",
    after: "融資鏈沒有因 Astra 變短",
  },
  {
    dir: "Short",
    name: "SoftBank（9984 JP）",
    weight: "−10%",
    role: "重壓 OpenAI",
    after: "OpenAI 與園區槓桿沒下降",
  },
] as const;

export const LOOP_PATHS = [
  {
    key: "token",
    t: "把思考寫成字",
    sub: "現在主流 · o1 / Sol / Astra 的 thinking",
    rows: [
      ["多出來的算力花在哪", "多生成中間字"],
      ["人看不看得到", "看得到"],
      ["服務記憶體", "句子變長，跟著膨脹"],
      ["延遲", "解碼步數變多"],
      ["要不要專門推理資料", "通常要"],
    ],
  },
  {
    key: "loop",
    t: "同一組層再跑一次",
    sub: "這三篇 · 潛空間迴圈",
    rows: [
      ["多出來的算力花在哪", "同一個詞，中間那組層再走一遍"],
      ["人看不看得到", "預設看不到"],
      ["服務記憶體", "每圈若各存一份，一樣會脹"],
      ["延遲", "單步變深，步數可以變少"],
      ["要不要專門推理資料", "Huginn 證明不必"],
    ],
  },
] as const;

export const LOOP_PAPERS = [
  {
    key: "huginn",
    who: "Huginn",
    when: "2025",
    role: "能不能做",
    claim: "推理不必寫成字。把模型切成頭、可重跑的中段、尾。同一組權重，圈數從 1 加到 32，簡單推理分數可以翻倍。",
    caveat: "3.5B 的學術實驗，沒把算力對齊。能跑 32 圈，是因為推論時願意多花錢。",
    punch: "作者自己的定位：這是第三條縮放軸——參數、資料、潛深度。跟把思考寫成字、把模型做大，都不互斥。",
  },
  {
    key: "deeploop",
    who: "DeepLoop",
    when: "2026.08",
    role: "怎麼加得下去",
    claim: "舊的殘差規則是為「每層一份參數」寫的。層綁在一起再走多圈，同一個更新被寫進去、讀出來各好幾次。不改初始化，圈數一加就炸。",
    caveat: "這不是新架構，是讓迴圈加得下去的處方。實驗規模是 GPT-2 級。",
    punch: "沒有它，Huginn 那種 32 圈在更大、更常見的設定裡會不穩。",
  },
  {
    key: "smelt",
    who: "SMELT",
    when: "2026.08",
    role: "值不值得做",
    claim: "以前迴圈論文常在「參數固定、算力偷偷變多」下比較。把算力、參數、服務記憶體三本帳釘死後：只 loop 中間一半、只走兩圈，仍然淨贏。",
    caveat: "第三、四圈會逼模型變瘦，帳反而不划算。同損失大約省 7–18% 訓練算力，不是 10 倍智能。",
    punch: "贏在代碼、長文、照著示範做；不是多背一點事實。第二次來不是覆寫，是把注意力從開頭的廢質量撥去真正的內容。",
  },
] as const;

export const LOOP_R = [
  { r: "1", t: "一圈", d: "沒人被重訪", tone: "muted" },
  { r: "2", t: "兩圈", d: "預算對齊後最好", tone: "teal" },
  { r: "3", t: "三圈", d: "模型被逼瘦", tone: "warn" },
  { r: "4", t: "四圈", d: "損失回升", tone: "warn" },
] as const;

export const LOOP_MIX = [
  {
    key: "arch",
    t: "同一筆錢，換更好的配方",
    d: "SMELT 與 Nanbeige 獨立得到：帳算平之後，兩圈最好。這會變成預訓練清單上的標準項，類似當年的分組查詢。省的是達到同一水準的算力，不是少買卡。",
  },
  {
    key: "rent",
    t: "推論時加錢，加圈",
    d: "Huginn 能跑到 32 圈，是允許這一步更貴。那是租算力換深度，跟「同一筆錢換架構」是兩種產品。把兩種數字混在一起講，就是這週最常見的錯。",
  },
] as const;

export const LOOP_HITS = [
  {
    key: "train",
    t: "訓練",
    d: "中間一半走兩圈、配混合專家，會變成明年預訓練的標準項。ByteDance 已在多條線推進，不是單篇實驗室結果。",
  },
  {
    key: "serve",
    t: "服務",
    d: "痛點是記憶體。誰先做到「多圈但不漲記憶體」，誰拿走部署權。現在軟體棧還落後論文。",
  },
  {
    key: "prod",
    t: "產品",
    d: "代碼、長文件、要照著示範做的任務最賺。短問短答聊天沒那麼大。小參數加深迴圈，是「少背、多想」。",
  },
  {
    key: "safety",
    t: "安全",
    d: "一部分推理移出可讀通道。這是本週唯一真正的衝擊。以後「推理模型」要同時報寫出來的字，和腦子裡跑了幾圈。",
  },
  {
    key: "hw",
    t: "硬體",
    d: "還是要很多算力。同一份權重被反覆讀，對記憶體頻寬比較友善。形狀改變，不是需求消失。",
  },
  {
    key: "price",
    t: "定價",
    d: "API 仍按字計價。圈數是供應商內部成本，公開價目表上看不到這條軸的租金。",
  },
] as const;

export const LOOP_HOLES = [
  "對齊的是算力，不是延遲。一步變深，服務批次會痛。",
  "對齊預算下第三圈不划算；「推論時加錢加圈」還沒有工業級縮放律。",
  "vLLM、llama.cpp 還不把迴圈架構當一等公民。",
  "跟「把思考寫成字」的聯合訓練，配方未公開。",
] as const;
