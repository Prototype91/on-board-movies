import React, { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { goToTop } from 'react-scrollable-anchor';
import uniqid from 'uniqid';
import SearchResult from './SearchResult/SearchResult';
import StepTwoAddMovie from './StepTwoAddMovie/StepTwoAddMovie'
import SearchBar from './SearchBar/SearchBar';
import './AddMovie.css';

const AddMovie = (props) => {
    // Base url and API key
    const BASE_URL = 'https://api.themoviedb.org/3/search/movie?';
    const API_KEY = '4d196b83a81a1379fde8fb79e2df0116';

    // Sets all the hooks needed
    const [searchedResults, setSearchedResults] = useState([]);
    const [titleParam, setTitleParam] = useState('');
    const [dateParam, setDateParam] = useState('');
    const [stepTwo, setStepTwo] = useState(false);
    const [movieToSend, setMovieToSend] = useState(null);
    const [searchActive, setSearchActive] = useState(false);

    const history = useHistory();

    // Function to start the search
    const startSearch = (e) => {
        e.preventDefault();
        Axios.get(`${BASE_URL}api_key=${API_KEY}&query=${titleParam}&primary_release_year=${dateParam}`)
            .then(movies => {
                setSearchActive(true);
                let results = movies.data.results;
                // Get all the results of the search
                setSearchedResults(results);
            })
            .catch(error => {
                console.log(error);
            })
    }

    // When you have clicked on a movie to add
    const getCurrentMovie = (id) => {
        // Checks what movie to add
        const filteredMovie = searchedResults.filter(movie => movie.id === id);
        // Ready for Step two with the form
        setStepTwo(true);
        // Builds the movie to add
        buildFinalCurrentMovie(filteredMovie[0]);
    }

    // Function to build the obj of the movie to add in the local server
    const buildFinalCurrentMovie = (currentMovie) => {
        // All urls needed
        const NEW_BASE_URL = 'https://api.themoviedb.org/3/movie';
        const REQUEST_URL_SIMILAR = `${NEW_BASE_URL}/${currentMovie.id}/similar?api_key=${API_KEY}`;
        const REQUEST_URL_ACTORS = `${NEW_BASE_URL}/${currentMovie.id}/credits?api_key=${API_KEY}`;
        const REQUEST_URL_CATEGORIES = `${NEW_BASE_URL}/${currentMovie.id}?api_key=${API_KEY}`;

        // Sets all the requests
        const ACTORS_REQUEST = Axios.get(REQUEST_URL_ACTORS);
        const SIMILAR_REQUEST = Axios.get(REQUEST_URL_SIMILAR);
        const CATEGORIES_REQUEST = Axios.get(REQUEST_URL_CATEGORIES);

        // Requests to get actors, similar movies and categories
        Axios.all([ACTORS_REQUEST, SIMILAR_REQUEST, CATEGORIES_REQUEST])
            .then(Axios.spread((...response) => {

                // All the responses
                const actorsResponse = response[0];
                const similarMoviesResponse = response[1];
                const categoriesResponse = response[2];

                // Sets arrays of the data needed
                let actorsArray = actorsResponse.data.cast.slice(0, 4);
                let similarArray = similarMoviesResponse.data.results.slice(0, 3);
                let categoriesArray = categoriesResponse.data.genres.map(category => category.name);

                // Getting actors
                let actors = [];
                actorsArray.map(actor => {
                    return (actors.push({
                        name: actor.name,
                        photo: `http://image.tmdb.org/t/p/w185${actor.profile_path}`,
                        character: actor.character
                    }));
                });

                // Getting similar movies
                let similarMovies = [];
                similarArray.map(similarMovie => {
                    return (similarMovies.push({
                        title: similarMovie.title,
                        poster: `http://image.tmdb.org/t/p/w185${similarMovie.poster_path}`,
                        release_date: similarMovie.release_date
                    }));
                })

                // Building the movie to send
                setMovieToSend({
                    title: currentMovie.title,
                    release_date: currentMovie.release_date,
                    categories: categoriesArray,
                    description: currentMovie.overview,
                    poster: `http://image.tmdb.org/t/p/w185${currentMovie.poster_path}`,
                    backdrop: `http://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`,
                    actors: actors,
                    similar_movies: similarMovies,
                });
            }))
            .catch(error => {
                console.log(error);
            });
    }

    // Function to check for inputs values update
    const onUpdateFormData = (event, index) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const data = { ...movieToSend };

        // This check what you are modifying and update the movie to send
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

        // Updates the movie to send
        setMovieToSend(data);
    }

    // Function to get the search values
    const changeHandler = (e) => {
        setSearchActive(false);
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

    // Function to post yous favorites movies
    const pushToFavorites = (e, movie) => {
        e.preventDefault();
        // Posting the movie
        Axios.post('http://localhost:3000/movies', movie)
            .then(response => {
                goToTop();
                // Updates your favorite movies
                props.updateFavoriteMovies();
                // Goes to home page
                history.push('/');
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Function to go back to search
    const goBackToSearch = () => {
        setStepTwo(false);
    }

    return (
        <React.Fragment>
            <div className='AddMovies'>
                {!stepTwo &&
                    <SearchBar
                        startSearch={startSearch}
                        changeHandler={changeHandler}
                    />}
                {!stepTwo &&
                    <div className='back-ctn'>
                        <Link className='back-link' to='/'>Retour</Link>
                    </div>}
                <div className='results'>
                    {searchedResults.length > 0 && !stepTwo &&
                        searchedResults.map((movie, index) => (
                            <SearchResult
                                id={movie.id}
                                getCurrentMovie={getCurrentMovie}
                                key={uniqid()}
                                title={movie.title}
                                release_date={movie.release_date}
                                poster={`http://image.tmdb.org/t/p/w185${movie.poster_path}`}
                            />
                        ))}
                </div>
                <React.Fragment>
                    {searchActive && searchedResults.length === 0 && !stepTwo &&
                        <p>Aucun résultat pour "{titleParam}"</p>}
                </React.Fragment>
                {movieToSend !== null && stepTwo &&
                    <StepTwoAddMovie
                        movie={movieToSend}
                        pushToFavorites={pushToFavorites}
                        onUpdateFormData={onUpdateFormData}
                        goBackToSearch={goBackToSearch}
                    />}
            </div>
        </React.Fragment>
    );
}

export default AddMovie;