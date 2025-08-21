import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./ProfilePage.css";
import "./AuthForm.css";
import AdminNavbar from "./AdminNavbar";
import { PiGameControllerBold } from "react-icons/pi";


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

function formatDate(isoString) {
    const date = new Date(isoString);
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long', timeZone: 'UTC' });
    const year = date.getUTCFullYear();

    const suffix = (n) => {
        if (n > 3 && n < 21) return 'th';
        switch (n % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return `${day}${suffix(day)} ${month} ${year}`;
}

const ProfilePage = () => {
    const { user, loading, logout, setUser } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        bio: "",
        profilePicture: "",
        college: "",
        graduationYear: "",
        course: "",
        enrollmentNumber: "",
        phoneNumber: "",
        branch: "",
    });
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [updateError, setUpdateError] = useState("");
    const [updateSuccess, setUpdateSuccess] = useState("");
    const [userRegistrations, setUserRegistrations] = useState([]);
    const [registrationsLoading, setRegistrationsLoading] = useState(true);
    const [registrationsError, setRegistrationsError] = useState("");

    // --- useEffect to check for profile completion (This logic is correct) ---
    useEffect(() => {
        if (!loading && !user) {
            navigate("/login?session_expired=true");
        } else if (user) {
            if (!user.isProfileComplete) {
                navigate("/complete-profile");
                return;
            }
            setFormData({
                username: user.username || "",
                bio: user.bio || "",
                profilePicture: user.profilePicture || "",
                college: user.college || "",
                graduationYear: user.graduationYear || "",
                course: user.course || "",
                enrollmentNumber: user.enrollmentNumber || "",
                phoneNumber: user.phoneNumber || "",
                branch: user.branch || "",
            });
            fetchUserRegistrations();
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        if (isEditing) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isEditing]);

    const fetchUserRegistrations = async () => {
        setRegistrationsLoading(true);
        setRegistrationsError("");
        try {
            const { data } = await api.get("/api/registrations/my");
            setUserRegistrations(data);
        } catch (error) {
            console.error("Failed to fetch user registrations:", error);
            setRegistrationsError("Failed to load your event registrations.");
        } finally {
            setRegistrationsLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === "number" ? parseInt(value, 10) : value,
        });
    };

    const handleProfileImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                setUpdateError("Please upload an image file (e.g., JPG, PNG, GIF) for your profile picture.");
                setProfileImageFile(null);
                setFormData((prev) => ({
                    ...prev,
                    profilePicture: user.profilePicture || "",
                }));
                return;
            }
            setProfileImageFile(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFormData((prev) => ({ ...prev, profilePicture: reader.result }));
                setUpdateError("");
            };
            reader.onerror = (error) => {
                console.error("Error reading file:", error);
                setUpdateError("Failed to read image file.");
                setProfileImageFile(null);
                setFormData((prev) => ({
                    ...prev,
                    profilePicture: user.profilePicture || "",
                }));
            };
        } else {
            setProfileImageFile(null);
            setFormData((prev) => ({
                ...prev,
                profilePicture: user.profilePicture || "",
            }));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setUpdateError("");
        setUpdateSuccess("");

        try {
            let dataToSend = { ...formData };
            if (profileImageFile) {
                // formData.profilePicture is already in Base64
            } else if (!formData.profilePicture) {
                dataToSend.profilePicture = "";
            }

            // --- ✅ FIX: Point to the correct, unified API endpoint ---
            const { data } = await api.put("/api/users/profile", dataToSend);

            setUser(data);
            setUpdateSuccess("Profile updated successfully!");
            setTimeout(() => setUpdateSuccess(""), 3000); // Clear message after 3s
            setIsEditing(false);
            setProfileImageFile(null);
        } catch (error) {
            const message = error.response?.data?.message || "Failed to update profile.";
            setUpdateError(message);
            console.error("Error updating profile:", message);
        }
    };

    if (loading) {
        return (
            <div className="futuristic-profile-container">
                <div className="loading-card">Loading profile...</div>
            </div>
        );
    }

    if (!user || !user.isProfileComplete) {
        return null; // Return null to prevent flicker while redirecting
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
        <>
            {user.role === "admin" && <AdminNavbar />}
            <div className="futuristic-profile-container">
                <nav className="futuristic-nav">
                    <button onClick={handleLogout} className="nav-link logout-btn">LOGOUT</button>
                </nav>
                <div className="profile-grid">
                    <div className="profile-card">
                        <div className="avatar-container">
                            <img
                                src={user.profilePicture || "https://via.placeholder.com/120"}
                                alt="Profile"
                                className="avatar"
                            />
                        </div>
                        <h2 className="profile-name">{user.username}</h2>
                        <h4 className=''>{user.rank}</h4>
                        <p className="profile-role" style={{ marginTop: "10px", marginBottom: "10px" }}>{user.bio || "No bio provided."}</p>
                        <span className="detail-value">{user.email}</span>
                        <div className="profile-details" style={{ marginTop: "20px" }}>
                            <div className="detail-row">
                                <span className="detail-label">College</span>
                                <span className="detail-value">{user.college || "N/A"}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Graduation Year</span>
                                <span className="detail-value">{user.graduationYear || "N/A"}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Course</span>
                                <span className="detail-value">{user.course || "N/A"}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Enrollment No.</span>
                                <span className="detail-value">{user.enrollmentNumber || "N/A"}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Phone No.</span>
                                <span className="detail-value">{user.phoneNumber || "N/A"}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Branch</span>
                                <span className="detail-value">{user.branch || "N/A"}</span>
                            </div>
                        </div>

                        <button onClick={() => setIsEditing(true)} className="edit-profile-button">
                            Edit Profile
                        </button>
                        <div className="level-badge">
                            <div className="level-circle">
                                <span className="level-number">{user.level}</span>
                                <span className="level-text">LEVEL</span>
                            </div>
                        </div>
                        <div className="exp-progress-container">
                            <div className="exp-progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                            <span className="exp-progress-text">
                                {user.level >= 20 ? 'Max Level Reached!' : `${Math.round(expGainedInCurrentLevel)} / ${expNeededForNextLevel} EXP to Level ${user.level + 1}`}
                            </span>
                        </div>
                    </div>
                    <div className="center-content">
                        <div className="events-card" style={{ position: 'relative' }}>
                            <h3 className="card-title">Participated Events</h3>
                            <div className="events-list">
                                {userRegistrations.length > 0 ? (
                                    userRegistrations.map((reg, index) => (
                                        <div key={reg._id} className="event-item">
                                            {reg.event ? (
                                                <>
                                                    <div className="event-info">
                                                        <span className="event-name">{reg.event.name}</span>
                                                        <span className="event-status">
                                                            {new Date(reg.event.date) > new Date() ? "Upcoming" : "Completed"}
                                                        </span>
                                                    </div>
                                                    <span className="event-date">{formatDate(reg.event.date)}</span>
                                                </>
                                            ) : (
                                                <div className="event-info">
                                                    <span className="event-name">Event details not available</span>
                                                    <span className="event-status">Deleted</span>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ opacity: ".8", left: "50%", transform: "translateX(-50%)", position: 'relative' }}>
                                        <center>Participated in no events yet!</center>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="recently-played-card">
                            <h3 className="card-title">Recently played</h3>
                            <div style={{ margin: '20px', marginBottom: '40px', opacity: '0.8' }}>
                                <center>No game played yet!</center>
                            </div>
                            <a href="stay-tuned" style={{ textDecoration: 'none' }}>
                                <button className="add-friends-btn">
                                    <PiGameControllerBold className="add-friends-icon" />
                                    Play games
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="friends-card">
                        <h3 className="card-title">Friend List</h3>
                        <div style={{ margin: '20px', opacity: '0.8' }}>
                            <center>Stay tuned</center>
                        </div>
                    </div>
                </div>

                {isEditing && (
                    <div
                        className="edit-profile-modal-overlay"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setIsEditing(false);
                        }}
                    >
                        <div className="edit-profile-modal-content dashboard-card" style={{ marginTop: "2rem" }}>
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
                                        type="tel"
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
                                            <img src={formData.profilePicture} alt="Profile Preview" />
                                            {formData.profilePicture !== user.profilePicture && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            profilePicture: user.profilePicture,
                                                        }));
                                                        setProfileImageFile(null);
                                                    }}
                                                    className="clear-image-btn"
                                                >
                                                    Clear Image
                                                </button>
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
        </>
    );
};

export default ProfilePage;