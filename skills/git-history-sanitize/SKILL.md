---
name: git-history-sanitize
description: 从 git 仓库历史中彻底抹除敏感信息（凭证/token、内部域名与平台名、PII 绝对路径、服务器 IP 与主机名），不只是工作树。用 git filter-repo 重写全部历史 + force push。当用户说"彻底抹除历史""清理 git 历史里的敏感信息""force push 重写历史"或发现 token/内网域名已进入公开仓库历史时触发。与 pre-opensource-sanitization-audit（只做扫描审计）互补：本 skill 负责审计之后的修复动作。
description_zh: 抹除 git 历史敏感信息
description_en: Purge secrets from git history
disable: false
agent_created: true
---

# git-history-sanitize

从 git 历史**彻底**抹除敏感信息。仅改工作树/HEAD 只能保证未来版本干净，旧 commit 仍能被 `git clone` 后翻出；必须用 `git filter-repo` 重写全部历史。

## When to use
- 用户要求"彻底抹除 / 不能有任何敏感信息 / 清理 git 历史"
- 已确认敏感信息（token、内网域名、内部平台名、`/Users/<name>` 绝对路径、服务器 IP）进入了**已推送的公开仓库历史**
- 需要从历史中移除某个文件/目录（如内部部署脚本），且要在所有 commit 中消失

## 敏感信息四类（与 pre-opensource-sanitization-audit 一致）
1. 凭证密钥：`github_pat_*`、`ghp_*`、`skey-*`、`AKIA*`、`-----BEGIN ... PRIVATE KEY`
2. 雇主内部信息：内网域名（`*.internal.example.com`、`pages.internal.example.com`）、内部平台名（内部 CI 平台 / 内部 wiki 等）
3. PII：`/Users/<name>/`、`@example.com` 邮箱、手机号
4. 本地专属目录 / 服务器信息：`.workbuddy/`、`.learnings/`、服务器 IP、主机名、密钥文件名

> 本 skill 是**通用模板**，不含任何具体组织的信息。执行前把你要抹除的内部域名/平台名填入 `ORG_PATTERNS`（见下），或写进替换清单。

## Steps

### 1. 全历史扫描（先摸清全貌）
遍历所有 commit 的每个文件内容，不是只扫工作树：
```bash
cd <repo>
# 通用敏感词（各组织通用，可直接用）
PATTERN='github_pat_|ghp_[A-Za-z0-9]{20}|skey-|AKIA[0-9A-Z]{16}|BEGIN [A-Z0-9 ]*PRIVATE KEY|/Users/[A-Za-z]+|/home/[A-Za-z]+'
# 组织内部词（改成你自己的内部域名/平台名，多个用 | 分隔，勿写入仓库）
ORG_PATTERNS='internal\.example\.com|pages\.internal\.example\.com|内部CI平台|内部wiki'
git rev-list --all | while read c; do git grep -n -I -E "$PATTERN|$ORG_PATTERNS" "$c" -- . 2>/dev/null; done > /tmp/scan.txt
```
- `git grep -I` 自动跳过二进制；`-n` 输出行号；输出格式 `commit:file:line:content`
- 单独扫 IP：`grep -oE '([0-9]{1,3}\.){3}[0-9]{1,3}'` 后逐条看上下文，区分「自有服务器 IP（敏感，抹除）」vs「攻击日志里的僵尸网络 IP（非敏感，可保留）」
- 检查 commit message 也含敏感词：`git log --all --format='%H %s%n%b' | grep -E '...'`（filter-repo 的 `--replace-text` 只改 blob，不改 commit message）

### 2. 构建替换清单（两个文件）
`/tmp/replace_blob.txt`（blob 内容）与 `/tmp/replace_msg.txt`（commit message）。格式：三行一组 = 匹配行 / `==>` / 替换行，`regex:` 前缀表示正则，空行分隔组，`#` 注释。

关键规则：
- **长路径在短路径前**（`/root/.ssh/deploy_key` 先于 `/root/`），否则子串被提前替换
- **误报保护用占位符**：当内部词是某公开词的子串时（例如内部平台名「X」包含在公开机构「XX 咨询」中），先替换长串到占位符 → 再替换内部词 → 最后还原占位符，避免误伤公开内容
- 凭证用正则兜底所有变体：`regex:skey-[A-Za-z0-9]+` → `skey-REDACTED`

示例：
```
regex:skey-[A-Za-z0-9]+
==>
skey-REDACTED

pages.internal.example.com
==>
pages.example.com

/root/.ssh/deploy_key
==>
~/.ssh/deploy_key
```

### 3. 备份（force push 不可逆，必须先备份）
```bash
BK=~/WorkBuddy/<repo>-full-backup-$(date +%Y%m%d)
git clone --mirror <repo> "$BK/<repo>.git"
git -C "$BK/<repo>.git" rev-list --all --count   # 校验 commit 数与备份前一致
```

### 4. 安装并执行 filter-repo
```bash
# 安装（任选其一，隔离环境避免污染全局）
python3 -m pip install --user git-filter-repo     # 或 pipx install git-filter-repo
git filter-repo --version                          # 确认可执行

cd <repo>
git filter-repo \
  --path content/ --path scripts/deploy.py --invert-paths \   # 从历史移除这些路径（可选）
  --replace-text /tmp/replace_blob.txt \
  --replace-message /tmp/replace_msg.txt \
  --force
```
- `--path X --invert-paths` = 移除 X（默认 --path 是保留，加了 --invert-paths 就反转成移除）
- `--force` 必须有（仓库有 remote 时会拒绝，filter-repo 会删掉 origin）
- 移除整个目录会让只改动该目录的 commit 变空被跳过，commit 数会锐减（正常）

### 5. 清理 + 恢复 remote + force push
```bash
rm -rf filter-repo .git/filter-repo          # 清理报告目录
git remote add origin https://github.com/OWNER/REPO.git
# 从你的私有凭证文件读 token（示例路径，改成你自己的）
TOKEN=$(grep -oE 'github_pat_[A-Za-z0-9_]+' ~/.secrets/github_token.env | head -1)
git push "https://x-access-token:${TOKEN}@github.com/OWNER/REPO.git" main --force
```
⚠️ 用含 token 的 URL push **不要加 `-u`**，否则明文 PAT 写进 `.git/config`。

### 6. 验证（必须重新扫历史，不能只看工作树）
```bash
git rev-list --all | while read c; do git grep -n -I -E "$PATTERN|$ORG_PATTERNS" "$c" -- . 2>/dev/null; done | wc -l  # 应 0
git rev-parse HEAD; git fetch origin main && git rev-parse origin/main     # 本地 == 远端
grep -c 'x-access-token\|github_pat_' .git/config || echo "clean"          # remote 无 token
```

## Pitfalls
- **只改工作树 ≠ 抹除**：旧 commit 仍可翻出，必须重写历史。区分清楚用户要的是「当前版本干净」还是「历史彻底干净」。
- **filter-repo 删 origin remote**：重写后必须 `git remote add origin` 重新加回。
- **`--replace-text` 不改 commit message**：commit message 里的敏感词要用 `--replace-message` 单独处理。
- **替换顺序**：长串在前、短串在后；误报词用占位符三明治保护。
- **force push 的连带影响**：改写所有下游 clone 的 hash，协作者本地 clone 失效，需重新 clone 或 `git reset --hard origin/main`；GitHub 旧 commit 要等服务端 GC 才彻底删除（期间旧 commit 直链可能仍短暂可访问）。
- **真实凭证必须吊销**：`skey-*`、真实 token 即使从历史抹除，若仍有效仍需去源头吊销/轮换，不能只靠删历史。
- 保留判断：SSH 攻击日志里的攻击者僵尸网络 IP 不属于用户敏感信息，可保留；用户自己的服务器 IP 必须抹除。

## Verification
重写后：① 全历史敏感词扫描 0 命中；② 本地 HEAD == origin/main；③ 移除的路径（目录/脚本）在 `git log --all --name-only` 里彻底消失；④ `.git/config` 无 token；⑤ 核心交付物（文章/代码）仍齐备无丢失。
