import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { getGenres, getBookInfo } from './puppeteer/setup';
import { prepareOrder } from './puppeteer/orderAmazon';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const booksInfoRoot = process.env.BOOKS_INFO_ROOT || '';
const categoriesUrl = process.env.BOOKS_CATEGORIES_URL || '';
const amazonUrl = process.env.AMAZON_URL || '';

app.use(cors({
  origin: '*',
}))

app.get('/api/genres', async (req: Request, res: Response) => {
  const genres = await getGenres(`${booksInfoRoot}${categoriesUrl}`);

  res.json(genres);
});

app.get('/api/book-info', async (req: Request, res: Response) => {
  const { url } = req.query;

  if (!url) {
    res.status(400).send('Bad request');
    return;
  }

  const bookInfo = await getBookInfo(`${booksInfoRoot}${url}`);

  res.json(bookInfo);
});

app.get('/api/checkout', async (req: Request, res: Response) => {
  const { title } = req.query;

  if (!title || typeof title !== 'string') {
    res.status(400).send('Bad request');
    return;
  }

  try {
    const checkoutUrl = await prepareOrder(amazonUrl, title);
    res.json({ checkoutUrl });
  } catch(err) {
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});