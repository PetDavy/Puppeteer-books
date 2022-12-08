import { Genre, BookInfo } from './types';
import { getPage } from './common';

import {
  CATEGORIES,
  CATEGORY,
  GENRE_NAME,
  BOOK_ID,
  BOOK_AUTHOR,
  BOOK_DESCRIPTION,
  BOOK_POLLES,
  BOOK_TITLE,
  LINK,
  CTA_BANNER,
  BOOK_TITLE_B,
  BOOK_AUTHOR_B,
  BOOK_DESCRIPTION_B,
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
    const genreLink = await genre.$eval(LINK, (el) => el.getAttribute('href'));

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

  await page.waitForSelector(BOOK_POLLES);
  const bookPolles = await page.$$(BOOK_POLLES);

  for (const bookPolle of bookPolles) {
    const id = await bookPolle.$eval(BOOK_ID, (el) => el.getAttribute('data-resource-id'));
    let titleSelector = BOOK_TITLE;
    let authorSelector = BOOK_AUTHOR;
    let descriptionSelector = BOOK_DESCRIPTION;

    await Promise.all([
      page.waitForNavigation(),
      bookPolle.click(),
    ])
    
    const isAlternativePage = await page.$(CTA_BANNER);
    
    if (isAlternativePage) {
      titleSelector = BOOK_TITLE_B;
      authorSelector = BOOK_AUTHOR_B;
      descriptionSelector = BOOK_DESCRIPTION_B;
    }
    
    await Promise.all([
      page.waitForSelector(titleSelector),
      page.waitForSelector(authorSelector),
      page.waitForSelector(descriptionSelector),
    ])

    const bookTitle = await page.$eval(titleSelector, (el) => el.textContent);
  
    if (!id || !bookTitle) {
      continue;
    }
  
    const bookAuthor = await page.$eval(authorSelector, (el) => el.textContent);
    const bookDescription = await page.$eval(descriptionSelector, (el) => el.textContent);
  
    await browser.close();
  
    return {
      id,
      title: bookTitle,
      author: bookAuthor,
      description: bookDescription,
    } as BookInfo;
  }

  await browser.close();
  return {} as BookInfo;
}
