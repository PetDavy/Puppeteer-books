import puppeteer, { Page, Browser, ElementHandle }  from 'puppeteer';
import { Genre, BookInfo } from './types';
import { getPage } from './common';

import {
  CATEGORIES,
  CATEGORY,
  GENRE_NAME,
  BOOK_ID,
  BOOK_AUTHOR,
  BOOK_DESCRIPTION,
} from './selectors';

export async function getGenres(booksUrl: string): Promise<Genre[]> {
  const [page, browser] = await getPage(booksUrl);
  const categories = await page.$(CATEGORIES);

  if (!categories) {
    return [];
  }

  const genresElements = await categories.$$(CATEGORY);

  const genresPromises = genresElements.map(async (genre) => {
    const genreName = await genre.$eval(GENRE_NAME, (el) => el.textContent);
    const genreLink = await genre.$eval('a', (el) => el.getAttribute('href'));

    return {
      id: genreLink?.split('/')[2] || null,
      name: genreName?.trim() || null,
      link: genreLink,
    };
  });

  const genres = (await Promise.all(genresPromises))
    .filter((genre) => genre.name && genre.link);

  await browser.close();

  return genres as Genre[];
}

export async function getBookInfo(url: string): Promise<BookInfo> {
  const [page, browser] = await getPage(url);
  const bookPolles = await page.$$('.pollAnswer');

  for (const bookPolle of bookPolles) {
    await page.waitForTimeout(1000);
    await bookPolle.hover();
    await page.waitForTimeout(1000);

    const id = await bookPolle.$eval(BOOK_ID, (el) => el.getAttribute('data-resource-id'));
    const bookTitle = await page.evaluate(el => el.querySelector('h2 a')?.textContent, bookPolle);
  
    if (!id || !bookTitle) {
      continue;
    }
  
    const bookAuthor = await bookPolle.$eval(BOOK_AUTHOR, (el) => el.textContent);
    const bookDescription = await bookPolle.$eval(BOOK_DESCRIPTION, (el) => el.textContent);
  
    await browser.close();
  
    return {
      id,
      title: bookTitle,
      author: bookAuthor,
      description: bookDescription,
    } as BookInfo;
  }

  return {} as BookInfo;
}
