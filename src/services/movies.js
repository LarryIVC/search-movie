const KEY = 'c40919d';
const API_URL = 'http://www.omdbapi.com/';

export const searchMovies = async ({ search }) => {
  if (search === '') return null;
  try {
    const response = await fetch(`${API_URL}?apikey=${KEY}&s=${search}`)
    const json = await response.json();
  
    const movies = json.Search;
  
    const mapMovies = movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster
    }))
    return mapMovies;
  } catch (error) {
    throw new Error('No se pudo obtener la lista de peliculas', error.message);
  }
}