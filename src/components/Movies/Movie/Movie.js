import React from 'react';
import './Movie.css';

function Movie(props) {
    return (
        <div className="column">
            <div className="card">
                <img src={props.poster} />
                <h1>{props.title}</h1>
                <h2>{props.release_date}</h2>
                <p>{props.description}</p>
                <input type="submit" value="Modifier" className="edit-btn"></input>
                <input type="submit" value="Supprimer" className="delete-btn"></input>
            </div>
        </div>
    );
}

export default Movie;