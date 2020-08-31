import React, { useState, useEffect } from 'react';
import { Route, Link } from "react-router-dom";
import Axios from 'axios';
import Movies from './components/Movies/Movies';
import AddMovies from './components/AddMovie/AddMovie';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3000/movies')
      .then(movies => {
        console.log(movies.data);
        setMovies(movies.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  return (
    <div className="ctn">
      <main>
        <Route exact path='/'>
          <Movies movies={movies} />
          <Link to='/addMovies'>Ajouter un Film</Link>
        </Route>
        <Route exact path='/addMovies'>
          <AddMovies />
        </Route>
      </main>
    </div>
  );
}

export default App;
