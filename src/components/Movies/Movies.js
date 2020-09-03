import React, { useState } from 'react';
import Movie from './Movie/Movie';
import { useHistory } from "react-router";
import Infos from './Infos/Infos';
import './Movies.css';

const Movies = (props) => {

    const [currentMovie, setCurrentMovie] = useState(null);

    const history = useHistory();

    const viewMovieInfo = (id) => {
        const filteredMovie = props.movies.filter(movie => movie.id === id);
        setCurrentMovie(filteredMovie);
        history.push(`/infos/${id}`);
    }

    return (
        <article className="Movies">
            <h1 className="title-movies">Ma Bibliothèque : </h1>
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
            )) : <p>Aucun film dans votre bibliotèque</p>}
            {currentMovie && <Infos />}
        </article>
    );
}

export default Movies;
