import { chromium } from '/usr/local/lib/.nvm/versions/node/v24.13.0/lib/node_modules/openclaw/node_modules/playwright-core/index.mjs';
import { execSync } from 'child_process';

const CHROME_PATH = '/root/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome';
const HTML_PATH = '/projects/ai-articles/content/deepseek-funding/share-cards-handdrawn.html';
const OUTPUT_DIR = '/projects/ai-articles/content/deepseek-funding/assets';

execSync(`mkdir -p ${OUTPUT_DIR}`);

const CARD_SELECTORS = [
  { selector: '.card-cover', file: 'card-01-cover' },
  { selector: '.card-timeline', file: 'card-02-timeline' },
  { selector: '.card-pressure', file: 'card-03-pressure' },
  { selector: '.card-200b', file: 'card-04-200b' },
  { selector: '.card-five', file: 'card-05-five' },
  { selector: '.card-end', file: 'card-06-end' },
];

(async () => {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage({ viewport: { width: 800, height: 3000 } });
  await page.goto('file://' + HTML_PATH, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Get full page height
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.setViewportSize({ width: 800, height: pageHeight });
  await page.waitForTimeout(500);

  for (const card of CARD_SELECTORS) {
    const el = await page.$(card.selector);
    if (!el) { console.error(`NOT FOUND: ${card.selector}`); continue; }
    const box = await el.boundingBox();
    if (!box) { console.error(`NO BOX: ${card.selector}`); continue; }
    const clip = {
      x: Math.round(box.x), y: Math.round(box.y),
      width: Math.round(box.width), height: Math.round(box.height)
    };
    const outPath = `${OUTPUT_DIR}/${card.file}.png`;
    await page.screenshot({ path: outPath, clip, type: 'png' });
    const { statSync } = await import('fs');
    const size = statSync(outPath).size;
    console.log(`✅ ${card.file}.png  ${clip.width}×${clip.height}  ${(size/1024).toFixed(0)}KB`);
  }

  await browser.close();
  console.log('\n🎉 全部卡片截图完成');
})().catch(err => { console.error(err); process.exit(1); });