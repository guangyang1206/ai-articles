# AI Enlightenment · 从零理解 AI

**面向非技术观众的双语（EN / 中）AI 科普 slides。**

🌐 在线访问：<https://yeranyang.cn/share/ai-enlightenment/>

## 📖 内容概览

16 页 slide，从"什么是 AI"到"如何开始"的完整入门路径：

```
Cover → What is AI → History (10 nodes) → LLM → Prompt → RAG → KB →
MCP → Skills → Agent → Harness → Practice → How to Start → Myths →
Summary → Ending
```

## 🕰️ 版本历史

- **2025 · 首发** —— 内容首次发布，作为 AI 通识材料在内部使用
- **2026-08-11 · v2 更新**（迁到 `share/ai-enlightenment/`）
  - 修翻译错误："Knot 平台" → 通用表述（Coze / Dify / 元宝 / WorkBuddy 等）
  - History 页时间线从 6 节点扩到 10：补 1974 第一次寒冬 · 1987 第二次寒冬 · 2012 AlexNet · 2017 Transformer
  - 删除 P11 "Open Claw" 品牌页（17 页 → 16 页）
  - Harness 页三阶段标签："Early 2025 / Mid-Late 2025 / 2026" → "Layer 1 / 2 / 3"（层次叠加而非时间前后）
  - Myths 页第 3 条精确锚定："透明 + 责任"
  - Myths 页第 2 条（幻觉）从一行扩为一段，说明幻觉是机制、无法根治
  - LLM 页模型列表补齐国内代表（DeepSeek、通义、豆包、混元、Kimi）+ 海外代表
  - Summary 表格删除 Open Claw 行

## 🎯 使用场景

- 公司内部 AI 通识培训
- 面向大学生 / 亲友的 AI 科普
- 作为其他更深入 deck 的"预习材料"

## 🛠️ 本地开发

纯静态站点，直接开 `index.html` 就能看：

```bash
python3 -m http.server 8000
# 打开 http://localhost:8000/
```

- `index.html` · 全部 slide DOM 结构
- `styles.css` · 视觉样式（含 hand-draw / fade-up 动画）
- `script.js` · 键盘导航 + 语言切换 + slide 动画
- `i18n.js` · EN / 中双语词条

## 📝 未来可选的改进方向

- 在 P4（LLM）底部加个可展开小卡片，讲"为什么会幻觉"（机制层面）
- History 时间线可以变成可点击的，点开每个节点展开一段简介
- 加个 QR 码浮标到 P1 和 P16（照 xauat-2026 的模式）
