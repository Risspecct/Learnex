const API_BASE_URL = "http://localhost:8080";

const authenticatedRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('jwtToken');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });

  if (!response.ok) {
    // Try to parse error text, but provide a fallback
    let errorText = 'API request failed';
    try {
        errorText = await response.text();
    } catch (e) {
        // Ignore if response has no body
    }
    throw new Error(errorText);
  }
  return response;
};

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

export const getUserInfo = async () => {
  const response = await authenticatedRequest('/user/me', {
    method: 'GET',
  });
  return response.json();
};

export const deleteUser = async () => {
  const response = await authenticatedRequest('/user/me', {
    method: 'DELETE',
  });
  return response.text();
};