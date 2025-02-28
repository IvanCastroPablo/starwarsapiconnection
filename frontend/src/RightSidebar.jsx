import React from 'react';

function RightSidebar({ savedMovies, handleSelectSavedMovie }) {
  return (
    <aside className="sidebar">
      <h2 id="savedmovies">Saved Movies</h2>
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
  );
}

export default RightSidebar;