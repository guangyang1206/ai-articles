#!/usr/bin/env python3
"""
部署 ai-articles 目录到 WOA Pages
路径: https://yeranyang.pages.woa.com/ai-articles/

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
CNAME = 'yeranyang.pages.woa.com'
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

# --- 收集所有 ai-articles 文件 ---
CONTENT_DIR = os.path.dirname(os.path.abspath(__file__))

# 索引页
files = {
    'ai-articles/index.html': read_file(os.path.join(CONTENT_DIR, 'ai-articles-index.html')),
}

# === Article 1: DeepSeek V4 ===
ds_dir = os.path.join(CONTENT_DIR, '2026-04-24_deepseek-v4-deep-dive')
for fname in ['wechat-article-mp.html', 'wechat-article.html', 'deepseek-v4-article.html', 
              'deepseek-v4-analysis.html', 'assets-generator.html']:
    fpath = os.path.join(ds_dir, fname)
    if os.path.exists(fpath):
        files[f'ai-articles/deepseek-v4/{fname}'] = read_file(fpath)

# === Article 2: ChatGPT Ads ===
ads_dir = os.path.join(CONTENT_DIR, '2026-04-29_chatgpt-ads-breakdown')
for fname in ['wechat-article-mp.html', 'article-full.html', 'share-cards.html', 'cover-assets.html']:
    fpath = os.path.join(ads_dir, fname)
    if os.path.exists(fpath):
        files[f'ai-articles/chatgpt-ads/{fname}'] = read_file(fpath)

# === Article 3: Deploy Lessons ===
deploy_dir = os.path.join(CONTENT_DIR, '2026-05-03_deploy-static-site-lessons')
for fname in ['wechat-article-mp.html', 'article-full.html']:
    fpath = os.path.join(deploy_dir, fname)
    if os.path.exists(fpath):
        files[f'ai-articles/deploy-lessons/{fname}'] = read_file(fpath)

# === Article 4: Anthropic Valuation ===
anthropic_dir = os.path.join(CONTENT_DIR, '2026-05-17_anthropic-900b-valuation')
for fname in ['wechat-article-mp.html', 'article-full.html', 'cover-assets.html']:
    fpath = os.path.join(anthropic_dir, fname)
    if os.path.exists(fpath):
        files[f'ai-articles/anthropic-valuation/{fname}'] = read_file(fpath)

# === Article 5: AI Coding Agent War ===
agent_dir = os.path.join(CONTENT_DIR, '2026-05-17_ai-coding-agent-war')
for fname in ['wechat-article-mp.html', 'article-full.html', 'cover-assets.html']:
    fpath = os.path.join(agent_dir, fname)
    if os.path.exists(fpath):
        files[f'ai-articles/ai-coding-agent/{fname}'] = read_file(fpath)

# --- 显示文件清单 ---
print(f"📂 准备部署 {len(files)} 个文件到 ai-articles/\n")
total_size = 0
for path, content in sorted(files.items()):
    size = len(content.encode('utf-8'))
    total_size += size
    print(f"   {path} ({size/1024:.1f} KB)")
print(f"\n   总计: {total_size/1024:.1f} KB ({total_size/1024/1024:.2f} MB)")

# --- 部署 ---
# 注意: WOA Pages PUT 是全量替换！需要先获取现有文件再合并
print(f"\n📡 获取现有站点文件列表...")
status, resp = api_request('GET', f'/api/sites/{CNAME}')
if status == 200:
    print(f"   ✅ 站点存在，获取成功")
else:
    print(f"   ⚠️  获取站点信息失败 (状态码 {status})")
    print(f"   继续尝试部署...")

# 获取现有文件（如果能获取到的话）
existing_files = {}
if status == 200 and 'files' in resp:
    existing_files = resp['files']
    print(f"   现有文件数: {len(existing_files)}")

# 合并: 保留现有文件 + 覆盖/新增 ai-articles 文件
merged_files = {**existing_files, **files}
print(f"   合并后总文件数: {len(merged_files)}")

# PUT 更新
print(f"\n🚀 部署到 {CNAME}...")
status, resp = api_request('PUT', f'/api/sites/{CNAME}', {
    'files': merged_files,
})
print(f"   状态码: {status}")

if status == 200:
    print(f"\n✅ 部署成功！")
    print(f"   🌐 索引页: https://{CNAME}/ai-articles/")
    print(f"   📱 DeepSeek V4: https://{CNAME}/ai-articles/deepseek-v4/wechat-article-mp.html")
    print(f"   📱 ChatGPT 广告: https://{CNAME}/ai-articles/chatgpt-ads/wechat-article-mp.html")
    print(f"   📱 部署踩坑: https://{CNAME}/ai-articles/deploy-lessons/wechat-article-mp.html")
    print(f"   📱 Anthropic 估值: https://{CNAME}/ai-articles/anthropic-valuation/article-full.html")
    print(f"   📱 AI 编码 Agent: https://{CNAME}/ai-articles/ai-coding-agent/article-full.html")
else:
    print(f"\n❌ 部署失败:")
    print(json.dumps(resp, ensure_ascii=False, indent=2))
    sys.exit(1)
