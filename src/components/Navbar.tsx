import  { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Book, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Book className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">MedLecture</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/courses"
              className={`px-3 py-2 rounded-md ${
                isActive('/courses')
                  ? 'text-primary-600 font-medium'
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Courses
            </Link>
            <Link
              to="/categories"
              className={`px-3 py-2 rounded-md ${
                isActive('/categories')
                  ? 'text-primary-600 font-medium'
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Categories
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-md ${
                isActive('/about')
                  ? 'text-primary-600 font-medium'
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md ${
                isActive('/contact')
                  ? 'text-primary-600 font-medium'
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Contact
            </Link>
            
            {!currentUser ? (
              <>
                <Link to="/login" className="btn-outline ml-4">Sign In</Link>
                <Link to="/register" className="btn-primary">Sign Up</Link>
              </>
            ) : (
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="flex items-center text-gray-700 hover:text-primary-600"
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  >
                    <span className="mr-2">{currentUser.displayName}</span>
                    <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                  </button>
                </div>
                
                {profileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      {currentUser.role === 'admin' && (
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          handleSignOut();
                        }}
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/courses" 
              className={`block px-3 py-2 rounded-md ${
                isActive('/courses')
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Courses
            </Link>
            <Link 
              to="/categories" 
              className={`block px-3 py-2 rounded-md ${
                isActive('/categories')
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className={`block px-3 py-2 rounded-md ${
                isActive('/about')
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className={`block px-3 py-2 rounded-md ${
                isActive('/contact')
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            
            {!currentUser ? (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="px-3 py-2 text-sm font-medium text-gray-500">
                    Signed in as {currentUser.displayName}
                  </div>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  {currentUser.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                    onClick={() => {
                      setIsOpen(false);
                      handleSignOut();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
 