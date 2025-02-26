const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const logging = require("./routers/logging");

// uso cors porque la aplicación usa dos puertos distintos
app.use(cors({
    credentials: true
}));

// middlewares para las llamadas a la api
const calls = require("./routers/middlewares");

// un middleware para todas las llamadas que da información en consola.
app.use(logging);

app.use("/", calls);

// sirviendo react usando vite...
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 3000;
const url = "http://localhost:3000/dashboard"

app.listen(PORT,() => {
    console.log(`Servidor corriendo en el puerto ${PORT}\n\n-----------------------\n| VISITE \x1B]8;;${url}\x1B\\ESTE ENLACE.\x1B]8;;\x1B\\ |\n-----------------------\n`);
});

module.exports = {
    app
}; 