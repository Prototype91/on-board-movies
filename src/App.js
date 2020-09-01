import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Axios from 'axios';
import Movies from './components/Movies/Movies';
import AddMovies from './components/AddMovie/AddMovie';
import Filter from './components/Filter/Filter';
import './App.css';
import Info from './components/Movies/Infos/Infos';

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
    <Router>
      <main>
        <Route exact path='/'>
          <Filter />
          <Movies movies={movies} />
          <Link className="addMovieLink" to='/addMovies'>Ajouter un Film</Link>
        </Route>
        <Route exact path='/addMovies'>
          <AddMovies />
        </Route>
        <Route exact path='/infos/:id'>
          <Info movies={movies}/>
        </Route>
      </main>
    </Router>
  );
}

export default App;
