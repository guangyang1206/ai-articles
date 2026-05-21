#!/usr/bin/env python3
"""
部署 AI 文章到独立站点
域名: https://yeranyang-iai.pages.woa.com/

使用方式:
  export WOA_PAGES_API_KEY='your-api-key'
  python3 deploy_ai_articles.py
"""
import os
import json
import urllib.request
import urllib.error
import sys

API_KEY = os.environ.get('WOA_PAGES_API_KEY', os.environ.get('OA_PAGES_API_KEY', '')).split('\n')[0].strip()
CNAME = 'yeranyang-iai.pages.woa.com'
BASE_URL = 'http://pages.woa.com'

if not API_KEY:
    print("❌ 错误: 请设置 WOA_PAGES_API_KEY 环境变量")
    print("   获取地址: https://pages.woa.com 右上角")
    sys.exit(1)

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def api_request(method, path, data=None):
    url = f'{BASE_URL}{path}'
    body = json.dumps(data).encode('utf-8') if data else None
    req = urllib.request.Request(
        url,
        data=body,
        method=method,
        headers={
            'X-Api-Key': API_KEY,
            'Content-Type': 'application/json',
        }
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            raw = resp.read().decode('utf-8')
            try:
                return resp.status, json.loads(raw)
            except json.JSONDecodeError:
                return resp.status, {'raw': raw[:500]}
    except urllib.error.HTTPError as e:
        raw = e.read().decode('utf-8')
        try:
            return e.code, json.loads(raw)
        except json.JSONDecodeError:
            return e.code, {'raw': raw[:500]}

# --- 收集所有文件 ---
CONTENT_DIR = os.path.dirname(os.path.abspath(__file__))

# 索引页（站点根路径）
files = {
    'index.html': read_file(os.path.join(CONTENT_DIR, 'ai-articles-index.html')),
}

# === 文章配置：目录 → 部署路径前缀 → 文件清单 ===
articles = [
    # (本地目录, 部署路径前缀, 要部署的文件名列表)
    ('2026-04-24_deepseek-v4-deep-dive', '2026-04-24_deepseek-v4-deep-dive',
     ['wechat-article-mp.html', 'wechat-article.html', 'deepseek-v4-article.html',
      'deepseek-v4-analysis.html', 'assets-generator.html', 'share-cards.html', 'cover-assets.html']),
    ('2026-04-29_chatgpt-ads-breakdown', '2026-04-29_chatgpt-ads-breakdown',
     ['wechat-article-mp.html', 'wechat-article-mp-en.html', 'article-full.html', 'share-cards.html', 'cover-assets.html']),
    ('2026-05-03_deploy-static-site-lessons', '2026-05-03_deploy-static-site-lessons',
     ['wechat-article-mp.html', 'wechat-article-mp-en.html', 'article-full.html', 'share-cards.html', 'cover-assets.html']),
    ('2026-05-17_anthropic-900b-valuation', '2026-05-17_anthropic-900b-valuation',
     ['wechat-article-mp.html', 'article-full.html', 'cover-assets.html', 'share-cards.html']),
    ('2026-05-17_ai-coding-agent-war', '2026-05-17_ai-coding-agent-war',
     ['wechat-article-mp.html', 'article-full.html', 'cover-assets.html', 'share-cards.html']),
    ('2026-05-18_deepseek-funding', '2026-05-18_deepseek-funding',
     ['wechat-article-mp.html', 'wechat-article-mp-en.html', 'article-full.html', 'share-cards.html', 'cover-assets.html']),
]

# 收集所有文章文件
for local_dir, deploy_prefix, fnames in articles:
    src_dir = os.path.join(CONTENT_DIR, local_dir)
    for fname in fnames:
        fpath = os.path.join(src_dir, fname)
        if os.path.exists(fpath):
            files[f'{deploy_prefix}/{fname}'] = read_file(fpath)

# --- 显示文件清单 ---
print(f"📂 准备部署 {len(files)} 个文件到 {CNAME}\n")
total_size = 0
for path, content in sorted(files.items()):
    size = len(content.encode('utf-8'))
    total_size += size
    print(f"   {path} ({size/1024:.1f} KB)")
print(f"\n   总计: {total_size/1024:.1f} KB ({total_size/1024/1024:.2f} MB)")

# --- 部署（独立站点，直接全量 PUT）---
print(f"\n🚀 部署到 {CNAME}...")
status, resp = api_request('PUT', f'/api/sites/{CNAME}', {
    'files': files,
})
print(f"   状态码: {status}")

if status == 200:
    print(f"\n✅ 部署成功！")
    print(f"   🌐 索引页: https://{CNAME}/")
    print(f"   📱 DeepSeek V4: https://{CNAME}/2026-04-24_deepseek-v4-deep-dive/wechat-article-mp.html")
    print(f"   📱 ChatGPT 广告: https://{CNAME}/2026-04-29_chatgpt-ads-breakdown/wechat-article-mp.html")
    print(f"   📱 部署踩坑: https://{CNAME}/2026-05-03_deploy-static-site-lessons/wechat-article-mp.html")
    print(f"   📱 Anthropic 估值: https://{CNAME}/2026-05-17_anthropic-900b-valuation/wechat-article-mp.html")
    print(f"   📱 AI 编码 Agent: https://{CNAME}/2026-05-17_ai-coding-agent-war/wechat-article-mp.html")
    print(f"   📱 DeepSeek 融资: https://{CNAME}/2026-05-18_deepseek-funding/article-full.html")
else:
    print(f"\n❌ 部署失败:")
    print(json.dumps(resp, ensure_ascii=False, indent=2))
    sys.exit(1)
