import "./App.css";
import { useState, useEffect } from "react";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import ApiKey from "./ApiKey";


function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovie = async (title) => {
    const response = await fetch(ApiKey + "&s=" + title);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovie("joker");
  }, []);

  return (
    <>
      <div className="app">
        <h1>Movie</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(name) => setSearchTerm(name.target.value)}
          />
          <img src={SearchIcon} alt="search-icon" onClick={() => searchMovie(searchTerm)} />
        </div>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.imdbID} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </>
  );
}
export default App;
