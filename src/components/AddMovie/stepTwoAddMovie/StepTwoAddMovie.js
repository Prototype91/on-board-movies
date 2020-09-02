import React from 'react';
import './StepTwoAddMovie.css';

const stepTwoAddMovie = (props) => {
    let movie = props.movie;
    console.log('FINAL CURRENT MOVIE', movie);

    return (
        <div className='StepTwoAddMovie'>
            <h1>Modifiez les informations du film avant l'ajout :</h1>
            <form onSubmit={(e) => props.pushToFavorites(e, movie)} >
                <label htmlFor="title">Titre :</label>
                <input type="text" name="title" defaultValue={movie.title} placeholder="Titre du film" required />

                <label htmlFor="date">Date de sortie :</label>
                <input type="text" name="date" defaultValue={movie.release_date} placeholder="Date au format jj-mm-aaaa" required />

                <label htmlFor="langue">Langue d'origine :</label>
                <input type="text" name="langue" defaultValue={movie.original_language} placeholder="Langue" required />

                <label htmlFor="category">Catégorie :</label>
                <input type="text" name="category" defaultValue={movie.categories} placeholder="Catégorie" required />

                <label htmlFor="similar">Titres similaires :</label>
                <input type="text" name="similar" defaultValue={movie.similar} placeholder="Titres Similaires" required />

                <label htmlFor="actors">Acteurs :</label>
                <input type="text" name="actors" defaultValue={movie.actors} placeholder="Acteurs" required />

                <label htmlFor="overview">Description :</label>
                <textarea cols="50" type="text" name="overview" defaultValue={movie.overview} placeholder="Description" required />

                <input type="submit" className="submit" value='Ajouter'></input>
            </form>
        </div>
    );
}

export default stepTwoAddMovie;