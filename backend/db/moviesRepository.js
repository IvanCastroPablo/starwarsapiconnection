const pool = require("./database");

async function addMovie({ imdbID, title, year, plot }) {
  const query = `
    INSERT INTO movies (imdbID, title, year, plot)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (imdbID) DO NOTHING;
  `;
  await pool.query(query, [imdbID, title, year, plot]);
}

async function getMovies({ title, year, imdbID }) {
  let query = "SELECT * FROM movies WHERE 1=1";
  const values = [];
  let index = 1;

  if (title) {
    query += ` AND title ILIKE $${index}`;
    values.push(`%${title}%`);
    index++;
  }
  if (year) {
    query += ` AND year = $${index}`;
    values.push(year);
    index++;
  }

  if (imdbID) {
    query += ` AND imdbID = $${index}`;
    values.push(imdbID);
    index++;
  }

  const { rows } = await pool.query(query, values);
  return rows;
}

module.exports = { addMovie, getMovies };
