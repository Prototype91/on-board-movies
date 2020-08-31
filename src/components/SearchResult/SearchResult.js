import React, { useState } from 'react';
import './SearchResult.css';

function SearchResult(props) {
    return (
        <div className="SearchResult">
            <div className="column" >
                <div className="card">
                    <img src={props.poster} />
                    <h1>{props.title}</h1>
                    <h2>{props.release_date}</h2>
                    <input type="submit" value="Ajouter" className="edit-btn" onClick={() => props.viewMovieInfo(props.id)}></input>
                </div>
            </div>
        </div>
    );
}

export default SearchResult;