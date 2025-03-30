import  { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type ProtectedRouteProps = {
  allowedRoles?: string[];
};

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { currentUser, loading } = useAuth();
  
  // Show loading indicator
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-600 border-r-2 border-b-2 border-gray-200"></div>
      </div>
    );
  }
  
  // Not logged in - redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // Check role-based access
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // User is authenticated and authorized
  return <Outlet />;
}
 