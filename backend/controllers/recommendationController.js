const Restaurant = require('../models/restaurant');

// Get trending restaurants
exports.getTrending = async (req, res) => {
  try {
    // Get restaurants sorted by rating and include some randomness for freshness
    const restaurants = await Restaurant.find({ rating: { $gte: 3.5 } })
      .sort({ rating: -1, name: 1 })
      .limit(20);

    // Calculate trending score based on rating and some randomness
    const trendingRestaurants = restaurants
      .map(restaurant => ({
        restaurantId: restaurant._id,
        name: restaurant.name,
        image: restaurant.featured_image || '/images/placeholder-restaurant.jpg',
        cuisines: restaurant.cuisines || [],
        rating: restaurant.rating || 4.0,
        deliveryTime: `${restaurant.delivery_time || 25}-${(restaurant.delivery_time || 25) + 5} min`,
        priceRange: restaurant.price_for_one || 2,
        locality: restaurant.locality || 'Unknown',
        isPersonalized: false,
        personalizationReason: null,
        trendingScore: (restaurant.rating || 4.0) * (restaurant.price_for_one || 2) + Math.random() * 2
      }))
      .sort((a, b) => b.trendingScore - a.trendingScore)
      .slice(0, 12);

    res.json({
      recommendations: trendingRestaurants,
      isPersonalized: false
    });
  } catch (error) {
    console.error('Trending recommendations error:', error);
    res.status(500).json({ message: 'Failed to get trending recommendations', error: error.message });
  }
};

// Get personalized recommendations based on cuisine preferences
exports.getPersonalized = async (req, res) => {
  try {
    const { cuisines: preferredCuisines, maxPrice, minRating } = req.query;

    if (!preferredCuisines) {
      // If no preferences provided, fallback to trending
      return exports.getTrending(req, res);
    }

    const cuisineArray = Array.isArray(preferredCuisines)
      ? preferredCuisines
      : preferredCuisines.split(',').map(c => c.trim());

    // Build query for personalized recommendations
    const query = {
      $or: cuisineArray.map(cuisine => ({ cuisines: { $regex: cuisine, $options: 'i' } }))
    };

    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    } else {
      query.rating = { $gte: 3.5 };
    }

    const restaurants = await Restaurant.find(query)
      .sort({ rating: -1 })
      .limit(15);

    // Format personalized recommendations
    const personalizedRecommendations = restaurants.map(restaurant => ({
      restaurantId: restaurant._id,
      name: restaurant.name,
      image: restaurant.featured_image || '/images/placeholder-restaurant.jpg',
      cuisines: restaurant.cuisines || [],
      rating: restaurant.rating || 4.0,
      deliveryTime: `${restaurant.delivery_time || 25}-${(restaurant.delivery_time || 25) + 5} min`,
      priceRange: restaurant.price_for_one || 2,
      locality: restaurant.locality || 'Unknown',
      isPersonalized: true,
      personalizationReason: `Based on your interest in ${cuisineArray.join(', ')}`,
      matchScore: calculateMatchScore(restaurant, cuisineArray)
    }))
    .filter(rec => maxPrice ? rec.priceRange <= parseInt(maxPrice) : true)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 12);

    // If we don't have enough personalized results, add some trending ones
    if (personalizedRecommendations.length < 8) {
      const trendingResponse = await getTrendingRestaurants();
      const additionalTrending = trendingResponse
        .filter(trending => !personalizedRecommendations.find(personalized =>
          personalized.restaurantId.toString() === trending.restaurantId.toString()
        ))
        .slice(0, 8 - personalizedRecommendations.length);

      personalizedRecommendations.push(...additionalTrending);
    }

    res.json({
      recommendations: personalizedRecommendations,
      isPersonalized: true,
      preferences: {
        cuisines: cuisineArray,
        maxPrice: maxPrice ? parseInt(maxPrice) : null,
        minRating: minRating ? parseFloat(minRating) : 3.5
      }
    });
  } catch (error) {
    console.error('Personalized recommendations error:', error);
    res.status(500).json({ message: 'Failed to get personalized recommendations', error: error.message });
  }
};

// Update user preferences (for future personalization improvements)
exports.updatePreferences = async (req, res) => {
  try {
    const { cuisines, priceRange, rating } = req.body;

    // In a real application, this would be stored in user profile
    // For now, we'll just acknowledge the preferences
    res.json({
      message: 'Preferences updated successfully',
      preferences: {
        cuisines: cuisines || [],
        priceRange: priceRange || null,
        rating: rating || null
      }
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ message: 'Failed to update preferences', error: error.message });
  }
};

// Helper function to calculate match score
function calculateMatchScore(restaurant, preferredCuisines) {
  let score = (restaurant.rating || 4.0) * 10;

  // Boost score for matching cuisines
  const restaurantCuisines = (restaurant.cuisines || []).map(c => c.toLowerCase());
  const matches = preferredCuisines.filter(pref =>
    restaurantCuisines.some(restCuisine => restCuisine.includes(pref.toLowerCase()))
  );

  score += matches.length * 20;

  // Boost for highly rated restaurants
  if (restaurant.rating >= 4.5) score += 15;

  // Boost for reasonable delivery time
  if (restaurant.delivery_time <= 30) score += 10;

  return score;
}

// Helper function to get trending restaurants
async function getTrendingRestaurants() {
  try {
    const restaurants = await Restaurant.find({ rating: { $gte: 3.5 } })
      .sort({ rating: -1, name: 1 })
      .limit(20);

    return restaurants
      .map(restaurant => ({
        restaurantId: restaurant._id,
        name: restaurant.name,
        image: restaurant.featured_image || '/images/placeholder-restaurant.jpg',
        cuisines: restaurant.cuisines || [],
        rating: restaurant.rating || 4.0,
        deliveryTime: `${restaurant.delivery_time || 25}-${(restaurant.delivery_time || 25) + 5} min`,
        priceRange: restaurant.price_for_one || 2,
        locality: restaurant.locality || 'Unknown',
        isPersonalized: false,
        personalizationReason: null,
        trendingScore: (restaurant.rating || 4.0) * (restaurant.price_for_one || 2) + Math.random() * 2
      }))
      .sort((a, b) => b.trendingScore - a.trendingScore)
      .slice(0, 12);
  } catch (error) {
    console.error('Error getting trending restaurants:', error);
    return [];
  }
}