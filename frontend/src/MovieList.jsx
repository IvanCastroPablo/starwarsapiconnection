import { useEffect, useState } from "react";
import LeftSidebar from "./LeftSidebar";
import MovieDetails from "./MovieDetails";
import RightSidebar from "./RightSidebar";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [savedMovies, setSavedMovies] = useState([]);

  const refreshMovies = () => {
    fetch("http://localhost:3000/api/movies")
      .then((res) => res.json())
      .then(setMovies)
      .catch(console.error);
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/movies")
      .then((res) => res.json())
      .then(setMovies)
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/saved-movies")
      .then((res) => res.text())
      .then((text) => {
        try {
          const rawData = text ? JSON.parse(text) : [];
          
          const normalizedData = rawData.map(movie => {
            const id = movie.imdbid; // <-- SÍ, ESTO ES CORRECTO PORQUE ASÍ LO TRATO EN LA DATABASE Y EN LOS MIDDLEWARES
            
            return {
              imdbID: id,
              title: movie.title,
              year: movie.year,
              plot: movie.plot
            };
          });
          
          console.log("Normalized saved movies:", normalizedData); // Verifica los datos normalizados
          setSavedMovies(normalizedData);
        } catch (error) {
          console.error("Error al procesar datos:", error);
          setSavedMovies([]);
        }
      })
      .catch(console.error);
  }, []);

  const refreshSavedMovies = () => {
    fetch("http://localhost:3000/api/saved-movies")
      .then((res) => res.text())
      .then((text) => {
        const rawData = text ? JSON.parse(text) : [];
        return rawData.map(movie => ({
          imdbID: movie.imdbid,
          title: movie.title,
          year: movie.year,
          plot: movie.plot
        }));
      })
      .then(setSavedMovies)
      .catch(console.error);
  };

  const handleSelectedMovie = (imdbID) => {
    fetch(`http://localhost:3000/api/movies/${imdbID}`)
      .then((res) => res.json())
      .then(setSelectedMovie)
      .catch(console.error);
  };

  const handleSelectSavedMovie = (imdbID) => {
    console.log("ID recibido:", imdbID);
    
    // Buscar la película en el array de películas guardadas
    const savedMovie = savedMovies.find(movie => {
      return movie.imdbID === imdbID;
    });
    
    if (savedMovie) {
      // Crear un objeto con la estructura correcta, independientemente de la original
      const movieToSelect = {
        imdbID: savedMovie.imdbID,
        title: savedMovie.title,
        year: savedMovie.year,
        plot: savedMovie.plot
      };
      
      setSelectedMovie(movieToSelect);
    } else {
      // Fallback a la API externa
      handleSelectedMovie(imdbID);
    }
  };

  const handleAddMovie = () => {
    if (!selectedMovie) return;
  
    fetch("http://localhost:3000/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imdbID: selectedMovie.imdbID }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al añadir la película");
        }
        return res.json();
      })
      .then(() => {
        refreshSavedMovies();
        refreshMovies();
      })
      .catch(console.error);
  };
  
  const handleRemoveMovie = () => {
    if (!selectedMovie) return;

    fetch("http://localhost:3000/api/movies", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imdbID: selectedMovie.imdbID }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al eliminar la película");
        }
        return res.json();
      })
      .then(() => {
        refreshSavedMovies();
        refreshMovies();
      })
      .catch(console.error);
  };

  return (
    <div className="container">
      <LeftSidebar 
        movies={movies} 
        titleFilter={titleFilter} 
        setTitleFilter={setTitleFilter} 
        handleSelectedMovie={handleSelectedMovie} 
      />
      
      <MovieDetails 
        selectedMovie={selectedMovie} 
        handleAddMovie={handleAddMovie} 
        handleRemoveMovie={handleRemoveMovie} 
      />
      
      <RightSidebar 
        savedMovies={savedMovies} 
        handleSelectSavedMovie={handleSelectSavedMovie} 
      />
    </div>
  );
}

export default MovieList;

