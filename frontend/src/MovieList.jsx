import { useEffect, useState } from "react";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/movies")
      .then((res) => res.json())
      .then(setMovies)
      .catch(console.error);
  }, []);

  const handleSelectedMovie = (imdbID) => {
    fetch(`http://localhost:3000/api/movies/${imdbID}`)
      .then((res) => res.json())
      .then(setSelectedMovie)
      .catch(console.error);
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
      .then((data) => console.log("Película añadida:", data))
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
        />
        <ul>
          {movies
            .filter(({ title }) => title.toLowerCase().includes(titleFilter.toLowerCase()))
            .map(({ imdbID, title, year }) => (
              <li
                key={imdbID}
                onClick={() => handleSelectedMovie(imdbID)}
                style={{ cursor: "pointer" }}
              >
                {title}
              </li>
            ))}
        </ul>
        <p id="selectmovie">select one movie to see more details and add it or remove it from the database</p>
      </aside>

      <div id="selected-movie" style={{ flex: 2 }}>
        {selectedMovie ? (
          <div>
            <h2>
              {selectedMovie.title} ({selectedMovie.year})
            </h2>
            <p>
              <strong>Plot:</strong> {selectedMovie.plot}
            </p>
            <p>
              <strong>IMDB ID:</strong> {selectedMovie.imdbID}
            </p>
            <button onClick={handleAddMovie}>Add to the database</button>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default MovieList;
