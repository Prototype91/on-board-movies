import React from 'react';
import './Filter.css';

const Filter = (props) => {
    return (
        <section className='Filter'>
            <h2>Filtrer par :</h2>
            <form onSubmit={(e) => props.filterMovies(e)}>
                <input
                    type='text'
                    placeholder='Titre'
                    name='title'
                    required
                    onChange={(e) => props.updateFilterValues(e)}
                />
                <input
                    type='date'
                    name='date'
                    placeholder='Catégorie'
                    onChange={(e) => props.updateFilterValues(e)}
                />
                <input
                    type='text'
                    placeholder='Catégorie'
                    name='category'
                    onChange={(e) => props.updateFilterValues(e)}
                />
                <input type='submit' value='Filtrer' />
            </form>
        </section>
    );
}

export default Filter;