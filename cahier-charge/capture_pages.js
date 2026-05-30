const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const root = path.resolve(__dirname, '..');
const outDir = path.join(__dirname, 'captures-reelles');
fs.mkdirSync(outDir, { recursive: true });

const pages = [
  ['01_accueil', 'index.html'],
  ['02_le_groupe', 'groupe.html'],
  ['03_services', 'services.html'],
  ['04_projets', 'projets.html'],
  ['05_fondation', 'fondation.html'],
  ['06_actualites', 'actualites.html'],
  ['07_evenements', 'evenements.html'],
  ['08_carrieres', 'carrieres.html'],
  ['09_contact', 'contact.html'],
  ['10_administration', 'admin.html'],
];

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1050 }, deviceScaleFactor: 1 });
  page.setDefaultTimeout(30000);

  for (const [name, file] of pages) {
    const url = `file:///${path.join(root, file).replace(/\\/g, '/')}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    await page.screenshot({
      path: path.join(outDir, `${name}.png`),
      fullPage: false,
    });
  }

  await browser.close();
  console.log(outDir);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
