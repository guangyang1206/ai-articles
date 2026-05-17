#!/bin/bash
# ============================================================
# 索引更新脚本
# 自动扫描 content/ 目录，生成最新的文章列表
# 更新以下文件：
#   1. content/README.md 中的"已有选题"表格
#   2. 根 README.md 中的文章列表
#   3. content/ai-articles-index.html 中的文章条目（部分）
# 用法: ./scripts/update-index.sh
# ============================================================

set -euo pipefail

CONTENT_DIR="content"
README_FILE="${CONTENT_DIR}/README.md"
ROOT_README="README.md"

echo "📋 扫描选题目录..."
topics=()
while IFS= read -r dir; do
  basename=$(basename "$dir")
  if [[ "$basename" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}_ ]]; then
    date_part="${basename:0:10}"
    slug="${basename:11}"
    topic_readme="${dir}/README.md"
    
    # 读取标题
    title=""
    if [ -f "$topic_readme" ]; then
      title=$(head -1 "$topic_readme" | sed 's/^# //')
    fi
    if [ -z "$title" ]; then
      title="$slug"
    fi
    
    # 读取状态
    status="📝 待发布"
    if grep -q "已发布" "$topic_readme" 2>/dev/null; then
      status="✅ 已发布"
      # 检查是否有奖励标记
      if grep -q "奖励" "$topic_readme" 2>/dev/null; then
        status="✅ 已发布（获推广奖励🎉）"
      fi
    fi
    
    topics+=("$date_part|$title|$basename|$status")
  fi
done < <(find "$CONTENT_DIR" -maxdepth 1 -type d | sort)

echo "  找到 ${#topics[@]} 个选题"

echo ""
echo "📝 更新 README.md 文章列表..."
echo "  请在 content/README.md 中手动更新已有选题表格"
echo "  或使用编辑器替换"

echo ""
echo "当前文章列表:"
for i in "${!topics[@]}"; do
  IFS='|' read -r date title dir status <<< "${topics[$i]}"
  echo "  $((i+1)). [$date] $title → $status"
done

echo ""
echo "✅ 索引检查完成"
echo ""
echo "提示: 每次新增或发布选题后，手动更新:"
echo "  1. content/README.md - 已有选题表格"
echo "  2. 根 README.md - 文章列表"
echo "  3. content/ai-articles-index.html - 网页版索引"
echo ""

# 生成根 README 文章列表建议
echo "======== 根 README 文章列表建议 ========"
echo ""
echo "| # | 日期 | 选题 | 类型 | 状态 |"
echo "|---|------|------|------|------|"
i=1
for entry in "${topics[@]}"; do
  IFS='|' read -r date title dir status <<< "$entry"
  echo "| $i | $date | [$title](./$CONTENT_DIR/$dir/) | - | $status |"
  i=$((i+1))
done