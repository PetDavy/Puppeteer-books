const SERVER_URL = 'http://localhost:8000';


export async function getGenres() {
  try {
    const response = await fetch(`${SERVER_URL}/api/genres/`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    return [];
  }
}

export async function getBookInfo(link) {
  try {
    const response = await fetch(`${SERVER_URL}/api/book-info/?url=${link}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    return {};
  }
}

export async function getCheckoutUrl(title) {
  try {
    const response = await fetch(`${SERVER_URL}/api/checkout/?title=${title}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    return {};
  }
}