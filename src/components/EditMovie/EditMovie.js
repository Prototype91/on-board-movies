import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHistory } from "react-router";
import { goToTop } from 'react-scrollable-anchor';
import EditForm from '../EditForm/EditForm';
import Axios from 'axios';
import './EditMovie.css';

const EditMovie = (props) => {

    const history = useHistory();

    // Gets the id in the url
    let id = useParams();

    // Checks what movie you want to edit
    let filteredMovie = props.movies.filter(movie => Number(movie.id) === Number(id.id));

    // Hook for movie to edit
    const [movie, setMovie] = useState(filteredMovie[0]);

    // Function to replace the movie with the new values
    const replaceFavorite = (e, movie, id) => {
        e.preventDefault();
        // Important : id for the url to put it in the local server
        let idUrl = id;
        // Movie obj must be sent without id
        delete movie.id;

        // This will replace the movie with the new values
        Axios.put(`http://localhost:3000/movies/${idUrl}`, movie)
            .then(response => {
                console.log(response);
                goToTop();
                // Updates you favorite movies
                props.updateFavoriteMovies();
                // Go back to your favorite movies
                history.push('/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    // Function to check the inputs values updates
    const updateFavoriteMovieData = (event, index) => {

        // Gets the specific values of the inputs
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const data = { ...movie };

        // Checking what you are modifying
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
        // Sets the new movie to update
        setMovie(data);
    }

    return (
        <div className='EditMovie'>
            <h1>Modifier le film : </h1>
            <div className='back-ctn'><Link className='back-link' to="/">Retour</Link></div>
            <EditForm
                movie={movie}
                pushToFavorites={replaceFavorite}
                onUpdateFormData={updateFavoriteMovieData}
            />
        </div>
    );
}

export default EditMovie;