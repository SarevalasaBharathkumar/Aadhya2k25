import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages.css"

const Profile = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="page-container">
      <h1>My Profile</h1>
      <p>Welcome to your profile page!</p>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
