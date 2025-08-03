import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode

const AuthCallbackPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useAuth();
    const [message, setMessage] = useState('Processing authentication...');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const error = params.get('error');

        if (token) {
            localStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            let decodedToken;
            try {
                decodedToken = jwtDecode(token);
                console.log("Decoded Token:", decodedToken); // Debugging
            } catch (decodeError) {
                console.error("Failed to decode token:", decodeError);
                setMessage('Invalid token received. Please try again.');
                localStorage.removeItem('token');
                api.defaults.headers.common['Authorization'] = '';
                navigate('/login?error=invalid_token', { replace: true });
                return;
            }

            const fetchUserProfile = async () => {
                try {
                    const { data } = await api.get('/api/user/profile');
                    setUser(data.user); // Update AuthContext state
                    setMessage('Login successful! Redirecting...');

                    // Check if user needs to complete profile
                    if (data.user.needsUsernameSetup) {
                        console.log("User needs username setup. Redirecting to /complete-profile.");
                        navigate('/complete-profile', { replace: true });
                    } else {
                        console.log("User profile complete. Redirecting to /profile.");
                        navigate('/profile', { replace: true });
                    }

                } catch (profileError) {
                    console.error('Failed to fetch user profile after social login:', profileError.response?.data?.message || profileError.message);
                    localStorage.removeItem('token');
                    api.defaults.headers.common['Authorization'] = '';
                    setUser(null);
                    setMessage('Failed to load profile. Please try again.');
                    navigate('/login?error=profile_load_failed', { replace: true });
                }
            };
            fetchUserProfile();

        } else if (error) {
            setMessage(`Authentication failed: ${error.replace(/_/g, ' ')}`);
            console.error('Authentication Error:', error);
            navigate('/login?error=' + error, { replace: true });
        } else {
            setMessage('Unknown authentication issue. Please try again.');
            navigate('/login?error=unknown_auth_issue', { replace: true });
        }
    }, [location, navigate, setUser]);

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Authentication Status</h2>
            <p>{message}</p>
        </div>
    );
};

export default AuthCallbackPage;