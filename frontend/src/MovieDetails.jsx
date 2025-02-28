import React from 'react';

function MovieDetails({ selectedMovie, handleAddMovie, handleRemoveMovie }) {
  return (
    <div id="selected-movie" style={{ flex: 2 }}>
      {selectedMovie ? (
        <div>
          <h2 id="title">{selectedMovie.title} ({selectedMovie.year})</h2>
          <p id="plot">Plot: {selectedMovie.plot}</p>
          <p id="imdbnumber">IMDB ID: {selectedMovie.imdbID}</p>
          <button className="control" onClick={handleAddMovie}>Add to the database</button>
          <button className="control" onClick={handleRemoveMovie}>Remove from the database</button>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default MovieDetails;