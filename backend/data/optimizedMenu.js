const { menuItems } = require('./menu');

// Flatten menu data for faster searching
const foodItems = [];

Object.entries(menuItems).forEach(([category, items]) => {
  items.forEach((item, index) => {
    foodItems.push({
      id: `${category}-${item.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: item.name,
      price: item.price,
      isVeg: item.isVeg,
      description: item.description,
      image: item.image,
      spiceLevel: item.spiceLevel || 'medium',
      preparation: item.preparation || '20-25 mins',
      category: category,
      // Additional fields for enhanced search
      keywords: [
        item.name.toLowerCase(),
        category.toLowerCase(),
        ...(item.description ? item.description.toLowerCase().split(' ') : []),
        ...(item.spiceLevel ? [item.spiceLevel.toLowerCase()] : [])
      ],
      searchableText: `${item.name} ${category} ${item.description || ''} ${item.spiceLevel || ''}`.toLowerCase()
    });
  });
});

// Create indexes for faster searching
const createSearchIndexes = () => {
  const cuisineIndex = {};
  const categoryIndex = {};
  const priceIndex = { low: [], medium: [], high: [] };
  const vegIndex = { veg: [], nonVeg: [] };

  foodItems.forEach(item => {
    // Category index
    if (!categoryIndex[item.category]) {
      categoryIndex[item.category] = [];
    }
    categoryIndex[item.category].push(item);

    // Price index
    if (item.price <= 150) {
      priceIndex.low.push(item);
    } else if (item.price <= 300) {
      priceIndex.medium.push(item);
    } else {
      priceIndex.high.push(item);
    }

    // Veg index
    if (item.isVeg) {
      vegIndex.veg.push(item);
    } else {
      vegIndex.nonVeg.push(item);
    }

    // Extract cuisine types for cuisine index
    const cuisines = extractCuisines(item.category, item.name);
    cuisines.forEach(cuisine => {
      if (!cuisineIndex[cuisine]) {
        cuisineIndex[cuisine] = [];
      }
      cuisineIndex[cuisine].push(item);
    });
  });

  return { cuisineIndex, categoryIndex, priceIndex, vegIndex };
};

// Helper function to extract cuisines from category and name
const extractCuisines = (category, name) => {
  const cuisines = new Set();
  const categoryLower = category.toLowerCase();
  const nameLower = name.toLowerCase();

  // Map categories to cuisines
  const categoryToCuisine = {
    'pizzas & burgers': ['pizza', 'burger', 'american', 'fast food'],
    'chinese & fast food': ['chinese', 'asian', 'fast food'],
    'north indian': ['north indian', 'indian'],
    'south indian': ['south indian', 'indian'],
    'snacks & street food': ['street food', 'snacks', 'indian'],
    'desserts & beverages': ['desserts', 'beverages'],
    'combos & meals': ['combos', 'meals', 'indian']
  };

  if (categoryToCuisine[categoryLower]) {
    categoryToCuisine[categoryLower].forEach(cuisine => cuisines.add(cuisine));
  }

  // Extract cuisines from item name
  const nameCuisines = {
    'pizza': 'pizza',
    'burger': 'burger',
    'dosa': 'south indian',
    'idli': 'south indian',
    'biryani': 'indian',
    'chicken': 'non-vegetarian',
    'paneer': 'vegetarian',
    'momo': 'chinese',
    'fried rice': 'chinese'
  };

  Object.entries(nameCuisines).forEach(([key, cuisine]) => {
    if (nameLower.includes(key)) {
      cuisines.add(cuisine);
    }
  });

  return Array.from(cuisines);
};

// Generate indexes
const searchIndexes = createSearchIndexes();

// Search functions(not implimented!#)
const searchFoodItems = (query, options = {}) => {
  const {
    category = null,
    cuisine = null,
    isVeg = null,
    maxPrice = null,
    minPrice = null,
    limit = 20
  } = options;

  let results = [...foodItems];

  // Filter by query
  if (query) {
    const queryLower = query.toLowerCase();
    results = results.filter(item =>
      item.searchableText.includes(queryLower) ||
      item.keywords.some(keyword => keyword.includes(queryLower))
    );
  }

  // Filter by category(not implimented in frontend!#)
  if (category && searchIndexes.categoryIndex[category]) {
    results = results.filter(item => item.category === category);
  }

  // Filter by cuisine
  if (cuisine && searchIndexes.cuisineIndex[cuisine]) {
    const cuisineItems = searchIndexes.cuisineIndex[cuisine];
    results = results.filter(item => cuisineItems.includes(item));
  }

  // Filter by vegetarian preference
  if (isVeg !== null) {
    results = results.filter(item => item.isVeg === isVeg);
  }

  // Filter by price range
  if (minPrice !== null) {
    results = results.filter(item => item.price >= minPrice);
  }
  if (maxPrice !== null) {
    results = results.filter(item => item.price <= maxPrice);
  }

  // Sort by relevance (exact name matches first, then category matches)(not implimented in frontend!#)
  if (query) {
    results.sort((a, b) => {
      const aExactMatch = a.name.toLowerCase() === query.toLowerCase();
      const bExactMatch = b.name.toLowerCase() === query.toLowerCase();

      if (aExactMatch && !bExactMatch) return -1;
      if (!aExactMatch && bExactMatch) return 1;

      const aNameStart = a.name.toLowerCase().startsWith(query.toLowerCase());
      const bNameStart = b.name.toLowerCase().startsWith(query.toLowerCase());

      if (aNameStart && !bNameStart) return -1;
      if (!aNameStart && bNameStart) return 1;

      return 0;
    });
  }

  return results.slice(0, limit);
};

// Get popular food items
const getPopularFoodItems = (limit = 12) => {
  // Return a mix of items from different categories
  const categories = Object.keys(menuItems);
  const popularItems = [];

  categories.forEach(category => {
    const categoryItems = foodItems.filter(item => item.category === category);
    if (categoryItems.length > 0) {
      // Take 2-3 popular items from each category
      const numItems = Math.min(3, categoryItems.length);
      popularItems.push(...categoryItems.slice(0, numItems));
    }
  });

  return popularItems.slice(0, limit);
};

// Get food items by category
const getFoodItemsByCategory = (category, limit = 10) => {
  return foodItems
    .filter(item => item.category === category)
    .slice(0, limit);
};

module.exports = {
  foodItems,
  searchIndexes,
  searchFoodItems,
  getPopularFoodItems,
  getFoodItemsByCategory,
  extractCuisines
};
