import React, { useState } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import './Movie.css';
import Details from '../../Details/Details';

function Movie(props) {

    // const movieDetails = () => {
    //     let history = useHistory();
    //     function handleClick() {
    //         history.push('/details');
    //     }
    // }


    return (
        <div>
            <div className="column" >
                <div className="card">
                    <img src={props.poster} />
                    <h1>{props.title}</h1>
                    <h2>{props.release_date}</h2>
                    <p>{props.description}</p>
                    <input type="submit" value="Modifier" className="edit-btn"></input>
                    <input type="submit" value="Supprimer" className="delete-btn"></input>
                </div>
            </div>
            <Route exact path='/details'>
                <Details title={props.title} />
            </Route>
        </div>
    );
}

export default Movie;