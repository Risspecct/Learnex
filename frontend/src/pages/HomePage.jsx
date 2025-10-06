import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="container">
      <header className="header">
        <h1>Learnex Project Hub</h1>
        <p>Navigate to any of the project's components.</p>
      </header>
      <main className="main-grid">
        <Link to="/login" className="card">
          <div>
            <h2>Authentication System</h2>
            <p>User login and registration portal.</p>
          </div>
        </Link>
        <Link to="/ai-tools" className="card">
          <div>
            <h2>AI Content Generator</h2>
            <p>Interface for the AI content generator.</p>
          </div>
        </Link>
        <Link to="/dashboard" className="card">
          <div>
            <h2>Teacher Dashboard</h2>
            <p>Analytics dashboard for teachers.</p>
          </div>
        </Link>
        {/* The link below now points to the React-based game route */}
        <Link to="/game/physics-lab" className="card card-launch">
          <div>
            <h2>Launch Physics Lab</h2>
            <p>Jump directly into the projectile motion simulator game.</p>
          </div>
        </Link>
      </main>
    </div>
  );
};

export default HomePage;