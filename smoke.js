const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Users/NY BRUGER/AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe', headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:8888/index.html', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  await page.waitForTimeout(1500);
  const html = await page.content();
  const hasMenu = html.includes('Start som Albert');
  const screenshotPath = 'C:/Users/NY BRUGER/Documents/hafjell-rush-new/screenshot_before.png';
  await page.screenshot({ path: 'C:/Users/NY BRUGER/Documents/hafjell-rush-new/screenshot_after.png', fullPage: true });
  console.log('MENU_VISIBLE=' + hasMenu);
  console.log('ERRORS=' + JSON.stringify(errors));
  await browser.close();
})();
