import  { Book, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <Book className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-xl font-bold">MedLecture</span>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Professional medical education platform offering certification and upskilling programs for healthcare professionals worldwide.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/courses" className="text-gray-400 hover:text-white">All Courses</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-white">Categories</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/categories" className="text-gray-400 hover:text-white">Anatomy</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-white">Physiology</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-white">Surgery</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-white">Internal Medicine</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-white">Laboratory Science</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Medical Center Drive<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                <a href="tel:+12125551234" className="text-gray-400 hover:text-white">
                  +1 (212) 555-1234
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                <a href="mailto:info@medlecture.com" className="text-gray-400 hover:text-white">
                  info@medlecture.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} MedLecture. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/about" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-white text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
 