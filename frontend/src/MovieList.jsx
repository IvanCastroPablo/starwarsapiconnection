import { useEffect, useState } from "react";

const refreshMovies = () => {
    fetch("http://localhost:3000/api/movies")
      .then((res) => res.json())
      .then(setMovies)
      .catch(console.error);
  };

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [savedMovies, setSavedMovies] = useState([]);

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
      .then((text) => text ? JSON.parse(text) : [])
      .then(setSavedMovies)
      .catch(console.error);
  };

  const handleSelectedMovie = (imdbID) => {
    fetch(`http://localhost:3000/api/movies/${imdbID}`)
      .then((res) => res.json())
      .then(setSelectedMovie)
      .catch(console.error);
  };

  // AUÍ ESTÁ EL PROBLEMA -- TO DO
  const handleSelectSavedMovie = (imdbID) => {
    console.log("ID recibido:", imdbID);
    
    // Buscar la película en el array de películas guardadas
    const savedMovie = savedMovies.find(movie => {
      return movie.imdbID === imdbID;
    });
    
    if (savedMovie) {
      // Crear un objeto con la estructura correcta, independientemente de la original
      const movieToSelect = {
        imdbID: imdbID || movie.imdbid, // AQUI!!
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
      .then((data) => {
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
      <aside className="sidebar">
        <h2>"A long time ago in a galaxy far, far away..."</h2>
        <input
          type="text"
          placeholder="filter by title"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          className="control"
        />
        <ul>
          {movies
            .filter(({ title }) => title.toLowerCase().includes(titleFilter.toLowerCase()))
            .map(({ imdbID, title }) => (
              <li key={imdbID} onClick={() => handleSelectedMovie(imdbID)} style={{ cursor: "pointer" }}>
                {title}
              </li>
            ))}
        </ul>
        <p id="selectmovie">Select one movie to see more details and add it or remove it from the database</p>
      </aside>

      <div id="selected-movie" style={{ flex: 2 }}>
        {selectedMovie ? (
          <div>
            <h2>{selectedMovie.title} ({selectedMovie.year})</h2>
            <p><strong>Plot:</strong> {selectedMovie.plot}</p>
            <p><strong>IMDB ID:</strong> {selectedMovie.imdbID}</p>
            <button className="control" onClick={handleAddMovie}>Add to the database</button>
            <button className="control" onClick={handleRemoveMovie}>Remove from the database</button>
          </div>
        ) : (
          <p></p>
        )}
      </div>

      <aside className="sidebar">
        <h2>Saved Movies</h2>
        <ul>
          {savedMovies.map(({ imdbID, title }) => (
            <li 
              key={imdbID} 
              onClick={() => handleSelectSavedMovie(imdbID)} 
              style={{ cursor: "pointer" }}
            >
              {title} ({imdbID})
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default MovieList;

