import React from 'react';
import './border.css';

const Border = ({ h2,p,icon}) => {
    return (
        <div className="contest-card">
            <h2>{h2}</h2>
            <p>{p}</p>
            <div className="icon">{icon}</div>
        </div>
    );
};

export default Border;