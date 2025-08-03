import React from "react";

// user react-router-dom for routing
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      style={{
        alignItems: "center",
        position: "fixed",
        top: "0px",
        display: "flex",
        justifyContent: "space-between",
        width: "100vw",
        padding: "20px 20px",
        paddingTop: "20px",
        zIndex: "10000",
      }}
      className="navbar"
    >
      <div>
        <a href="/">
          <img
            src="/assets/logos/logo1.jpg"
            alt="logo"
            style={{ width: "36px", height: "36px" }}
          />
        </a>
      </div>
      <ul
        style={{
          fontFamily: "'Valorax', sans-serif",
          display: "flex",
          gap: "40px",
          listStyleType: "none",
          fontSize: "1em",
          color: "white",
        }}
      >
        <li>
          <Link
            to="/about"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ fontFamily: "'Jura', sans-serif", fontWeight: "700" }}
          >
            ABOUT
          </Link>
        </li>
        <li>
          <Link
            to="/events"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ fontFamily: "'Jura', sans-serif", fontWeight: "700" }}
          >
            EVENTS
          </Link>
        </li>
        <li>
          <Link
            to="/stay-tuned"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ fontFamily: "'Jura', sans-serif", fontWeight: "700" }}
          >
            GAMES
          </Link>
        </li>
        <li>
          <Link
            to="/team"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ fontFamily: "'Jura', sans-serif", fontWeight: "700" }}
          >
            TEAMS
          </Link>
        </li>
        <li>
          <Link
            to="/gallery"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ fontFamily: "'Jura', sans-serif", fontWeight: "700" }}
          >
            GALLERY
          </Link>
        </li>
        {/* <li>
          <a href="#footer">Contact</a>
        </li> */}
      </ul>

      <div style={{ paddingRight: "22px", fontWeight: "600" }}>
        {isAuthenticated && !loading ? (
          <>
            {user?.role === "admin" && ( // CONDITIONAL ADMIN LINK
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}
            <a
              href="/profile"
              style={{
                color: "white",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img
                src={user?.profilePicture}
                alt="profile"
                style={{ width: "36px", height: "36px", borderRadius: "50%" }}
              />
              <div>{user?.username}</div>
            </a>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

