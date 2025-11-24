const Restaurant = require('../models/restaurant');
const { menuItems } = require('../data/menu');

// Combined search for restaurants and food items
exports.combinedSearch = async (req, res) => {
  try {
    const { query } = req.params;
    const searchRegex = new RegExp(query, 'i');

    // Search restaurants
    const restaurants = await Restaurant.find({
      $or: [
        { name: searchRegex },
        { cuisines: searchRegex },
        { locality: searchRegex }
      ]
    }).limit(10);

    // Format restaurant results
    const formattedRestaurants = restaurants.map(restaurant => ({
      id: restaurant._id,
      name: restaurant.name,
      image: restaurant.featured_image || '/images/placeholder-restaurant.jpg',
      cuisine: restaurant.cuisines ? restaurant.cuisines[0] : 'Multi-cuisine',
      rating: restaurant.rating || 4.0,
      deliveryTime: `${restaurant.delivery_time || 25}-${(restaurant.delivery_time || 25) + 5} min`,
      priceRange: restaurant.price_for_one || 2
    }));

    // Search food items from menu data
    const foodItems = [];

    Object.entries(menuItems).forEach(([category, items]) => {
      items.forEach(item => {
        if (item.name.toLowerCase().includes(query.toLowerCase())) {
          // Find a restaurant that might serve this item
          const matchingRestaurant = restaurants.find(rest =>
            rest.cuisines && rest.cuisines.some(cuisine =>
              category.toLowerCase().includes(cuisine.toLowerCase())
            )
          );

          foodItems.push({
            id: `${category}-${item.name.toLowerCase().replace(/\s+/g, '-')}`,
            name: item.name,
            image: `/images/food/${item.image}`,
            price: item.price,
            restaurant: matchingRestaurant ? matchingRestaurant.name : 'Various Restaurants',
            restaurantId: matchingRestaurant ? matchingRestaurant._id : null,
            isVeg: item.isVeg,
            prepTime: item.preparation || '20-25 mins',
            category: category
          });
        }
      });
    });

    // Limit food items to 10 results
    const limitedFoodItems = foodItems.slice(0, 10);

    res.json({
      restaurants: formattedRestaurants,
      foodItems: limitedFoodItems
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Search failed', error: error.message });
  }
};

// Restaurant-only search
exports.searchRestaurants = async (req, res) => {
  try {
    const { query } = req.params;
    const searchRegex = new RegExp(query, 'i');

    const restaurants = await Restaurant.find({
      $or: [
        { name: searchRegex },
        { cuisines: searchRegex },
        { locality: searchRegex }
      ]
    }).limit(20);

    const formattedRestaurants = restaurants.map(restaurant => ({
      id: restaurant._id,
      name: restaurant.name,
      image: restaurant.featured_image || '/images/placeholder-restaurant.jpg',
      cuisines: restaurant.cuisines || [],
      rating: restaurant.rating || 4.0,
      deliveryTime: `${restaurant.delivery_time || 25}-${(restaurant.delivery_time || 25) + 5} min`,
      priceRange: restaurant.price_for_one || 2,
      locality: restaurant.locality || 'Unknown'
    }));

    res.json(formattedRestaurants);
  } catch (error) {
    console.error('Restaurant search error:', error);
    res.status(500).json({ message: 'Restaurant search failed', error: error.message });
  }
};

// Food item-only search
exports.searchFoodItems = async (req, res) => {
  try {
    const { query } = req.params;
    const searchTerms = query.toLowerCase().split(' ');

    const foodItems = [];

    Object.entries(menuItems).forEach(([category, items]) => {
      items.forEach(item => {
        const itemName = item.name.toLowerCase();
        const categoryMatch = category.toLowerCase().includes(query.toLowerCase());
        const nameMatch = searchTerms.some(term => itemName.includes(term));

        if (categoryMatch || nameMatch) {
          foodItems.push({
            id: `${category}-${item.name.toLowerCase().replace(/\s+/g, '-')}`,
            name: item.name,
            image: `/images/food/${item.image}`,
            price: item.price,
            category: category,
            isVeg: item.isVeg,
            prepTime: item.preparation || '20-25 mins',
            spiceLevel: item.spiceLevel || 'medium',
            description: item.description
          });
        }
      });
    });

    // Sort by relevance (exact name matches first, then category matches)
    const sortedFoodItems = foodItems.sort((a, b) => {
      const aNameMatch = a.name.toLowerCase().includes(query.toLowerCase());
      const bNameMatch = b.name.toLowerCase().includes(query.toLowerCase());

      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      return 0;
    });

    res.json(sortedFoodItems.slice(0, 20));
  } catch (error) {
    console.error('Food item search error:', error);
    res.status(500).json({ message: 'Food item search failed', error: error.message });
  }
};