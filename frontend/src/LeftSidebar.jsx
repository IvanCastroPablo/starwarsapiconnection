import React from 'react';

function LeftSidebar({ movies, titleFilter, setTitleFilter, handleSelectedMovie }) {
  return (
    <aside className="sidebar">
      <h2>&quot;A long time ago in a galaxy far, far away...&quot;</h2>
      <input
        type="text"
        placeholder="filter by title"
        value={titleFilter}
        onChange={(e) => setTitleFilter(e.target.value)}
        className="control"
      />
      <ul>
        {movies
          .filter(({ title }) => title.toLowerCase().includes(titleFilter.toLowerCase()))
          .map(({ imdbID, title }) => (
            <li key={imdbID} onClick={() => handleSelectedMovie(imdbID)} style={{ cursor: "pointer" }}>
              {title}
            </li>
          ))}
      </ul>
      <p id="selectmovie">Select one movie to see more details and add it or remove it from the database</p>
    </aside>
  );
}

export default LeftSidebar;