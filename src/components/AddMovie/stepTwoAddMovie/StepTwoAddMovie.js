import React from 'react';
import './StepTwoAddMovie.css';

const stepTwoAddMovie = (props) => {
    let movie = props.movie;
    console.log('poster', movie.poster_path)
    console.log('MOVIE TO SEND', movie);

    return (
        <div className='StepTwoAddMovie'>
            <h1>Modifiez les informations du film avant l'ajout :</h1>
            <form onSubmit={(e) => props.pushToFavorites(e, movie)} >
                <label htmlFor="title">Titre :</label>
                <input type="text" name="title" defaultValue={movie.title} placeholder="Titre du film" required />

                <label htmlFor="date">Date de sortie :</label>
                <input type="text" name="date" defaultValue={movie.release_date} placeholder="Date au format jj-mm-aaaa" required />

                <label htmlFor="langue">Langue d'origine :</label>
                <input type="text" name="langue" defaultValue={movie.original_language} placeholder="Langue" required />

                {movie.categories !== undefined &&
                    movie.categories.map((category, index) => (
                        < >
                            <label key={"categoryLabel" + index} htmlFor="similar">Catégorie {index + 1} :</label>
                            <input key={"categoryInput" + index} type="text" name="category" defaultValue={category} placeholder="" required />
                        </>
                    ))
                }

                {movie.similar_movies !== undefined &&
                    movie.similar_movies.map((movie, index) => (
                        < >
                            <label key={"movieLabel" + index} htmlFor="similar">Titres similaires {index + 1} :</label>
                            <input key={"movieInput" + index} type="text" name="similar" defaultValue={movie.title} placeholder="" required />
                        </>
                    ))
                }

                {movie.actors !== undefined &&
                    movie.actors.map((actor, index) => (
                        < >
                            <label key={"actorLabel" + index} htmlFor="actor">Acteur {index + 1} :</label>
                            <input key={"actorInput" + index} type="text" name="actor" defaultValue={actor.name} placeholder="" required />
                        </>
                    ))
                }

                <label htmlFor="overview">Description :</label>
                <textarea cols="50" type="text" name="overview" defaultValue={movie.overview} placeholder="Description" required />

                <input type="submit" className="submit" value='Ajouter'></input>
            </form>
        </div>
    );
}

export default stepTwoAddMovie;