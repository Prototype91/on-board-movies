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
            </form>
        </div>
    );
}

export default Search;