import { useMemo, useRef, useState } from 'react';
import { searchMovies } from '../../services/movies';

export function useMovies({ search, sort }) {
  const [movies, setDataMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movieError, setError] = useState(null);
  const previousSearch = useRef(search);
  
  const getMovies = async () => {
    if(search === previousSearch.current) return;
    try{
      const NewMovies = await searchMovies({ search });
      setError(null);
      setLoading(true);
      previousSearch.current = search;
      setDataMovies(NewMovies);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const sortMovies = useMemo(() => {
    return sort ? [...movies].sort((a, b) => a.year - b.year) : movies;
  },[movies, sort]);

  // const sortMovies = sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies;

  return { movies: sortMovies, getMovies, loading, movieError };
}
