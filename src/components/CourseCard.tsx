import  { Link } from 'react-router-dom';
import { Clock, Award, User } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="card group transition-all hover:shadow-lg">
      <div className="relative">
        <img 
          src={course.imageUrl} 
          alt={course.title} 
          className="h-48 w-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
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
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <User className="h-4 w-4 mr-1" />
          <span>{course.instructor}</span>
          <Clock className="h-4 w-4 ml-3 mr-1" />
          <span>{course.duration}</span>
          <Award className="h-4 w-4 ml-3 mr-1" />
          <span>{course.level}</span>
        </div>
        <Link to={`/courses/${course.id}`} className="btn-primary w-full text-center block">
          View Course
        </Link>
      </div>
    </div>
  );
}
 