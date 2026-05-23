import { chromium } from 'playwright-core';
import { mkdirSync } from 'fs';

const htmlPath = '/projects/ai-articles/content/26-05-23_ai-ipo-era/images-infographic.html';
const outDir = '/root/.openclaw/workspace';

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 800, height: 600 } });

await page.goto('file://' + htmlPath, { waitUntil: 'networkidle' });
await page.waitForTimeout(4000);

const figs = [
  { id: '#canvas1', out: 'spacex-gpu-handdrawn.png' },
  { id: '#canvas2', out: 'openai-pressure-handdrawn.png' },
  { id: '#canvas3', out: 'anthropic-growth-handdrawn.png' },
];

for (const f of figs) {
  const el = await page.$(f.id);
  if (el) {
    await el.screenshot({ path: outDir + '/' + f.out });
    console.log('✓ ' + f.out);
  } else {
    console.log('✗ Canvas not found: ' + f.id);
  }
}

await browser.close();
console.log('\n✅ Done');
