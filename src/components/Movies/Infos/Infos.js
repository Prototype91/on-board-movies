import React from 'react';
import { useParams } from 'react-router-dom';
import defaultImage from '../../../assets/no-image.png';
import './Infos.css';

const Info = (props) => {
    let id = useParams();
    console.log('INFO MOVIES', props.movies)
    let filteredMovie = props.movies.filter(movie => Number(movie.id) === Number(id.id));
    let movie = filteredMovie[0];
    let actorsArray;
    let categoriesArray;
    let similarMoviesArray;
    if(movie) {
        actorsArray = movie.actors.map(actor => actor.name).join(' , ');
        categoriesArray = movie.categories.map(category => category).join(' , ');
        similarMoviesArray = movie.similar_movies.map(similar_movie => similar_movie.title).join(' , ');
    }

    return (
        <div className='ctn'>
            {movie !== undefined ?
                <section className="Infos">
                    <h1>Voici le détail du film {movie.title}</h1>
                    {movie.poster === null ? <img src={defaultImage} alt="Poster" /> : <img src={movie.poster} alt="Poster" />}
                    <h1>Titre : {movie.title}</h1>
                    <h2>Date de sortie : {movie.release_date}</h2>
                    <h2>Acteurs : {actorsArray}</h2>
                    <h2>Catégories : {categoriesArray}</h2>
                    <h2>Films similaires : {similarMoviesArray}</h2>
                    <p>Synopsis : {movie.description}</p>
                    <input type="submit" value="Modifier" className="edit-btn"></input>
                    <input type="submit" value="Supprimer" className="delete-btn"></input>
                </section> : <p>Erreur id url</p>}
        </div>
    );
}

export default Info;