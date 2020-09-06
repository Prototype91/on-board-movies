import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { goToTop } from 'react-scrollable-anchor';
import uniqid from 'uniqid';
import defaultImage from '../../../assets/no-image.png';
import './Infos.css';

const Info = (props) => {
    // Goes to the top of the page
    goToTop();

    // Gets the id in the url
    let id = useParams();
    // Check what movie you want to add
    let filteredMovie = props.movies.filter(movie => Number(movie.id) === Number(id.id));
    // This is the movie wanted
    let movie = filteredMovie[0];

    // Declarations of specific data
    let actorsArray;
    let categoriesArray;
    let similarMovies;

    // If the movie is defined and identified :
    if (movie) {
        // Gets the data to display
        actorsArray = movie.actors;
        categoriesArray = movie.categories.map(category => category).join(' , ');
        similarMovies = movie.similar_movies;
    }

    return (
        <React.Fragment key={uniqid()}>
            {movie !== undefined ?
                <article>
                    <section className='Infos'>
                        <h1>Voici le détail du film {movie.title}</h1>
                        {movie.backdrop !== 'http://image.tmdb.org/t/p/originalnull' &&
                            <img className='back-drop' src={movie.backdrop} alt='backdrop' />}
                        <div className='back-ctn'>
                            <Link className='back-link' to='/'>Retour</Link>
                        </div>
                        {movie.poster === 'http://image.tmdb.org/t/p/w185null' ? <img src={defaultImage} alt='Poster' /> : <img src={movie.poster} alt='Poster' />}
                        <h1>Titre : {movie.title}</h1>
                        <h2>Date de sortie : {movie.release_date}</h2>
                        <h2>Catégories : {categoriesArray}</h2>
                        <p>Synopsis : {movie.description}</p>
                        <Link to={`/movie/edit/${movie.id}`} className='edit-btn'>Modifier</Link>
                        <Link to='/' className='delete-btn' onClick={() => props.deleteMovie(movie.id)}>Supprimer</Link>
                    </section>
                    <section className='wrapper'>
                        {similarMovies.length > 0 && <h2 className='similar'>Films Similaires :</h2>}
                        <div className='cards'>
                            {similarMovies.length > 0 && similarMovies.map((similarMovie, index) => (
                                <figure key={uniqid()} className='card'>
                                    {similarMovie.poster === 'http://image.tmdb.org/t/p/w185null' ?
                                        <img src={defaultImage} alt='acteur' /> : <img src={similarMovie.poster} alt='poster' />}
                                    <figcaption>
                                        <p>{similarMovie.title}</p>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </section>
                    <section className='wrapper'>
                        {actorsArray.length > 0 && <h2>Acteurs du film :</h2>}
                        <div className='cards'>
                            {actorsArray.length > 0 && actorsArray.map((actor, index) => (
                                <figure key={uniqid()} className='card'>
                                    {actor.photo === 'http://image.tmdb.org/t/p/w185null' ?
                                        <img src={defaultImage} alt='acteur' /> : <img src={actor.photo} alt='acteur' />}
                                    <figcaption>
                                        <p>{actor.name + ' : ' + actor.character}</p>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </section>
                </article> :
                <p>Aucun film en détail à afficher ...</p>}
        </React.Fragment>
    );
}

export default Info;