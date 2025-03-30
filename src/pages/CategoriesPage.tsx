import  { Link } from 'react-router-dom';
import { categories } from '../data/courses';

export default function CategoriesPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse By Category</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link key={category.id} to={`/categories/${category.id}`} className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full group-hover:shadow-lg">
                <div className="relative h-40">
                  <img 
                    src={category.imageUrl} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">{category.name}</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
 