import  { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Play, Book, File, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getCourseById, getUserEnrollments, markModuleComplete } from '../services/coursesService';
import { Course } from '../types';

export default function CourseContentPage() {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState<string>('m1');
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (!id || !currentUser) return;
        
        // Load course data
        const courseData = await getCourseById(id);
        setCourse(courseData);
        
        // Load user's enrollment data
        const enrollments = await getUserEnrollments(currentUser.id);
        const courseEnrollment = enrollments.find(e => e.courseId === id);
        
        if (courseEnrollment) {
          setCompletedModules(courseEnrollment.completedModules);
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [id, currentUser]);

  const handleMarkComplete = async (moduleId: string) => {
    if (!id || !currentUser || !course) return;
    
    try {
      await markModuleComplete(currentUser.id, id, moduleId);
      
      // Update local state
      if (!completedModules.includes(moduleId)) {
        setCompletedModules([...completedModules, moduleId]);
      }
    } catch (error) {
      console.error('Error marking module complete:', error);
    }
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

  const currentModule = course.modules.find((m) => m.id === activeModule);
  if (!currentModule) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to={`/courses/${id}`} className="text-primary-600 hover:text-primary-700 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to course overview
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{course.title}</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with modules list */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8">
              <div className="p-4 bg-primary-50 border-b border-gray-200">
                <h2 className="font-semibold text-lg">Course Content</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {course.modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    className={`w-full text-left p-4 flex items-start hover:bg-gray-50 transition-colors ${
                      activeModule === module.id ? 'bg-gray-50' : ''
                    }`}
                  >
                    <div className="flex-shrink-0 mr-3 mt-1">
                      {completedModules.includes(module.id) ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{module.title}</h3>
                      <p className="text-sm text-gray-500">{module.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{currentModule.title}</h2>
                <p className="text-gray-600 mb-6">{currentModule.description}</p>
                
                {/* Video player (placeholder) */}
                <div className="aspect-w-16 aspect-h-9 mb-8 bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <Play className="h-16 w-16 text-white opacity-60 mx-auto mb-4" />
                    <p className="text-lg font-medium">Video content would be displayed here</p>
                    <p className="text-sm opacity-70 mt-2">In a production app, this would be an embedded video player</p>
                  </div>
                </div>
                
                {/* Module content */}
                <div className="prose max-w-none">
                  <h3>Module Content</h3>
                  <p>
                    This is where detailed course content would appear. In a real application, this would contain
                    rich text, images, and interactive elements related to {currentModule.title}.
                  </p>
                  <p>
                    The content would be structured to help students learn effectively, with clear explanations,
                    examples, and opportunities for practice and assessment.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg my-6 border border-gray-200">
                    <h4 className="font-medium mb-2">Learning Objectives</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Understand key concepts related to {currentModule.title}</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Apply theoretical knowledge to practical scenarios</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Analyze complex medical cases using evidence-based approaches</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Attachments */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-lg mb-4">Resources & Downloads</h3>
                  <div className="space-y-3">
                    <a 
                      href="#" 
                      className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <File className="h-5 w-5 text-primary-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Module Slides (PDF)</p>
                        <p className="text-sm text-gray-500">2.4 MB</p>
                      </div>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <Book className="h-5 w-5 text-primary-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Recommended Reading</p>
                        <p className="text-sm text-gray-500">Additional resources for deeper learning</p>
                      </div>
                    </a>
                  </div>
                </div>
                
                {/* Complete module button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => {
                        const currentIndex = course.modules.findIndex((m) => m.id === activeModule);
                        const nextModule = course.modules[currentIndex + 1];
                        if (nextModule) {
                          setActiveModule(nextModule.id);
                        }
                      }}
                      className="btn-outline"
                      disabled={activeModule === course.modules[course.modules.length - 1].id}
                    >
                      Next Module
                    </button>
                    
                    <button
                      onClick={() => handleMarkComplete(currentModule.id)}
                      className={`btn ${
                        completedModules.includes(currentModule.id) 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'btn-primary'
                      }`}
                    >
                      {completedModules.includes(currentModule.id) 
                        ? 'Completed' 
                        : 'Mark as Complete'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 