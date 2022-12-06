import React, { useState, useEffect } from 'react';
import { Confirm } from '../Confirm';
import { getBookInfo } from "../../api/api";
import { GenreType, BookInfoType } from '../../api/types';

import './Genres.scss';

interface GenresProps {
  genres: GenreType[];
}

export function Genres({ genres }: GenresProps) {
  const [bookInfo, setBookInfo] = useState<BookInfoType|null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleGenreClick = async(genreLink: string) => {
    setIsConfirmOpen(true);
    const bookInfo = await getBookInfo(genreLink);
    setBookInfo(bookInfo);
  }

  const closeConfirm = (): void => {
    setIsConfirmOpen(false);
    setBookInfo(null);
  }

  return (
    <div className="Genres">
      <ul className="Genres__list">
        {genres.map(({id, name, link}) => (
          <li
            key={id}
            onClick={()=> handleGenreClick(link)}
            className="Genres__item"
          >
            {name}
          </li>
        ))}
      </ul>
      {isConfirmOpen && (
        <Confirm bookInfo={bookInfo} closeConfirm={closeConfirm} />
      )}
    </div>
  )
}