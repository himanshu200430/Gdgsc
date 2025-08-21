import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import '../../Pages/AuthForm.css';

const REQUIRED_FIELDS = ['username', 'college', 'graduationYear', 'course', 'enrollmentNumber', 'phoneNumber', 'branch'];

const CompleteProfileForm = () => {
    const { user, loading, setUser } = useAuth(); // Removed `needsUsernameSetup`
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // --- ✅ FIX: Refactored useEffect to rely on the single source of truth: `user.isProfileComplete` ---
    useEffect(() => {
        if (loading) {
            return; // Wait until loading is finished
        }
        if (!user) {
            navigate('/login'); // If no user, send to login
        } else if (user.isProfileComplete) {
            navigate('/profile'); // If profile is complete, send to profile
        } else {
            // Otherwise, populate form with existing data
            const initialData = {};
            REQUIRED_FIELDS.forEach(field => {
                initialData[field] = user[field] || '';
            });
            setFormData(initialData);
        }
    }, [user, loading, navigate]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? value : value,
        });
    };

    const getMissingFields = () => {
        if (!user) return [];
        // Filter the required list to find fields that are empty on the user object
        return REQUIRED_FIELDS.filter(field => !user[field]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic validation
        for (const field of getMissingFields()) {
            if (!formData[field]) {
                setError(`Please fill out the ${field} field.`);
                return;
            }
        }

        try {
            // --- ✅ FIX: Call the unified endpoint ---
            const { data } = await api.put('/api/users/complete-profile', formData);
            setUser(data); // Update the global user state with the complete profile
            setSuccess('Profile updated successfully! Redirecting...');
            setTimeout(() => {
                navigate('/profile');
            }, 1500);
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to complete profile.';
            setError(message);
            console.error('Error completing profile:', message);
        }
    };

    // Show a loading state until the user object is resolved and checked
    if (loading || !user || (user && user.isProfileComplete)) {
        return <div className="auth-container">Loading...</div>;
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
                            <input
                                type={field === 'graduationYear' ? 'number' : field === 'phoneNumber' ? 'tel' : 'text'}
                                id={field}
                                name={field}
                                value={formData[field] || ''}
                                onChange={handleChange}
                                required
                                {...(field === 'graduationYear' && { min: "1900", max: "2100" })}
                            />
                        </div>
                    ))}
                    <button type="submit" className="auth-submit-btn">Complete Profile</button>
                </form>
            </div>
        </div>
    );
};

export default CompleteProfileForm;