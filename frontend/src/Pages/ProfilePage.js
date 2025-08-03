// frontend/src/pages/ProfilePage.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./ProfilePage.css";
import "./AuthForm.css";
import AdminNavbar from "./AdminNavbar";
import { FaUserPlus } from "react-icons/fa";

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

const ProfilePage = () => {
  const { user, loading, logout, setUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    profilePicture: "",
  });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [registrationsLoading, setRegistrationsLoading] = useState(true);
  const [registrationsError, setRegistrationsError] = useState("");

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
      });
      fetchUserRegistrations();
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (isEditing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; // Reset to default
    }

    // Cleanup on unmount or when isEditing changes
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setUpdateError(
          "Please upload an image file (e.g., JPG, PNG, GIF) for your profile picture."
        );
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
        // formData.profilePicture already has the Base64 string
      } else if (!formData.profilePicture) {
        dataToSend.profilePicture = "";
      }

      const { data } = await api.put("/api/user/profile", dataToSend);
      setUser(data.user);
      setUpdateSuccess("Profile updated successfully!");
      setIsEditing(false);
      setProfileImageFile(null);
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data?.message || error.message
      );
      setUpdateError(
        error.response?.data?.message || "Failed to update profile."
      );
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
    return null;
  }

  return (
    <>
      {user.role === "admin" && <AdminNavbar />}
      <div className="futuristic-profile-container">
        {/* Navigation Bar */}
        <nav className="futuristic-nav">
          {/* <div className="nav-links">
            <a href="/" className="nav-link">HOME</a>
            <a href="/about" className="nav-link">ABOUT</a>
            <a href="/events" className="nav-link">EVENTS</a>
            <a href="/games" className="nav-link">GAMES</a>
            <a href="/team" className="nav-link">TEAM</a>
            <a href="/gallery" className="nav-link">GALLERY</a>
            <a href="/contact" className="nav-link">CONTACT</a>
          </div> */}
          <button onClick={handleLogout} className="nav-link logout-btn">LOGOUT</button>
        </nav>

        <div className="profile-grid">
          {/* Left Profile Card */}
          <div className="profile-card">
            <div className="avatar-container">
              <img
                src={user.profilePicture || "https://via.placeholder.com/120"}
                alt="Profile"
                className="avatar"
              />
            </div>
            <h2 className="profile-name">{user.username}</h2>
            <p className="profile-role">{user.bio || "Game Developer"}</p>
            
            <div className="profile-details">
              <div className="detail-row">
                <span className="detail-label">Gender</span>
                <span className="detail-value">Male</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">DOB</span>
                <span className="detail-value">xx/xx/xxxx</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Age</span>
                <span className="detail-value">xx</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Mail</span>
                <span className="detail-value">xyz@abc.com</span>
              </div>
            </div>

            <button onClick={() => setIsEditing(true)} className="edit-profile-button">
              Edit Profile
            </button>

            {/* Level Badge moved here */}
            <div className="level-badge">
              <div className="level-circle">
                <span className="level-number">{user.level}</span>
                <span className="level-text">LEVEL</span>
              </div>
            </div>
          </div>

          {/* Center Content */}
          <div className="center-content">
            {/* Participated Events */}
            <div className="events-card">
              <h3 className="card-title">Participated Events</h3>
              <div className="events-list">
                {userRegistrations.length > 0 ? (
                  userRegistrations.slice(0, 3).map((reg, index) => (
                    <div key={reg._id} className="event-item">
                      <div className="event-info">
                        <span className="event-name">{reg.event?.name || "Event"}</span>
                        <span className="event-status">
                          {new Date(reg.event?.date) > new Date() ? "Upcoming" : "Completed"}
                        </span>
                      </div>
                      <span className="event-date">xx/xx/xxxx</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="event-item">
                      <div className="event-info">
                        <span className="event-name">Hack-a-thon</span>
                        <span className="event-status upcoming">Upcoming</span>
                      </div>
                      <span className="event-date">xx/xx/xxxx</span>
                    </div>
                    <div className="event-item">
                      <div className="event-info">
                        <span className="event-name">Game-a-thon</span>
                        <span className="event-status position">1st Position</span>
                      </div>
                      <span className="event-date">xx/xx/xxxx</span>
                    </div>
                    <div className="event-item">
                      <div className="event-info">
                        <span className="event-name">Design-a-thon</span>
                        <span className="event-status position">2nd Position</span>
                      </div>
                      <span className="event-date">xx/xx/xxxx</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Recently Played */}
            <div className="recently-played-card">
              <h3 className="card-title">Recently played</h3>
              <div className="games-list">
                <div className="game-item">
                  <span className="game-name">Valorant</span>
                  <span className="game-time">2 Mins Ago</span>
                </div>
                <div className="game-item">
                  <span className="game-name">Among Us</span>
                  <span className="game-time">4 Hours Ago</span>
                </div>
                <div className="game-item">
                  <span className="game-name">Brawlhalla</span>
                  <span className="game-time">7 days ago</span>
                </div>
                 <div className="game-item">
                  <span className="game-name">Among Us</span>
                  <span className="game-time">4 Hours Ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Friend List */}
          <div className="friends-card">
            <h3 className="card-title">Friend List</h3>
            <div className="friends-list">
              <div className="friend-item">
                <div className="friend-info">
                  <div className="friend-avatar"></div>
                  <span className="friend-name">Cab</span>
                </div>
                <span className="friend-level">Level 21</span>
              </div>
              <div className="friend-item">
                <div className="friend-info">
                  <div className="friend-avatar"></div>
                  <span className="friend-name">abc</span>
                </div>
                <span className="friend-level">Level 18</span>
              </div>
              <div className="friend-item">
                <div className="friend-info">
                  <div className="friend-avatar"></div>
                  <span className="friend-name">cba</span>
                </div>
                <span className="friend-level">Level 25</span>
              </div>
              <div className="friend-item">
                <div className="friend-info">
                  <div className="friend-avatar"></div>
                  <span className="friend-name">bac</span>
                </div>
                <span className="friend-level">Level 14</span>
              </div>
              <div className="friend-item">
                <div className="friend-info">
                  <div className="friend-avatar"></div>
                  <span className="friend-name">bca</span>
                </div>
                <span className="friend-level">Level 30</span>
              </div>
            </div>
            <button className="add-friends-btn">
              <FaUserPlus className="add-friends-icon" />
              Add Friends
            </button>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditing && (
          <div
            className="edit-profile-modal-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsEditing(false);
            }}
          >
            <div
              className="edit-profile-modal-content dashboard-card"
              style={{ marginTop: "2rem" }}
            >
              <h3>Edit Profile</h3>
              {updateError && <p className="error-message">{updateError}</p>}
              {updateSuccess && (
                <p className="success-message">{updateSuccess}</p>
              )}
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
                  <label htmlFor="profilePictureFile">
                    Upload Profile Picture:
                  </label>
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
                      <img
                        src={formData.profilePicture}
                        alt="Profile Preview"
                      />
                      {formData.profilePicture !== user.profilePicture && (
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              profilePicture: "",
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
                  <button type="submit" className="auth-submit-btn">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
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





