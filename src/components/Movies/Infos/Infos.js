import React from 'react';
import './Info.css';

function Info(props) {
    return (
        <div className="Info">
            <h1>{props.title}</h1>
        </div>
    );
}

export default Info;