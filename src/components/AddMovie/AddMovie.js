import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import SearchResult from '../SearchResult/SearchResult';
import './AddMovie.css';
import StepTwoAddMovie from './stepTwoAddMovie/StepTwoAddMovie'
import { useHistory } from "react-router";
import SearchBar from './SearchBar/SearchBar';
import { Route, Link } from "react-router-dom";

const AddMovie = () => {

    const BASE_URL = 'https://api.themoviedb.org/3/search/movie?';
    const API_KEY = '4d196b83a81a1379fde8fb79e2df0116';

    const [searchedResults, setSearchedResults] = useState([]);
    const [titleParam, setTitleParam] = useState('');
    const [dateParam, setDateParam] = useState('');
    const [currentMovie, setCurrentMovie] = useState(null);
    const [stepTwo, setStepTwo] = useState(false);

    const history = useHistory();

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

    const addMovie = (id) => {
        console.log('ID : ', id);

        const filteredMovie = searchedResults.filter(movie => movie.id === id);

        setCurrentMovie(filteredMovie);

        setStepTwo(true);

        console.log(filteredMovie);
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
            <div className="results">
                {!stepTwo && <SearchBar
                    startSearch={startSearch}
                    changeHandler={changeHandler}
                />}
                {searchedResults.length > 0 && !stepTwo && searchedResults.map((movie, index) => (
                    <SearchResult
                        id={movie.id}
                        addMovie={addMovie}
                        key={index}
                        title={movie.title}
                        release_date={movie.release_date}
                        poster={`http://image.tmdb.org/t/p/w185${movie.poster_path}`}
                    />
                ))}
                {currentMovie !== null && stepTwo && <StepTwoAddMovie movie={currentMovie} />}
            </div>
        </div>
    );
}

export default AddMovie;