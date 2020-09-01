import React, { useState } from 'react';
import { Route, Link } from "react-router-dom";
import './StepTwoAddMovie.css';

function stepTwoAddMovie(props) {
    let movie = props.movie[0];
    console.log('STEP TWO TITLE', movie)
    return (
        <form>
            <label htmlFor="title">Titre</label>
            <input type="text" name="title" defaultValue={movie.title} placeholder="Titre du film" />

            <label htmlFor="origin-title">Titre originnel</label>
            <input type="text" name="origin-title" defaultValue={movie.original_title} placeholder="Titre originnel" />

            <label htmlFor="date">Date de sortie</label>
            <input type="text" name="date" defaultValue={movie.release_date} placeholder="Date au format jj-mm-aaaa" />

            <label htmlFor="langue">Langue d'origine</label>
            <input type="text" name="langue" defaultValue={movie.original_language} placeholder="Langue" />

            <label htmlFor="overview">Description</label>
            <textarea cols="50" type="text" name="overview" defaultValue={movie.overview} placeholder="Description" />
            
            <input type="submit" className="submit btn btn-primary"></input>
        </form>
    );
}

export default stepTwoAddMovie;