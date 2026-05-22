#!/usr/bin/env python3
"""
部署所有文章到 yeranyang-iai.pages.woa.com

用法:
  python3 scripts/deploy.py

流程:
  1. 扫描 content/ 下所有 .html 文件
  2. 打包首页 + 全部文章 HTML
  3. PUT 到 pages.woa.com（全量替换）

注意:
  - 每次 PUT 是全量替换，必须包含所有文件
  - 首页会自动从仓库根 README 或 ai-articles-index.html 构建（待完善）
"""

import os, json, urllib.request, urllib.error, glob

API_KEY = os.environ.get('WOA_PAGES_API_KEY', '').split('\n')[0].strip()
CNAME   = 'yeranyang-iai.pages.woa.com'
BASE    = 'http://pages.woa.com'
CONTENT = os.path.join(os.path.dirname(__file__), '..', 'content')

def api(method, path, data=None):
    url  = f'{BASE}{path}'
    body = json.dumps(data).encode() if data else None
    req  = urllib.request.Request(url, data=body, method=method,
           headers={'X-Api-Key': API_KEY, 'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return r.status, json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        try: return e.code, json.loads(body)
        except: return e.code, {'raw': body[:300]}

def deploy():
    files = {}

    # 首页
    index_paths = [
        os.path.join(CONTENT, 'ai-articles-index.html'),
        os.path.join(CONTENT, '..', 'index.html'),
    ]
    for p in index_paths:
        p = os.path.abspath(p)
        if os.path.exists(p):
            with open(p) as f:
                files['index.html'] = f.read()
            print(f"  📄 首页: {os.path.relpath(p)}")
            break

    # 所有文章的 HTML
    html_files = glob.glob(f'{CONTENT}/20*/**/*.html', recursive=True)
    for fp in sorted(html_files):
        rel = os.path.relpath(fp, CONTENT)
        with open(fp) as f:
            files[rel] = f.read()

    total_kb = sum(len(v.encode())/1024 for v in files.values())
    print(f"\n  📦 {len(files)} 个文件 ({total_kb:.0f} KB)")

    print(f"  🚀 部署到 {CNAME}...")
    status, resp = api('PUT', f'/api/sites/{CNAME}', {'files': files, 'visibility': 'tof'})

    if status == 200:
        print(f"  ✅ 部署成功！https://{CNAME}/")
    else:
        print(f"  ❌ 部署失败: {json.dumps(resp, ensure_ascii=False, indent=2)}")
        exit(1)

if __name__ == '__main__':
    print(f"📡 AI深度解读 — 部署脚本")
    print(f"  站点: {CNAME}")
    deploy()