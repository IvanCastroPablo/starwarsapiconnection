const { Pool } = require("pg");
require("dotenv").config({ path: "../.env" });

// Conexión sin especificar base de datos
const adminPool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: String(process.env.DB_PASSWORD),
  port: process.env.DB_PORT,
  database: "postgres", // Nos conectamos a la base general para gestionar DBs
});

const dbName = process.env.DB_NAME;

async function initDb() {
  try {
    // Verificar si la base de datos existe
    const dbExists = await adminPool.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);

    if (dbExists.rowCount === 0) {
      console.log(`Creating ${dbName}...`);
      await adminPool.query(`CREATE DATABASE "${dbName}"`);
    }

    // Cerrar conexión administrativa
    await adminPool.end();

    // Ahora nos conectamos a la base de datos recién creada
    const pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: dbName,
      password: String(process.env.DB_PASSWORD),
      port: process.env.DB_PORT,
    });

    await pool.query(`
      CREATE TABLE IF NOT EXISTS movies (
        imdbID TEXT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        year INT NOT NULL,
        plot TEXT NOT NULL
      );
    `);

    await pool.end();
  } catch (err) {
    console.error("Database inicialization error:", err);
  }
}

module.exports = { initDb };