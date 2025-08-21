import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const CompleteProfileForm = ({ setPageError }) => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    // Effect to handle redirection based on the user object's state
    useEffect(() => {
        // Only redirect if the user object exists and their profile is complete
        if (user && user.isProfileComplete) {
            navigate('/profile', { replace: true });
        }
    }, [user, navigate]);

    // Initialize formData with current user data
    const [formData, setFormData] = useState({
        username: user?.username || '',
        college: user?.college || '',
        graduationYear: user?.graduationYear || '',
        course: user?.course || '',
        enrollmentNumber: user?.enrollmentNumber || '',
        phoneNumber: user?.phoneNumber || '',
        branch: user?.branch || '',
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setPageError('');
        setIsSubmitting(true);

        const fieldsToUpdate = {};
        for (const key in formData) {
            const currentValue = String(user[key] || '').trim();
            const newValue = String(formData[key] || '').trim();

            if (newValue !== currentValue && newValue !== '') {
                fieldsToUpdate[key] = formData[key];
            }
        }
        
        if (Object.keys(fieldsToUpdate).length === 0) {
            setSuccessMessage('No new information provided to update.');
            setIsSubmitting(false);
            return;
        }

        try {
            // The key is that the backend must send back the updated user object,
            // including the new isProfileComplete flag.
            const { data } = await api.put('/api/user/complete-profile', fieldsToUpdate);
            
            // This call to setUser() is critical. It updates the AuthContext,
            // which in turn triggers the useEffect() hook above.
            setUser(data.user);
            
            setSuccessMessage('Profile updated successfully!');
        } catch (err) {
            console.error('Error updating profile:', err.response?.data?.message || err.message);
            setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const fields = [
        { name: 'username', label: 'Choose Your Username', type: 'text', placeholder: 'Enter a unique username' },
        { name: 'college', label: 'College', type: 'text', placeholder: 'Your college name' },
        { name: 'graduationYear', label: 'Graduation Year', type: 'number', placeholder: 'e.g., 2024' },
        { name: 'course', label: 'Course', type: 'text', placeholder: 'e.g., B.Tech, B.Sc.' },
        { name: 'enrollmentNumber', label: 'Enrollment Number', type: 'text', placeholder: 'Your enrollment number' },
        { name: 'phoneNumber', label: 'Phone Number', type: 'tel', placeholder: 'Your phone number' },
        { name: 'branch', label: 'Branch', type: 'text', placeholder: 'e.g., Computer Science' },
    ];

    const fieldsToShow = fields.filter(field => {
        // Ensure that we are filtering out fields with non-empty values
        const userFieldValue = user?.[field.name];
        return !userFieldValue || (typeof userFieldValue === 'string' && userFieldValue.trim() === '');
    });

    if (user && user.isProfileComplete) {
        // This is a safety check to avoid rendering the form if the user is complete,
        // in case the useEffect hook is slow to run.
        return <p className="success-message">Your profile is already complete! Redirecting...</p>;
    }

    return (
        <form onSubmit={handleSubmit}>
            {fieldsToShow.length > 0 ? (
                fieldsToShow.map(field => (
                    <div className="form-group" key={field.name}>
                        <label htmlFor={field.name}>{field.label}:</label>
                        <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                ))
            ) : (
                <p className="success-message">Your profile is already complete! Redirecting...</p>
            )}
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {fieldsToShow.length > 0 && (
                <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Complete Profile'}
                </button>
            )}
        </form>
    );
};

export default CompleteProfileForm;