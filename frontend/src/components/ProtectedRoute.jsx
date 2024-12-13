import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0) {
    const hasRole = allowedRoles.some(role => {
      if (role === 'admin') return user.isAdmin;
      if (role === 'staff') return user.isStaff;
      return true;
    });

    if (!hasRole) {
      return <Navigate to="/unauthorized" />;
    }
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string)
};

ProtectedRoute.defaultProps = {
  allowedRoles: []
};

export default ProtectedRoute; 