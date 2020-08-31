import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movies from './components/Movies/Movies';
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
    <div className="App">
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
