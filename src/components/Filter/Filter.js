import React from 'react';
import './Filter.css';

function Filter() {
    return (
        <section className="Filter">
            <h1>Filtrer par :</h1>
            <form>
                <div className="row">
                    <div className="col-25">
                        <label>Titre :</label>
                    </div>
                    <div className="col-75">
                        <input type="text" placeholder="Titre"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Catégorie :</label>
                    </div>
                    <div className="col-75">
                        <input type="text" placeholder="Catégorie :"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Date de sortie :</label>
                    </div>
                    <div className="col-75">
                        <input className='date' type="date" name='date' />
                    </div>
                </div>
                <div className="row">
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </section>
    );
}

export default Filter;