import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./ProfilePage.css";
import "./AuthForm.css";
import AdminNavbar from "./AdminNavbar";
import { PiGameControllerBold } from "react-icons/pi";

// --- SYNCHRONIZED HELPER FUNCTION FOR LEVELING LOGIC (No changes) ---
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
// Other helper functions (formatDate) remain the same...
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

    // Other useEffects and functions (fetchUserRegistrations, handleLogout, handleChange, etc.) remain unchanged...

    const handleProfileImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                setUpdateError("Please upload an image file (e.g., JPG, PNG, GIF).");
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
    
    // --- All JSX and progress bar calculations remain unchanged ---
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
            {/* The rest of your JSX for the profile page remains the same */}
        </>
    );
};

export default ProfilePage;