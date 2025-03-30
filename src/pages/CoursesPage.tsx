import  { useState, useEffect } from 'react';
import { Clock, Award, User, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { featuredCourses } from '../data/courses';
import CourseCard from '../components/CourseCard';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(featuredCourses);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const categories = Array.from(new Set(featuredCourses.map(course => course.category)));
  const levels = Array.from(new Set(featuredCourses.map(course => course.level)));

  // Apply filters
  useEffect(() => {
    let results = [...featuredCourses];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        course => 
          course.title.toLowerCase().includes(term) || 
          course.description.toLowerCase().includes(term) ||
          course.instructor.toLowerCase().includes(term)
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      results = results.filter(course => course.category === selectedCategory);
    }
    
    // Apply level filter
    if (selectedLevel) {
      results = results.filter(course => course.level === selectedLevel);
    }
    
    setFilteredCourses(results);
  }, [searchTerm, selectedCategory, selectedLevel]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLevel('');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero section */}
        <div className="relative rounded-xl overflow-hidden mb-10">
          <img 
            src="https://images.unsplash.com/photo-1518152006812-edab29b069ac?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZWR1Y2F0aW9uJTIwZG9jdG9yJTIwaG9zcGl0YWwlMjBsYWJvcmF0b3J5fGVufDB8fHx8MTc0MzMwMDgyN3ww" 
            alt="Medical laboratory microscope" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-800/40"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="px-8 max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Explore Our Medical Courses</h1>
              <p className="text-white/90 mb-6">
                Advance your medical career with our comprehensive course catalog covering all major specialties and disciplines.
              </p>
              <div className="relative">
                <input
                  type="text"
                  className="w-full py-3 px-4 pr-12 rounded-lg border-0 focus:ring-2 focus:ring-primary-500"
                  placeholder="Search courses by name, instructor, or keyword"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-4 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Mobile filter button */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">All Courses</h2>
            <button 
              className="flex items-center btn-outline text-sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter Courses
            </button>
          </div>
          
          {/* Sidebar filters */}
          <div className={`lg:block ${isFilterOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button 
                    className="text-sm text-primary-600 hover:text-primary-800"
                    onClick={clearFilters}
                  >
                    Clear All
                  </button>
                </div>
                
                {/* Categories filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          id={`category-${index}`}
                          name="category"
                          type="radio"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                        />
                        <label htmlFor={`category-${index}`} className="ml-3 text-sm text-gray-600">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Level filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Level</h4>
                  <div className="space-y-2">
                    {levels.map((level, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          id={`level-${index}`}
                          name="level"
                          type="radio"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          checked={selectedLevel === level}
                          onChange={() => setSelectedLevel(level)}
                        />
                        <label htmlFor={`level-${index}`} className="ml-3 text-sm text-gray-600">
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price range filter - this could be implemented with a slider in a real app */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Price Range</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="price-all"
                        name="price"
                        type="radio"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        checked
                      />
                      <label htmlFor="price-all" className="ml-3 text-sm text-gray-600">
                        All Prices
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="price-1"
                        name="price"
                        type="radio"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor="price-1" className="ml-3 text-sm text-gray-600">
                        $0 - $199
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="price-2"
                        name="price"
                        type="radio"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor="price-2" className="ml-3 text-sm text-gray-600">
                        $200 - $299
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="price-3"
                        name="price"
                        type="radio"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor="price-3" className="ml-3 text-sm text-gray-600">
                        $300+
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Course listings */}
          <div className="lg:col-span-3">
            <div className="hidden lg:flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">All Courses</h2>
              <div className="text-gray-600">
                Showing {filteredCourses.length} of {featuredCourses.length} courses
              </div>
            </div>
            
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any courses matching your criteria. Try adjusting your filters or search term.
                </p>
                <button 
                  className="btn-primary"
                  onClick={clearFilters}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Call to action */}
        <div className="bg-primary-600 rounded-xl shadow-md overflow-hidden mt-12">
          <div className="px-6 py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 lg:py-16 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl mb-6 md:mb-0">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to advance your medical career?
              </h2>
              <p className="mt-3 text-lg text-primary-100">
                Sign up today and get access to all our premium medical courses and certification programs.
              </p>
            </div>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Link to="/register" className="btn bg-white text-primary-700 hover:bg-gray-50">
                Sign Up Now
              </Link>
              <Link to="/contact" className="btn bg-primary-800 text-white hover:bg-primary-900">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 