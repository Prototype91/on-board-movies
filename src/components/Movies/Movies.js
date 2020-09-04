import React, { useState } from 'react';
import Movie from './Movie/Movie';
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import './Movies.css';

const Movies = (props) => {

    const history = useHistory();

    // Function to set the movie and go to its infos
    const viewMovieInfo = (id) => {
        // Goes to Infos component with the movie id
        history.push(`/infos/${id}`);
    }

    return (
        <article className="Movies">
            <h1 className="title-movies">Ma Bibliothèque :</h1>
            <div className='back-ctn'>
                <Link className='back-link' to='/addMovies'>Ajouter un Film</Link>
            </div>
            {props.movies.length > 0 ? props.movies.map((movie, index) => (
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
            )) : <h1 className='no-movies'>Aucun film dans votre bibliotèque ...</h1>}
        </article>
    );
}

export default Movies;
