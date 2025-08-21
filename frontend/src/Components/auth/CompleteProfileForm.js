import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import './AuthForm.css';

const REQUIRED_FIELDS = ['username', 'college', 'graduationYear', 'course', 'enrollmentNumber', 'phoneNumber', 'branch'];

const CompleteProfileForm = () => {
    const { user, loading, setUser, needsUsernameSetup } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        } else if (!loading && user && !needsUsernameSetup) {
            // This is the correct logic: if user is logged in and needsUsernameSetup is false, they are complete.
            navigate('/profile');
        } else if (user) {
            // Initialize form data with existing user data to avoid empty fields
            const initialData = {};
            REQUIRED_FIELDS.forEach(field => {
                initialData[field] = user[field] || '';
            });
            setFormData(initialData);
        }
    }, [user, loading, needsUsernameSetup, navigate, setUser]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? parseInt(value) : value,
        });
    };

    const getMissingFields = () => {
        // This is a robust check for a missing value.
        // It correctly handles `null`, `undefined`, and empty strings from the user object.
        return REQUIRED_FIELDS.filter(field => {
            const value = user[field];
            return value === null || value === undefined || value === '';
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const missingFields = getMissingFields();
        const dataToSend = {};
        let validationFailed = false;

        missingFields.forEach(field => {
            const value = formData[field];
            if (!value && value !== 0) {
                validationFailed = true;
            }
            dataToSend[field] = value;
        });

        if (validationFailed) {
            setError('Please fill all the required fields.');
            return;
        }

        try {
            const { data } = await api.put('/api/users/complete-profile', dataToSend);
            setUser(data.user);
            setSuccess('Profile updated successfully! Redirecting...');
            setTimeout(() => {
                navigate('/profile');
            }, 1500);
        } catch (err) {
            console.error('Error completing profile:', err.response?.data?.message || err.message);
            setError(err.response?.data?.message || 'Failed to complete profile.');
        }
    };

    if (loading || (!user && !loading)) {
        return <div className="auth-container">Loading...</div>;
    }

    if (!needsUsernameSetup) {
        return <div className="auth-container">Your profile is already complete.</div>;
    }

    const missingFields = getMissingFields();

    return (
        <div className="auth-container">
            <div className="auth-form-card">
                <h2>Complete Your Profile</h2>
                <p>Please provide the following details to continue:</p>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <form onSubmit={handleSubmit}>
                    {missingFields.map(field => (
                        <div className="form-group" key={field}>
                            <label htmlFor={field}>
                                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:
                            </label>
                            {field === 'bio' ? (
                                <textarea
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                />
                            ) : field === 'graduationYear' ? (
                                <input
                                    type="number"
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    required
                                    min="1900"
                                    max="2100"
                                />
                            ) : field === 'phoneNumber' ? (
                                <input
                                    type="tel"
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    required
                                />
                            ) : (
                                <input
                                    type="text"
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    required
                                />
                            )}
                        </div>
                    ))}
                    <button type="submit" className="auth-submit-btn">Complete Profile</button>
                </form>
            </div>
        </div>
    );
};

export default CompleteProfileForm;