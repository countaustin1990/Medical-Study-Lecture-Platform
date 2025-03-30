import  { Link } from 'react-router-dom';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link to={`/categories/${category.id}`} className="group">
      <div className="card h-full overflow-hidden group-hover:shadow-lg transition-shadow">
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
          <p className="text-gray-600 text-sm line-clamp-2">{category.description}</p>
        </div>
      </div>
    </Link>
  );
}
 