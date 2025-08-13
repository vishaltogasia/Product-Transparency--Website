const products = [
  {
    id: 1,
    name: 'Eco-Friendly Shampoo',
    description: 'A gentle, plant-based shampoo that cleanses without harsh chemicals.',
    shortDescription: 'Natural ingredients, biodegradable packaging',
    image: 'https://i.postimg.cc/jjb4Kd3w/Whats-App-Image-2025-08-13-at-20-41-38.jpg',
    healthImpact: 'safe', // 'safe' or 'caution'
    environmentalImpact: 'green', // 'green', 'yellow', or 'red'
    certifications: ['Organic', 'Cruelty-Free', 'Vegan'],
    ingredients: [
      { name: 'Aloe Vera Extract', purpose: 'Moisturizer', healthRating: 'High' },
      { name: 'Coconut-derived Surfactants', purpose: 'Cleansing', healthRating: 'High' },
      { name: 'Glycerin', purpose: 'Moisturizer', healthRating: 'High' },
      { name: 'Essential Oils', purpose: 'Fragrance', healthRating: 'Medium' },
      { name: 'Citric Acid', purpose: 'pH Balancer', healthRating: 'High' }
    ],
    keyFacts: [
      'Made with 100% plant-based ingredients',
      'Biodegradable formula',
      'Recyclable packaging',
      'No synthetic fragrances',
      'No parabens or sulfates'
    ]
  },
  {
    id: 2,
    name: 'Organic Face Cream',
    description: 'A rich, nourishing face cream made with certified organic ingredients to hydrate and protect your skin.',
    shortDescription: 'Plant-based moisturizer with natural oils',
    image: 'https://i.postimg.cc/RhY0md9S/Whats-App-Image-2025-08-13-at-20-45-55.jpg',
    healthImpact: 'safe',
    environmentalImpact: 'green',
    certifications: ['USDA Organic', 'EWG Verified', 'Leaping Bunny'],
    ingredients: [
      { name: 'Shea Butter', purpose: 'Moisturizer', healthRating: 'High' },
      { name: 'Jojoba Oil', purpose: 'Emollient', healthRating: 'High' },
      { name: 'Aloe Vera', purpose: 'Soothing', healthRating: 'High' },
      { name: 'Vitamin E', purpose: 'Antioxidant', healthRating: 'High' },
      { name: 'Rosemary Extract', purpose: 'Preservative', healthRating: 'Medium' }
    ],
    keyFacts: [
      'Made with 95% organic ingredients',
      'No synthetic preservatives',
      'Sustainable packaging',
      'Cruelty-free manufacturing',
      'Suitable for sensitive skin'
    ]
  },
  {
    id: 3,
    name: 'Sustainable Laundry Detergent',
    description: 'An eco-friendly laundry detergent that effectively cleans clothes while being gentle on the environment.',
    shortDescription: 'Eco-friendly formula, plastic-free packaging',
    image: 'https://i.postimg.cc/jCVrvFt7/Whats-App-Image-2025-08-13-at-20-44-42.jpg',
    healthImpact: 'safe',
    environmentalImpact: 'green',
    certifications: ['EPA Safer Choice', 'USDA Biobased', 'B Corp'],
    ingredients: [
      { name: 'Sodium Carbonate', purpose: 'Cleaning Agent', healthRating: 'Medium' },
      { name: 'Sodium Bicarbonate', purpose: 'Stain Remover', healthRating: 'High' },
      { name: 'Plant-derived Surfactants', purpose: 'Dirt Removal', healthRating: 'High' },
      { name: 'Sodium Citrate', purpose: 'Water Softener', healthRating: 'High' },
      { name: 'Essential Oil Blend', purpose: 'Fragrance', healthRating: 'Medium' }
    ],
    keyFacts: [
      'Biodegradable formula',
      'Plastic-free packaging',
      'Concentrated formula reduces water usage',
      'Effective in cold water to save energy',
      'Safe for septic systems'
    ]
  },
  {
    id: 4,
    name: 'Natural Sunscreen',
    description: 'A mineral-based sunscreen that provides broad-spectrum protection without harmful chemicals.',
    shortDescription: 'Mineral protection, reef-safe formula',
    image: 'https://i.postimg.cc/h4XzyQKD/Whats-App-Image-2025-08-13-at-20-48-05.jpg',
    healthImpact: 'safe',
    environmentalImpact: 'green',
    certifications: ['Reef Safe', 'EWG Verified', 'Cruelty-Free'],
    ingredients: [
      { name: 'Zinc Oxide', purpose: 'UV Protection', healthRating: 'High' },
      { name: 'Coconut Oil', purpose: 'Moisturizer', healthRating: 'High' },
      { name: 'Shea Butter', purpose: 'Moisturizer', healthRating: 'High' },
      { name: 'Vitamin E', purpose: 'Antioxidant', healthRating: 'High' },
      { name: 'Beeswax', purpose: 'Water Resistance', healthRating: 'Medium' }
    ],
    keyFacts: [
      'Mineral-based broad-spectrum protection',
      'Reef-safe formula',
      'No chemical UV filters',
      'Water-resistant for up to 80 minutes',
      'Safe for sensitive skin'
    ]
  },
  {
    id: 5,
    name: 'Multi-Surface Cleaner',
    description: 'An all-purpose cleaner made with plant-derived ingredients that effectively cleans multiple surfaces.',
    shortDescription: 'Plant-based formula, effective cleaning',
    image: 'https://buffcitysoap.com/cdn/shop/files/Multi-SurfaceCleaner_MakeryBG_Narcissist.jpg?v=1752527255&width=1100',
    healthImpact: 'caution',
    environmentalImpact: 'yellow',
    certifications: ['EPA Safer Choice', 'USDA Biobased'],
    ingredients: [
      { name: 'Ethyl Alcohol', purpose: 'Disinfectant', healthRating: 'Medium' },
      { name: 'Citric Acid', purpose: 'Cleaning Agent', healthRating: 'High' },
      { name: 'Sodium Lauryl Sulfate', purpose: 'Surfactant', healthRating: 'Low' },
      { name: 'Essential Oils', purpose: 'Fragrance', healthRating: 'Medium' },
      { name: 'Potassium Sorbate', purpose: 'Preservative', healthRating: 'Medium' }
    ],
    keyFacts: [
      'Effective against common household germs',
      'No chlorine bleach or ammonia',
      'Biodegradable formula',
      'Refillable packaging available',
      'May cause eye irritation - use with care'
    ]
  },
  {
    id: 6,
    name: 'Children\'s Bubble Bath',
    description: 'A gentle bubble bath formulated specifically for children with sensitive skin.',
    shortDescription: 'Gentle formula for children',
    image: 'https://imgs.search.brave.com/elFa68T3Uvck8aY_x0tIeOOi0_V8GNHxMTNGZawpJFE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/ZGVhZHNlYWNvbGxl/Y3Rpb24uY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDI0LzAx/LzIxNzIwLUtJRFMt/QlVCQkxFLUJBVEgt/QnViYmxlLUd1bS0w/MDguanBn',
    healthImpact: 'caution',
    environmentalImpact: 'yellow',
    certifications: ['Pediatrician Tested', 'Hypoallergenic'],
    ingredients: [
      { name: 'Sodium Laureth Sulfate', purpose: 'Bubble Agent', healthRating: 'Low' },
      { name: 'Cocamidopropyl Betaine', purpose: 'Surfactant', healthRating: 'Medium' },
      { name: 'Glycerin', purpose: 'Moisturizer', healthRating: 'High' },
      { name: 'Citric Acid', purpose: 'pH Balancer', healthRating: 'High' },
      { name: 'Fragrance', purpose: 'Scent', healthRating: 'Low' }
    ],
    keyFacts: [
      'Tear-free formula',
      'Tested for sensitive skin',
      'Contains some synthetic ingredients',
      'Artificial fragrance may cause irritation in some children',
      'Recyclable packaging'
    ]
  }
];

export default products;