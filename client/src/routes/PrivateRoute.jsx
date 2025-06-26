/**
 * @file PrivateRoute.jsx
 * @description
 *   Route guard that protects private routes. If the user is not authenticated,
 *   it redirects to the login page while preserving the original location.
 */

import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/modules/user/hooks';
import { LoadingSpinner } from '@/components';

/**
 * Protects child routes by verifying authentication status.
 *
 * @returns {JSX.Element}
 *   - <Outlet /> when the user is authenticated,
 *   - <LoadingSpinner /> while the auth state is still being checked,
 *   - <Navigate /> to "/login" when the user is unauthenticated.
 */
const PrivateRoute = () => {
  const { isLoggedIn, authChecked } = useAuth();
  const location = useLocation();

  // Still validating the session → show full-screen loader
  if (!authChecked) return <LoadingSpinner fullScreen />;

  // Authenticated → render nested routes
  if (isLoggedIn) return <Outlet />;

  // Not authenticated → redirect to /login and remember original destination
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
