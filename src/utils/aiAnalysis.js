/**
 * AI Analysis Utility
 * 
 * This module simulates AI-powered analysis of product ingredients
 * to generate health summaries and impact ratings.
 */

/**
 * Analyzes product ingredients and generates a health summary
 * @param {Object} product - The product object containing ingredients
 * @returns {String} - AI-generated health summary
 */
export const generateHealthSummary = (product) => {
  // Count the number of ingredients with different health ratings
  const healthRatings = product.ingredients.reduce(
    (acc, ingredient) => {
      acc[ingredient.healthRating.toLowerCase()]++;
      return acc;
    },
    { high: 0, medium: 0, low: 0 }
  );

  // Calculate overall health score
  const totalIngredients = product.ingredients.length;
  const healthScore = 
    (healthRatings.high * 3 + healthRatings.medium * 2 + healthRatings.low * 1) / 
    (totalIngredients * 3);

  // Generate appropriate summary based on health score
  if (healthScore > 0.8) {
    return `This ${product.name} contains mostly high-rated ingredients that are considered safe for regular use. The product is formulated with ${healthRatings.high} ingredients rated as highly safe, ${healthRatings.medium} with medium safety ratings, and ${healthRatings.low} with potential concerns. Overall, this product meets high health and safety standards.`;
  } else if (healthScore > 0.6) {
    return `This ${product.name} contains a mix of ingredients with varying health ratings. While ${healthRatings.high} ingredients are rated highly for safety, there are ${healthRatings.medium} ingredients with moderate concerns and ${healthRatings.low} that may cause issues for sensitive individuals. Most people can use this product safely, but those with specific sensitivities should review the ingredient list.`;
  } else {
    return `This ${product.name} contains several ingredients that may cause health concerns for some individuals. Only ${healthRatings.high} ingredients have high safety ratings, while ${healthRatings.medium} have moderate concerns and ${healthRatings.low} have known issues. Consider alternatives if you have sensitive skin or are concerned about synthetic chemicals.`;
  }
};

/**
 * Determines the health impact rating based on product ingredients
 * @param {Object} product - The product object
 * @returns {String} - Health impact rating ('safe' or 'caution')
 */
export const analyzeHealthImpact = (product) => {
  // Count low-rated ingredients
  const lowRatedCount = product.ingredients.filter(
    (ingredient) => ingredient.healthRating.toLowerCase() === 'low'
  ).length;

  // If more than 20% of ingredients are low-rated, mark as caution
  return lowRatedCount / product.ingredients.length > 0.2 ? 'caution' : 'safe';
};

/**
 * Determines the environmental impact rating based on product properties
 * @param {Object} product - The product object
 * @returns {String} - Environmental impact rating ('green', 'yellow', or 'red')
 */
export const analyzeEnvironmentalImpact = (product) => {
  // This is a simplified version - in a real app, this would use more sophisticated analysis
  const environmentalCertifications = [
    'organic', 'eco-friendly', 'biodegradable', 'sustainable', 
    'recyclable', 'reef safe', 'epa safer choice', 'usda biobased'
  ];

  // Count how many environmental certifications the product has
  const certCount = product.certifications.filter(cert => 
    environmentalCertifications.some(envCert => 
      cert.toLowerCase().includes(envCert)
    )
  ).length;

  // Determine rating based on certification count
  if (certCount >= 2) return 'green';
  if (certCount >= 1) return 'yellow';
  return 'red';
};