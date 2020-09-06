import React from 'react';
import uniqid from 'uniqid';
import './EditForm.css';

const EditForm = (props) => {
    // This is the movie ready to be manipulated and updated
    let movie = props.movie;

    return (
        <section className='EditForm'>
            {movie &&
                <form onSubmit={(e) => props.pushToFavorites(e, movie, movie.id)} >
                    <label htmlFor='title'>Titre :</label>
                    <input
                        id={uniqid()}
                        type='text'
                        name='title'
                        defaultValue={movie.title}
                        placeholder='Titre du film'
                        required
                        onChange={(e) => props.onUpdateFormData(e)}
                    />
                    <label htmlFor='release_date'>Date de sortie :</label>
                    <input
                        type='date'
                        id={uniqid()}
                        name='release_date'
                        defaultValue={movie.release_date}
                        placeholder='Date au format jj-mm-aaaa'
                        required
                        onChange={(e) => props.onUpdateFormData(e)}
                    />
                    {movie.categories !== undefined &&
                        movie.categories.map((category, index) => (
                            <label
                                key={index}
                                htmlFor='categories'>Catégorie {index + 1} :
                                <input
                                    id={uniqid()}
                                    className='loop-input'
                                    type='text'
                                    name='categories'
                                    defaultValue={category}
                                    placeholder='Catégorie'
                                    required
                                    onChange={(e) => props.onUpdateFormData(e, index)} /></label>
                        ))
                    }
                    {movie.similar_movies !== undefined &&
                        movie.similar_movies.map((movie, index) => (
                            <label key={index} htmlFor='similar_movies'>Film similaire {index + 1} :
                                <input
                                    className='loop-input'
                                    id={uniqid()}
                                    type='text'
                                    name='similar_movies'
                                    defaultValue={movie.title}
                                    placeholder='Film similaire'
                                    required
                                    onChange={(e) => props.onUpdateFormData(e, index)} /></label>
                        ))
                    }
                    {movie.actors !== undefined &&
                        movie.actors.map((actor, index) => (
                            <label key={index} htmlFor='actors'>Acteur {index + 1} :
                                <input
                                    className='loop-input'
                                    id={uniqid()}
                                    type='text'
                                    name='actors'
                                    defaultValue={actor.name}
                                    placeholder='Acteur'
                                    required
                                    onChange={(e) => props.onUpdateFormData(e, index)} /></label>
                        ))
                    }
                    <label htmlFor='description'>Description :</label>
                    <textarea
                        cols='50'
                        type='text'
                        name='description'
                        defaultValue={movie.description}
                        placeholder='Description'
                        required
                        onChange={(e) => props.onUpdateFormData(e)}
                    />
                    <input type='submit' className='submit' value='Ajouter'></input>
                </form>}
        </section>
    );
}

export default EditForm;