import React, { useState } from 'react';
import { Route, Link } from "react-router-dom";
import './StepTwoAddMovie.css';
import Axios from 'axios';

const stepTwoAddMovie = (props) => {
    let movie = props.movie[0];
    let similarMovies;
    console.log('STEP TWO TITLE', movie);

    const BASE_URL = 'https://api.themoviedb.org/3/movie';
    const API_KEY = '4d196b83a81a1379fde8fb79e2df0116';
    const REQUEST_URL = `${BASE_URL}/${movie.id}/similar?api_key=${API_KEY}`;

    Axios.get(REQUEST_URL)
        .then(movies => {
            similarMovies = movies.data.results;
            console.log("Mes Films Similaires : ", similarMovies);
        })
        .catch(error => {
            console.log(error);
        });

    // actors + similar + categries

    return (
        <div>
            <h1>Modifiez les informations avant l'ajout :</h1>
            <form>
                <label htmlFor="title">Titre</label>
                <input type="text" name="title" defaultValue={movie.title} placeholder="Titre du film" required />

                <label htmlFor="date">Date de sortie</label>
                <input type="text" name="date" defaultValue={movie.release_date} placeholder="Date au format jj-mm-aaaa" required />

                <label htmlFor="langue">Langue d'origine</label>
                <input type="text" name="langue" defaultValue={movie.original_language} placeholder="Langue" required />

                <label htmlFor="category">Catégorie</label>
                <input type="text" name="category" defaultValue={movie.category} placeholder="Catégorie" required />

                <label htmlFor="similar">Titres similaires</label>
                <input type="text" name="similar" defaultValue={movie.similar} placeholder="Titres Similaires" required />

                <label htmlFor="actors">Acteurs</label>
                <input type="text" name="actors" defaultValue={movie.actors} placeholder="Acteurs" required />

                <label htmlFor="overview">Description</label>
                <textarea cols="50" type="text" name="overview" defaultValue={movie.overview} placeholder="Description" required />

                <input type="submit" className="submit"></input>
            </form>
        </div>
    );
}

export default stepTwoAddMovie;