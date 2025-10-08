import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../apiService';
import './AuthPage.css';

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ email: '', username: '', password: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: 'Processing...', type: 'info' });

        try {
          if (isRegistering) {
            await registerUser({
              email: formData.email,
              username: formData.username,
              password: formData.password,
            });
            setMessage({ text: 'Registration successful! Please log in.', type: 'success' });
            setIsRegistering(false); // Switch to login form
          } else {
            // Wait for the login process (including user fetch) to complete
            await login({ email: formData.email, password: formData.password });

            setMessage({ text: 'Login successful! Redirecting...', type: 'success' });

            // Navigate AFTER login is fully complete
            navigate('/profile');
          }
        } catch (error) {
          console.error("Login failed:", error);
          setMessage({ text: error.message, type: 'error' });
          
        }
      };

  return (
    <div className="auth-container">
      <div className="card">
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
          {isRegistering && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={formData.username}
              onChange={handleInputChange}
            />
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
          <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
        </form>
        {message.text && <div className={`msg ${message.type}`}>{message.text}</div>}
        <span className="toggle-link" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
        </span>
      </div>
    </div>
  );
};

export default AuthPage;