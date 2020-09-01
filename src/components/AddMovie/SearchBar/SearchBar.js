import React from 'react';
import './SearchBar.css';

const SearchBar = (props) => {
    return (
        <div>
            <h1>Rechercher un film pour l'ajouter à votre Bibliothèque !</h1>
            <div>
                <form onSubmit={(e) => props.startSearch(e)}>
                    <div className="row">
                        <div className="col-25">
                            <label>Titre :</label>
                        </div>
                        <div className="col-75">
                            <input type="text" placeholder="Titre" name='title' required onChange={(e) => props.changeHandler(e)}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Date de sortie :</label>
                        </div>
                        <div className="col-75">
                            <input className='date' type="date" name='date' required onChange={(e) => props.changeHandler(e)} />
                        </div>
                    </div>
                    <div className="row">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SearchBar;