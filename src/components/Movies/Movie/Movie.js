import React, { useState } from 'react';
import { Route, Link } from "react-router-dom";
import './Movie.css';

function Movie(props) {
    return (
        <article className="Movie">
            <section className="column" >
                <div className="card">
                    <img src={props.poster} />
                    <h1>{props.title}</h1>
                    <h2>{props.release_date}</h2>
                    <p>{props.description}</p>
                    <input type="submit" value="Modifier" className="edit-btn"></input>
                    <input type="submit" value="Supprimer" className="delete-btn"></input>
                    <input onClick={() => props.viewMovieInfo(props.id)} type="submit" value="Voir détails" className="delete-btn"></input>
                </div>
            </section>
        </article>
    );
}

export default Movie;