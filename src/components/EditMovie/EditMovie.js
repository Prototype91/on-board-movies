import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import EditForm from '../EditForm/EditForm';
import { useHistory } from "react-router";
import Axios from 'axios';
import './EditMovie.css';

const EditMovie = (props) => {
    let id = useParams();
    let filteredMovie = props.movies.filter(movie => Number(movie.id) === Number(id.id));
    const [movie, setMovie] = useState(filteredMovie[0]);
    const history = useHistory();

    console.log("MOVIE MODIFIED TO BE SEND : ", movie)

    const replaceFavorite = (e, movie, id) => {
        let idUrl = id;
        delete movie.id;
        e.preventDefault();
        Axios.put(`http://localhost:3000/movies/${idUrl}`, movie)
            .then(response => {
                console.log(response);
                history.push('/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    const updateFavoriteMovieData = (event, index) => {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        const data = { ...movie };

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
        
        setMovie(data);
    }

    return (
        <div className='EditMovie'>
            <h1>Modifier le film : </h1>
            <EditForm
                movie={movie}
                pushToFavorites={replaceFavorite}
                onUpdateFormData={updateFavoriteMovieData}
            />
        </div>
    );
}

export default EditMovie;