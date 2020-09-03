import React from 'react';
import EditForm from '../../EditForm/EditForm';
import './StepTwoAddMovie.css';

const StepTwoAddMovie = (props) => {
    let movie = props.movie;
    console.log('MOVIE TO SEND', movie);

    return (
        <div className='StepTwoAddMovie'>
            <h1>Modifiez les informations du film avant l'ajout :</h1>
            <EditForm movie={props.movie} pushToFavorites={props.pushToFavorites} onUpdateFormData={props.onUpdateFormData} />
        </div>
    );
}

export default StepTwoAddMovie;