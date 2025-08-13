import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import products from '../data/products';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const pieChartRef = useRef(null); // <-- ref for the Pie chart

  useEffect(() => {
    const productId = parseInt(id);
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) setProduct(foundProduct);
    setLoading(false);
  }, [id]);

  const generatePieChartData = () => {
    if (!product) return null;
    const healthRatings = product.ingredients.reduce(
      (acc, ing) => {
        acc[ing.healthRating.toLowerCase()]++;
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
            'rgba(34, 197, 94, 0.7)', // green
            'rgba(234, 179, 8, 0.7)',  // yellow
            'rgba(239, 68, 68, 0.7)',  // red
          ],
        },
      ],
    };
  };

  const downloadPDF = () => {
    if (!product) return;

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    let y = 10;

    pdf.setFontSize(18);
    pdf.text('Product Transparency Report', pageWidth / 2, y, { align: 'center' });
    y += 10;

    pdf.setFontSize(12);
    pdf.text(`Product Name: ${product.name || 'N/A'}`, 10, y); y += 7;
    pdf.text(`Category: ${product.category || 'N/A'}`, 10, y); y += 7;
    pdf.text(`Brand: ${product.brand || 'N/A'}`, 10, y); y += 7;
    pdf.text(`Description: ${product.description || 'N/A'}`, 10, y); y += 10;

    pdf.text(`Health Impact: ${product.healthImpact === 'safe' ? 'Safe for Use' : 'Use with Caution'}`, 10, y); y += 7;
    const envImpact =
      product.environmentalImpact === 'green'
        ? 'Eco-Friendly'
        : product.environmentalImpact === 'yellow'
        ? 'Moderate Impact'
        : 'High Impact';
    pdf.text(`Environmental Impact: ${envImpact}`, 10, y); y += 10;

    pdf.text('Key Facts:', 10, y); y += 7;
    product.keyFacts.forEach(fact => { pdf.text(`- ${fact}`, 12, y); y += 6; });
    y += 5;

    pdf.text('Ingredients:', 10, y); y += 7;
    product.ingredients.forEach(ing => {
      pdf.text(`${ing.name} - ${ing.purpose} - ${ing.healthRating}`, 10, y);
      y += 6;
    });
    y += 10;

    // ✅ Pie Chart
    if (pieChartRef.current) {
      const chartInstance = pieChartRef.current;
      const imgData = chartInstance.toBase64Image();
      const pdfWidth = pageWidth * 0.6;
      const pdfHeight = (chartInstance.height * pdfWidth) / chartInstance.width;
      pdf.addImage(imgData, 'PNG', (pageWidth - pdfWidth) / 2, y, pdfWidth, pdfHeight);
    }

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

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Ingredient Health Rating Breakdown</h2>
            <div className="h-64 flex items-center justify-center">
              {chartData && <Pie ref={pieChartRef} data={chartData} options={{ maintainAspectRatio: false }} />}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Key Facts</h2>
            <ul className="space-y-3">
              {product.keyFacts.map((fact, idx) => (
                <li key={idx} className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{fact}</span>
                </li>
              ))}
            </ul>
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
