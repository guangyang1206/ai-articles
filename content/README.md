# 📂 内容仓库（Content Repository）

> 所有公众号文章 & 社媒分享的源文件统一管理

## 命名规范

```
content/
├── YYYY-MM-DD_slug/          # 日期_英文短标题（kebab-case）
│   ├── README.md             # 选题说明（标题、摘要、发布状态、平台链接）
│   ├── wechat-article-mp.html    # 公众号专用版（内联样式，复制粘贴可用）
│   ├── article-full.html         # 网站全文版（深色科技风）
│   ├── share-cards.html          # 贴图分享卡片（社媒图片分享）
│   ├── cover-assets.html         # 封面素材（截图用）
│   ├── prompts/                  # AI 生图 prompt（如有）
│   └── assets/                   # 参考资料、图片素材
└── ...
```

## 命名规则

| 元素 | 规则 | 示例 |
|------|------|------|
| 日期 | `YYYY-MM-DD` 创作日期 | `2026-04-24` |
| slug | 英文 kebab-case，3-5 个词 | `deepseek-v4-deep-dive` |
| 组合 | `日期_slug` 下划线连接 | `2026-04-24_deepseek-v4-deep-dive` |

## 文件职责

| 文件 | 用途 | 使用方式 |
|------|------|----------|
| `README.md` | 选题元数据 & 发布追踪 | 每次发布后更新状态 |
| `wechat-article-mp.html` | 微信公众号正文 | 浏览器打开 → Ctrl+A → 粘贴到编辑器 |
| `article-full.html` | 个人网站版本 | 部署到 yeranyang.com |
| `share-cards.html` | 贴图分享 | 浏览器打开 → 逐张截图 |
| `cover-assets.html` | 公众号封面/缩略图 | 浏览器打开 → 截图对应尺寸 |
| `prompts/` | AI 生图的 prompt 文本 | 备份用，方便复用和微调 |

## 已有选题

| # | 日期 | 选题 | 状态 |
|---|------|------|------|
| 1 | 2026-04-24 | [DeepSeek V4 深度解读](./2026-04-24_deepseek-v4-deep-dive/) | ✅ 已发布（获推广奖励） |
| 2 | 2026-04-29 | [ChatGPT 广告技术链路拆解](./2026-04-29_chatgpt-ads-breakdown/) | 📝 待发布 |

## Git 工作流

```bash
# 新建选题
mkdir content/YYYY-MM-DD_slug
# 创作完成后
git add content/YYYY-MM-DD_slug/
git commit -m "content: YYYY-MM-DD 选题标题"
git push
```

## 设计规范

- **公众号版**：白底 + 内联样式 + table 布局（兼容微信编辑器）
- **网站版**：深色科技风（#0a0a0a 背景）
- **贴图卡片**：Vercel/Linear 极简风（黑白灰 + #10b981 绿色点缀）
- **零版权风险**：不使用第三方品牌设计元素
