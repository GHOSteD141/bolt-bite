const {
  menuItems,
  getDiscountedItems,
  getFullMenu,
  getItemsByCategory,
  getItemByName,
  getPairingSuggestions
} = require('../data/menu');

class CMSAgent {
  constructor() {
    this.menuData = getFullMenu();
    this.discountedItems = getDiscountedItems();
    this.lastUpdated = new Date();
  }

  getDiscountedItems() {
    return {
      items: this.discountedItems,
      count: this.discountedItems.length,
      totalSavings: this.discountedItems.reduce((sum, item) => {
        const discount = item.price * 0.15; // estimate
        return sum + discount;
      }, 0)
    };
  }

  getFullMenu() {
    return this.menuData;
  }

  getItemByName(name) {
    const item = getItemByName(name);
    if (!item) {
      return { error: `Item "${name}" not found` };
    }
    return item;
  }

  getItemsByCategory(category) {
    const items = getItemsByCategory(category);
    if (Object.keys(items).length === 0) {
      return { error: `No items found for category "${category}"` };
    }
    return items;
  }

  getPairingSuggestions(itemName) {
    const mainItem = getItemByName(itemName);
    if (!mainItem) {
      return { error: `Item "${itemName}" not found for pairing suggestions` };
    }
    
    const suggestions = getPairingSuggestions(mainItem);
    return {
      mainItem,
      suggestions: suggestions.map(s => ({
        item: s.item,
        reason: s.reason,
        discountHighlight: s.item.is_discounted ? `🔥 ${s.item.discount_amount}` : null
      }))
    };
  }

  getCategories() {
    const categories = new Set();
    Object.values(this.menuData).forEach(items => {
      items.forEach(item => {
        if (item.category) categories.add(item.category);
      });
    });
    return Array.from(categories).sort();
  }

  getMenuSummary() {
    return {
      totalItems: Object.values(this.menuData).reduce((sum, items) => sum + items.length, 0),
      categories: this.getCategories(),
      discountedCount: this.discountedItems.length,
      lastUpdated: this.lastUpdated
    };
  }
}

module.exports = new CMSAgent();