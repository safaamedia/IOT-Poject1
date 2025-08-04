import { API_BASE_URL } from '../config.js';

class AuthService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.tokenKey = 'iot_auth_token';
  }

  // Store token in localStorage
  setToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Get token from localStorage
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  // Remove token from localStorage
  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      // Check if token is expired (basic check)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch (error) {
      return false;
    }
  }

  // Get current user from token
  getCurrentUser() {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.user_id,
        username: payload.username
      };
    } catch (error) {
      return null;
    }
  }

  // Login user
  async login(username, password) {
    try {
      const response = await fetch(`${this.baseURL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.success && data.token) {
        this.setToken(data.token);
        return {
          success: true,
          token: data.token,
          user: data.user
        };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      throw new Error(error.message || 'Network error occurred');
    }
  }

  // Register user  
  async register(username, email, password) {
    try {
      const response = await fetch(`${this.baseURL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      if (data.success && data.token) {
        this.setToken(data.token);
        return {
          success: true,
          token: data.token,
          user: data.user
        };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      throw new Error(error.message || 'Network error occurred');
    }
  }

  // Verify token with backend
  async verifyToken() {
    try {
      const token = this.getToken();
      if (!token) return false;

      const response = await fetch(`${this.baseURL}/api/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      return response.ok && data.success;
    } catch (error) {
      return false;
    }
  }

  // Logout user
  logout() {
    this.removeToken();
    // Optional: You could also call a logout endpoint on the backend
    // to invalidate the token server-side
  }

  // Get authorization headers for API calls
  getAuthHeaders() {
    const token = this.getToken();
    return token ? {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    } : {
      'Content-Type': 'application/json'
    };
  }

  // Make authenticated API calls
  async apiCall(endpoint, options = {}) {
    const token = this.getToken();
    
    const config = {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      
      // If token is invalid, logout user
      if (response.status === 401) {
        this.logout();
        throw new Error('Session expired. Please login again.');
      }

      return response;
    } catch (error) {
      throw error;
    }
  }
}

// Create and export singleton instance
const authService = new AuthService();
export default authService;
