import React from 'react';
import { useParams, Link } from 'react-router-dom';
import defaultImage from '../../../assets/no-image.png';
import './Infos.css';

const Info = (props) => {
    let id = useParams();
    let filteredMovie = props.movies.filter(movie => Number(movie.id) === Number(id.id));
    let movie = filteredMovie[0];
    let actorsArray;
    let categoriesArray;
    let similarMovies;
    console.log('MOOOVIES', props.movies);
    if (movie) {
        actorsArray = movie.actors;
        categoriesArray = movie.categories.map(category => category).join(' , ');
        similarMovies = movie.similar_movies;
        console.log(actorsArray)
    }

    return (
        <div>
            {movie !== undefined ?
                <div>
                    <div className='ctn'>
                        <section className="Infos">
                            <h1>Voici le détail du film {movie.title}</h1>
                            {movie.poster === null ? <img src={defaultImage} alt="Poster" /> : <img src={movie.poster} alt="Poster" />}
                            <h1>Titre : {movie.title}</h1>
                            <h2>Date de sortie : {movie.release_date}</h2>
                            <h2>Catégories : {categoriesArray}</h2>
                            <p>Synopsis : {movie.description}</p>
                            <Link to={`/movie/edit/${movie.id}`}
                                className="edit-btn"
                            >Modifier</Link>
                            <Link to='/'
                                className="delete-btn"
                                onClick={() => props.deleteMovie(movie.id)}
                                >Supprimer</Link>
                        </section>
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
                </div> : <p>Aucun film en détail à afficher ...</p>}
        </div>
    );
}

export default Info;