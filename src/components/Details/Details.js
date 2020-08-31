import React from 'react';
import './Details.css';

function Details(props) {
    return (
        <div className="Details">
            <h1>{props.title}</h1>
        </div>
    );
}

export default Details;