import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const CompleteProfileForm = ({ setPageError }) => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    
    // Initialize form with existing user data
    const [formData, setFormData] = useState({
        username: user?.username || '',
        college: user?.college || '',
        graduationYear: user?.graduationYear || '',
        course: user?.course || '',
        enrollmentNumber: user?.enrollmentNumber || '',
        phoneNumber: user?.phoneNumber || '',
        branch: user?.branch || ''
    });
    
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setPageError('');

        // Validate required fields
        const requiredFields = ['username', 'college', 'graduationYear', 'course', 'enrollmentNumber', 'phoneNumber', 'branch'];
        const missingFields = requiredFields.filter(field => !formData[field] || formData[field].toString().trim() === '');
        
        if (missingFields.length > 0) {
            setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
            return;
        }

        try {
            const { data } = await api.put('/api/user/profile', formData);
            setUser(data.user);
            setSuccessMessage('Profile completed successfully! Redirecting...');
            setTimeout(() => {
                navigate('/profile', { replace: true });
            }, 1200);
        } catch (err) {
            console.error('Error completing profile:', err.response?.data?.message || err.message);
            setError(err.response?.data?.message || 'Failed to complete profile. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username: *</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    disabled={user?.username && (user?.googleId || user?.discordId)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="college">College: *</label>
                <input
                    type="text"
                    id="college"
                    name="college"
                    placeholder="Enter your college name"
                    value={formData.college}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="graduationYear">Graduation Year: *</label>
                <input
                    type="number"
                    id="graduationYear"
                    name="graduationYear"
                    placeholder="e.g., 2025"
                    min="1900"
                    max="2100"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="course">Course: *</label>
                <input
                    type="text"
                    id="course"
                    name="course"
                    placeholder="e.g., B.Tech, M.Tech"
                    value={formData.course}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="branch">Branch: *</label>
                <input
                    type="text"
                    id="branch"
                    name="branch"
                    placeholder="e.g., Computer Science"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="enrollmentNumber">Enrollment Number: *</label>
                <input
                    type="text"
                    id="enrollmentNumber"
                    name="enrollmentNumber"
                    placeholder="Enter your enrollment number"
                    value={formData.enrollmentNumber}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number: *</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />
            </div>

            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <button type="submit" className="auth-submit-btn">Complete Profile</button>
        </form>
    );
};

export default CompleteProfileForm;