import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './ProfilePage.css';
import './AuthForm.css';

// --- SYNCHRONIZED HELPER FUNCTION FOR LEVELING LOGIC ---
const getExpForLevel = (level) => {
    if (level <= 1) return 0;
    const BASE_EXP_INCREMENT = 100;
    const EXP_INCREMENT_FACTOR = 50;
    let totalExpRequired = 0;
    for (let i = 1; i < level; i++) {
        totalExpRequired += BASE_EXP_INCREMENT + (i - 1) * EXP_INCREMENT_FACTOR;
    }
    return totalExpRequired;
};
// --- END SYNCHRONIZED HELPER FUNCTION ---


const ProfilePage = () => {
    const { user, loading, logout, setUser, needsUsernameSetup } = useAuth();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        bio: '',
        profilePicture: '',
        college: '',
        graduationYear: '',
        course: '',
        enrollmentNumber: '',
        phoneNumber: '',
        branch: '',
    });
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [updateError, setUpdateError] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState('');

    const [userRegistrations, setUserRegistrations] = useState([]);
    const [registrationsLoading, setRegistrationsLoading] = useState(true);
    const [registrationsError, setRegistrationsError] = useState('');

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login?session_expired=true');
        } else if (user) {
            if (needsUsernameSetup) {
                navigate('/complete-profile');
                return;
            }
            setFormData({
                username: user.username || '',
                bio: user.bio || '',
                profilePicture: user.profilePicture || '',
                college: user.college || '',
                graduationYear: user.graduationYear || '',
                course: user.course || '',
                enrollmentNumber: user.enrollmentNumber || '',
                phoneNumber: user.phoneNumber || '',
                branch: user.branch || '',
            });
            fetchUserRegistrations();
        }
    }, [user, loading, navigate, needsUsernameSetup]);

    const fetchUserRegistrations = async () => {
        setRegistrationsLoading(true);
        setRegistrationsError('');
        try {
            const { data } = await api.get('/api/registrations/my');
            setUserRegistrations(data);
        } catch (error) {
            console.error('Failed to fetch user registrations:', error);
            setRegistrationsError('Failed to load your event registrations.');
        } finally {
            setRegistrationsLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? parseInt(value, 10) : value,
        });
    };

    const handleProfileImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setUpdateError('Please upload an image file (e.g., JPG, PNG, GIF) for your profile picture.');
                setProfileImageFile(null);
                setFormData(prev => ({ ...prev, profilePicture: user.profilePicture || '' }));
                return;
            }

            setProfileImageFile(file);

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFormData(prev => ({ ...prev, profilePicture: reader.result }));
                setUpdateError('');
            };
            reader.onerror = (error) => {
                console.error('Error reading file:', error);
                setUpdateError('Failed to read image file.');
                setProfileImageFile(null);
                setFormData(prev => ({ ...prev, profilePicture: user.profilePicture || '' }));
            };
        } else {
            setProfileImageFile(null);
            setFormData(prev => ({ ...prev, profilePicture: user.profilePicture || '' }));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setUpdateError('');
        setUpdateSuccess('');

        try {
            let dataToSend = { ...formData };
            if (profileImageFile) {
                // profilePicture is already in formData as Base64 from the handler
            } else if (!formData.profilePicture) {
                dataToSend.profilePicture = '';
            }

            const { data } = await api.put('/api/users/profile', dataToSend);
            setUser(data.user);
            setUpdateSuccess('Profile updated successfully!');
            setIsEditing(false);
            setProfileImageFile(null);
        } catch (error) {
            console.error('Error updating profile:', error.response?.data?.message || error.message);
            setUpdateError(error.response?.data?.message || 'Failed to update profile.');
        }
    };

    if (loading) {
        return (
            <div className="profile-dashboard-container">
                <div className="dashboard-card">Loading profile...</div>
            </div>
        );
    }

    if (!user || needsUsernameSetup) {
        return null;
    }

    const currentTotalExp = user.exp;
    const expToStartCurrentLevel = getExpForLevel(user.level);
    const expToStartNextLevel = getExpForLevel(user.level + 1);
    const expGainedInCurrentLevel = currentTotalExp - expToStartCurrentLevel;
    const expNeededForNextLevel = expToStartNextLevel - expToStartCurrentLevel;
    let progressPercentage = 0;
    if (expNeededForNextLevel > 0) {
        progressPercentage = (expGainedInCurrentLevel / expNeededForNextLevel) * 100;
    } else {
        progressPercentage = 100;
    }
    progressPercentage = Math.min(100, Math.max(0, progressPercentage));

    return (
        <div className="profile-dashboard-container" style={{ marginTop: "140px", padding: "60px" }}>
            <div className="dashboard-header">
                <h2>Welcome, {user.username}!</h2>
                <button onClick={handleLogout} className="logout-dashboard-btn">Logout</button>
            </div>

            {updateError && <p className="error-message">{updateError}</p>}
            {updateSuccess && <p className="success-message">{updateSuccess}</p>}

            <div className="dashboard-grid">
                <div className="dashboard-card profile-overview-card">
                    <img src={user.profilePicture} alt="Profile" className="profile-picture-lg" />
                    <h3>{user.username}</h3>
                    <p className="profile-email">{user.email}</p>
                    <p className="profile-bio">{user.bio || 'No bio provided.'}</p>
                    <div className="user-details">
                        <p><strong>College:</strong> {user.college || 'N/A'}</p>
                        <p><strong>Course:</strong> {user.course || 'N/A'}</p>
                        <p><strong>Branch:</strong> {user.branch || 'N/A'}</p>
                        <p><strong>Graduation Year:</strong> {user.graduationYear || 'N/A'}</p>
                        <p><strong>Enrollment Number:</strong> {user.enrollmentNumber || 'N/A'}</p>
                        <p><strong>Phone Number:</strong> {user.phoneNumber || 'N/A'}</p>
                    </div>
                    <button onClick={() => setIsEditing(true)} className="edit-profile-btn">Edit Profile</button>
                </div>

                <div className="dashboard-card gamification-stats-card">
                    <h3>Your Progress</h3>
                    <div className="stat-item">
                        <span className="stat-label">Current EXP:</span>
                        <span className="stat-value">{user.exp}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Level:</span>
                        <span className="stat-value">{user.level}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Rank:</span>
                        <span className="stat-value rank-text">{user.rank}</span>
                    </div>

                    <div className="exp-progress-container">
                        <div className="exp-progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                        <span className="exp-progress-text">
                            {user.level >= 20 ? 'Max Level Reached!' : `${Math.round(expGainedInCurrentLevel)} / ${expNeededForNextLevel} EXP to Level ${user.level + 1}`}
                        </span>
                    </div>
                </div>

                <div className="dashboard-card registered-events-card">
                    <h3>My Registered Events</h3>
                    {registrationsLoading ? (
                        <p>Loading registrations...</p>
                    ) : registrationsError ? (
                        <p className="error-message">{registrationsError}</p>
                    ) : userRegistrations.length === 0 ? (
                        <p>You haven't registered for any events yet.</p>
                    ) : (
                        <div className="registered-events-list">
                            {userRegistrations.map((reg) => (
                                <div key={reg._id} className="registered-event-item">
                                    <h4>{reg.event.name}</h4>
                                    <p>Date: {new Date(reg.event.date).toLocaleDateString()}</p>
                                    <p>Points: {reg.event.pointsAwarded}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {isEditing && (
                <div className="edit-profile-modal-overlay">
                    <div className="edit-profile-modal-content dashboard-card">
                        <h3>Edit Profile</h3>
                        {updateError && <p className="error-message">{updateError}</p>}
                        {updateSuccess && <p className="success-message">{updateSuccess}</p>}
                        <form onSubmit={handleSave} className="profile-edit-form">
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="college">College:</label>
                                <input
                                    type="text"
                                    id="college"
                                    name="college"
                                    value={formData.college}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="graduationYear">Graduation Year:</label>
                                <input
                                    type="number"
                                    id="graduationYear"
                                    name="graduationYear"
                                    value={formData.graduationYear}
                                    onChange={handleChange}
                                    required
                                    min="1900"
                                    max="2100"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="course">Course:</label>
                                <input
                                    type="text"
                                    id="course"
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="enrollmentNumber">Enrollment Number:</label>
                                <input
                                    type="text"
                                    id="enrollmentNumber"
                                    name="enrollmentNumber"
                                    value={formData.enrollmentNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number:</label>
                                <input
                                    type="tel" // Use 'tel' for phone numbers
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="branch">Branch:</label>
                                <input
                                    type="text"
                                    id="branch"
                                    name="branch"
                                    value={formData.branch}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bio">Bio:</label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows="4"
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="profilePictureFile">Upload Profile Picture:</label>
                                <input
                                    type="file"
                                    id="profilePictureFile"
                                    name="profilePictureFile"
                                    accept="image/*"
                                    onChange={handleProfileImageUpload}
                                />
                                {formData.profilePicture && (
                                    <div className="profile-image-preview">
                                        <p>Current/New Profile Picture:</p>
                                        <img src={formData.profilePicture} alt="Profile Preview" style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '50%', border: '2px solid #61dafb', marginTop: '10px' }} />
                                        {formData.profilePicture !== user.profilePicture && (
                                            <button type="button" onClick={() => {
                                                setFormData(prev => ({ ...prev, profilePicture: user.profilePicture }));
                                                setProfileImageFile(null);
                                            }} className="clear-image-btn">Clear Image</button>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="auth-submit-btn">Save Changes</button>
                                <button type="button" onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;