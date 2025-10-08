import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <>
      <header className="app-bar">
        <h1>Learnex</h1>
      </header>
      <div className="home-container">
        <main className="tab-nav">
          <NavLink to={user ? "/profile" : "/login"} className="tab">
            <span className="tab-icon">👤</span>
            <div>
              <h3>{user ? "My Profile" : "Login / Register"}</h3>
              <p>{user ? "Manage your account" : "Access your account"}</p>
            </div>
          </NavLink>

          <NavLink to="/dashboard" className="tab">
            <span className="tab-icon">📊</span>
            <div>
              <h3>Teacher Dashboard</h3>
              <p>View student analytics and performance.</p>
            </div>
          </NavLink>

          <NavLink to="/ai-tools" className="tab">
            <span className="tab-icon">🤖</span>
            <div>
              <h3>AI Tools</h3>
              <p>Generate content and translate text.</p>
            </div>
          </NavLink>

          <NavLink to="/game/physics-lab" className="tab">
            <span className="tab-icon">🎮</span>
            <div>
              <h3>Physics Lab</h3>
              <p>Launch the projectile motion game.</p>
            </div>
          </NavLink>
        </main>
      </div>
    </>
  );
};

export default HomePage;