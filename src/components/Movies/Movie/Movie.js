import React from 'react';
import defaultImage from '../../../assets/no-image.png';
import './Movie.css';

const Movie = (props) => {
    return (
        <div className="Movie" onClick={() => props.viewMovieInfo(props.id)} >
            {props.poster === null ?
                <img src={defaultImage} alt="Poster" /> :
                <img src={props.poster} alt="Poster" />
            }
            <h1>{props.title}</h1>
            <h2>{props.release_date}</h2>
            <p>{props.description.substring(0, 100)}...</p>
            <input type="submit" value="Modifier" className="edit-btn"></input>
            <input type="submit" value="Supprimer" className="delete-btn"></input>
        </div>
    );
}

export default Movie;