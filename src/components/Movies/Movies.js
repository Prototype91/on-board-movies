import React, { useState } from 'react';
import Movie from './Movie/Movie';
import { useHistory } from "react-router";
import Infos from './Infos/Infos';
import './Movies.css';

const Movies = (props) => {

    const [currentMovie, setCurrentMovie] = useState(null);

    const history = useHistory();

    const viewMovieInfo = (id) => {
        console.log('ID : ', id);
        const filteredMovie = props.movies.filter(movie => movie.id === id);
        setCurrentMovie(filteredMovie);
        console.log(filteredMovie);
        history.push(`/infos/${id}`);
    }

    return (
        <article className="Movies">
            <section className="row">
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
                    />
                )) : <p>Aucun film dans votre bibliotèque</p>}
                {currentMovie && <Infos title={currentMovie[0].title} />}
            </section>
        </article>
    );
}

export default Movies;
