// añado esta línea porque database.js no me estaba cargando  el .env
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const logging = require("./routers/logging");
const app = express();

app.use(express.json());

// importaciones database
const { initDb } = require("./db/initDb"); // <-- por si no existía previamente
const pool = require("./db/database"); // <-- si ya existe


// delego todo después de initDb para asegurarme de que existe base de datos:
initDb().then(() => {
  // uso cors porque la aplicación usa dos puertos distintos
  app.use(cors({
      credentials: true
  }));
  // middlewares para las llamadas a la api
  const calls = require("./routers/middlewares");
  // un middleware para todas las llamadas que da información en consola.
  app.use(logging);

  app.use("/api", calls);

  // sirviendo react usando vite...
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });

  // Comprobar conexión con PostgreSQL antes de iniciar el servidor
  async function startServer() {
      try {
        await pool.query("SELECT 1"); // Comprobación mínima de conexión
        console.log("Database connection: success.");
    
        const PORT = process.env.PORT || 3000;
        const url = "http://localhost:3000/dashboard";
    
        app.listen(PORT, () => {
          console.log(
            `Servidor corriendo en el puerto ${PORT}\n\n-----------------------\n| VISITE \x1B]8;;${url}\x1B\\ESTE ENLACE.\x1B]8;;\x1B\\ |\n-----------------------\n`
          );
        });
      } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
      }
    }
    
    startServer();
});

module.exports = { app };