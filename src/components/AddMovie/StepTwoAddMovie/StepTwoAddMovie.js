import React from 'react';
import EditForm from '../../EditForm/EditForm';

const StepTwoAddMovie = (props) => {
    return (
        <div className='StepTwoAddMovie'>
            <h1>Modifiez les informations du film avant l'ajout :</h1>
            <div className='back-ctn'>
                <button className='back-link' onClick={props.goBackToSearch}>Retour</button>
            </div>
            <EditForm
                movie={props.movie}
                pushToFavorites={props.pushToFavorites}
                onUpdateFormData={props.onUpdateFormData}
            />
        </div>
    );
}

export default StepTwoAddMovie;