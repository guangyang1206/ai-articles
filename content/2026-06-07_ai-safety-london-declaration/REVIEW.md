# REVIEW.md — AI 安全：科学家们坐不住了——解读《IDAIS 伦敦宣言》

> 审阅日期：2026-06-10
> 目标文件：`article-full.html`（尚未提交至仓库）
> 审阅评分：⭐⭐⭐ (3/5)

---

## 修正清单

### FIX-01 | 类型：严重事实错误 | 置信度：高 🔴

**原文：**
```
IDAIS成立于2025年，由姚期智和Bengio共同发起
```

**改为：**
```
IDAIS（国际AI安全对话）成立于2023年10月，由姚期智、Yoshua Bengio、张亚勤、Stuart Russell四人共同发起
```

**来源：**
- IDAIS官网 (idais.ai/dialogues/)："The first dialogue, held in October 2023, was co-initiated by Andrew Chi-Chih Yao, Yoshua Bengio, Zhang Yaqin, and Stuart Russell."
- 清华大学IIIS官网确认四位发起人
- 科技日报报道确认

---

### FIX-02 | 类型：严重事实错误 | 置信度：高 🔴

**原文：**
```
伦敦宣言是IDAIS的第一份正式文件
```

**改为：**
```
伦敦宣言是IDAIS的第五份声明/宣言
```

**来源：** IDAIS历次会议及声明：
1. IDAIS-Oxford (2023.10) — 声明
2. IDAIS-Beijing (2024) — 声明
3. IDAIS-Venice (2024) — 声明
4. IDAIS-Shanghai (2025) — 声明
5. IDAIS-London (2026.4) — 伦敦宣言

IDAIS官网dialogues页面，每场会议均有独立Statement链接。

---

### FIX-03 | 类型：严重事实错误 | 置信度：高 🔴

**原文：**
```
AI驱动的网络攻击可能在未来2-3年内成为全球性威胁
```

**改为：**
```
AI驱动的网络攻击可能在未来一年内成为全球性威胁
```

**来源：** 伦敦宣言原文明确写道："On current trajectories, non-state actors with minimal capacity will gain access to certain state-level cyber-attack capabilities within the next year"。科技日报翻译："按照现有发展趋势，一年内非国家行为体或将掌握国家级网络攻击能力"。"2-3年"与"一年内"的差异显著改变了紧迫性判断。

---

### FIX-04 | 类型：引言待核实 | 置信度：中 ⚠️

**原文：**
```
"AI安全不是某一个国家或公司的问题，它是全人类共同面临的挑战。我们需要像应对气候变化一样应对AI风险。"——姚期智
```

**改为：**
```
如果能找到确切来源（场合、日期、媒体），请标注；如果无法核实，建议替换为宣言原文表述或已确认的公开引言。
```

**来源：** IDAIS官网宣言原文中未包含此引言，清华大学和科技日报的报道中也未见此原文。可能来自其他场合发言或媒体转述，需核实。

---

### FIX-05 | 类型：遗漏补充（建议） | 置信度：高

**建议补充IDAIS历次会议脉络，增强历史纵深感：**

| 会议 | 时间 | 地点 | 核心主题 |
|------|------|------|----------|
| IDAIS-Oxford | 2023.10 | 牛津 | AI安全全球行动呼吁 |
| IDAIS-Beijing | 2024 | 北京 | AI发展红线与国际合作 |
| IDAIS-Venice | 2024 | 威尼斯 | AI安全是"全球公共品" |
| IDAIS-Shanghai | 2025 | 上海 | AI对齐风险，Hinton首次参加 |
| IDAIS-London | 2026.4 | 伦敦 | AI赋能攻击，"一年内"紧迫警告 |

---

### FIX-06 | 类型：遗漏补充（建议） | 置信度：高

**建议补充以下信息：**

1. **伦敦宣言与此前声明的递进关系**：北京宣言→威尼斯宣言→上海宣言→伦敦宣言的升级逻辑，说明为何伦敦宣言更紧迫
2. **签署人更完整名单**：除四位发起人外，还包括Max Tegmark（MIT/FLI）、Craig Mundie、傅莹、薛澜等
3. **生物攻击与网络攻击的时间线区分**：宣言指出网络攻击是"imminent threat"（一年内），而生物攻击是"serious near-term risk"（时间线稍长）
4. **中美特殊责任**：宣言特别提到中美两国在AI安全合作中的"特殊责任"（particular responsibility）
5. **核武器类比需补充差异**：核武器需国家级资源，而AI攻击可由个人发起——这是宣言强调的核心新特征

---

## 已通过核查（无需修改）

- ✅ 2026年4月英国皇家学会签署伦敦宣言
- ✅ 签署人包括姚期智、Yoshua Bengio、张亚勤、Stuart Russell
- ✅ 宣言关注AI网络攻击和生物技术滥用两大风险
- ✅ AI驱动的网络攻击门槛大幅降低
- ✅ AI辅助设计病原体风险
- ✅ 呼吁建立国际AI安全监管框架
- ✅ 呼吁AI公司发布前沿模型前进行安全评估
