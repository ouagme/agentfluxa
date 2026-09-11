import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../App';

export function RoleProtectedRoute({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles: string[];
}) {
  const location = useLocation();
  const { authState } = useContext(AppContext);

  if (!authState.isAuthenticated || !authState.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(authState.user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
