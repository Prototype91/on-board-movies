import React from 'react';
import './Movie.css';

function Movie(props) {
    return (
        <div className="Movie">
            <img src={props.poster} />
            <h1>{props.title}</h1>
            <h2>{props.release_date}</h2>
            <p>{props.description}</p>
        </div>
    );
}

export default Movie;