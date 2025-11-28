const {
  menuItems,
  getDiscountedItems,
  getFullMenu,
  getItemByName,
  getItemsByCategory,
  getPairingSuggestions,
  getAllCategories
} = require('../data/menu.js');

/**
 * CMS Agent - Inventory Manager
 * Manages the "truth" about what food is available
 * Provides access to menu data with AI-friendly structure
 */
class CMSAgent {
  constructor() {
    this.menuData = getFullMenu();
    this.lastUpdated = new Date().toISOString();
  }

  /**
   * Get all discounted items across all categories
   * @returns {Array} Array of discounted items with full details
   */
  getDiscountedItems() {
    const discounted = getDiscountedItems();
    return {
      success: true,
      count: discounted.length,
      items: discounted.map(item => ({
        name: item.name,
        price: item.price,
        originalPrice: this.calculateOriginalPrice(item.price, item.discount_amount),
        discount_amount: item.discount_amount,
        discount_percentage: this.extractDiscountPercentage(item.discount_amount),
        category: item.category,
        menuCategory: item.menuCategory,
        description: item.description,
        isVeg: item.isVeg,
        flavor_profile: item.flavor_profile,
        preparation: item.preparation
      })),
      lastUpdated: this.lastUpdated
    };
  }

  /**
   * Get complete menu structure with all enhanced fields
   * @returns {Object} Complete menu structure
   */
  getFullMenu() {
    return {
      success: true,
      menu: this.menuData,
      categories: getAllCategories(),
      itemCount: this.getTotalItemCount(),
      discountedCount: getDiscountedItems().length,
      lastUpdated: this.lastUpdated
    };
  }

  /**
   * Search for specific menu item by name
   * @param {string} name - Item name to search for
   * @returns {Object|null} Menu item details or null if not found
   */
  getItemByName(name) {
    const item = getItemByName(name);
    if (!item) {
      return {
        success: false,
        error: `Item "${name}" not found in menu`,
        suggestions: this.getSearchSuggestions(name)
      };
    }

    return {
      success: true,
      item: {
        name: item.name,
        price: item.price,
        originalPrice: this.calculateOriginalPrice(item.price, item.discount_amount),
        discount_amount: item.discount_amount,
        discount_percentage: this.extractDiscountPercentage(item.discount_amount),
        category: item.category,
        menuCategory: item.menuCategory,
        description: item.description,
        isVeg: item.isVeg,
        spiceLevel: item.spiceLevel,
        flavor_profile: item.flavor_profile,
        preparation: item.preparation
      }
    };
  }

  /**
   * Get items filtered by cuisine category
   * @param {string} category - Cuisine type (e.g., "Italian", "Chinese", "Indian")
   * @returns {Object} Filtered menu structure
   */
  getItemsByCategory(category) {
    const filtered = getItemsByCategory(category);
    const items = Object.values(filtered).flat();

    return {
      success: true,
      category: category,
      items: items.map(item => ({
        name: item.name,
        price: item.price,
        originalPrice: this.calculateOriginalPrice(item.price, item.discount_amount),
        discount_amount: item.discount_amount,
        discount_percentage: this.extractDiscountPercentage(item.discount_amount),
        menuCategory: item.menuCategory,
        description: item.description,
        isVeg: item.isVeg,
        flavor_profile: item.flavor_profile,
        preparation: item.preparation
      })),
      count: items.length,
      discountedCount: items.filter(item => item.is_discounted).length,
      lastUpdated: this.lastUpdated
    };
  }

  /**
   * Get intelligent pairing suggestions based on flavor profiles
   * @param {Object} mainItem - Main menu item
   * @param {number} limit - Maximum number of suggestions (default: 3)
   * @returns {Object} Pairing suggestions with reasoning
   */
  getPairingSuggestions(mainItem, limit = 3) {
    if (!mainItem || !mainItem.flavor_profile) {
      return {
        success: false,
        error: "Invalid main item or missing flavor profile"
      };
    }

    const suggestions = getPairingSuggestions(mainItem.flavor_profile, mainItem);
    const limitedSuggestions = suggestions.slice(0, limit);

    return {
      success: true,
      mainItem: {
        name: mainItem.name,
        category: mainItem.category,
        flavor_profile: mainItem.flavor_profile
      },
      recommendations: limitedSuggestions.map(suggestion => ({
        item: {
          name: suggestion.name,
          price: suggestion.price,
          originalPrice: this.calculateOriginalPrice(suggestion.price, suggestion.discount_amount),
          discount_amount: suggestion.discount_amount,
          discount_percentage: this.extractDiscountPercentage(suggestion.discount_amount),
          category: suggestion.category,
          menuCategory: suggestion.menuCategory,
          description: suggestion.description,
          isVeg: suggestion.isVeg,
          flavor_profile: suggestion.flavor_profile
        },
        reason: suggestion.pairingReason,
        discountHighlight: suggestion.is_discounted ?
          `🔥 ${suggestion.discount_amount} OFF!` : null
      })),
      count: limitedSuggestions.length,
      lastUpdated: this.lastUpdated
    };
  }

  /**
   * Get menu statistics and insights
   * @returns {Object} Menu analytics
   */
  getMenuStats() {
    const allItems = Object.values(this.menuData).flat();
    const discountedItems = getDiscountedItems();
    const categories = getAllCategories();

    const priceRanges = {
      budget: allItems.filter(item => item.price < 100).length,
      moderate: allItems.filter(item => item.price >= 100 && item.price < 300).length,
      premium: allItems.filter(item => item.price >= 300).length
    };

    const vegNonVegRatio = {
      vegetarian: allItems.filter(item => item.isVeg).length,
      nonVegetarian: allItems.filter(item => !item.isVeg).length
    };

    const spiceLevels = allItems.reduce((acc, item) => {
      acc[item.spiceLevel] = (acc[item.spiceLevel] || 0) + 1;
      return acc;
    }, {});

    return {
      success: true,
      stats: {
        totalItems: allItems.length,
        discountedItems: discountedItems.length,
        categories: categories.length,
        priceRanges,
        vegNonVegRatio,
        spiceLevels,
        averagePrice: Math.round(allItems.reduce((sum, item) => sum + item.price, 0) / allItems.length)
      },
      lastUpdated: this.lastUpdated
    };
  }

  // Helper methods
  calculateOriginalPrice(currentPrice, discountAmount) {
    if (!discountAmount) return currentPrice;

    const percentageMatch = discountAmount.match(/(\d+)%/);
    if (percentageMatch) {
      const discountPercentage = parseInt(percentageMatch[1]);
      return Math.round(currentPrice / (1 - discountPercentage / 100));
    }

    const amountMatch = discountAmount.match(/₹?(\d+)/);
    if (amountMatch) {
      const discountAmount = parseInt(amountMatch[1]);
      return currentPrice + discountAmount;
    }

    return currentPrice;
  }

  extractDiscountPercentage(discountAmount) {
    if (!discountAmount) return 0;
    const percentageMatch = discountAmount.match(/(\d+)%/);
    return percentageMatch ? parseInt(percentageMatch[1]) : 0;
  }

  getSearchSuggestions(searchTerm) {
    const allItems = Object.values(this.menuData).flat();
    const suggestions = allItems
      .filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 5)
      .map(item => item.name);

    return suggestions;
  }

  getTotalItemCount() {
    return Object.values(this.menuData).reduce((total, category) => total + category.length, 0);
  }

  /**
   * Refresh menu data cache
   */
  refreshData() {
    this.menuData = getFullMenu();
    this.lastUpdated = new Date().toISOString();
    return {
      success: true,
      message: "Menu data refreshed successfully",
      lastUpdated: this.lastUpdated
    };
  }
}

module.exports = CMSAgent;