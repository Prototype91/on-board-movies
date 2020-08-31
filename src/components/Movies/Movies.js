import React from 'react';
import Movie from './Movie/Movie';
import Search from '../Search/Search';
import './Movies.css';

function Movies(props) {

    return (
        <div>
            <header>
                <Search />
            </header>
            <div className="row">
                <h1 className="title-movies">Ma Bibliothèque : </h1>
                {props.movies.length > 0 ? props.movies.map((movie, index) => (
                    <Movie
                        key={index}
                        title={movie.title}
                        release_date={movie.release_date}
                        description={movie.description}
                        poster={movie.poster}
                    />
                )) : <p>Aucun film dans votre Bibliothèque</p>}
            </div>
        </div>
    );
}

export default Movies;
