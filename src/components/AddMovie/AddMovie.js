import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory } from "react-router";
import { goToTop } from 'react-scrollable-anchor';
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
    const [stepTwo, setStepTwo] = useState(false);
    const [movieToSend, setMovieToSend] = useState(null);

    const history = useHistory();

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
        setStepTwo(true);
        buildFinalCurrentMovie(filteredMovie[0]);
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

                let actorsArray = actorsResponse.data.cast.slice(0, 4);
                let similarArray = similarMoviesResponse.data.results.slice(0, 3);
                let categoriesArray = categoriesResponse.data.genres.map(category => category.name);

                let actors = [];
                actorsArray.map(actor => {
                    return (actors.push({
                        name: actor.name,
                        photo: `http://image.tmdb.org/t/p/w185${actor.profile_path}`,
                        character: actor.character
                    }))
                });

                let similarMovies = [];
                similarArray.map(similarMovie => {
                    return (similarMovies.push({
                        title: similarMovie.title,
                        poster: `http://image.tmdb.org/t/p/w185${similarMovie.poster_path}`,
                        release_date: similarMovie.release_date
                    }))
                })

                setMovieToSend({
                    title: currentMovie.title,
                    release_date: currentMovie.release_date,
                    categories: categoriesArray,
                    description: currentMovie.overview,
                    poster: `http://image.tmdb.org/t/p/w185${currentMovie.poster_path}`,
                    backdrop: `http://image.tmdb.org/t/p/w185${currentMovie.backdrop_path}`,
                    actors: actors,
                    similar_movies: similarMovies,
                });
            }))
            .catch(error => {
                console.log(error);
            });
    }

    const onUpdateFormData = (event, index) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        const data = { ...movieToSend };

        switch (name) {
            case 'categories':
                data.categories[index] = target.value;
                break;
            case 'similar_movies':
                data.similar_movies[index].title = target.value;
                break;
            case 'actors':
                data.actors[index].name = target.value;
                break;
            default:
                data[name] = value;
        }
        setMovieToSend(data);
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

        Axios.post('http://localhost:3000/movies', movie)
            .then(response => {
                console.log(response);
                goToTop();
                history.push('/');
            })
            .catch(error => {
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
            </div>
            {movieToSend !== null && stepTwo &&
                <StepTwoAddMovie
                    movie={movieToSend}
                    pushToFavorites={pushToFavorites}
                    onUpdateFormData={onUpdateFormData}
                />}
        </div>
    );
}

export default AddMovie;