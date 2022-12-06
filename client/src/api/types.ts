export interface GenreType {
  id: string;
  name: string;
  link: string;
}

export interface BookInfoType {
  title: string;
  author: string;
  description: string;
}

export interface CheckoutUrlObject {
  checkoutUrl: string|null;
}
