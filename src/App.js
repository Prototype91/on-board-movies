import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Axios from 'axios';
import { useHistory } from "react-router";
import Movies from './components/Movies/Movies';
import AddMovies from './components/AddMovie/AddMovie';
import EditMovie from './components/EditMovie/EditMovie';
import Filter from './components/Filter/Filter';
import Info from './components/Movies/Infos/Infos';
import './App.css';

const App = () => {

  const [movies, setMovies] = useState([]);

  const REQUEST_URL = 'http://localhost:3000/movies';

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

  const deleteMovie = (id) => {
    Axios.delete(`http://localhost:3000/movies/${id}`)
      .then(response => {
        console.log(response);
        window.location.reload(false);
      })
      .catch(error => {
        console.log(error);
      })
  }

  

  return (
    <Router>
      <main>
        <Route exact path='/'>
          <h1>Bienvenue sur On-Board Movies</h1>
          <Filter />
          <Movies
            movies={movies}
            deleteMovie={deleteMovie}
          />
          <Link className="addMovieLink" to='/addMovies'>Ajouter un Film</Link>
        </Route>
        <Route exact path='/addMovies'>
          <AddMovies />
        </Route>
        <Route exact path='/infos/:id'>
          <Info
            movies={movies}
            deleteMovie={deleteMovie}
          />
        </Route>
        <Route exact path='/movie/edit/:id'>
          <EditMovie movies={movies} />
        </Route>
      </main>
    </Router>
  );
}

export default App;
