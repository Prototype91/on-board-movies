import React from 'react';
import defaultImage from '../../../assets/no-image.png';
import './Movie.css';

const Movie = (props) => {
    return (
        <div className="Movie" >
            <div className="wrapper">
                <div className="cards">
                    <figure className="card" onClick={() => props.viewMovieInfo(props.id)}>
                        {props.poster === null ?
                            <img src={defaultImage} alt="Poster" /> :
                            <img src={props.poster} alt="Poster" />}
                        <figcaption>
                            <p>{props.title}</p>
                        </figcaption>
                    </figure>
                </div>
                <p>Sortie : {props.release_date}</p>
                <p>Synopsis : {props.description.substring(0, 200)}...</p>
                <input type="submit" value="Modifier" className="edit-btn"></input>
                <input type="submit" value="Supprimer" className="delete-btn"></input>
            </div>
        </div>
    );
}

export default Movie;