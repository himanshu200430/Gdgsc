import React from 'react';
import './SocialLoginButtons.css';

const SocialLoginButtons = () => {
    const API_BASE_URL = process.env.REACT_APP_API_URL; // Get from frontend .env

    const handleGoogleLogin = () => {
        window.location.href = `${API_BASE_URL}/api/auth/google`;
    };

    const handleDiscordLogin = () => {
        window.location.href = `${API_BASE_URL}/api/auth/discord`;
    };

    return (
        <div className="social-login-buttons">
            <p className="social-separator" style={{padding:"0"}}>Or continue with:</p>
            <button
                className="social-btn google-btn"
                onClick={handleGoogleLogin}
            >
                <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRRLOiuW8UxRuAbQntCB7RB6Aoh7t2UcN_JHT9RGeSR-6nJ27N6odevUewJOpDGOyCfYehTOCU9kR7sNPJc3ckgFHQblfaCYFeYWoMEfQA" alt="Google Logo" />
                Login with Google
            </button>
            <button
                className="social-btn discord-btn"
                onClick={handleDiscordLogin}
            >
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/discord-round-color-icon.png" alt="Discord Logo" />
                Login with Discord
            </button>
        </div>
    );
};

export default SocialLoginButtons;