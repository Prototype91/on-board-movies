import React, { useState } from 'react';
import Axios from 'axios';
import SearchResult from '../SearchResult/SearchResult';
import StepTwoAddMovie from './StepTwoAddMovie/StepTwoAddMovie'
import SearchBar from './SearchBar/SearchBar';
import './AddMovie.css';

const AddMovie = () => {

    const BASE_URL = 'https://api.themoviedb.org/3/search/movie?';
    const API_KEY = '4d196b83a81a1379fde8fb79e2df0116';

    const [searchedResults, setSearchedResults] = useState([]);
    const [titleParam, setTitleParam] = useState('');
    const [dateParam, setDateParam] = useState('');
    const [currentMovie, setCurrentMovie] = useState(null);
    const [stepTwo, setStepTwo] = useState(false);

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

    const getCurrentMovie = (id) => {
        const filteredMovie = searchedResults.filter(movie => movie.id === id);
        setCurrentMovie(filteredMovie);
        setStepTwo(true);
        buildFinalCurrentMovie(filteredMovie[0]);
        console.log('CURRENT MOVIE', filteredMovie);
    }

    const buildFinalCurrentMovie = (currentMovie) => {
        const BASE_URL_SIMILAR = 'https://api.themoviedb.org/3/movie';
        const REQUEST_URL_SIMILAR = `${BASE_URL_SIMILAR}/${currentMovie.id}/similar?api_key=${API_KEY}`;
        const REQUEST_URL_ACTORS = `${BASE_URL_SIMILAR}/${currentMovie.id}/credits?api_key=${API_KEY}`;

        const ACTORS_REQUEST = Axios.get(REQUEST_URL_ACTORS);
        const SIMILAR_REQUEST = Axios.get(REQUEST_URL_SIMILAR);

        Axios.all([ACTORS_REQUEST, SIMILAR_REQUEST])
            .then(Axios.spread((...res) => {
                const actorRequest = res[0];
                const similarRequest = res[1];
                console.log('ACTOR_REQUEST', actorRequest, "SIMILAR_REQUEST", similarRequest);
                const actorsArray = actorRequest.data.cast.slice(0, 3);
                const similarArray = similarRequest.data.results.slice(0, 3);
                setCurrentMovie({ ...currentMovie, actors: actorsArray, similar: similarArray });
            }))
            .catch(error => {
                console.log(error);
            })
    }

    const changeHandler = (e) => {
        switch (e.target.name) {
            case 'title':
                setTitleParam(e.target.value);
                break;
            case 'date':
                setDateParam(e.target.value);
                break;
            default:
                console.log(`Sorry, we are out of ${e.target.name}.`);
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
                        getCurrentMovie={getCurrentMovie}
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