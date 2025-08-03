import React from 'react';
import './border.css';

const FormBg = ({children}) => {
    return (
        <div className="contest-card" style={{width:"fit-content",top:'120px',left:'50%',transform:'translateX(-50%)'}}>
            {children}
        </div>
    );
};

export default FormBg;