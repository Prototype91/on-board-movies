import React, { useState, useEffect } from 'react';
import Movie from './Movie/Movie';
import Filter from '../Filter/Filter';
import { Route, Link } from "react-router-dom";
import Infos from './Infos/Infos';
import './Movies.css';

function Movies(props) {

    const [currentMovie, setCurrentMovie] = useState(null);

    const viewMovieInfo = (id) => {
        console.log('ID : ', id)
        const filteredMovie = props.movies.filter(movie => movie.id === id);

        // const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null;

        setCurrentMovie(filteredMovie);

        console.log(filteredMovie);
    }

    return (
        <div className="Movies">
            <header>
                <Filter />
            </header>
            <div className="row">
                <h1 className="title-movies">Ma Bibliothèque : </h1>
                {props.movies.length > 0 && currentMovie ===null ? props.movies.map((movie, index) => (
                    <Movie
                        id={movie.id}
                        key={index}
                        title={movie.title}
                        release_date={movie.release_date}
                        description={movie.description}
                        poster={movie.poster}
                        viewMovieInfo={viewMovieInfo}
                    />
                )) : ''}
                {currentMovie ? <Infos title={currentMovie[0].title} /> : ''}
            </div>
        </div>
    );
}

export default Movies;
