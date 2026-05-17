# 📂 内容仓库（Content Repository）

> 所有公众号文章 & 社媒分享的源文件统一管理

## 目录规范

```
ai-articles/
├── README.md              # 仓库总 README（文章清单 + 使用说明）
├── .gitignore
├── scripts/               # 自动化工具
│   ├── new-topic.sh       # 选题脚手架生成器
│   └── update-index.sh    # 索引更新脚本
└── content/               # 所有选题归档在这里
    ├── README.md          # 本文件（索引 + 规范）
    ├── ai-articles-index.html  # 网页版文章合集
    └── YYYY-MM-DD_slug/        # 每个选题独立目录
        ├── README.md           # 选题元数据 & 发布追踪
        ├── wechat-article-mp.html  # 公众号专用版（内联样式，复制粘贴）
        ├── article-full.html       # 个人网站全文版（深色科技风）
        ├── share-cards.html        # 贴图分享卡片社媒分享
        ├── cover-assets.html       # 公众号封面/缩略图素材
        ├── prompts/                # AI 生图 prompt（如有）
        └── assets/                 # 参考资料、图片素材
```

## 命名规则

| 元素 | 规则 | 示例 |
|------|------|------|
| 日期 | `YYYY-MM-DD` 创作日期 | `2026-04-24` |
| slug | 英文 kebab-case，2-5 个词 | `deepseek-v4-deep-dive` |
| 组合 | `日期_slug` 下划线连接 | `2026-04-24_deepseek-v4-deep-dive` |

## 文件职责

| 文件 | 用途 | 使用方式 |
|------|------|----------|
| `README.md` | 选题元数据 & 发布追踪 | 每次发布后更新状态 |
| `wechat-article-mp.html` | 微信公众号正文 | 浏览器打开 → Ctrl+A → 粘贴到编辑器 |
| `article-full.html` | 个人网站全文版 | 部署到个人网站 |
| `share-cards.html` | 贴图分享卡片 | 浏览器打开 → 逐张截图 |
| `cover-assets.html` | 公众号封面/缩略图 | 浏览器打开 → 截图对应尺寸 |
| `prompts/` | AI 生图的 prompt 文本 | 备份用，方便复用和微调 |

## 发文流程

```bash
# 1. 新选题：生成脚手架
./scripts/new-topic.sh "标题" [slug]

# 2. 撰写文章：编辑 wechat-article-mp.html
#    （浏览器预览 → 全选复制 → 粘贴到公众号编辑器）

# 3. 补充素材：生成封面图、分享图
#    （如需 AI 生图，prompt 存入 prompts/）

# 4. 提交版本
git add content/YYYY-MM-DD_slug/
git commit -m "content: YYYY-MM-DD 选题标题"
git push

# 5. 发布后在 README.md 中更新状态
```

## 已有选题

| # | 日期 | 选题 | 类型 | 状态 |
|---|------|------|------|------|
| 1 | 2026-04-24 | [DeepSeek V4 深度解读](./2026-04-24_deepseek-v4-deep-dive/) | 模型评测 | ✅ 已发布（获推广奖励🎉） |
| 2 | 2026-04-29 | [ChatGPT 广告技术链路拆解](./2026-04-29_chatgpt-ads-breakdown/) | 技术调查 | 📝 待发布 |
| 3 | 2026-05-03 | [部署静态网站踩坑实录](./2026-05-03_deploy-static-site-lessons/) | DevOps实操 | 📝 待发布 |
| 4 | 2026-05-17 | [Anthropic 估值 $9000 亿超越 OpenAI](./2026-05-17_anthropic-900b-valuation/) | 资本分析 | 📝 待发布 |
| 5 | 2026-05-17 | [AI 编码 Agent 终端战争](./2026-05-17_ai-coding-agent-war/) | 趋势解读 | 📝 待发布 |

## 文章写作风格规范

### 封面区
- 背景色：`#111111`
- 标题色：白色 `#ffffff`，强调词用 `#10b981` 绿色
- 标签：`#888888` 灰色，带边框
- 署名：文 / 艾AI

### 内容正文
- 字号：正文 15px，行高 1.85
- 色调：白底 `#ffffff`，文字 `#333333`
- 目录导航：绿色标签按钮，用 table 布局
- 高亮块：圆角边框底，带边框颜色
- 表格：表头深色，交替行背景

### 关键约束
- 所有样式使用纯内联（兼容微信编辑器）
- 不使用 CSS Grid/Flex/linear-gradient
- 不使用 `-webkit-background-clip:text`
- 所有文字颜色在白底和深色底上都清晰可读
- 颜色只用 HEX，不用 rgba()

## 文章目录对照

| 编号 | 目录 |
|------|------|
| #1 | `content/2026-04-24_deepseek-v4-deep-dive/` |
| #2 | `content/2026-04-29_chatgpt-ads-breakdown/` |
| #3 | `content/2026-05-03_deploy-static-site-lessons/` |
| #4 | `content/2026-05-17_anthropic-900b-valuation/` |
| #5 | `content/2026-05-17_ai-coding-agent-war/` |