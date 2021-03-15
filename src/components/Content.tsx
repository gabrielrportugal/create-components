import {useState, useEffect} from 'react';
import { MovieCard } from './MovieCard';

import {MovieProps, GenreResponseProps} from '../interfaces/index';

import { api } from '../services/api';
interface ContentProps {
  selectedGenre: GenreResponseProps;
  selectedGenreId: number;
  setSelectedGenre: React.Dispatch<React.SetStateAction<GenreResponseProps>>;
}

export function Content({selectedGenre, selectedGenreId, setSelectedGenre}:ContentProps) {

  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <div className="container">
    <header>
      <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
    </header>

    <main>
      <div className="movies-list">
        {movies.map(movie => (
          <MovieCard title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
        ))}
      </div>
    </main>
  </div>
  )
}