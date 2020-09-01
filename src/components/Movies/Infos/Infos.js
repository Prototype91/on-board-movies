import React from 'react';
import { useParams } from 'react-router-dom'
import './Info.css';

function Info(props) {

    let id = useParams();
    console.log('INFO MOVIES', props.movies)
    let filteredMovie = props.movies.filter(movie => movie.id == id.id);
    let movie = filteredMovie[0];

    return (
        <div>
            {movie !== undefined ? <section className="Info">
                <h1>{movie.title}</h1>
            </section> : <p>Erreur id url</p>}
        </div>
    );
}

export default Info;