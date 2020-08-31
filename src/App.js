import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movies from './components/Movies/Movies';
import Search from './components/Search/Search';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/movies')
      .then(movies => {
        console.log(movies.data);
        setMovies(movies.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  console.log('MOVIES', movies);

  return (
    <div className="ctn">
      <header>
        <Search />
        <h1>Ma Bibliothèque : </h1>
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
