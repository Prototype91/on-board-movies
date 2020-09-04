import React from 'react';
import './Filter.css';

const Filter = (props) => {
    return (
        <section className="Filter">
            <h1>Filtrer par :</h1>
            <form onSubmit={(e) => props.filterMovies(e)}>
                <input type="text" placeholder="Titre" name='title' required />
                <input className='date' type="date" name='date' />
                <input className='category' type="text" placeholder='Catégorie' name='category' />
                <input type="submit" value="Filtrer" />
            </form>
        </section>
    );
}

export default Filter;