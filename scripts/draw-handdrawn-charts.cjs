const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// 检查中文字体
const fontPath = '/usr/share/fonts/google-noto-cjk/NotoSansCJKsc-Regular.otf';
const fontBoldPath = '/usr/share/fonts/google-noto-cjk/NotoSansCJKsc-Bold.otf';
if (!fs.existsSync(fontPath)) {
  console.error('No Chinese font found. Install with: yum install -y google-noto-sans-cjk-sc-fonts');
  process.exit(1);
}
registerFont(fontPath, { family: 'NotoSansSC' });
registerFont(fontBoldPath, { family: 'NotoSansSC-Bold' });

const W = 800;
const H = 500;
const outDir = path.join(process.env.HOME || '/root', '.openclaw/workspace');

// ==================== 手绘辅助函数 ====================

function drawSketchLine(ctx, x1, y1, x2, y2, color, alpha, lineWidth) {
  ctx.save();
  ctx.globalAlpha = alpha || 0.3;
  ctx.strokeStyle = color || '#666';
  ctx.lineWidth = lineWidth || 1;
  ctx.beginPath();
  // 手绘抖动
  const segments = 8;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = x1 + (x2 - x1) * t + (Math.random() - 0.5) * 2;
    const y = y1 + (y2 - y1) * t + (Math.random() - 0.5) * 2;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

function drawSketchRect(ctx, x, y, w, h, color, alpha) {
  drawSketchLine(ctx, x, y, x + w, y, color, alpha);
  drawSketchLine(ctx, x + w, y, x + w, y + h, color, alpha);
  drawSketchLine(ctx, x + w, y + h, x, y + h, color, alpha);
  drawSketchLine(ctx, x, y + h, x, y, color, alpha);
}

function drawHandFill(ctx, x, y, w, h, color, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha || 0.08;
  ctx.fillStyle = color;
  // 用多条水平线模拟手绘填充
  for (let i = 0; i < h; i += 3) {
    const yy = y + i + (Math.random() - 0.5) * 1.5;
    ctx.fillRect(x + (Math.random() - 0.5) * 2, yy, w + (Math.random() - 0.5) * 2, 2);
  }
  ctx.restore();
}

function drawHandCircle(ctx, cx, cy, r, color, alpha, lineWidth) {
  ctx.save();
  ctx.globalAlpha = alpha || 0.3;
  ctx.strokeStyle = color || '#666';
  ctx.lineWidth = lineWidth || 1.5;
  ctx.beginPath();
  const segments = 24;
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const rr = r + (Math.random() - 0.5) * 2;
    const x = cx + Math.cos(angle) * rr;
    const y = cy + Math.sin(angle) * rr;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

// ==================== 图1: SpaceX GPU 数据中心 ====================
function drawSpaceXGPU() {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // 背景
  ctx.fillStyle = '#faf8f5';
  ctx.fillRect(0, 0, W, H);

  // 标题
  ctx.save();
  ctx.fillStyle = '#2c3e50';
  ctx.font = '24px NotoSansSC-Bold';
  ctx.fillText('SpaceX 的算力武器', 40, 48);
  ctx.font = '14px NotoSansSC';
  ctx.fillStyle = '#888';
  ctx.fillText('Colossus 1 数据中心 · 22万张 GPU', 40, 74);
  ctx.restore();

  // 卫星天线（手绘风格）
  const dishCx = 160, dishCy = 150;
  ctx.save();
  ctx.strokeStyle = '#5a7a9a';
  ctx.lineWidth = 2;
  // 抛物线天线
  ctx.beginPath();
  for (let a = -0.8; a <= 0.8; a += 0.05) {
    const x = dishCx + a * 90;
    const y = dishCy + a * a * 60;
    a === -0.8 ? ctx.moveTo(x, y) : ctx.lineTo(x + (Math.random() - 0.5) * 1.5, y + (Math.random() - 0.5) * 1.5);
  }
  ctx.stroke();
  // 天线底柱
  drawSketchLine(ctx, dishCx, dishCy + 55, dishCx, dishCy + 120, '#5a7a9a', 0.4, 3);
  // 底盘
  drawSketchLine(ctx, dishCx - 25, dishCy + 120, dishCx + 25, dishCy + 120, '#5a7a9a', 0.4, 2);
  // 信号波纹
  for (let i = 0; i < 3; i++) {
    drawHandCircle(ctx, dishCx + 60, dishCy - 20, 40 + i * 35, '#5a7a9a', 0.15 - i * 0.03, 1);
  }
  ctx.restore();

  // GPU 芯片组（手绘矩形阵列）
  const chipColors = ['#4a6a8a', '#5a7a9a', '#6a8aaa', '#3a5a7a'];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 6; col++) {
      const cx = 340 + col * 65 + (Math.random() - 0.5) * 3;
      const cy = 120 + row * 55 + (Math.random() - 0.5) * 3;
      const color = chipColors[(row + col) % 4];
      drawSketchRect(ctx, cx, cy, 48, 38, color, 0.5);
      drawHandFill(ctx, cx + 2, cy + 2, 44, 34, color, 0.12);
      // 芯片内部小方块
      ctx.save();
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = '#fff';
      for (let i = 0; i < 4; i++) {
        const px = cx + 8 + (i % 2) * 22 + (Math.random() - 0.5) * 2;
        const py = cy + 8 + Math.floor(i / 2) * 18 + (Math.random() - 0.5) * 2;
        ctx.fillRect(px, py, 8, 6);
      }
      ctx.restore();
    }
  }

  // 标签
  ctx.save();
  ctx.fillStyle = '#5a7a9a';
  ctx.font = '13px NotoSansSC';
  ctx.fillText('GPU 集群', 340 + 6 * 65 / 2 - 40, 120 + 5 * 55 + 20);
  ctx.restore();

  // 连接线（从天线到芯片）
  drawSketchLine(ctx, dishCx + 90, dishCy - 10, 340, 140, '#5a7a9a', 0.15, 1.5);

  // 底部文字 - 关键数据
  ctx.save();
  ctx.font = '15px NotoSansSC-Bold';
  ctx.fillStyle = '#2c3e50';
  ctx.fillText('22万张 GPU · 300 MW · 可用性 82% → 99.7%', 40, 440);
  ctx.font = '12px NotoSansSC';
  ctx.fillStyle = '#999';
  ctx.fillText('AI 深度解读 · 手绘示意', 620, 470);
  ctx.restore();

  return canvas.toBuffer('image/png');
}

// ==================== 图2: OpenAI 三重压力漏斗 ====================
function drawOpenAIPressure() {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#faf8f5';
  ctx.fillRect(0, 0, W, H);

  // 标题
  ctx.save();
  ctx.fillStyle = '#2c3e50';
  ctx.font = '24px NotoSansSC-Bold';
  ctx.fillText('OpenAI 的三重压力', 40, 48);
  ctx.font = '14px NotoSansSC';
  ctx.fillStyle = '#888';
  ctx.fillText('利润 · 对手 · 内部 —— 三重倒逼 IPO 加速', 40, 74);
  ctx.restore();

  // 三层漏斗
  const layers = [
    { y: 110, h: 75, w: 560, label: '💰 利润之困', sub: '现金亏损 80 亿 · 毛利率 40% → 33% · 五年开支 6000 亿', color: '#c0392b' },
    { y: 210, h: 75, w: 440, label: '🔄 对手反超', sub: 'Anthropic ARR 440 亿 vs 250 亿 · 企业占比 34.4% > 32.3%', color: '#e67e22' },
    { y: 310, h: 75, w: 320, label: '⚠️ 内部隐忧', sub: 'CEO vs CFO 上市分歧 · 零持股 · 人才 8 倍逆向流失', color: '#8e44ad' },
  ];

  layers.forEach((layer, i) => {
    const x = (W - layer.w) / 2;
    const alpha = 1 - i * 0.15;

    // 漏斗边框
    drawSketchRect(ctx, x, layer.y, layer.w, layer.h, layer.color, alpha * 0.6);
    drawHandFill(ctx, x + 2, layer.y + 2, layer.w - 4, layer.h - 4, layer.color, 0.06);

    // 标签
    ctx.save();
    ctx.fillStyle = '#2c3e50';
    ctx.font = '18px NotoSansSC-Bold';
    ctx.fillText(layer.label, x + 16, layer.y + 32);
    ctx.font = '13px NotoSansSC';
    ctx.fillStyle = '#666';
    ctx.fillText(layer.sub, x + 16, layer.y + 56);
    ctx.restore();

    // 向下箭头（层间衔接）
    if (i < layers.length - 1) {
      const nextLayer = layers[i + 1];
      const arrowY = layer.y + layer.h;
      const arrowEndY = nextLayer.y;
      drawSketchLine(ctx, W / 2, arrowY, W / 2, arrowEndY, layer.color, 0.3, 2);
      // 箭头底部
      ctx.save();
      ctx.fillStyle = layer.color;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.moveTo(W / 2 - 6, arrowEndY);
      ctx.lineTo(W / 2 + 6, arrowEndY);
      ctx.lineTo(W / 2, arrowEndY + 8);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  });

  // 底部结论
  ctx.save();
  ctx.font = '15px NotoSansSC-Bold';
  ctx.fillStyle = '#c0392b';
  ctx.textAlign = 'center';
  ctx.fillText('不是选择上市，是被迫上市', W / 2, 440);
  ctx.font = '12px NotoSansSC';
  ctx.fillStyle = '#999';
  ctx.textAlign = 'right';
  ctx.fillText('AI 深度解读 · 手绘示意', 750, 470);
  ctx.restore();

  return canvas.toBuffer('image/png');
}

// ==================== 图3: Anthropic 增长曲线 ====================
function drawAnthropicGrowth() {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#faf8f5';
  ctx.fillRect(0, 0, W, H);

  // 标题
  ctx.save();
  ctx.fillStyle = '#2c3e50';
  ctx.font = '24px NotoSansSC-Bold';
  ctx.fillText('Anthropic 的 15 个月奇迹', 40, 48);
  ctx.font = '14px NotoSansSC';
  ctx.fillStyle = '#888';
  ctx.fillText('ARR（年化收入，亿美元） · 2025.02 — 2026.05', 40, 74);
  ctx.restore();

  // 坐标系
  const chartLeft = 80, chartRight = 720, chartTop = 110, chartBottom = 380;
  const chartW = chartRight - chartLeft;
  const chartH = chartBottom - chartTop;

  // Y 轴
  drawSketchLine(ctx, chartLeft, chartTop, chartLeft, chartBottom, '#ccc', 0.5, 1.5);
  // X 轴
  drawSketchLine(ctx, chartLeft, chartBottom, chartRight, chartBottom, '#ccc', 0.5, 1.5);

  // Y 轴刻度
  const yMax = 500;
  const yTicks = [0, 100, 200, 300, 400, 500];
  yTicks.forEach(val => {
    const y = chartBottom - (val / yMax) * chartH;
    drawSketchLine(ctx, chartLeft - 5, y, chartLeft, y, '#ccc', 0.3, 1);
    ctx.save();
    ctx.fillStyle = '#999';
    ctx.font = '11px NotoSansSC';
    ctx.textAlign = 'right';
    ctx.fillText(String(val), chartLeft - 10, y + 4);
    ctx.restore();
  });

  // X 轴标签
  const xLabels = ['2025.02', '2025.05', '2025.08', '2025.11', '2026.02', '2026.05'];
  xLabels.forEach((label, i) => {
    const x = chartLeft + (i / (xLabels.length - 1)) * chartW;
    ctx.save();
    ctx.fillStyle = '#999';
    ctx.font = '11px NotoSansSC';
    ctx.textAlign = 'center';
    ctx.fillText(label, x, chartBottom + 18);
    ctx.restore();
  });

  // Anthropic 数据点（手绘曲线+点）
  const anthropicPoints = [
    { x: 0.00, y: 10 },   // 2025.02 ARR ~10亿
    { x: 0.15, y: 18 },
    { x: 0.30, y: 35 },
    { x: 0.45, y: 60 },
    { x: 0.60, y: 90 },   // 2025.12
    { x: 0.70, y: 140 },  // 2026.02
    { x: 0.80, y: 220 },
    { x: 0.85, y: 300 },  // 2026.04
    { x: 0.92, y: 380 },
    { x: 1.00, y: 440 },  // 2026.05
  ];

  // 手绘曲线 - Anthropic
  ctx.save();
  ctx.strokeStyle = '#2980b9';
  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  anthropicPoints.forEach((p, i) => {
    const px = chartLeft + p.x * chartW;
    const py = chartBottom - (p.y / yMax) * chartH;
    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      const prev = anthropicPoints[i - 1];
      const prevPx = chartLeft + prev.x * chartW;
      const prevPy = chartBottom - (prev.y / yMax) * chartH;
      const cp1x = prevPx + (px - prevPx) * 0.4;
      const cp1y = prevPy;
      const cp2x = px - (px - prevPx) * 0.4;
      const cp2y = py;
      ctx.bezierCurveTo(cp1x + (Math.random() - 0.5) * 3, cp1y + (Math.random() - 0.5) * 3,
                        cp2x + (Math.random() - 0.5) * 3, cp2y + (Math.random() - 0.5) * 3,
                        px + (Math.random() - 0.5) * 2, py + (Math.random() - 0.5) * 2);
    }
  });
  ctx.stroke();
  ctx.restore();

  // 数据点圆圈
  anthropicPoints.forEach(p => {
    const px = chartLeft + p.x * chartW;
    const py = chartBottom - (p.y / yMax) * chartH;
    drawHandCircle(ctx, px, py, 6, '#2980b9', 0.7, 2.5);
    ctx.save();
    ctx.fillStyle = '#2980b9';
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.arc(px, py, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  // OpenAI 参考线（手绘虚线）
  const openaiPoints = [
    { x: 0.00, y: 30 },
    { x: 0.30, y: 60 },
    { x: 0.60, y: 130 }, // 2025.12 ~130亿
    { x: 0.70, y: 180 }, // 2026.02
    { x: 0.80, y: 220 },
    { x: 0.90, y: 240 },
    { x: 1.00, y: 250 }, // 2026.05 ~250亿
  ];

  ctx.save();
  ctx.strokeStyle = '#e74c3c';
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.5;
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  openaiPoints.forEach((p, i) => {
    const px = chartLeft + p.x * chartW;
    const py = chartBottom - (p.y / yMax) * chartH;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px + (Math.random() - 0.5) * 1, py + (Math.random() - 0.5) * 1);
  });
  ctx.stroke();
  ctx.restore();

  // 图例
  ctx.save();
  ctx.font = '13px NotoSansSC';
  // Anthropic 图例
  ctx.fillStyle = '#2980b9';
  ctx.fillRect(555, 105, 20, 3);
  ctx.fillStyle = '#333';
  ctx.fillText('Anthropic', 582, 110);
  // OpenAI 图例
  ctx.fillStyle = '#e74c3c';
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(555, 128);
  ctx.lineTo(575, 128);
  ctx.stroke();
  ctx.fillStyle = '#333';
  ctx.fillText('OpenAI', 582, 133);
  ctx.restore();

  // 标注 - 关键转折
  ctx.save();
  ctx.font = '12px NotoSansSC';
  ctx.fillStyle = '#2980b9';
  ctx.textAlign = 'center';
  // 标注 Claude Code 发布
  const ccX = chartLeft + 0.05 * chartW;
  ctx.fillText('Claude Code 发布', ccX, chartBottom - (10/yMax) * chartH - 18);
  // 标注反超点
  const overtakeX = chartLeft + 0.72 * chartW;
  ctx.save();
  ctx.fillStyle = '#e67e22';
  ctx.font = '12px NotoSansSC-Bold';
  ctx.fillText('⬆ ARR 反超', overtakeX, chartBottom - (180/yMax) * chartH - 8);
  ctx.restore();
  // 标注 440 亿
  const finalX = chartLeft + 0.98 * chartW;
  ctx.save();
  ctx.fillStyle = '#2980b9';
  ctx.font = '15px NotoSansSC-Bold';
  ctx.fillText('440亿', finalX, chartBottom - (440/yMax) * chartH - 14);
  ctx.restore();
  // AWS 类比
  ctx.save();
  ctx.fillStyle = '#888';
  ctx.font = '10px NotoSansSC';
  ctx.textAlign = 'left';
  ctx.fillText('AWS：100→440亿，13年', chartLeft + 0.70 * chartW, chartBottom - (90/yMax) * chartH + 14);
  ctx.fillText('Anthropic：90→440亿，12个月', chartLeft + 0.70 * chartW, chartBottom - (90/yMax) * chartH + 28);
  ctx.restore();

  // 底部
  ctx.save();
  ctx.font = '12px NotoSansSC';
  ctx.fillStyle = '#999';
  ctx.textAlign = 'right';
  ctx.fillText('AI 深度解读 · 手绘示意', 750, 470);
  ctx.restore();

  return canvas.toBuffer('image/png');
}

// ==================== 主函数 ====================
async function main() {
  try {
    // 图1
    const buf1 = drawSpaceXGPU();
    fs.writeFileSync(path.join(outDir, 'spacex-gpu-handdrawn.png'), buf1);
    console.log('✓ Fig1: spacex-gpu-handdrawn.png');

    // 图2
    const buf2 = drawOpenAIPressure();
    fs.writeFileSync(path.join(outDir, 'openai-pressure-handdrawn.png'), buf2);
    console.log('✓ Fig2: openai-pressure-handdrawn.png');

    // 图3
    const buf3 = drawAnthropicGrowth();
    fs.writeFileSync(path.join(outDir, 'anthropic-growth-handdrawn.png'), buf3);
    console.log('✓ Fig3: anthropic-growth-handdrawn.png');

    console.log('\n✅ All hand-drawn images generated.');
  } catch(e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
}

main();