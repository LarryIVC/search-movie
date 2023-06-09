/* eslint-disable react/prop-types */
function ListOfMovies({ movies }) {
  return (
    <ul className="movies">
      {movies?.map((movie) => (
        <li className="movie" key={movie.id}>
          <div>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
          </div>
          <img src={movie.image} alt={movie.title} />
        </li>
      ))}
    </ul>
  );
}

function NoMovies() {
  return <p className="alert">No se encontraron peliculas para esta busqueda</p>;
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;
  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMovies />;
}
