import  { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <HelpCircle className="h-16 w-16 text-primary-600 mb-4" />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-600 text-center max-w-md mb-8">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link to="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
 