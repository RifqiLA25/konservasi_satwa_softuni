import { createContext, useState, useContext, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';
import { isAuthenticated, clearAuthData, logout } from '../utils/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const tokens = localStorage.getItem('authTokens');
    return tokens ? JSON.parse(tokens) : null;
  });
  
  const [user, setUser] = useState(() => getCurrentUser());

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
            console.log("Token response:", data);
            
            setAuthTokens(data);
            
            // Decode token untuk mendapatkan user data
            const token = data.access;
            const tokenParts = token.split('.');
            const payload = JSON.parse(atob(tokenParts[1]));
            
            const userData = {
                user_id: payload.user_id,
                username: payload.username,
                is_staff: Boolean(payload.is_staff),
                email: payload.email
            };
            
            console.log("Setting user data:", userData);
            
            setUser(userData);
            localStorage.setItem('authTokens', JSON.stringify(data));
            
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
    logout();
  };

  useEffect(() => {
    const loadUser = () => {
      const authTokens = localStorage.getItem('authTokens');
      if (authTokens) {
        const tokens = JSON.parse(authTokens);
        const decoded = jwt_decode(tokens.access);
        setUser({
          username: decoded.username,
          user_id: decoded.user_id,
          is_staff: decoded.is_staff,
          email: decoded.email
        });
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAuthenticated()) {
        clearAuthData();
        setUser(null);
      }
    }, 300000);
    
    return () => clearInterval(interval);
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

const getCurrentUser = () => {
  try {
      const authTokens = localStorage.getItem('authTokens');
      if (authTokens) {
          const tokens = JSON.parse(authTokens);
          const tokenParts = tokens.access.split('.');
          const payload = JSON.parse(atob(tokenParts[1]));
          
          return {
              user_id: payload.user_id,
              username: payload.username,
              is_staff: Boolean(payload.is_staff),
              email: payload.email
          };
      }
      return null;
  } catch (error) {
      console.error('Error getting current user:', error);
      return null;
  }
};