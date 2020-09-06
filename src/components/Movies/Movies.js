import React, { useState } from 'react';
import Movie from './Movie/Movie';
import Filter from './Filter/Filter';
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';
import './Movies.css';

const Movies = (props) => {
    const history = useHistory();

    // Filter Values
    const [filterValues, setFilterValues] = useState({
        title: null,
        date: null,
        category: null
    });

    // Filtered Movies
    const [filteredMovies, setFilteredMovies] = useState([]);

    // Is filter search active ?
    // const [searchActive, setSearchActive] = useState(false);

    // Function to go to infos of the movie clicked
    const viewMovieInfo = (id) => {
        // Goes to Infos component with the movie id
        history.push(`/infos/${id}`);
    }

    // Function to filter your movies
    const filterMovies = (e) => {
        e.preventDefault();

        // Declaration of all results
        let titleResult = null;
        let dateResult = null;
        // let categoryResult = null;

        // Sets the resuls of filter
        if (filterValues.title !== null) {
            titleResult = props.movies.filter(movie => movie.title === filterValues.title)[0];
            console.log('Result Filter Title', titleResult);
            setFilteredMovies(titleResult);
            if (filterValues.date !== null) {
                dateResult = props.movies.filter(movie => movie.release_date === filterValues.date)[0];
                console.log('Result Filter Date', dateResult);
                setFilteredMovies({ ...filteredMovies, dateResult });
                // if (filterValues.category !== null) {
                //     categoryResult = props.movies.filter(movie => movie.categories === filterValues.category)[0];
                //     console.log('Result Filter', categoryResult);
                //     setFilteredMovies({ ...titleResult, dateResult, categoryResult });
                // }
            }
        }
    }

    // Function to check for filter values update
    const updateFilterValues = (event) => {
        event.preventDefault();
        // Event data
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const data = { ...filterValues };

        // Updates the values of the filter
        data[name] = value;
        setFilterValues(data);
        console.log(data);
    }

    return (
        <article className="Movies">
            <Filter
                filterMovies={filterMovies}
                updateFilterValues={updateFilterValues}
            />
            <h1 className="title-movies">Ma Bibliothèque :</h1>
            <div className='back-ctn'>
                <Link className='back-link' to='/addMovies'>Ajouter un Film</Link>
            </div>
            {props.movies.length > 0 ? props.movies.reverse().map((movie) => (
                <Movie
                    id={movie.id}
                    key={uniqid()}
                    title={movie.title}
                    release_date={movie.release_date}
                    description={movie.description}
                    poster={movie.poster}
                    viewMovieInfo={viewMovieInfo}
                    deleteMovie={props.deleteMovie}
                    editMovie={props.editMovie}
                />
            )) : <h1 className='no-movies'>Aucun film dans votre bibliotèque ...</h1>}
        </article>
    );
}

export default Movies;
