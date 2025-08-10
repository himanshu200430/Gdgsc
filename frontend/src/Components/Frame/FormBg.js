import React from 'react';
import './border.css';

const FormBg = ({children}) => {
    return (
        <div style={{
            // minHeight: '200vh',
            height: '100vh',
            background: `
                linear-gradient(rgba(10, 10, 10, 0.7), rgba(10, 10, 10, 0.7)),
                url('/images/yellow_futuristic_background_01.jpg')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            padding: '20px',
            position: 'relative',
            width: '100%',
        }}>
            <div className="contest-card" style={{
                width:"fit-content",
                top:'120px',
                left:'50%',
                transform:'translateX(-50%)',
                position: 'absolute',
                backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent for better readability
                backdropFilter: 'blur(5px)'
            }}>
                {children}
            </div>
        </div>
    );
};

export default FormBg;
