import { createContext, useState, useContext, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const tokens = localStorage.getItem('authTokens');
    return tokens ? JSON.parse(tokens) : null;
  });
  
  const [user, setUser] = useState(() => {
    const tokens = localStorage.getItem('authTokens');
    if (tokens) {
      const decoded = jwt_decode(JSON.parse(tokens).access);
      return decoded;
    }
    return null;
  });

  const loginUser = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      
      if (response.ok) {
        setAuthTokens(data);
        
        const tokenParts = data.access.split('.');
        const payload = JSON.parse(atob(tokenParts[1]));
        
        const userData = {
          user_id: payload.user_id || 1,
          username: payload.username,
          is_staff: Boolean(payload.is_staff),
          email: payload.email
        };
        
        console.log("Token payload:", payload);
        console.log("Setting user data:", userData);
        
        setUser(userData);
        localStorage.setItem('authTokens', JSON.stringify(data));
        localStorage.setItem('userData', JSON.stringify(userData));
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
  };

  useEffect(() => {
    const loadUser = () => {
      const userData = localStorage.getItem('userData');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    loadUser();
  }, []);

  const contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

