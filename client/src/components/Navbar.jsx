import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  console.log("USER IN NAVBAR:", user);
  const isAdmin = user?.isAdmin === true;

  // Load user on mount + refresh
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // Listen for manual updates (login event)
  useEffect(() => {
    const syncUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    };

    window.addEventListener("storage", syncUser);

    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // IMPORTANT
    window.location.href = "/";
  };

  return (
    <nav className="navbar">

      {/* BRAND */}
      <div className="nav-left">
        <Link to="/" className="logo">
          NovaCart
        </Link>
      </div>

      {/* CENTER LINKS */}
      <div className="nav-center">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        {isAdmin && <Link to="/admin">Admin</Link>}
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">

        {!user ? (
          <>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <div className="profile-wrapper">

            {/* PROFILE BUTTON */}
            <div
              className="profile-badge"
              onClick={() => setOpen(!open)}
              style={{ cursor: "pointer" }}
            >
              👤 {user.name}
            </div>

            {/* DROPDOWN */}
            {open && (
  <div className="profile-popup">

    <div className="profile-links">
      <Link to="/account">My Account</Link>
      {isAdmin && <Link to="/admin">Admin Dashboard</Link>}
    </div>

    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>

  </div>
)}

          </div>
        )}

      </div>

    </nav>
  );
}