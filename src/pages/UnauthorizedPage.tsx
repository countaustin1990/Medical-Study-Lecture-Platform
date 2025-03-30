import  { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <AlertCircle className="h-16 w-16 text-red-600 mb-4" />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-600 text-center max-w-md mb-8">
        You don't have permission to access this page. Please contact an administrator if you believe this is an error.
      </p>
      <div className="flex space-x-4">
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
        <Link to="/dashboard" className="btn-outline">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
 