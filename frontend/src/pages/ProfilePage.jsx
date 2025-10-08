import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import { deleteUser } from '../apiService';
import './ProfilePage.css';

const ProfilePage = () => {
  // Get user, loading state, and logout function from the global AuthContext
  const { user, loading, logout } = useAuth();
  const [message, setMessage] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from the context
    navigate('/login');
  };

  const handleDelete = async () => {
    // First click: set confirmation state
    if (!confirmDelete) {
      setConfirmDelete(true);
      // Reset the confirmation button after 3 seconds
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }

    // Second click: proceed with deletion
    try {
      await deleteUser();
      setMessage('Account deleted successfully. Logging out...');
      setTimeout(() => {
        logout(); // Log out globally after deletion
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  // Show a loading message while the AuthContext is verifying the token
  if (loading) {
    return (
      <div className="profile-container">
        <div className="card">
          <div className="loading-text">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="card">
        <h2>User Profile</h2>
        {user ? (
          <div className="user-info">
            <div className="user-info-item">
              <strong>ID:</strong>
              <span>{user.id}</span>
            </div>
            <div className="user-info-item">
              <strong>Username:</strong>
              <span>{user.username}</span>
            </div>
            <div className="user-info-item">
              <strong>Email:</strong>
              <span>{user.email}</span>
            </div>
          </div>
        ) : (
          <div className="loading-text">You are not logged in.</div>
        )}
        
        {message && <div className="msg">{message}</div>}

        {user && (
          <div className="action-buttons">
            <button onClick={handleDelete} className={`btn ${confirmDelete ? 'btn-confirm' : 'btn-danger'}`}>
              {confirmDelete ? 'Are you sure? Click again' : 'Delete My Account'}
            </button>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        )}

        <div className="back-link">
          <Link to="/">&larr; Back to Hub</Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;