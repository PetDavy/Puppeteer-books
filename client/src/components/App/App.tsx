import React, { useState, useEffect } from 'react';
import { Genres } from '../Genres';
import { Loader } from '../Loader';
import { getGenres } from '../../api/api';
import { GenreType } from '../../api/types';

import './App.scss';

export function App() {
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGenres();
  }, []);

  const loadGenres = async() => {
    const genres = await getGenres();
    setGenres(genres);
    setIsLoading(false);
  }

  return (
    <div className="App">
      <h1 className="App__title">
        Choose You Favorite Genre
      </h1>
      <div className="App__content">
        {isLoading ? (
          <Loader />
        ) : (
          <Genres genres={genres} />
        )}
      </div>
    </div>
  )
}
