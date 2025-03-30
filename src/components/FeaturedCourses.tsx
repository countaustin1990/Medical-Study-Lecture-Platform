import  { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { featuredCourses } from '../data/courses';

export default function FeaturedCourses() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
          <Link to="/courses" className="flex items-center text-primary-600 hover:text-primary-800">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.slice(0, 3).map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden group transition-all hover:shadow-lg">
              <div className="relative">
                <img 
                  src={course.imageUrl} 
                  alt={course.title} 
                  className="h-48 w-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-semibold px-2 py-1 bg-primary-100 text-primary-800 rounded-full">
                    {course.category}
                  </span>
                  <span className="text-sm font-bold text-primary-600">${course.price}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-primary-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                <Link to={`/courses/${course.id}`} className="btn-primary w-full text-center block">
                  View Course
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 