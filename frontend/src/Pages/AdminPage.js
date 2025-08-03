// frontend/src/pages/AdminPage.js

import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css"; // Assuming you have CSS for this page
import "./AuthForm.css"; // Re-using form styles
import AdminNavbar from "./AdminNavbar"; // path already looks correct
import Button from "../Components/Button";

const AdminPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  <AdminNavbar />;

  // State for creating new events
  const [createEventForm, setCreateEventForm] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    pointsAwarded: "",
    isActive: true,
  });
  const [eventImageBase64, setEventImageBase64] = useState(""); // NEW state for Base64 image
  const [createEventMessage, setCreateEventMessage] = useState(""); // For success/error messages

  // State for viewing/managing existing events
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState("");

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      // Redirect if not authenticated or not an admin
      navigate("/login?unauthorized=true");
    } else if (user && user.role === "admin") {
      fetchEvents(); // Fetch events if admin is logged in
    }
  }, [user, authLoading, navigate]);

  const fetchEvents = async () => {
    setEventsLoading(true);
    setEventsError("");
    try {
      const { data } = await api.get("/api/events");
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEventsError("Failed to load events.");
    } finally {
      setEventsLoading(false);
    }
  };

  const handleCreateEventChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCreateEventForm({
      ...createEventForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // --- NEW: Handle Image File Upload and Conversion to Base64 ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Basic file type check
      if (!file.type.startsWith("image/")) {
        setCreateEventMessage(
          "Please upload an image file (e.g., JPG, PNG, GIF)."
        );
        setEventImageBase64(""); // Clear previous image
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert file to Base64 string
      reader.onload = () => {
        setEventImageBase64(reader.result); // Set the Base64 string in state
        setCreateEventMessage(""); // Clear any previous error messages
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        setCreateEventMessage("Failed to read image file.");
        setEventImageBase64("");
      };
    } else {
      setEventImageBase64(""); // Clear if no file selected
    }
  };
  // --- END NEW IMAGE HANDLING ---

  const handleCreateEventSubmit = async (e) => {
    e.preventDefault();
    setCreateEventMessage("");
    try {
      const eventData = {
        ...createEventForm,
        pointsAwarded: parseInt(createEventForm.pointsAwarded, 10), // Ensure points are a number
        imageUrl: eventImageBase64, // --- INCLUDE THE BASE64 IMAGE DATA ---
      };

      const { data } = await api.post("/api/events", eventData);
      setCreateEventMessage(`Event "${data.name}" created successfully!`);
      setCreateEventForm({
        // Reset form
        name: "",
        description: "",
        date: "",
        location: "",
        pointsAwarded: "",
        isActive: true,
      });
      setEventImageBase64(""); // Reset image field
      fetchEvents(); // Refresh event list
    } catch (error) {
      console.error(
        "Error creating event:",
        error.response?.data?.message || error.message
      );
      setCreateEventMessage(
        `Error creating event: ${
          error.response?.data?.message || "Server error"
        }`
      );
    }
  };

  // Placeholder for handleUpdateEvent and handleDeleteEvent (implement similar to create)
  const handleUpdateEvent = (eventId) => {
    // In a real app, you'd load the event data into a modal for editing
    alert(`Implement update for event ID: ${eventId}`);
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await api.delete(`/api/events/${eventId}`);
        setCreateEventMessage("Event deleted successfully!");
        fetchEvents(); // Refresh event list
      } catch (error) {
        console.error(
          "Error deleting event:",
          error.response?.data?.message || error.message
        );
        setCreateEventMessage(
          `Error deleting event: ${
            error.response?.data?.message || "Server error"
          }`
        );
      }
    }
  };

  if (authLoading) {
    return (
      <div className="admin-dashboard-container">
        Loading admin dashboard...
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="admin-dashboard-container">
        Access Denied. You are not an administrator.
      </div>
    );
  }

  return (
    <div
      className="admin-dashboard-container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1>Admin Dashboard</h1>

      {/* Event Creation Form */}
      <div className="dashboard-card" style={{ marginTop: "2rem" }}>
        <h2>Create New Event</h2>
        {createEventMessage && (
          <p
            className={`message ${
              createEventMessage.includes("successfully")
                ? "success-message"
                : "error-message"
            }`}
          >
            {createEventMessage}
          </p>
        )}
        <form onSubmit={handleCreateEventSubmit} className="admin-form">
          <div className="form-group">
            <label htmlFor="name">Event Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={createEventForm.name}
              onChange={handleCreateEventChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={createEventForm.description}
              onChange={handleCreateEventChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="datetime-local" // Use datetime-local for date and time input
              id="date"
              name="date"
              value={createEventForm.date}
              onChange={handleCreateEventChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={createEventForm.location}
              onChange={handleCreateEventChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="pointsAwarded">Points Awarded:</label>
            <input
              type="number"
              id="pointsAwarded"
              name="pointsAwarded"
              value={createEventForm.pointsAwarded}
              onChange={handleCreateEventChange}
              required
              min="1"
            />
          </div>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={createEventForm.isActive}
              onChange={handleCreateEventChange}
            />
            <label htmlFor="isActive">Active Event</label>
          </div>

          {/* --- NEW: Image Upload Input --- */}
          <div className="form-group">
            <label htmlFor="eventImage">Event Image:</label>
            <input
              type="file"
              id="eventImage"
              name="eventImage"
              accept="image/*" // Only allow image files
              onChange={handleImageUpload}
            />
            {eventImageBase64 && (
              <div className="image-preview">
                <p>Image Preview:</p>
                <img
                  src={eventImageBase64}
                  alt="Event Preview"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    border: "1px solid #ddd",
                    marginTop: "10px",
                  }}
                />
              </div>
            )}
          </div>
          {/* --- END NEW IMAGE UPLOAD --- */}

          <Button
            type="submit"
            className="auth-submit-btn"
            text="Create Events"
            style={{ marginLeft: "2rem", marginRight: "2rem" }}
          />
        </form>
      </div>

      {/* Manage Existing Events Section */}
      <div className="dashboard-card" style={{ marginTop: "2rem" }}>
        <h2>Manage Existing Events</h2>
        {eventsLoading ? (
          <p>Loading events...</p>
        ) : eventsError ? (
          <p className="error-message">{eventsError}</p>
        ) : events.length === 0 ? (
          <p>No events found. Create one above!</p>
        ) : (
          <div className="events-management-list">
            {events.map((event) => (
              <div
                key={event._id}
                className="event-manage-item"
                style={{ margin: "1rem" }}
              >
                <span>
                  {event.name} (Points: {event.pointsAwarded}) -{" "}
                  {event.isActive ? "Active" : "Inactive"}
                </span>
                <div className="event-actions" style={{ marginTop: "1rem" }}>
                  <Button
                    onClick={() => handleUpdateEvent(event._id)}
                    className="action-button edit-button"
                    text={"Edit"}
                    style={{ marginLeft: "2rem", marginRight: "2rem" }}
                  />

                  <Button
                    onClick={() => handleDeleteEvent(event._id)}
                    className="action-button delete-button"
                    text={"Delete"}
                    style={{ marginLeft: "2rem", marginRight: "2rem" }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
