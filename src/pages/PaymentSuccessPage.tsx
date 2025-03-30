import  { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Award, ArrowRight } from 'lucide-react';
import { featuredCourses } from '../data/courses';
import { useAuth } from '../contexts/AuthContext';
import EnrollmentPersistenceMessage from '../components/EnrollmentPersistenceMessage';

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('course');
  const course = featuredCourses.find(c => c.id === courseId);
  const { currentUser } = useAuth();
  const [countdown, setCountdown] = useState(5);
  const [showPersistenceMessage, setShowPersistenceMessage] = useState(true);

  useEffect(() => {
    // In a real app, you would validate the payment with the server and update the user's enrollment status
    
    // Countdown for auto-redirect
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Redirect to dashboard when countdown reaches 0
  useEffect(() => {
    if (countdown === 0) {
      window.location.href = '/dashboard';
    }
  }, [countdown]);

  if (!course || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Processing Payment</h2>
          <p className="text-gray-600 mb-6">We couldn't find the course you enrolled in.</p>
          <Link to="/courses" className="btn-primary">Browse Courses</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <div className="p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-2">
              Thank you for enrolling in {course.title}. Your payment has been processed successfully.
            </p>
            <p className="text-primary-600 text-sm mb-8">
              Your course has been added to your account and will be available whenever you log in.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Course:</span>
                <span className="font-medium">{course.title}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Instructor:</span>
                <span className="font-medium">{course.instructor}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{course.duration}</span>
              </div>
              <div className="flex justify-between mb-2 border-t border-gray-200 pt-2 mt-2">
                <span className="text-gray-900 font-medium">Total:</span>
                <span className="text-gray-900 font-bold">${course.price}</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <p className="text-gray-700">
                You will be redirected to your dashboard in {countdown} seconds.
              </p>
              <div className="flex items-center justify-center space-x-2">
                <Award className="h-5 w-5 text-primary-600" />
                <span className="text-sm text-gray-700">
                  A certificate will be issued upon completion of the course.
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <Link to="/dashboard" className="btn-primary flex items-center justify-center">
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to={`/courses/${course.id}/learn`} className="btn-outline flex items-center justify-center">
                Start Learning Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Persistence notification message */}
      {showPersistenceMessage && <EnrollmentPersistenceMessage />}
    </div>
  );
}
 