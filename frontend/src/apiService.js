const API_BASE_URL = "http://localhost:8080";

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Registration failed');
  }
  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Invalid credentials');
  }

  return response.text();
};