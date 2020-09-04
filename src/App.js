import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Axios from 'axios';
import Movies from './components/Movies/Movies';
import AddMovies from './components/AddMovie/AddMovie';
import EditMovie from './components/EditMovie/EditMovie';
import Filter from './components/Filter/Filter';
import Info from './components/Movies/Infos/Infos';
import './App.css';

const App = () => {

  // Hook for you favorite movies
  const [movies, setMovies] = useState([]);

  // URL to get all your favorite movies
  const REQUEST_URL = 'http://localhost:3000/movies';

  // Gets all your favorite movies
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

  // Function to delete a movie from your favorites
  const deleteMovie = (id) => {
    Axios.delete(`http://localhost:3000/movies/${id}`)
      .then(response => {
        console.log(response);
        // Updates your favorite movies after deletion
        updateFavoriteMovies();
      })
      .catch(error => {
        console.log(error);
      })
  }

  // Function to filter your movies
  const filterMovies = (e) => {
    e.preventDefault();
    console.log('FILTER MOVIES');
  }

  // Function to update your favorite movies after editing, deleting or adding
  const updateFavoriteMovies = () => {
    Axios.get(REQUEST_URL)
      .then(movies => {
        console.log("Mes Films : ", movies.data);
        let myNewMovies = movies.data;
        setMovies(myNewMovies);
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
          <Filter
            filterMovies={filterMovies}
          />
          <Movies
            movies={movies}
            deleteMovie={deleteMovie}
          />
        </Route>
        <Route exact path='/addMovies'>
          <AddMovies
            updateFavoriteMovies={updateFavoriteMovies}
          />
        </Route>
        <Route exact path='/infos/:id'>
          <Info
            movies={movies}
            deleteMovie={deleteMovie}
          />
        </Route>
        <Route exact path='/movie/edit/:id'>
          <EditMovie
            movies={movies}
            updateFavoriteMovies={updateFavoriteMovies}
          />
        </Route>
      </main>
    </Router>
  );
}

export default App;
