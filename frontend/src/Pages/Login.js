import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SocialLoginButtons from '../Components/auth/SocialLoginButtons';
import './AuthForm.css'; // For shared form styling
import FormBg from '../Components/Frame/FormBg';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { login, isAuthenticated, loading } = useAuth(); // Destructure isAuthenticated
    const navigate = useNavigate();
    const location = useLocation(); // To check query parameters

    // Redirect if already authenticated
    useEffect(() => {
        if (!loading && isAuthenticated) {
            navigate('/profile');
        }
    }, [isAuthenticated, loading, navigate]);

    // Check for messages from redirects (e.g., session expired)
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('session_expired')) {
            setError('Your session has expired. Please log in again.');
        } else if (params.get('error')) {
            setError(params.get('error').replace(/_/g, ' ')); // Convert underscores to spaces
        }
    }, [location.search]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage(''); // Clear previous messages
        const result = await login(email, password);
        if (result.success) {
            setSuccessMessage('Login successful! Redirecting...');
            // Navigate is handled by the useEffect above
        } else {
            setError(result.error || 'Login failed. Please check your credentials.');
        }
    };

    if (loading) {
        return <div className="auth-container">Loading...</div>; // Show loading state
    }

    return (
        <FormBg>
        <div style={{width:"fit-content",position:'relative',left:'50%',transform:'translateX(-50%)'}}>
            <div className="auth-form-card" style={{zIndex:"10000"}}>
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-submit-btn">Login</button>
                </form>
                <p className="auth-link-text">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
                <SocialLoginButtons />
            </div>
        </div>
        </FormBg>
    );
};

export default LoginPage;