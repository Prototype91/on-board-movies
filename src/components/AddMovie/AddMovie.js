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
        Axios.get(`${BASE_URL}api_key=${API_KEY}&query=${titleParam}&primary_release_year=${dateParam}`)
            .then(movies => {
                let results = movies.data.results;
                setSearchedResults(results);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const getCurrentMovie = (id) => {
        const filteredMovie = searchedResults.filter(movie => movie.id === id);
        setCurrentMovie(filteredMovie);
        setStepTwo(true);
        buildFinalCurrentMovie(filteredMovie[0], filteredMovie[0]);
    }

    const buildFinalCurrentMovie = (currentMovie) => {
        const NEW_BASE_URL = 'https://api.themoviedb.org/3/movie';
        const REQUEST_URL_SIMILAR = `${NEW_BASE_URL}/${currentMovie.id}/similar?api_key=${API_KEY}`;
        const REQUEST_URL_ACTORS = `${NEW_BASE_URL}/${currentMovie.id}/credits?api_key=${API_KEY}`;
        const REQUEST_URL_CATEGORIES = `${NEW_BASE_URL}/${currentMovie.id}?api_key=${API_KEY}`;

        const ACTORS_REQUEST = Axios.get(REQUEST_URL_ACTORS);
        const SIMILAR_REQUEST = Axios.get(REQUEST_URL_SIMILAR);
        const CATEGORIES_REQUEST = Axios.get(REQUEST_URL_CATEGORIES);

        Axios.all([ACTORS_REQUEST, SIMILAR_REQUEST, CATEGORIES_REQUEST])
            .then(Axios.spread((...response) => {

                const actorsResponse = response[0];
                const similarMoviesResponse = response[1];
                const categoriesResponse = response[2];

                const actorsArray = actorsResponse.data.cast.slice(0, 3);
                const similarArray = similarMoviesResponse.data.results.slice(0, 3);
                const categoriesArray = categoriesResponse.data.genres.map(category => category.name);

                setCurrentMovie({ ...currentMovie, actors: actorsArray, similar_movies: similarArray, categories: categoriesArray });
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

    const pushToFavorites = (e, movie) => {
        e.preventDefault();
        console.log("Pushed", JSON.stringify(movie));
        // Axios.post('http://localhost:3000/movies', JSON.stringify(movie))
        //     .then((response) => {
        //         console.log(response);
        //     }, (error) => {
        //         console.log(error);
        //     });

        Axios({
            method: "post",
            url: 'http://localhost:3000/movies',
            data: movie
        })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    }

    return (
        <div className="AddMovies">
            {!stepTwo && <SearchBar
                startSearch={startSearch}
                changeHandler={changeHandler}
            />}
            <div className="results">
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
                {currentMovie !== null && stepTwo &&
                    <StepTwoAddMovie
                        movie={currentMovie}
                        pushToFavorites={pushToFavorites}
                    />}
            </div>
        </div>
    );
}

export default AddMovie;