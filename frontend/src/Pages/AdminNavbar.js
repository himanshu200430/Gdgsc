import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const [activeTab, setActiveTab] = useState("calendar");
  const navigate = useNavigate();

  return (
    <div className="admin-navbar">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          className={`admin-nav-btn ${
            activeTab === "calendar" ? "active" : ""
          }`}
          onClick={() => setActiveTab("calendar")}
          style={{ marginLeft: "2rem", marginRight: "2rem" }}
        >
          Event Calendar
        </button>
        <button
          className={`admin-nav-btn ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
          style={{ marginLeft: "2rem", marginRight: "2rem" }}
        >
          User Details
        </button>
        <button
          className={`admin-nav-btn ${
            activeTab === "participation" ? "active" : ""
          }`}
          onClick={() => setActiveTab("participation")}
          style={{ marginLeft: "2rem", marginRight: "2rem" }}
        >
          Participation Details
        </button>
      </div>

      <div className="admin-content">
        {activeTab === "calendar" && <EventCalendar />}
        {activeTab === "users" && <UserDetails />}
        {activeTab === "participation" && <ParticipationDetails />}
      </div>
    </div>
  );
};

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
  });

  const handleAddEvent = () => {
    setEvents([...events, newEvent]);
    setNewEvent({ title: "", date: "", time: "", location: "" });
  };

  return (
    <div
      className="admin-section"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Event Calendar</h2>
      <div className="event-form">
        <input
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        />
        <input
          type="time"
          value={newEvent.time}
          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={newEvent.location}
          onChange={(e) =>
            setNewEvent({ ...newEvent, location: e.target.value })
          }
        />
        <button onClick={handleAddEvent}>Add Event</button>
      </div>
      <div className="events-list">
        {events.map((event, index) => (
          <div key={index} className="event-item" style={{ display: "flex" }}>
            <h3 style={{ marginLeft: "2rem", marginRight: "2rem" }}>
              {event.title}
            </h3>
            <p style={{ marginLeft: "2rem", marginRight: "2rem" }}>
              Date: {event.date}
            </p>
            <p style={{ marginLeft: "2rem", marginRight: "2rem" }}>
              Time: {event.time}
            </p>
            <p style={{ marginLeft: "2rem", marginRight: "2rem" }}>
              Location: {event.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const UserDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      age: 22,
      email: "john@example.com",
      phone: "1234567890",
      college: "ABC College",
    },
    // Add more sample users as needed
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-section">
      <h2>User Details</h2>
      <input
        type="text"
        placeholder="Search by name or username"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <table className="users-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Username</th>
            <th>Age</th>
            <th>Email</th>
            <th>Phone</th>
            <th>College</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.college}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ParticipationDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [participations, setParticipations] = useState([
    {
      id: 1,
      name: "John Doe",
      enrollmentNo: "EN001",
      branch: "CSE",
      year: "3rd",
      exp: 50,
      events: "Hackathon, Coding Competition",
      level: 10,
    },
    // Add more sample participations as needed
  ]);

  const filteredParticipations = participations.filter(
    (participation) =>
      participation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participation.enrollmentNo
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-section">
      <h2>Participation Details</h2>
      <input
        type="text"
        placeholder="Search by name or enrollment no."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <table className="participations-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Enrollment No.</th>
            <th>Branch</th>
            <th>Year</th>
            <th>Exp</th>
            <th>Events</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {filteredParticipations.map((participation, index) => (
            <tr key={participation.id}>
              <td>{index + 1}</td>
              <td>{participation.name}</td>
              <td>{participation.enrollmentNo}</td>
              <td>{participation.branch}</td>
              <td>{participation.year}</td>
              <td>{participation.exp}</td>
              <td>{participation.events}</td>
              <td>{participation.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminNavbar;
