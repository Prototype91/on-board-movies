import React, { useState, useEffect } from 'react';
import { Route, Link } from "react-router-dom";
import Axios from 'axios';
import Movies from './components/Movies/Movies';
import AddMovies from './components/AddMovie/AddMovie';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);

  const REQUEST_URL = 'http://localhost:3000/movies'

  useEffect(() => {
    Axios.get(REQUEST_URL)
      .then(movies => {
        console.log("Mes Films : ", movies.data);
        let myMovies = movies.data;
        setMovies(myMovies);
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
          <Link className="addMovieLink" to='/addMovies'>Ajouter un Film</Link>
        </Route>
        <Route exact path='/addMovies'>
          <AddMovies />
        </Route>
      </main>
    </div>
  );
}

export default App;
