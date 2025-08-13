import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  return (
    <nav className="sticky top-0 bg-white border-b border-gray-200 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-semibold text-gray-800">
              Product Transparency
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-800 hover:text-primary">
              Home
            </Link>
            <Link to="/products" className="text-gray-800 hover:text-primary">
              Products
            </Link>
            <Link to="/about" className="text-gray-800 hover:text-primary">
              About
            </Link>
            <Link to="/contact" className="text-gray-800 hover:text-primary">
              Contact
            </Link>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-800" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;