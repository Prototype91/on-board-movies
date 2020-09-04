import React from 'react';
import defaultImage from '../../../assets/no-image.png';
import { Link } from 'react-router-dom';
import './Movie.css';

const Movie = (props) => {
    return (
        <div className="Movie" >
            <div className="wrapper">
                <div className="cards">
                    <figure className="card" onClick={() => props.viewMovieInfo(props.id)}>
                        {props.poster === 'http://image.tmdb.org/t/p/w185null' ?
                            <img src={defaultImage} alt="Poster" /> :
                            <img src={props.poster} alt="Poster" />}
                    </figure>
                </div>
                <p>Titre : {props.title}</p>
                <p>Sortie : {props.release_date}</p>
                <p>Synopsis : {props.description.substring(0, 200)}...</p>
                <Link to={`/movie/edit/${props.id}`} className="edit-btn">Modifier</Link>
                <input
                    type="submit"
                    value="Supprimer"
                    className="delete-btn"
                    onClick={() => props.deleteMovie(props.id)}
                />
            </div>
        </div>
    );
}

export default Movie;