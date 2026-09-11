import { Navigate, useLocation } from 'react-router-dom';
import { AppContext } from '../../App';
import { useContext } from 'react';

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const { authState } = useContext(AppContext);

  if (!authState.isAuthenticated || !authState.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
