import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Sample featured products
  const featuredProducts = [
    {
      id: 1,
      name: 'Eco-Friendly Shampoo',
      description: 'Natural ingredients, biodegradable packaging',
      image: 'https://i.postimg.cc/jjb4Kd3w/Whats-App-Image-2025-08-13-at-20-41-38.jpg'
    },
    {
      id: 2,
      name: 'Organic Face Cream',
      description: 'Plant-based moisturizer with natural oils',
      image: 'https://i.postimg.cc/RhY0md9S/Whats-App-Image-2025-08-13-at-20-45-55.jpg'
    },
    {
      id: 3,
      name: 'Sustainable Laundry Detergent',
      description: 'Eco-friendly formula, plastic-free packaging',
      image: 'https://i.postimg.cc/jCVrvFt7/Whats-App-Image-2025-08-13-at-20-44-42.jpg'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-textDark mb-6">
            Know What's Inside Your Products
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Transparent, ethical, and health-first product details at your fingertips.
          </p>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a product..."
                className="w-full py-3 px-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
              >
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
            </div>
          </form>
          <Link
            to="/products"
            className="inline-block bg-primary hover:bg-primaryHover text-white font-medium py-3 px-8 rounded-full transition duration-300"
          >
            Explore Products
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-textDark mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-textDark mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <Link
                    to={`/products/${product.id}`}
                    className="inline-block bg-primary hover:bg-primaryHover text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;