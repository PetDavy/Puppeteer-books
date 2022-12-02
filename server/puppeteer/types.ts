export interface Genre {
  id: string;
  name: string;
  link: string;
}

export interface BookInfo {
  id: string;
  title: string;
  author: string | null;
  description: string | null;
}