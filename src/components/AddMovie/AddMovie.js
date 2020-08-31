import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import SearchResult from '../SearchResult/SearchResult';
import './AddMovie.css';
import EditMovie from '../EditMovie/EditMovie';
import { Route, Link } from "react-router-dom";

function AddMovie() {

    const BASE_URL = 'https://api.themoviedb.org/3/search/movie?'
    const API_KEY = '4d196b83a81a1379fde8fb79e2df0116';

    const [searchedResults, setSearchedResults] = useState([]);
    const [titleParam, setTitleParam] = useState('');
    const [dateParam, setDateParam] = useState('');
    const [currentMovie, setCurrentMovie] = useState(null);

    const startSearch = (e) => {
        e.preventDefault();
        console.log('Start Search', titleParam, dateParam);
        Axios.get(`${BASE_URL}api_key=${API_KEY}&query=${titleParam}&primary_release_year=${dateParam}`)
            .then(movies => {
                console.log("Résultats recherche : ", movies.data.results);
                let results = movies.data.results;
                setSearchedResults(results);
                console.log('RESULTATS : ', results);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const viewMovieInfo = (id) => {
        console.log('ID : ', id)
        const filteredMovie = searchedResults.filter(movie => movie.id === id);

        // const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null;

        setCurrentMovie(filteredMovie);

        console.log(filteredMovie);
    }

    const closeMovieInfo = () => {
        setCurrentMovie(null);
    }

    const changeHandler = (e) => {
        switch (e.target.name) {
            case 'title':
                setTitleParam(e.target.value);
                break;
            case 'date':
                setDateParam(e.target.value);
                break;
        }
    }

    return (
        <div className="AddMovies">
            <h1>Rechercher un film pour l'ajouter à votre Bibliothèque !</h1>
            <div>
                <form onSubmit={(e) => startSearch(e)}>
                    <div className="row">
                        <div className="col-25">
                            <label>Titre :</label>
                        </div>
                        <div className="col-75">
                            <input type="text" placeholder="Titre" name='title' required onChange={(e) => changeHandler(e)}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Date de sortie :</label>
                        </div>
                        <div className="col-75">
                            <input className='date' type="date" name='date' required onChange={(e) => changeHandler(e)} />
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
                        id={movie.id}
                        viewMovieInfo={viewMovieInfo}
                        key={index}
                        title={movie.title}
                        release_date={movie.release_date}
                        poster={`http://image.tmdb.org/t/p/w185${movie.poster_path}`}
                    />
                )) :<p>Aucun résultat</p>} 
                {currentMovie !== null ? <EditMovie title={currentMovie[0].title} /> : <p>Pas ok</p>}
            </div>
        </div>
    );
}

export default AddMovie;