import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * A functional component that acts as a private route wrapper for protected routes in the application.
 * If the user is authenticated, it renders the child routes; otherwise, it redirects to the home page.
 *
 * @component
 * @returns {JSX.Element} A React component that conditionally renders the child routes or redirects based on the user's authentication status.
 */
const PrivateRoute = () => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/home" />;
};

export default PrivateRoute;
