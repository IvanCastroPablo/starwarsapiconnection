const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const pool = require("../db/database");
const moviesRepository = require("../db/moviesRepository");

const API_KEY = "731e41f";


// ruta para obtener todas las pelis de star wars
router.get("/movies", async (req, res) => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=star+wars`);

    if(!response.ok) return res.status(500).json({error: "API request failed! OMDBAPI may be down."});

    const { Search } = await response.json();

    res.json(Search?.map(({ imdbID, Title, Year}) => ({
        imdbID, title: Title, year: Year
    })) || []);
});

// ruta para obtener todos los datos pertinentes de un ID específico
router.get("/movies/:imdbID", async (req, res) => {
    // aquí pillo el valor del ID de la llamada
    const { imdbID } = req.params;
    // y aquí lo usamos
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`);

    if(!response.ok) return res.status(500).json({error: "API request failed! OMDBAPI may be down."}); 

    const data = await response.json();

    res.json({ 
        imdbID: data.imdbID,
        title: data.Title, 
        year: data.Year,
        plot: data.Plot
    });
});

// ruta para guardar una peli en la base de datos
// aquí lo que hago es llamar al segundo middleware para obtener los datos actuales y que el frontend solamente tenga que mandarme el ID
router.post("/movies", async (req, res) => {
    try {
        const { imdbID } = req.body;
        // Existe ya la peli? No importa dado que la función de pg ignora la orden si hay conflicto. Me ahorro un bloque de if(peli) => error

        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`);

        if (!response.ok) return res.status(500).json({ error: "API request failed! OMDBAPI may be down." });

        const movieData = await response.json();
        const { Title, Year, Plot } = movieData;

        // Insertar en la base de datos
        const newMovie = await moviesRepository.addMovie({ imdbID, title: Title, year: Year, plot: Plot });

        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ error: "Error saving movie", details: error.message });
    }
});

// ruta para obtener todas las pelis guardadas en la base de datos
router.get("/saved-movies", async (req, res) => {
    try {
        const movies = await moviesRepository.getMovies({});
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Error fetching saved movies", details: error.message });
    }
});

// exporto el router...
module.exports = router;
