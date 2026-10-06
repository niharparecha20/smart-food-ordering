import "./Profile.css";

function Profile() {
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
            <strong>Food User</strong>
          </div>

          <div className="info-item">
            <span>Email</span>
            <strong>user@example.com</strong>
          </div>

          <div className="info-item">
            <span>Phone</span>
            <strong>+91 98765 43210</strong>
          </div>

          <div className="info-item">
            <span>Address</span>
            <strong>Rajkot, Gujarat</strong>
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