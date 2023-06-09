import { useEffect, useState, useRef } from "react";

function useSearch() {
  const [search, setSearch] = useState('movie');
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
      return;
    }
    
    if (search === '') {
      setError('No se puede buscar una pelicula vacia');
      return;
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con numeros');
      return;
    }

    if (search.length < 3) {
      setError('La busqueda debe tener al menos tres caracteres');
      return;
    }
    setError(null);
  }, [search]);

  return { search, setSearch, error };
}

export default useSearch;