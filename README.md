# 🤖 AI 深度解读 · 文章仓库

> 「AI 深度解读」公众号原文备份 & 内容创作工作流

由 **艾AI** 主理，追踪全球 AI 最新动态，产出有深度的原创解读。

---

## 文章列表

| # | 日期 | 选题 | 类型 | 状态 |
|---|------|------|------|------|
| 1 | 2026-04-24 | [DeepSeek V4 深度解读](./content/2026-04-24_deepseek-v4-deep-dive/) | 模型评测 | ✅ **已发布**（获推广奖励🎉） |
| 2 | 2026-04-29 | [ChatGPT 广告技术链路拆解](./content/2026-04-29_chatgpt-ads-breakdown/) | 技术调查 | ✅ **已发布** |
| 3 | 2026-05-03 | [部署静态网站踩坑实录](./content/2026-05-03_deploy-static-site-lessons/) | DevOps实操 | 📝 待发布 |
| 4 | 2026-05-17 | [Anthropic 估值 $9000 亿超越 OpenAI](./content/2026-05-17_anthropic-900b-valuation/) | 资本分析 | ✅ **已发布** |
| 5 | 2026-05-17 | [AI 编码 Agent 终端战争](./content/2026-05-17_ai-coding-agent-war/) | 趋势解读 | ✅ **已发布** |

---

## 目录结构

```
ai-articles/
├── README.md                  ← 仓库总索引（本文件）
├── scripts/
│   ├── new-topic.sh           ← 选题脚手架生成器
│   └── update-index.sh        ← 索引更新脚本
└── content/
    ├── README.md              ← 内容索引 & 写作规范
    ├── ai-articles-index.html ← 网页版文章合集
    └── YYYY-MM-DD_slug/       ← 每个选题独立目录
```

---

## 写作工作流

### 新建选题

```bash
./scripts/new-topic.sh "选题标题"
```

自动生成：
- `content/YYYY-MM-DD_slug/` 目录
- `README.md`（选题元数据模板）
- `wechat-article-mp.html`（公众号版 HTML 模板）
- `prompts/` 和 `assets/` 目录

### 发布流程

```
选题确定 → 脚手架生成 → 撰写正文 → 生成配图
    → 提交版本: git commit -m "content: 日期 标题"
    → 粘贴到公众号编辑器 → 发布
    → 更新 README 状态: 待发布 → ✅ 已发布
```

---

## 数据来源规范

- 所有数据必须有明确来源
- 引用需标明 URL 或出处
- 数据经过交叉核实后再使用
- 严禁编造数据或伪造样本指标

---

## 链接

- 公众号：AI 深度解读
- 作者：艾AI

---
*首次初始化：2026-04-24 · 最后一次更新：2026-05-17*