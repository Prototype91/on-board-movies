import React from 'react';
import EditForm from '../../EditForm/EditForm';
import { Link } from 'react-router-dom';
import './StepTwoAddMovie.css';

const StepTwoAddMovie = (props) => {
    return (
        <div className='StepTwoAddMovie'>
            <h1>Modifiez les informations du film avant l'ajout :</h1>
            <div className='back-ctn'><Link className='back-link' onClick={props.goBackToSearch}>Retour</Link></div>
            <EditForm
                movie={props.movie}
                pushToFavorites={props.pushToFavorites}
                onUpdateFormData={props.onUpdateFormData}
            />
        </div>
    );
}

export default StepTwoAddMovie;