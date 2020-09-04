import React from 'react';
import './SearchBar.css';

const SearchBar = (props) => {
    return (
        <div className="SearchBar">
            <h1>Rechercher un film pour l'ajouter à votre Bibliothèque !</h1>
            <form onSubmit={(e) => props.startSearch(e)}>
                <input
                    type="text"
                    placeholder="Titre"
                    name='title'
                    required
                    onChange={(e) => props.changeHandler(e)}
                />
                <input
                    className='date'
                    type="date"
                    name='date'
                    onChange={(e) => props.changeHandler(e)}
                />
                <input type="submit" value="Rechercher" />
            </form>
        </div>
    );
}

export default SearchBar;