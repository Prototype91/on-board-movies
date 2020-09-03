import React from 'react';
import './StepTwoAddMovie.css';

const stepTwoAddMovie = (props) => {
    let movie = props.movie;
    console.log('MOVIE TO SEND', movie);

    return (
        <div className='StepTwoAddMovie'>
            <h1>Modifiez les informations du film avant l'ajout :</h1>
            <form onSubmit={(e) => props.pushToFavorites(e, movie)} >
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
                    name="date"
                    defaultValue={movie.release_date}
                    placeholder="Date au format jj-mm-aaaa"
                    required
                    onChange={(e) => props.onUpdateFormData(e)}
                />

                <label htmlFor="original_language">Langue d'origine :</label>
                <input
                    type="text"
                    name="original_language"
                    defaultValue={movie.original_language}
                    placeholder="Langue"
                    required
                    onChange={(e) => props.onUpdateFormData(e)}
                />

                {movie.categories !== undefined &&
                    movie.categories.map((category, index) => (
                        < >
                            <label key={"categoryLabel" + index} htmlFor="similar">Catégorie {index + 1} :</label>
                            <input
                                key={"categoryInput" + index}
                                type="text"
                                name="categories"
                                defaultValue={category}
                                placeholder=""
                                required
                                onChange={(e) => props.onUpdateFormData(e, index)} />
                        </>
                    ))
                }

                {movie.similar_movies !== undefined &&
                    movie.similar_movies.map((movie, index) => (
                        < >
                            <label key={"movieLabel" + index} htmlFor="similar_movies">Titres similaires {index + 1} :</label>
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
                        < >
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
                    name="overview"
                    defaultValue={movie.overview}
                    placeholder="Description"
                    required
                    onChange={(e) => props.onUpdateFormData(e)}
                />

                <input type="submit" className="submit" value='Ajouter'></input>
            </form>
        </div>
    );
}

export default stepTwoAddMovie;