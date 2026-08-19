# Skills

本目录存放面向智能体（Agent）的可复用技能包，规划为未来独立开源。每个 skill 一个子目录，核心是 `SKILL.md`（frontmatter + 可执行步骤）。

## 目录

| Skill | 状态 | 说明 |
|---|---|---|
| [`git-history-sanitize/`](./git-history-sanitize/) | ✅ 开源就绪 | 从 git 历史**彻底**抹除敏感信息（凭证/内部域名/PII/服务器 IP），用 `git filter-repo` 重写历史 + force push |
| `ai-article-standard/` | ⏳ 待同步 | 内容创作与交付规范的可执行 skill（对应根目录 `CONTENT_STANDARD.md`）。实体在云端实例环境，待同步后并入 |

## 与仓库其他文档的关系

- `git-history-sanitize`：通用工具，与本仓库文章内容无关。是 `pre-opensource-sanitization-audit`（只扫描审计）的**修复动作**补充。
- `ai-article-standard`：本仓库 `CONTENT_STANDARD.md`（577 行唯一真相源）的**可执行封装**，内容同源。落地前以 `CONTENT_STANDARD.md` 为准。

## 开源前待办

- [ ] 确定开源许可证（MIT / Apache-2.0 等），为每个 skill 补 `LICENSE`
- [ ] `ai-article-standard` 实体从云端同步后，按 `pre-opensource-sanitization-audit` 走一遍脱敏审查
- [ ] 补齐各 skill 的 `references/` 子目录（如有）与示例
