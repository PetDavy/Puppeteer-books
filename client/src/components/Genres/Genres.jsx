import { useState, useEffect } from 'react';
import { Confirm } from '../Confirm';
import { getBookInfo } from "../../api/api";

import './Genres.scss';

export function Genres({ genres }) {
  const [bookInfo, setBookInfo] = useState({});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  async function handleGenreClick(genreLink) {
    setIsConfirmOpen(true);
    const bookInfo = await getBookInfo(genreLink);
    setBookInfo(bookInfo);
  }

  function closeConfirm() {
    setIsConfirmOpen(false);
    setBookInfo({});
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