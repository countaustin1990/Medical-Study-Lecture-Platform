import  { useState, useEffect } from 'react';
import { Book, Clock, Award, CheckCircle, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getUserEnrollments } from '../services/coursesService';
import { Link } from 'react-router-dom';
import EnrollmentPersistenceMessage from '../components/EnrollmentPersistenceMessage';

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('enrolled');
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPersistenceMessage, setShowPersistenceMessage] = useState(true);
  
  useEffect(() => {
    const loadEnrollments = async () => {
      try {
        if (!currentUser) return;
        
        const userEnrollments = await getUserEnrollments(currentUser.id);
        console.log('Loaded enrollments:', userEnrollments);
        setEnrollments(userEnrollments);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
        setError('Failed to load your enrolled courses. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadEnrollments();
  }, [currentUser]);
  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-600 border-r-2 border-b-2 border-gray-200"></div>
      </div>
    );
  }
  
  // Separate enrolled and completed courses
  const enrolledCourses = enrollments
    .filter(e => !e.isCompleted)
    .map(e => e.course);
    
  const completedCourses = enrollments
    .filter(e => e.isCompleted)
    .map(e => e.course);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-600 rounded-xl p-6 text-white mb-8">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {currentUser?.displayName || 'Student'}</h1>
          <p className="opacity-80">Continue learning and track your progress</p>
        </div>
        
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
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
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white shadow-md rounded-xl overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button 
                    className={`py-4 px-6 font-medium ${activeTab === 'enrolled' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('enrolled')}
                  >
                    My Courses
                  </button>
                  <button 
                    className={`py-4 px-6 font-medium ${activeTab === 'completed' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('completed')}
                  >
                    Completed
                  </button>
                  <button 
                    className={`py-4 px-6 font-medium ${activeTab === 'certificates' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('certificates')}
                  >
                    Certificates
                  </button>
                </nav>
              </div>
              
              <div className="p-6">
                {activeTab === 'enrolled' && (
                  <>
                    <h2 className="text-xl font-bold mb-6">Your Enrolled Courses</h2>
                    
                    {enrolledCourses.length > 0 ? (
                      <div className="space-y-6">
                        {enrolledCourses.map((course) => (
                          <div key={course.id} className="flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden">
                            <div className="sm:w-48 h-40">
                              <img 
                                src={course.imageUrl} 
                                alt={course.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4 flex-1">
                              <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                              <div className="flex items-center text-sm text-gray-500 mb-3">
                                <User className="h-4 w-4 mr-1" />
                                <span>{course.instructor}</span>
                                <span className="mx-2">•</span>
                                <span>{course.level}</span>
                              </div>
                              <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Progress</span>
                                  <span className="font-medium">45%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                                </div>
                              </div>
                              <Link to={`/courses/${course.id}/learn`} className="btn-primary inline-block">
                                Continue Learning
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Book className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No enrolled courses yet</h3>
                        <p className="text-gray-600 mb-4">Browse our catalog and start learning today!</p>
                        <Link to="/courses" className="btn-primary">
                          Explore Courses
                        </Link>
                      </div>
                    )}
                  </>
                )}
                
                {activeTab === 'completed' && (
                  <>
                    <h2 className="text-xl font-bold mb-6">Completed Courses</h2>
                    
                    {completedCourses.length > 0 ? (
                      <div className="space-y-6">
                        {completedCourses.map((course) => (
                          <div key={course.id} className="flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden">
                            <div className="sm:w-48 h-40">
                              <img 
                                src={course.imageUrl} 
                                alt={course.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4 flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg">{course.title}</h3>
                                <span className="flex items-center text-sm font-medium text-green-600">
                                  <CheckCircle className="h-4 w-4 mr-1" /> Completed
                                </span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500 mb-4">
                                <User className="h-4 w-4 mr-1" />
                                <span>{course.instructor}</span>
                                <span className="mx-2">•</span>
                                <span>{course.level}</span>
                              </div>
                              <div className="flex space-x-3">
                                <Link to={`/courses/${course.id}`} className="btn-outline text-sm">
                                  View Course
                                </Link>
                                <button className="btn-secondary text-sm">
                                  Download Certificate
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No completed courses yet</h3>
                        <p className="text-gray-600">Keep learning to earn your first certificate!</p>
                      </div>
                    )}
                  </>
                )}
                
                {activeTab === 'certificates' && (
                  <>
                    <h2 className="text-xl font-bold mb-6">Your Certificates</h2>
                    
                    {completedCourses.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {completedCourses.map((course) => (
                          <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <Award className="h-8 w-8 text-primary-600" />
                              <span className="text-sm text-gray-500">Issued: June 15, 2023</span>
                            </div>
                            <h3 className="font-bold mb-1">{course.title}</h3>
                            <p className="text-sm text-gray-600 mb-4">Certified by MedLecture</p>
                            <button className="btn-outline w-full text-sm">
                              Download Certificate
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates earned yet</h3>
                        <p className="text-gray-600">Complete a course to earn your first certificate!</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white shadow-md rounded-xl p-6 mb-6">
              <h2 className="font-bold text-lg mb-4">Your Stats</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Courses Enrolled</span>
                    <span className="font-medium">{enrolledCourses.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${enrolledCourses.length * 10}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Courses Completed</span>
                    <span className="font-medium">{completedCourses.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: `${completedCourses.length * 10}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Certificates Earned</span>
                    <span className="font-medium">{completedCourses.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${completedCourses.length * 10}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-xl p-6">
              <h2 className="font-bold text-lg mb-4">Upcoming Deadlines</h2>
              {enrolledCourses.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Submit final project</p>
                      <p className="text-sm text-gray-600">{enrolledCourses[0]?.title}</p>
                      <p className="text-sm text-red-600 font-medium mt-1">Due in 3 days</p>
                    </div>
                  </div>
                  {enrolledCourses.length > 1 && (
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-primary-600 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Module 3 Quiz</p>
                        <p className="text-sm text-gray-600">{enrolledCourses[1]?.title}</p>
                        <p className="text-sm text-gray-600 font-medium mt-1">Due in 7 days</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-600 text-sm">No upcoming deadlines</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Persistence notification message */}
      {showPersistenceMessage && <EnrollmentPersistenceMessage />}
    </div>
  );
}
 