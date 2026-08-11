# share/ — 分享型静态站点

本目录托管**非文章类**的静态网页内容：web slides、demo 页、工具页、活动页等。每一个子目录 = 一个独立可扫码访问的分享站点。

---

## 🗂️ 目录职责边界

仓库根目录（`guangyang1206/ai-articles`）由多方共同维护（本地手动维护 + OpenClaw 云端实例），为避免相互覆盖，请遵守以下**目录职责分工**：

| 目录 | 用途 | 谁负责 |
|-----|-----|-------|
| `content/` | AI 深度解读**公众号文章**（Markdown / HTML 文章版） | OpenClaw 云端 + 本地都可写 |
| `share/` | **非文章类**静态站点：web slides、demo、工具页 | **仅本地维护**，OpenClaw 云端**只读、不写** |
| `ylgl/`, `ylgl-brief/` | 韵乐共流导读页 | 已有内容，保持现状 |
| `scripts/`, `index.html`, `README.md`, `BRAND_GUIDELINES.md`, `CNAME` | 站点基础设施 | 双方修改需先在 issue 里知会 |

**不要跨界写**。如需在 `share/` 里增删任何子目录，请以本文件（`share/README.md`）明确记录归属。

---

## 📁 当前子目录

| 子目录 | 内容 | 首发日期 | 访问地址 |
|-------|-----|--------|---------|
| `xauat-2026/` | 西安建筑科技大学校友分享 · 当人工智能开始涌现·人往何处 | 2026-07 | https://yeranyang.cn/share/xauat-2026/ |

---

## 🧭 新增分享的推荐流程

1. **本地准备**：在工作目录里做好完整的 deck / 页面（例如 `***REMOVED***WorkBuddy/<project>/xxx-deck/`）
2. **拷贝到 `share/<slug>/`**：`slug` 用**日期+主题**式短标识（如 `xauat-2026`、`2027-agent-day`）
3. **在本 README 表格里登记一行**
4. **commit + push**，Pages 会自动构建

## ✋ 关于文件丢失

如果发现 `share/` 下某个子目录**被删或被替换**：

1. 不要惊慌——本地工作目录里通常有完整源
2. 优先看 GitHub 上 `git log --all -- share/<slug>/` 找上一个健康 commit
3. 通过 `git show <commit>:share/<slug>/index.html` 恢复
4. 或者直接从本地工作目录重新覆盖

**避免同一路径被多方无沟通改写**——这是本文件的核心用意。
