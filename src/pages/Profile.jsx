import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    // User is not logged in
    if (!token || !storedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          👤
        </div>

        <h1>My Profile</h1>

        <p className="profile-subtitle">
          Manage your account information
        </p>

        <div className="profile-info">
          <div className="info-item">
            <span>Name</span>
            <strong>{user.name}</strong>
          </div>

          <div className="info-item">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div className="info-item">
            <span>Phone</span>
            <strong>{user.phone || "Not provided"}</strong>
          </div>

          <div className="info-item">
            <span>Address</span>
            <strong>{user.address || "Not provided"}</strong>
          </div>
        </div>

        <button className="edit-profile-btn">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;