import React from 'react';
import './EditMovie.css';

function EditMovie(props) {
    return (
        <div className="EditMovie">
            <h1>{props.title}</h1>
        </div>
    );
}

export default EditMovie;