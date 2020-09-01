import React from 'react';
import './SearchResult.css';
import defaultImage from '../../assets/no-image.png';

const SearchResult = (props) => {
    return (
        <div className="SearchResult">
            <div className="column" >
                <div className="card">
                    {props.poster === 'http://image.tmdb.org/t/p/w185null' ? <img src={defaultImage} alt="Poster" /> : <img src={props.poster} alt="Poster" />}
                    <h1>{props.title}</h1>
                    <h2>{props.release_date}</h2>
                    <input type="submit" value="Ajouter" className="add-btn" onClick={() => props.getCurrentMovie(props.id)}></input>
                </div>
            </div>
        </div>
    );
}

export default SearchResult;