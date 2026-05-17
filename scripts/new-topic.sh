#!/bin/bash
# ============================================================
# 公众号选题脚手架生成器
# 使用: ./scripts/new-topic.sh "选题标题" [slug] [专题]
# 示例: ./scripts/new-topic.sh "GPT-5.4 发布深度解读" "gpt-5-4-deep-dive"
# ============================================================

set -euo pipefail

# 配置
CONTENT_DIR="content"
DATE=$(date +%Y-%m-%d)

# 参数
TITLE="${1:?错误: 请提供选题标题}"
SLUG="${2:-$(echo "$TITLE" | sed 's/[^a-zA-Z0-9\u4e00-\u9fa5]/-/g' | tr '[:upper:]' '[:lower:]' | sed 's/-\+/-/g;s/^-//;s/-$//' | tr -d '[:space:]')}"
TOPIC="${3:-AI}"  # 默认专题：AI

# 生成英文 slug（去除中文）
SLUG_EN=$(echo "$SLUG" | sed 's/[^a-zA-Z0-9-]//g')
if [ -z "$SLUG_EN" ]; then
  # 如果全中文，用日期戳
  SLUG_EN="ai-$(date +%s)"
fi

DIR_NAME="${DATE}_${SLUG_EN}"
DIR_PATH="${CONTENT_DIR}/${DIR_NAME}"

# 检查是否已存在
if [ -d "$DIR_PATH" ]; then
  echo "⚠️  选题目录已存在: ${DIR_PATH}"
  echo "正在检查已有文件..."
else
  mkdir -p "$DIR_PATH"
  echo "✅ 创建目录: ${DIR_PATH}"
fi

# ====== README.md ======
if [ ! -f "${DIR_PATH}/README.md" ]; then
  cat > "${DIR_PATH}/README.md" << README
# ${TITLE}

## 选题信息

- **选题日期**：${DATE}
- **类型**：深度解读 / 热点分析
- **专题**：${TOPIC}
- **关键词**：
- **目标受众**：AI 创业者 / 算法工程师 / 科技投资人 / 产品经理

## 选题理由

1.
2.
3.

## 核心信息

-
-
-

## 信息来源

-
-

## 文件清单

| 文件 | 说明 | 状态 |
|------|------|------|
| README.md | 选题元数据 | ✅ |
| wechat-article-mp.html | 公众号专用版 | 🔲 |
| article-full.html | 网站全文版 | 🔲 |
| share-cards.html | 贴图分享卡片 | 🔲 |
| cover-assets.html | 封面素材 | 🔲 |
| prompts/ | AI 生图 prompt | 🔲 |

## 发布记录

| 日期 | 平台 | 状态 |
|------|------|------|
| ${DATE} | 微信公众号 | 🔲 待发布 |
| - | 个人网站 | 🔲 |
| - | 小红书 | 🔲 |

## 互动回复

> 预留：发布后精选留言 + 回复
README

  echo "   📝 README.md"
fi

# ====== 公众号版 HTML 模板 ======
if [ ! -f "${DIR_PATH}/wechat-article-mp.html" ]; then
  cat > "${DIR_PATH}/wechat-article-mp.html" << 'HTMLTEMPLATE'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>公众号版 - 占位</title>
</head>
<body>

<section style="max-width:680px;margin:0 auto;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue','PingFang SC','Microsoft YaHei',sans-serif;font-size:15px;color:#333333;line-height:1.85;word-wrap:break-word">

<!-- ===== 封面区 ===== -->
<section style="background-color:#111111;padding:52px 28px 44px;text-align:center;border-radius:0">
  <p style="display:inline-block;padding:4px 16px;border:1px solid #333333;border-radius:100px;font-size:12px;color:#888888;letter-spacing:1px;margin:0 0 18px 0">📡 深度解读 · TOPIC · DATE</p>
  <h1 style="font-size:26px;font-weight:900;line-height:1.35;letter-spacing:-0.5px;margin:0 0 14px 0;color:#ffffff">TITLE<br><span style="color:#10b981">SUB_TITLE</span></h1>
  <p style="font-size:15px;color:#999999;font-weight:400;margin:0 0 10px 0">一句话简介</p>
  <p style="font-size:12px;color:#555555;margin:14px 0 0 0">文 / 艾AI</p>
</section>

<!-- ===== 正文占位 ===== -->
<section style="padding:28px 24px 24px;background-color:#ffffff">
  <p style="font-size:15px;color:#999999">🚧 文章正在写作中，请稍候...</p>
</section>

</section>

</body>
</html>
HTMLTEMPLATE
  echo "   📄 wechat-article-mp.html (模板)"
fi

# ====== prompts/ 目录 ======
if [ ! -d "${DIR_PATH}/prompts" ]; then
  mkdir -p "${DIR_PATH}/prompts"
  cat > "${DIR_PATH}/prompts/.gitkeep" <<< ""
  echo "   📁 prompts/"
fi

# ====== assets/ 目录 ======
if [ ! -d "${DIR_PATH}/assets" ]; then
  mkdir -p "${DIR_PATH}/assets"
  cat > "${DIR_PATH}/assets/.gitkeep" <<< ""
  echo "   📁 assets/"
fi

echo ""
echo "✅ 选题脚手架已生成！"
echo "   目录: ${DIR_PATH}"
echo ""
echo "下一步:"
echo "  1. 编辑 README.md 完善选题信息"
echo "  2. 编辑 wechat-article-mp.html 撰写正文"
echo "  3. 文章写完后运行: git add -A && git commit -m \"content: ${DATE} ${TITLE}\" && git push"
echo ""