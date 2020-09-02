import React from 'react';
import { useParams } from 'react-router-dom';
import defaultImage from '../../../assets/no-image.png';
import './Infos.css';

const Info = (props) => {
    let id = useParams();
    let filteredMovie = props.movies.filter(movie => Number(movie.id) === Number(id.id));
    let movie = filteredMovie[0];
    let actorsArray;
    let categoriesArray;
    let similarMovies;
    if (movie) {
        actorsArray = movie.actors;
        categoriesArray = movie.categories.map(category => category).join(' , ');
        similarMovies = movie.similar_movies;
        console.log(actorsArray)
    }

    return (
        <div>
            <div className='ctn'>
                {movie !== undefined &&
                    <section className="Infos">
                        <h1>Voici le détail du film {movie.title}</h1>
                        {movie.poster === null ? <img src={defaultImage} alt="Poster" /> : <img src={movie.poster} alt="Poster" />}
                        <h1>Titre : {movie.title}</h1>
                        <h2>Date de sortie : {movie.release_date}</h2>
                        <h2>Catégories : {categoriesArray}</h2>
                        <p>Synopsis : {movie.description}</p>
                        <input type="submit" value="Modifier" className="edit-btn"></input>
                        <input type="submit" value="Supprimer" className="delete-btn"></input>
                    </section>}
            </div>
            <div className="wrapper">
                <h2>Films Similaires :</h2>
                <div className="cards">
                    {similarMovies && similarMovies.map((similarMovie, index) => (
                        <figure key={index + similarMovie.title} className="card">
                            <img src={similarMovie.poster} />
                            <figcaption>{similarMovie.title}</figcaption>
                        </figure>
                    ))}
                </div>
            </div>
            <div className="wrapper">
                <h2>Acteurs du film :</h2>
                <div className="cards">
                    {actorsArray && actorsArray.map((actor, index) => (
                        <figure key={index + actor.name} className="card">
                            <img src={actor.photo} />
                            <figcaption>
                                {actor.name + ' : ' + actor.character}
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Info;