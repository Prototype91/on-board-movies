import React from 'react';
import axios from 'axios';
import './Search.css';

function Search() {
    return (
        <div className="container">
            <h1>Filtrer par :</h1>
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
                        <label htmlFor="category">Catégorie :</label>
                    </div>
                    <div className="col-75">
                        <select id="category" name="category">
                            <option value="action">Action</option>
                            <option value="fiction">Fiction</option>
                            <option value="thriller">Thriller</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Search;