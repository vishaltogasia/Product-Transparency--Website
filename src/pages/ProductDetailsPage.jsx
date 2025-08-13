import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import products from '../data/products';
import { generateHealthSummary } from '../utils/aiAnalysis';


const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [aiSummary, setAiSummary] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the product with the matching id
    const productId = parseInt(id);
    const foundProduct = products.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
      // Generate AI summary
      const summary = generateHealthSummary(foundProduct);
      setAiSummary(summary);
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="inline-block bg-primary hover:bg-primaryHover text-white font-medium py-2 px-6 rounded-lg">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/products" className="text-primary hover:text-primaryHover font-medium flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Products
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Product Image */}
          <div className="md:w-1/2 lg:w-2/5">
            <div className="rounded-xl overflow-hidden shadow-md">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Certifications */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 lg:w-3/5">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Health Impact */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Health Impact</h2>
              <div className="flex items-center">
                <span 
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${product.healthImpact === 'safe' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                  {product.healthImpact === 'safe' ? 'Safe for Use' : 'Use with Caution'}
                </span>
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Environmental Impact</h2>
              <div className="flex items-center">
                <span 
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${product.environmentalImpact === 'green' ? 'bg-green-100 text-green-800' : product.environmentalImpact === 'yellow' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}
                >
                  {product.environmentalImpact === 'green' ? 'Eco-Friendly' : product.environmentalImpact === 'yellow' ? 'Moderate Impact' : 'High Impact'}
                </span>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Ingredients</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingredient</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health Rating</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {product.ingredients.map((ingredient, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ingredient.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ingredient.purpose}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span 
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ingredient.healthRating === 'High' ? 'bg-green-100 text-green-800' : ingredient.healthRating === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}
                          >
                            {ingredient.healthRating}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Summary */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">AI Analysis</h2>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-gray-800">{aiSummary}</p>
              </div>
            </div>

            {/* View Report Button */}
            <div className="mt-8">
              <Link 
                to={`/dashboard/${product.id}`} 
                className="inline-block bg-primary hover:bg-primaryHover text-white font-medium py-3 px-6 rounded-lg transition duration-300"
              >
                View Transparency Report
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;