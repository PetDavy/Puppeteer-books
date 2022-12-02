import puppeteer, { Page, Browser }  from 'puppeteer';

export async function getPage(url: string): Promise<[Page, Browser]> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768});
  await page.goto(url);

  return [page, browser];
}

async function getPageOpen(url: string): Promise<[Page, Browser]> {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768});
  await page.goto(url);

  return [page, browser];
}