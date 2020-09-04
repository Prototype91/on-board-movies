import React from 'react';
import './EditForm.css';

const EditForm = (props) => {
    // This is the movie ready to be manipulated and updated
    let movie = props.movie;
    console.log(movie);

    return (
        <div className='EditForm'>
            {movie &&
                <form onSubmit={(e) => props.pushToFavorites(e, movie, movie.id)} >
                    <label htmlFor="title">Titre :</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={movie.title}
                        placeholder="Titre du film"
                        required
                        onChange={(e) => props.onUpdateFormData(e)}
                    />
                    <label htmlFor="date">Date de sortie :</label>
                    <input
                        type="text"
                        name="release_date"
                        defaultValue={movie.release_date}
                        placeholder="Date au format jj-mm-aaaa"
                        required
                        onChange={(e) => props.onUpdateFormData(e)}
                    />
                    {movie.categories !== undefined &&
                        movie.categories.map((category, index) => (
                            <>
                                <label key={"categoryLabel" + index} htmlFor="similar">Catégorie {index + 1} :</label>
                                <input
                                    key={"categoryInput" + index}
                                    type="text"
                                    name={'categories'}
                                    defaultValue={category}
                                    placeholder=""
                                    required
                                    onChange={(e) => props.onUpdateFormData(e, index)} />
                            </>
                        ))
                    }
                    {movie.similar_movies !== undefined &&
                        movie.similar_movies.map((movie, index) => (
                            <>
                                <label key={"movieLabel" + index} htmlFor="similar_movies">Film similaire {index + 1} :</label>
                                <input
                                    key={"movieInput" + index}
                                    type="text"
                                    name="similar_movies"
                                    defaultValue={movie.title}
                                    placeholder=""
                                    required
                                    onChange={(e) => props.onUpdateFormData(e, index)} />
                            </>
                        ))
                    }
                    {movie.actors !== undefined &&
                        movie.actors.map((actor, index) => (
                            <>
                                <label key={"actorLabel" + index} htmlFor="actor">Acteur {index + 1} :</label>
                                <input
                                    key={"actorInput" + index}
                                    type="text" name="actors"
                                    defaultValue={actor.name}
                                    placeholder=""
                                    required
                                    onChange={(e) => props.onUpdateFormData(e, index)} />
                            </>
                        ))
                    }
                    <label htmlFor="overview">Description :</label>
                    <textarea
                        cols="50"
                        type="text"
                        name="description"
                        defaultValue={movie.description}
                        placeholder="Description"
                        required
                        onChange={(e) => props.onUpdateFormData(e)}
                    />
                    <input type="submit" className="submit" value='Ajouter'></input>
                </form>}
        </div>
    );
}

export default EditForm;