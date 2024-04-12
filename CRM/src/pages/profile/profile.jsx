import React, { useState, useEffect } from "react";
import { loginUser } from "../../utils/api.js";
import { createBrowserHistory } from "history"; // Import createBrowserHistory
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const history = createBrowserHistory(); // Create history object

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDetails = await loginUser();
        setUser(userDetails.user); // Set the user details from userDetails.user
      } catch (error) {
        console.error("Error fetching user details", error);
        // Handle error accordingly
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clear localStorage
    history.push("/login"); // Redirect to login page using history object
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {user && (
        <div className="profile-info">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          {/* Add more user details as needed */}
        </div>
      )}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
