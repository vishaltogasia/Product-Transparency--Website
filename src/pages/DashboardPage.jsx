import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import products from '../data/products';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const reportRef = useRef(null);

  useEffect(() => {
    // Find the product with the matching id
    const productId = parseInt(id);
    const foundProduct = products.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
    }
    
    setLoading(false);
  }, [id]);

  const generatePieChartData = () => {
    if (!product) return null;

    // Count ingredients by health rating
    const healthRatings = product.ingredients.reduce(
      (acc, ingredient) => {
        acc[ingredient.healthRating.toLowerCase()]++;
        return acc;
      },
      { high: 0, medium: 0, low: 0 }
    );

    return {
      labels: ['High Safety', 'Medium Safety', 'Low Safety'],
      datasets: [
        {
          data: [healthRatings.high, healthRatings.medium, healthRatings.low],
          backgroundColor: [
            'rgba(34, 197, 94, 0.7)',  // green
            'rgba(234, 179, 8, 0.7)',   // yellow
            'rgba(239, 68, 68, 0.7)',    // red
          ],
          borderColor: [
            'rgba(34, 197, 94, 1)',
            'rgba(234, 179, 8, 1)',
            'rgba(239, 68, 68, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const downloadPDF = async () => {
    if (!reportRef.current) return;

    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      logging: false,
      useCORS: true,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 30;

    pdf.setFontSize(20);
    pdf.text(`${product.name} - Transparency Report`, pdfWidth / 2, 20, { align: 'center' });
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`${product.name.replace(/\s+/g, '-').toLowerCase()}-transparency-report.pdf`);
  };

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

  const chartData = generatePieChartData();

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to={`/products/${product.id}`} className="text-primary hover:text-primaryHover font-medium flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Product Details
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Transparency Report</h1>

        <div ref={reportRef} className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column - Chart */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Ingredient Health Rating Breakdown</h2>
              <div className="h-64 flex items-center justify-center">
                {chartData && <Pie data={chartData} options={{ maintainAspectRatio: false }} />}
              </div>
            </div>

            {/* Right Column - Key Facts */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Key Facts</h2>
              <ul className="space-y-3">
                {product.keyFacts.map((fact, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{fact}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Health Impact</h3>
                <div className="flex items-center mb-4">
                  <span 
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${product.healthImpact === 'safe' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {product.healthImpact === 'safe' ? 'Safe for Use' : 'Use with Caution'}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">Environmental Impact</h3>
                <div className="flex items-center">
                  <span 
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${product.environmentalImpact === 'green' ? 'bg-green-100 text-green-800' : product.environmentalImpact === 'yellow' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {product.environmentalImpact === 'green' ? 'Eco-Friendly' : product.environmentalImpact === 'yellow' ? 'Moderate Impact' : 'High Impact'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={downloadPDF}
            className="inline-block border border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 px-6 rounded-lg transition duration-300"
          >
            Download PDF Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;