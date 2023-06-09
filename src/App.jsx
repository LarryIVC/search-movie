import { useState } from 'react';
import './App.css';
import { Movies } from './components/Movies';
import { useMovies } from './components/hooks/useMovie';
import useSearch from './components/hooks/useSearch';

function App() {
  const [ sort, setSort ] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { movies, getMovies, loading, movieError } = useMovies({search, sort});
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies();
  };

  const handleChange = (e) => {
    if (e.target.value.startsWith(' ')) {
      e.target.value = search;
      return;
    }
    setSearch(e.target.value);
  };

  const handleCheck = () => {
    setSort(!sort);
  }

  return (
    <div className="page">
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            onChange={handleChange}
            placeholder="Avengers, Star Wars, Matrix, ..."
          />
          <div className="order">
            <label htmlFor="order">Ordenar</label>
            <input type="checkbox" onChange={handleCheck} checked={sort} name='order'/>
          </div>
          <button type="submit">Buscar</button>
        </form>
        {error && (
          <p
            className='alert'
          >
            {error}
          </p>
        )}
      </header>
      <main>
        {
          loading ? <p>Is loading, please wait ...</p> : <Movies movies={movies} />
        }
        {
          movieError && <p>Error en la busqueda {movieError}</p>
        }
      </main>
    </div>
  );
}

export default App;
