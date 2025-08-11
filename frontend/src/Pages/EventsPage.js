// frontend/src/pages/EventsPage.js

import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./EventsPage.css"; // Make sure this CSS file exists
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// --- SYNCHRONIZED HELPER FUNCTION FOR LEVELING LOGIC ---
// IMPORTANT: This function MUST exactly match the `getExpForLevel` function
// in your backend/src/models/User.js.
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

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get(process.env.REACT_APP_API_URL+"/api/events");
        setEvents(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events.");
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleRegister = async (eventId) => {
    if (!authLoading && !user) {
      setRegistrationMessage("Please log in to register for an event.");
      navigate("/login");
      return;
    }

    try {
      const response = await api.post(`/api/registrations/${eventId}`);

      setRegistrationMessage(
        `Successfully registered for the event! EXP awarded.`
      );
      console.log("Registration successful:", response.data);

      setTimeout(() => {
        setRegistrationMessage("");
      }, 5000); // Clears message after 5 seconds
    } catch (err) {
      console.error(
        "Registration error details:",
        err.response?.data || err.message
      );

      if (err.response && err.response.data && err.response.data.message) {
        setRegistrationMessage(
          `Registration error: ${err.response.data.message}`
        );
      } else {
        setRegistrationMessage("Failed to register for event.");
      }

      setTimeout(() => {
        setRegistrationMessage("");
      }, 8000); // Clears error message after 8 seconds
    }
  };

  if (loading) {
    return <div className="events-container">Loading events...</div>;
  }

  if (error) {
    return <div className="events-container error-message">{error}</div>;
  }

  return (
    <div className="events-container">
      <h1>Available Events</h1>
      {registrationMessage && (
        <div
          className={`registration-feedback ${
            registrationMessage.includes("Successfully")
              ? "success-message"
              : "error-message"
          }`}
        >
          {registrationMessage}
        </div>
      )}
      <div className="events-list">
        {events.length === 0 ? (
          <div className="error-message">No active events found at the moment.</div>
        ) : (
          events.sort((a, b) => new Date(b.date) - new Date(a.date)).map((event, index) => {
            // Array of character icons to cycle through
            const characterIcons = [
              "/assets/Arcade_characters/girl.png",
              "/assets/Arcade_characters/hd-breach-valorant-agent-character-png-733961695136507svjli3yqak.png",
              "/assets/Arcade_characters/hd-valorant-game-omen-character-player-png-733961695115637mjmuwerdpd.png",
              "/assets/Arcade_characters/hd-cypher-valorant-agent-player-character-png-733961695136397ip7azqjn0f.png",
              "/assets/Arcade_characters/hd-valorant-skye-female-agent-character-player-png-733961695044451lht9vgdild.png",
              "/assets/Arcade_characters/hd-jett-agent-valorant-character-png-73396169513617240gxkjy1tt.png",
            ];
            
            // Array of event images to cycle through
            const eventImages = [
              "/images/events/orientation.png",
              "/images/events/Game dev workshop.webp",
              "/images/events/past_event_11.png",
              "/images/events/past_event_22.png",
            ];
            
            // Get character icon and event image based on index, cycling through available options
            const characterIcon = characterIcons[index % characterIcons.length];
            const defaultEventImage = eventImages[index % eventImages.length];
            
            return (
              <div key={event._id} className="event-card">
                <div className="event-image-container">
                  {/* {event.imageUrl ? (
                    <img
                      src={event.imageUrl}
                      alt={event.name}
                      className="event-image"
                    />
                  ) : (
                    <img
                      src={defaultEventImage}
                      alt={event.name}
                      className="event-image"
                    />
                  )} */}
                    <img
                      src={defaultEventImage}
                      alt={event.name}
                      className="event-image"
                    />
                </div>
                <div className="event-details">
                  <div className="character-icon">
                    <img src={characterIcon} alt="Character" className="character-image" />
                  </div>
                  <h2>{event.name}</h2>
                  <div className="event-info">
                    <p>
                      <strong>📅 Date:</strong>
                       <span style={{marginLeft:'6px'}}>{ formatDate(event.date)}</span>
                    </p>
                    <p>
                      <strong>📍 Location:</strong> {event.location}
                    </p>
                    <p>
                      <strong>⭐ Points:</strong> {event.pointsAwarded} EXP
                    </p>
                  </div>
                  {event.isActive && new Date(event.date) > new Date() ? (
                    <button
                      onClick={() => handleRegister(event._id)}
                      className="register-button"
                    >
                      Register Now
                    </button>
                  ) : (
                    <div className="event-inactive-message">Event Inactive</div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EventsPage;








