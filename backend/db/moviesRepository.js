const pool = require("./database");

async function addMovie({ imdbID, title, year, plot }) {
  await pool.query(
      "INSERT INTO movies (imdbID, title, year, plot) VALUES ($1, $2, $3, $4) ON CONFLICT (imdbID) DO NOTHING",
      [imdbID, title, year, plot]
  );

  // Esperar medio segundo antes de consultar
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { rows } = await pool.query("SELECT * FROM movies");
  return rows;
}

async function getMovies() {
  const { rows } = await pool.query("SELECT * FROM movies");
  return rows;
}


async function removeMovie(imdbID) {
  const query = "DELETE FROM movies WHERE imdbID = $1;";
  await pool.query(query, [imdbID]);
}

module.exports = { addMovie, getMovies, removeMovie };
