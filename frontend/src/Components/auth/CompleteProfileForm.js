import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const CompleteProfileForm = ({ setPageError }) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setPageError(''); // Clear page-level error

        if (!username.trim()) {
            setError('Username cannot be empty.');
            return;
        }

        try {
            const { data } = await api.put('/api/user/set-username', { username });
            setUser(data.user); // Update user in AuthContext
            setSuccessMessage('Username set successfully! Redirecting to profile...');
            setTimeout(() => {
                navigate('/profile', { replace: true });
            }, 1200); // Give user a moment to see the success message
        } catch (err) {
            console.error('Error setting username:', err.response?.data?.message || err.message);
            setError(err.response?.data?.message || 'Failed to set username. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Choose Your Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter a unique username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoFocus
                />
            </div>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <button type="submit" className="auth-submit-btn">Set Username</button>
        </form>
    );
};

export default CompleteProfileForm;