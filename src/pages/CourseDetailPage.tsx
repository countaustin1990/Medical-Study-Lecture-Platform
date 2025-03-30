import  { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Clock, Award, User, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getCourseById, isUserEnrolled, enrollUserInCourse } from '../services/coursesService';
import { Course } from '../types';
import PaymentModal from '../components/PaymentModal';

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState('not-enrolled'); // not-enrolled, enrolled, completed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  useEffect(() => {
    const loadCourse = async () => {
      try {
        if (!id) return;
        
        const courseData = await getCourseById(id);
        setCourse(courseData);
        
        // Check enrollment status
        if (currentUser) {
          const enrolled = isUserEnrolled(currentUser.id, id);
          setEnrollmentStatus(enrolled ? 'enrolled' : 'not-enrolled');
          // In a real app, you'd also check if the course is completed
        }
      } catch (err) {
        console.error('Error loading course:', err);
        setError('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };
    
    loadCourse();
  }, [id, currentUser]);
  
  const handleEnrollment = async () => {
    if (!currentUser) {
      // Redirect to login if not logged in
      navigate('/login');
      return;
    }
    
    if (!course || !id) return;
    
    // Show payment modal instead of directly enrolling
    setShowPaymentModal(true);
  };
  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-600 border-r-2 border-b-2 border-gray-200"></div>
      </div>
    );
  }
  
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Link to="/courses" className="btn-primary">Browse All Courses</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <div className="relative h-64 sm:h-80 md:h-96">
            <img 
              src={course.imageUrl} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <span className="text-xs font-semibold px-2 py-1 bg-primary-600 rounded-full mb-2 inline-block">
                {course.category}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{course.title}</h1>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">About This Course</h2>
              <p className="text-gray-700 mb-6">{course.description}</p>
              
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
                <h3 className="font-semibold text-lg mb-4">What You'll Learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Comprehensive understanding of {course.category.toLowerCase()} principles</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Practical application of theoretical concepts</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Critical thinking and problem-solving skills</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Professional certification preparation</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-gray-200 pt-6">
              <div className="flex flex-wrap items-center gap-6 mb-4 md:mb-0">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-700">{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-700">{course.instructor}</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-700">{course.level}</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="text-2xl font-bold text-gray-900 mr-6">${course.price}</div>
                
                {enrollmentStatus === 'not-enrolled' && (
                  <button 
                    onClick={handleEnrollment}
                    disabled={loading}
                    className={`btn-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Processing...' : 'Enroll Now'}
                  </button>
                )}
                
                {enrollmentStatus === 'enrolled' && (
                  <Link to={`/courses/${id}/learn`} className="btn-primary">
                    Continue Learning
                  </Link>
                )}
                
                {enrollmentStatus === 'completed' && (
                  <div className="flex items-center">
                    <span className="flex items-center text-green-600 mr-4">
                      <CheckCircle className="h-5 w-5 mr-1" /> Completed
                    </span>
                    <Link to={`/courses/${id}/learn`} className="btn-outline">
                      Review Course
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Course curriculum */}
        <div className="bg-white shadow-md rounded-xl overflow-hidden mt-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">Course Curriculum</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {course.modules.map((module, index) => (
                <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 flex justify-between items-center">
                    <h3 className="font-medium">Module {index + 1}: {module.title}</h3>
                    {enrollmentStatus !== 'not-enrolled' ? (
                      <Link to={`/courses/${id}/learn`} className="text-sm text-primary-600 hover:text-primary-800">
                        {enrollmentStatus === 'completed' || index === 0 ? 'View' : 'Locked'}
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-500">Preview</span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-2">{module.description}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>45 minutes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Modal */}
      {showPaymentModal && course && (
        <PaymentModal
          course={course}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
}
 