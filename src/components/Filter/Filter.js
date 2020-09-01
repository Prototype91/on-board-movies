import React from 'react';
import './Filter.css';

const Filter = () => {
    return (
        <section className="Filter">
            <h1>Filtrer par :</h1>
            <form>
                <input type="text" placeholder="Titre" name='title' required />
                <input className='date' type="date" name='date' required />
                <input className='category' type="text" placeholder='Catégorie' name='category' required />
                <input type="submit" value="Filtrer" />
            </form>
        </section>
    );
}

export default Filter;