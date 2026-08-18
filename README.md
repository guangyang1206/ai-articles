# 🌿 烨然漫笔 · 个人内容仓库

> 域名 `yeranyang.cn` 绑定的内容仓库，涵盖 AI 深度文章与非 AI 分享。

由 **艾AI** 主理。追踪全球 AI 动态，产出有深度的原创解读；同时收录技术分享、音乐等内容。

---

## 📁 目录结构

```
yeranyang-cn/
├── CNAME                    # 域名 yeranyang.cn
├── index.html               # 站点首页（导航到各分区）
├── README.md                # 仓库总说明（本文件）
├── CONTENT_STANDARD.md      # 内容创作与交付规范（唯一真相源）
├── MEMORY.md                # 踩坑日志与历史经验（Agent 工作用）
├── BRAND_GUIDELINES.md      # （已归档）视觉规范，指向 CONTENT_STANDARD.md
├── articles/
│   └── ai/                  # ← AI 文章（23 篇）
│       ├── index.html       #   AI 分区首页（数据驱动）
│       ├── articles.json    #   文章元数据（JS 渲染用）
│       ├── README.md        #   AI 文章索引 + 写作规范
│       └── YYYY-MM-DD_slug/ #   每篇独立目录
├── share/                   # ← 非 AI 分享
│   ├── ylgl/                #   韵乐共流（完整版）
│   ├── ylgl-brief/          #   韵乐共流（精简版）
│   ├── xauat-2026/          #   西安建大校友分享 slides
│   ├── ai-enlightenment/    #   AI 启蒙 slides（双语科普）
│   └── workbuddy-intro/     #   WorkBuddy 产品介绍 slides
└── scripts/                 # 自动化工具
    ├── new-topic.sh         #   选题脚手架生成器
    └── update-index.sh      #   索引更新脚本
```

---

## 📡 AI 文章列表（23 篇）

| # | 日期 | 标题 | 状态 |
|---|------|------|------|
| 1 | 2026-08-14 | [谷歌AI危机延烧：布林重回一线，Gemini 3.5 Pro被曝取消](./articles/ai/2026-08-14_google-gemini-crisis/) | 📝 待发布 |
| 2 | 2026-08-07 | [谷歌AI一日双震：哈萨比斯转任董事长，Jeff Dean 27年后离职创业](./articles/ai/2026-08-07_google-deepmind-shakeup/) | 📝 待发布 |
| 3 | 2026-08-04 | [阿里 Qwen3.8 发布：16 天，265 次提交，全程无人值守](./articles/ai/2026-08-04_alibaba-qwen3.8/) | 📝 待发布 |
| 4 | 2026-08-01 | [AI 正在学会处理需要好几天才能完成的任务](./articles/ai/2026-08-01_ai-long-horizon/) | 📝 待发布 |
| 5 | 2026-08-01 | [7000 亿美元的账单：科技巨头 AI 投入到底花在哪了](./articles/ai/2026-08-01_ai-capex-bill/) | 📝 待发布 |
| 6 | 2026-07-20 | [WAIC 散场了，真正的问题才开始](./articles/ai/2026-07-20_waic-2026-aftermath/) | ✅ 已发布 |
| 7 | 2026-06-10 | [Claude Fable 5 贴图素材](./articles/ai/2026-06-10_claude-fable5/) | 素材 |
| 8 | 2026-06-07 | [AI军备竞赛到底有多烧钱？——800亿美元能建什么？](./articles/ai/2026-06-07_ai-infra-cost/) | ✅ 已发布 |
| 9 | 2026-06-07 | [AI安全：科学家们坐不住了——解读《IDAIS伦敦宣言》](./articles/ai/2026-06-07_ai-safety-london-declaration/) | 📝 待发布 |
| 10 | 2026-06-07 | [Anthropic 要 IPO 了：AI公司的「成人礼」](./articles/ai/2026-06-07_anthropic-ipo/) | 📝 待发布 |
| 11 | 2026-06-07 | [苹果 WWDC 2026：Siri 的「救赎之战」](./articles/ai/2026-06-07_apple-wwdc-siri/) | 📝 待发布 |
| 12 | 2026-06-07 | [英伟达造CPU了：RTX Spark 意味着什么？](./articles/ai/2026-06-07_nvidia-rtx-spark/) | 📝 待发布 |
| 13 | 2026-06-07 | [阿里千问开放第三方Agent，微信AI同日开放开发者接入](./articles/ai/2026-06-07_alibaba-qwen-agent/) | ✅ 已发布 |
| 14 | 2026-05-26 | [AI 时代，互联网增长公式正在失效](./articles/ai/2026-05-26_ai-internet-rules-fail/) | 📝 待发布 |
| 15 | 2026-05-23 | [5月IPO三国杀：SpaceX带着22万张GPU入场](./articles/ai/2026-05-23_ai-ipo-era/) | ✅ 已发布 |
| 16 | 2026-05-23 | [AI 和数学家一起，解开了一道 80 年的数学谜题](./articles/ai/2026-05-23_ai-math-proof/) | ✅ 已发布 |
| 17 | 2026-05-21 | [DeepSeek 战略转向：从「不融资」到「融对资」](./articles/ai/2026-05-21_deepseek-harness-funding/) | ✅ 已发布 |
| 18 | 2026-05-18 | [DeepSeek 融资拆解：500亿背后的战略棋局](./articles/ai/2026-05-18_deepseek-funding/) | ✅ 已发布 |
| 19 | 2026-05-17 | [Anthropic 估值 $9000 亿超越 OpenAI](./articles/ai/2026-05-17_anthropic-900b-valuation/) | ✅ 已发布 |
| 20 | 2026-05-17 | [AI 编码 Agent 终端战争](./articles/ai/2026-05-17_ai-coding-agent-war/) | ✅ 已发布 |
| 21 | 2026-05-03 | [部署静态网站踩坑实录](./articles/ai/2026-05-03_deploy-static-site-lessons/) | ✅ 已发布 |
| 22 | 2026-04-29 | [ChatGPT 开始投放广告了](./articles/ai/2026-04-29_chatgpt-ads-breakdown/) | ✅ 已发布 |
| 23 | 2026-04-24 | [DeepSeek V4 深度解读](./articles/ai/2026-04-24_deepseek-v4-deep-dive/) | ✅ 已发布 |

---

## 🎨 非 AI 分享（share/）

| 目录 | 说明 |
|------|------|
| `ylgl/` | 韵乐共流（完整版） |
| `ylgl-brief/` | 韵乐共流（精简版） |
| `xauat-2026/` | 西安建大校友分享 slides（当人工智能开始涌现，人往何处） |
| `ai-enlightenment/` | AI 启蒙 slides（面向非技术观众的中英双语科普） |
| `workbuddy-intro/` | WorkBuddy 产品介绍 slides（12 页中文版） |

---

## ✍️ 命名规范

| 元素 | 规则 | 示例 |
|------|------|------|
| 日期 | `YYYY-MM-DD` 创作日期 | `2026-04-24` |
| slug | 英文 kebab-case，2-5 个词 | `deepseek-v4-deep-dive` |
| 组合 | `日期_slug` 下划线连接 | `2026-04-24_deepseek-v4-deep-dive` |

> ⚠️ 统一使用 `YYYY-MM-DD`（四位年份），不使用 `YY-MM-DD`。

---

## 🔧 写作工作流

### 新建选题

```bash
./scripts/new-topic.sh "选题标题" [slug]
```

自动在 `articles/ai/` 下生成 `YYYY-MM-DD_slug/` 目录及模板文件。

### 发布流程

```
选题确定 → 脚手架生成 → 撰写正文 → 三轮审核定稿（review-log.md）
  → 生成素材（cover/poster/illustrations）→ git commit → 粘贴公众号编辑器 → 发布
  → 更新 README 状态 → 部署
```

> 📐 **内容创作与交付规范**：所有写作、排版、审核、交付、发布规范，统一见 **[`CONTENT_STANDARD.md`](./CONTENT_STANDARD.md)**（唯一真相源）。
>
> 🔍 **三轮审核规范**：文章发布前须通过至少三轮审核且连续无事实/数据错误方可定稿，见 [`CONTENT_STANDARD.md`](./CONTENT_STANDARD.md) §9。
>
> 🤖 **智能体协作**：面向智能体的可执行规范已沉淀为 skill `ai-article-standard`，可直接调用。

---

## 🌐 部署

- **站点**：`yeranyang.cn`（GitHub Pages，绑定 `main` 分支，push 即自动部署）

---

## 📚 数据来源规范

- 所有数据必须有明确来源，引用需标明出处
- 数据交叉核实后再使用，严禁编造数据
- 详见 [`CONTENT_STANDARD.md`](./CONTENT_STANDARD.md) §2「数据口径铁律」与 §12「术语与数据口径表」

---

## 🔗 链接

- 公众号：烨然漫笔
- 作者：艾AI

---
*首次初始化：2026-04-24 · 最近更新：2026-08-17（结构重构 + 文档同步规范）*
