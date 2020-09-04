import React from 'react';
import './SearchResult.css';
import defaultImage from '../../assets/no-image.png';

const SearchResult = (props) => {
    return (
        <div className="SearchResult">
            <div className="wrapper">
                <div className="cards">
                    <figure className="card" onClick={() => props.getCurrentMovie(props.id)}>
                        {props.poster === 'http://image.tmdb.org/t/p/w185null' ?
                            <img src={defaultImage} alt="Poster" /> :
                            <img src={props.poster} alt="Poster" />}
                        <figcaption>
                            <p>{props.title}</p>
                        </figcaption>
                    </figure>
                </div>
                <p>Sortie : {props.release_date}</p>
                <input
                    onClick={() => props.getCurrentMovie(props.id)}
                    type="submit"
                    value="Ajouter"
                    className="add-btn"
                />
            </div>
        </div>
    );
}

export default SearchResult;