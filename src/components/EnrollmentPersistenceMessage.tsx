import  { Info } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function EnrollmentPersistenceMessage() {
  const [showMessage, setShowMessage] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!showMessage) return null;
  
  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-white rounded-xl shadow-lg border border-primary-100 p-4 z-50">
      <div className="flex">
        <div className="flex-shrink-0">
          <Info className="h-5 w-5 text-primary-600" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-gray-900">Enrollment Saved</h3>
          <div className="mt-2 text-sm text-gray-500">
            <p>Your course enrollments are now saved to your account and will be available whenever you log in, even if you switch devices.</p>
          </div>
          <div className="mt-2">
            <button
              type="button"
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
              onClick={() => setShowMessage(false)}
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
 