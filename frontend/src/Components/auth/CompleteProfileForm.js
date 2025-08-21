import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const CompleteProfileForm = ({ setPageError }) => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    // Initialize state for each field, only if it's not already set
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

        // Filter out fields that are already filled to avoid sending them again
        // and to create a more efficient payload.
        const fieldsToUpdate = {};
        for (const key in formData) {
            // Check if the user object from context has a falsy value for the field.
            // This is a robust way to check for 'not set' or 'default' values.
            if (!user[key] && formData[key]) {
                fieldsToUpdate[key] = formData[key];
            }
        }
        
        // If no fields need updating, show a message and prevent API call.
        if (Object.keys(fieldsToUpdate).length === 0) {
            setSuccessMessage('Your profile is already complete! Redirecting...');
            setIsSubmitting(false);
            setTimeout(() => navigate('/profile', { replace: true }), 1200);
            return;
        }

        try {
            const { data } = await api.put('/api/user/complete-profile', fieldsToUpdate);
            setUser(data.user);
            setSuccessMessage('Profile updated successfully! Redirecting...');
            setTimeout(() => {
                navigate('/profile', { replace: true });
            }, 1200);
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

    const fieldsToShow = fields.filter(field => !user?.[field.name]);

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