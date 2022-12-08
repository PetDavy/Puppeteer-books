import { ElementHandle, Page } from "puppeteer";
import { getPage } from "./common";
import {
  CATEGORY_SELECT,
  CATEGORY_SELECT_VALUE,
  SEARCH_BAR,
  SEARCH_BAR_SUBMIT,
  BOOK_IMAGE,
  LOCATION_SELECT,
  COUNTRY_SELECT,
  COUNTRY_DROPDOWN,
  DONE_BUTTON,
  FORMATS,
  BUY_NOW_BUTTON,
  COUNTRY_CANADA,
  LINK,
} from "./selectors";

export async function prepareOrder(url: string, title: string): Promise<string | void> {
  const [amazonPage, browser] = await getPage(url);

  await findBook(amazonPage, title);
  await setLocation(amazonPage);
  await chooseFormat(amazonPage); 
  const checkoutUrl = await getCheckoutUrl(amazonPage);

  await browser.close();

  return checkoutUrl;
}

async function findBook(page: Page, title: string): Promise<void> {
  await page.select(CATEGORY_SELECT, CATEGORY_SELECT_VALUE);
  await page.type(SEARCH_BAR, title);
  await Promise.all([
    page.waitForNavigation(),
    page.click(SEARCH_BAR_SUBMIT),
  ]);

  const bookImage = await page.$(BOOK_IMAGE);

  if (!bookImage) {
    throw new Error('Book not found');
  }

  await bookImage.click(),
  await page.waitForNavigation();
}

async function setLocation(page: Page): Promise<void>  {
  const locationSelect = await page.$(LOCATION_SELECT);
  
  if (!locationSelect) {
    return;
  }

  await Promise.all([
    page.waitForSelector(COUNTRY_SELECT),
    locationSelect.click(),
  ])

  const countrySelect = await page.$(COUNTRY_SELECT);

  await Promise.all([
    page.waitForSelector(COUNTRY_DROPDOWN),
    countrySelect?.click({delay: 1000}),
  ])

  const [country] = await page.$x(COUNTRY_CANADA);
  await (country as ElementHandle)?.click();
  await page.waitForSelector(DONE_BUTTON);

  const doneButton = await page.$(DONE_BUTTON);
  await doneButton?.click();
  await page.waitForNavigation();
}

async function chooseFormat(page: Page): Promise<void> {
  const formats = await page.$$(FORMATS);

  for (const format of formats) {
    const formatTitle = await format.evaluate(el => el.querySelector('a span')?.textContent, );

    if (formatTitle?.includes('Paperback') || formatTitle?.includes('Hardcover')) {
      const isSelectedFormat = await format.evaluate(el => el.classList.contains('selected'));

      if (!isSelectedFormat) {
        const formatLink = await format.$(LINK);

        await formatLink?.click();
        await page.waitForNavigation();
      }

      break;
    }
  }

  await page.waitForSelector(BUY_NOW_BUTTON);
}

async function getCheckoutUrl(page: Page): Promise<string | void> {
  const buyNowButton = await page.$(BUY_NOW_BUTTON);

  if (!buyNowButton) {
    throw new Error('This book is not available in Your country');
  }

  await buyNowButton.click();

  await page.waitForNavigation();
  const checkoutUrl = page.url();

  return checkoutUrl;
}