import {useAuth} from '../context/useAuth';
import { Navigate, Outlet} from 'react-router-dom';

export function PublicOnlyRoute() {
  const { isAuthenticated, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return <div className="centered-card">Restoring session...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;  
}