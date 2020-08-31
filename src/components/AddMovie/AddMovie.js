import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './AddMovie.css';

function AddMovie() {
    return (
        <div className="container">
            <h1>Rechercher :</h1>
            <form>
                <div className="row">
                    <div className="col-25">
                        <label>Titre :</label>
                    </div>
                    <div className="col-75">
                        <input type="text" placeholder="Titre"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="category">Date de sortie :</label>
                    </div>
                    <div className="col-75">
                        <input className='date' type="date" />
                    </div>
                    </div>
            </form>
        </div>
    );
}

export default AddMovie;