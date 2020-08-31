import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import SearchResult from '../SearchResult/SearchResult';
import './AddMovie.css';

function AddMovie() {

    const API_KEY = '4d196b83a81a1379fde8fb79e2df0116';

    const [searchedResults, setSearchedResults] = useState([]);

    useEffect(() => {
        Axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=batman`)
            .then(movies => {
                console.log("Résultats recherche : ", movies.data.results);
                let results = movies.data.results;
                setSearchedResults(results);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <div className="AddMovies">
            <h1>Rechercher un film pour l'ajouter à votre Bibliothèque !</h1>
            <div>
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
                    <div className="row">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
            <div className="results">
                {searchedResults.length > 0 ? searchedResults.map((movie, index) => (
                    <SearchResult
                        key={index}
                        title={movie.title}
                        release_date={movie.release_date}
                        poster={`http://image.tmdb.org/t/p/w185${movie.poster_path}`}
                    />
                )) : <p>Aucun Résultat</p>}
            </div>
        </div>
    );
}

export default AddMovie;