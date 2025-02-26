const pool = require("./database");

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS movies (
    imdbID TEXT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    plot TEXT NOT NULL
  );
`;

async function initDb() {
  try {
    await pool.query(createTableQuery);
    console.log("Table `movies` succesfully created/updated.");
  } catch (err) {
    console.error("Error creating database", err);
  }
}

initDb();