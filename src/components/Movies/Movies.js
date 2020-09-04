import React, { useState } from 'react';
import Movie from './Movie/Movie';
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import Infos from './Infos/Infos';
import './Movies.css';

const Movies = (props) => {

    //Hook for the current movie
    const [currentMovie, setCurrentMovie] = useState(null);

    const history = useHistory();

    // Function to set the movie to add and go to its infos
    const viewMovieInfo = (id) => {
        // Get the movie
        const filteredMovie = props.movies.filter(movie => movie.id === id);
        setCurrentMovie(filteredMovie);
        // Goes to Infos component with the movie id
        history.push(`/infos/${id}`);
    }

    return (
        <article className="Movies">
            <h1 className="title-movies">Ma Bibliothèque : <Link className="addMovieLink" to='/addMovies'>Ajouter un Film</Link></h1>
            {props.movies.length > 0 && currentMovie === null ? props.movies.map((movie, index) => (
                <Movie
                    id={movie.id}
                    key={index}
                    title={movie.title}
                    release_date={movie.release_date}
                    description={movie.description}
                    poster={movie.poster}
                    viewMovieInfo={viewMovieInfo}
                    deleteMovie={props.deleteMovie}
                    editMovie={props.editMovie}
                />
            )) : <h1>Aucun film dans votre bibliotèque</h1>}
            {currentMovie && <Infos />}
        </article>
    );
}

export default Movies;
