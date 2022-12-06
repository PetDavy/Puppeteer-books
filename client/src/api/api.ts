import { GenreType, BookInfoType, CheckoutUrlObject } from './types';

const SERVER_URL = 'http://localhost:8000';


export async function getGenres(): Promise<GenreType[]> {
  try {
    const response = await fetch(`${SERVER_URL}/api/genres/`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    return [];
  }
}

export async function getBookInfo(link: string): Promise<BookInfoType | null> {
  try {
    const response = await fetch(`${SERVER_URL}/api/book-info/?url=${link}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function getCheckoutUrl(title): Promise<CheckoutUrlObject> {
  try {
    const response = await fetch(`${SERVER_URL}/api/checkout/?title=${title}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    return { checkoutUrl: null };
  }
}