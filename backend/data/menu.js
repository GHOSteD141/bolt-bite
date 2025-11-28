const menuItems = {
  "Pizzas & Burgers": [
    {
      name: "Margherita Pizza",
      price: 299,
      isVeg: true,
      description: "Classic delight with 100% real mozzarella cheese",
      image: "https://source.unsplash.com/400x300/?margherita-pizza,italian,mozzarella",
      spiceLevel: "mild",
      preparation: "20-25 mins",
      category: "Italian",
      is_discounted: true,
      discount_amount: "20% off",
      flavor_profile: ["savory", "creamy", "mild"]
    },
    {
      name: "Farmhouse Pizza",
      price: 399,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?vegetable-pizza,farmhouse,fresh",
      spiceLevel: "medium",
      preparation: "25-30 mins",
      category: "Italian",
      is_discounted: false,
      discount_amount: "",
      flavor_profile: ["savory", "herbal", "medium"]
    },
    {
      name: "Chicken Pepperoni Pizza",
      price: 449,
      isVeg: false,
      description: "Spicy and cheesy with a mix of chicken and pepperoni",
      image: "https://source.unsplash.com/400x300/?pepperoni-pizza,chicken,meat",
      spiceLevel: "hot",
      preparation: "25-30 mins",
      category: "Italian",
      is_discounted: true,
      discount_amount: "15% off",
      flavor_profile: ["spicy", "savory", "rich"]
    },
    {
      name: "BBQ Chicken Pizza",
      price: 449,
      isVeg: false,
      description: "Grilled chicken with BBQ sauce and vegetables",
      image: "https://source.unsplash.com/400x300/?bbq-chicken-pizza,grilled,smoky",
      spiceLevel: "medium",
      preparation: "25-30 mins",
      category: "Italian",
      is_discounted: false,
      discount_amount: "",
      flavor_profile: ["smoky", "sweet", "savory"]
    },
    {
      name: "Classic Veg Burger",
      price: 149,
      isVeg: true,
      description: "Simple and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?vegetable-burger,fresh,healthy",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "American",
      is_discounted: true,
      discount_amount: "10% off",
      flavor_profile: ["fresh", "crisp", "mild"]
    },
    {
      name: "Cheese Burst Burger",
      price: 199,
      isVeg: true,
      description: "Cheese burst with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?cheese-burger,melted-cheese",
      spiceLevel: "medium",
      preparation: "15-20 mins",
      category: "American",
      is_discounted: false,
      discount_amount: "",
      flavor_profile: ["creamy", "rich", "savory"]
    },
    {
      name: "Chicken Crispy Burger",
      price: 249,
      isVeg: false,
      description: "Crispy and delicious with a mix of chicken and vegetables",
      image: "https://source.unsplash.com/400x300/?crispy-chicken-burger,fast-food",
      spiceLevel: "medium",
      preparation: "15-20 mins",
      category: "American",
      is_discounted: true,
      discount_amount: "20% off",
      flavor_profile: ["crispy", "savory", "spicy"]
    },
    {
      name: "Double Patty Burger",
      price: 299,
      isVeg: false,
      description: "Double patty with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?double-patty-burger,jumbo-burger",
      spiceLevel: "hot",
      preparation: "20-25 mins",
      category: "American",
      is_discounted: false,
      discount_amount: "",
      flavor_profile: ["hearty", "spicy", "rich"]
    }
  ],
  "Chinese & Fast Food": [
    {
      name: "Veg Fried Rice",
      price: 199,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?vegetable-fried-rice,chinese,asian",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Chinese",
      is_discounted: false,
      discount_amount: "",
      flavor_profile: ["savory", "light", "mild"]
    },
    {
      name: "Chicken Fried Rice",
      price: 249,
      isVeg: false,
      description: "Grilled chicken with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?chicken-fried-rice,egg-rice,chinese",
      spiceLevel: "medium",
      preparation: "15-20 mins",
      category: "Chinese",
      is_discounted: true,
      discount_amount: "15% off",
      flavor_profile: ["savory", "protein-rich", "medium"]
    },
    {
      name: "Chilli Paneer",
      price: 249,
      isVeg: true,
      description: "Spicy and delicious with a mix of paneer and vegetables",
      image: "https://source.unsplash.com/400x300/?chilli-paneer,indian-chinese,cottage-cheese",
      spiceLevel: "hot",
      preparation: "20-25 mins",
      category: "Chinese",
      is_discounted: false,
      discount_amount: "",
      flavor_profile: ["spicy", "savory", "creamy"]
    },
    {
      name: "Chilli Chicken",
      price: 299,
      isVeg: false,
      description: "Spicy and delicious with a mix of chicken and vegetables",
      image: "https://source.unsplash.com/400x300/?chilli-chicken,spicy,chinese",
      spiceLevel: "hot",
      preparation: "20-25 mins",
      category: "Chinese",
      is_discounted: true,
      discount_amount: "20% off",
      flavor_profile: ["spicy", "savory", "hot"]
    },
    {
      name: "Veg Momos",
      price: 149,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?vegetable-momos,steamed-dumplings,tibetan",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Chinese",
      is_discounted: true,
      discount_amount: "10% off",
      flavor_profile: ["steamed", "savory", "light"]
    },
    {
      name: "Chicken Momos",
      price: 199,
      isVeg: false,
      description: "Grilled chicken with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?chicken-momos,meat-dumplings,steamed",
      spiceLevel: "medium",
      preparation: "15-20 mins",
      category: "Chinese",
      is_discounted: false,
      discount_amount: "",
      flavor_profile: ["steamed", "savory", "medium"]
    }
  ],
  "North Indian": [
    {
      name: "Butter Chicken",
      price: 349,
      isVeg: false,
      description: "Spicy and delicious with a mix of chicken and vegetables",
      image: "https://source.unsplash.com/400x300/?butter-chicken,makhani,creamy-curry",
      spiceLevel: "hot",
      preparation: "20-25 mins",
      category: "Indian",
      is_discounted: true,
      discount_amount: "25% off",
      flavor_profile: ["creamy", "spicy", "rich"]
    },
    {
      name: "Paneer Butter Masala",
      price: 299,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?paneer-butter-masala,cottage-cheese-curry",
      spiceLevel: "medium",
      preparation: "20-25 mins",
      category: "Indian",
      is_discounted: false,
      discount_amount: "",
      flavor_profile: ["creamy", "savory", "mild"]
    },
    {
      name: "Dal Makhani",
      price: 249,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?dal-makhani,black-lentil,creamy",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: true,
      discount_amount: "15% off",
      flavor_profile: ["creamy", "rich", "mild"]
    },
    {
      name: "Chole Bhature",
      price: 199,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?chole-bhature,indian-curry,chickpeas",
      spiceLevel: "medium",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: false,
      discount_amount: "",
      flavor_profile: ["spicy", "savory", "hearty"]
    },
    {
      name: "Rajma Chawal",
      price: 199,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?rajma-chawal,kidney-beans,indian-rice",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: false,
      discount_amount: "",
      flavor_profile: ["hearty", "savory", "mild"]
    },
    {
      name: "Chicken Biryani",
      price: 349,
      isVeg: false,
      description: "Spicy and delicious with a mix of chicken and vegetables",
      image: "https://source.unsplash.com/400x300/?chicken-biryani,fragrant-rice,spicy",
      spiceLevel: "hot",
      preparation: "20-25 mins",
      category: "Indian",
      is_discounted: true,
      discount_amount: "20% off",
      flavor_profile: ["aromatic", "spicy", "fragrant"]
    }
  ],
  "South Indian": [
    {
      name: "Masala Dosa",
      price: 149,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?masala-dosa,south-indian,crispy",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: true,
      discount_amount: "15% off",
      flavor_profile: ["crispy", "savory", "spiced"]
    },
    {
      name: "Idli Sambhar",
      price: 129,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?idli-sambhar,steamed,lentil-soup",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: false,
      discount_amount: "",
      flavor_profile: ["steamed", "savory", "light"]
    },
    {
      name: "Medu Vada",
      price: 99,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?medu-vada,south-indian,fried",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: false,
      discount_amount: "",
      flavor_profile: ["crispy", "savory", "light"]
    }
  ],
  "Snacks & Street Food": [
    {
      name: "Samosa",
      price: 30,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?samosa,indian-street-food,triangular",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: false,
      discount_amount: "",
      flavor_profile: ["crispy", "savory", "spiced"]
    },
    {
      name: "Pav Bhaji",
      price: 149,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?pav-bhaji,indian-chaat,street-food",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: true,
      discount_amount: "20% off",
      flavor_profile: ["spicy", "savory", "buttery"]
    },
    {
      name: "Dahi Puri",
      price: 99,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?dahi-puri,indian-chaat,yogurt",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: false,
      discount_amount: "",
      flavor_profile: ["tangy", "sweet", "fresh"]
    },
    {
      name: "Veg Sandwich",
      price: 99,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?vegetable-sandwich,fresh,healthy",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "International",
      is_discounted: false,
      discount_amount: "",
      flavor_profile: ["fresh", "light", "healthy"]
    },
    {
      name: "Club Sandwich",
      price: 149,
      isVeg: false,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?club-sandwich,layered,restaurant",
      spiceLevel: "medium",
      preparation: "15-20 mins",
      category: "International",
      is_discounted: false,
      discount_amount: "",
      flavor_profile: ["hearty", "savory", "protein-rich"]
    },
    {
      name: "Cheese Sandwich",
      price: 129,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?grilled-cheese-sandwich,melted",
      spiceLevel: "medium",
      preparation: "15-20 mins",
      category: "International",
      is_discounted: true,
      discount_amount: "15% off",
      flavor_profile: ["cheesy", "savory", "creamy"]
    }
  ],
  "Desserts & Beverages": [
    {
      name: "Chocolate Brownie",
      price: 149,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?chocolate-brownie,chocolate-dessert",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "International",
      is_discounted: true,
      discount_amount: "25% off",
      flavor_profile: ["sweet", "chocolatey", "rich"]
    },
    {
      name: "Gulab Jamun",
      price: 99,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?gulab-jamun,indian-sweet,syrupy",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: false,
      discount_amount: "",
      flavor_profile: ["sweet", "creamy", "syrupy"]
    },
    {
      name: "Rasmalai",
      price: 129,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?rasmalai,indian-dessert,milk-sweet",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: false,
      discount_amount: "",
      flavor_profile: ["creamy", "sweet", "milky"]
    },
    {
      name: "Ice Cream",
      price: 99,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?ice-cream,frozen-dessert,cold",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "International",
      is_discounted: true,
      discount_amount: "15% off",
      flavor_profile: ["cold", "sweet", "creamy"]
    },
    {
      name: "Cold Coffee",
      price: 129,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?cold-coffee,iced-coffee,drink",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Beverages",
      is_discounted: false,
      discount_amount: "",
      flavor_profile: ["coffee", "cold", "sweet"]
    },
    {
      name: "Soft Drinks",
      price: 59,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?soft-drinks,carbonated,refreshing",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Beverages",
      is_discounted: false,
      discount_amount: "",
      flavor_profile: ["carbonated", "sweet", "refreshing"]
    },
    {
      name: "Fresh Lime Soda",
      price: 79,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?fresh-lime-soda,citrus-drink,refreshing",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Beverages",
      is_discounted: true,
      discount_amount: "10% off",
      flavor_profile: ["tangy", "refreshing", "citrus"]
    },
    {
      name: "Lassi",
      price: 89,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?lassi,indian-drink,yogurt",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Beverages",
      is_discounted: false,
      discount_amount: "",
      flavor_profile: ["creamy", "sweet", "cooling"]
    }
  ],
  "Combos & Meals": [
    {
      name: "Veg Thali",
      price: 299,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?veg-thali,indian-meal,traditional",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: true,
      discount_amount: "18% off",
      flavor_profile: ["balanced", "variety", "complete"]
    },
    {
      name: "Non-Veg Thali",
      price: 399,
      isVeg: false,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?non-veg-thali,indian-meal,protein",
      spiceLevel: "medium",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: false,
      discount_amount: "",
      flavor_profile: ["balanced", "protein-rich", "complete"]
    },
    {
      name: "Biryani Combo",
      price: 449,
      isVeg: false,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://source.unsplash.com/400x300/?biryani-combo,indian-combo,complete-meal",
      spiceLevel: "hot",
      preparation: "20-25 mins",
      category: "Indian",
      is_discounted: true,
      discount_amount: "22% off",
      flavor_profile: ["aromatic", "spicy", "complete-meal"]
    }
  ]
};

// Add helper functions for menu operations
const getVegItems = () => {
  return Object.entries(menuItems).reduce((acc, [category, items]) => {
    acc[category] = items.filter(item => item.isVeg);
    return acc;
  }, {});
};

const getItemsByPriceRange = (min, max) => {
  return Object.entries(menuItems).reduce((acc, [category, items]) => {
    acc[category] = items.filter(item => item.price >= min && item.price <= max);
    return acc;
  }, {});
};

// New helper functions for CMS Agent
const getDiscountedItems = () => {
  const discounted = [];
  Object.entries(menuItems).forEach(([category, items]) => {
    items.forEach(item => {
      if (item.is_discounted) {
        discounted.push({ ...item, menuCategory: category });
      }
    });
  });
  return discounted;
};

const getFullMenu = () => {
  return menuItems;
};

const getItemByName = (name) => {
  let foundItem = null;
  Object.entries(menuItems).forEach(([category, items]) => {
    const item = items.find(i => i.name.toLowerCase() === name.toLowerCase());
    if (item) {
      foundItem = { ...item, menuCategory: category };
    }
  });
  return foundItem;
};

const getItemsByCategory = (category) => {
  const filtered = {};
  Object.entries(menuItems).forEach(([menuCategory, items]) => {
    const categoryItems = items.filter(item => item.category === category);
    if (categoryItems.length > 0) {
      filtered[menuCategory] = categoryItems;
    }
  });
  return filtered;
};

const getPairingSuggestions = (flavorProfile, excludeItem) => {
  const suggestions = [];
  const excludeName = excludeItem ? excludeItem.name.toLowerCase() : '';

  // Pairing logic based on flavor profiles
  Object.entries(menuItems).forEach(([category, items]) => {
    items.forEach(item => {
      if (item.name.toLowerCase() !== excludeName) {
        // Check for compatible flavor profiles
        const hasCompatibleFlavor = item.flavor_profile.some(flavor =>
          flavorProfile.some(profile =>
            (profile.includes('spicy') && flavor.includes('creamy')) ||
            (profile.includes('savory') && flavor.includes('tangy')) ||
            (profile.includes('rich') && flavor.includes('light')) ||
            (profile.includes('creamy') && flavor.includes('spicy')) ||
            (profile === flavor)
          )
        );

        if (hasCompatibleFlavor) {
          suggestions.push({
            ...item,
            menuCategory: category,
            pairingReason: getPairingReason(flavorProfile, item.flavor_profile)
          });
        }
      }
    });
  });

  // Return top 3 suggestions, prioritizing discounted items
  return suggestions
    .sort((a, b) => (b.is_discounted ? 1 : 0) - (a.is_discounted ? 1 : 0))
    .slice(0, 3);
};

const getPairingReason = (mainFlavors, pairingFlavors) => {
  if (mainFlavors.includes('spicy') && pairingFlavors.includes('creamy')) {
    return "Creamy item balances the spiciness perfectly";
  }
  if (mainFlavors.includes('savory') && pairingFlavors.includes('tangy')) {
    return "Tangy flavor complements the savory taste";
  }
  if (mainFlavors.includes('rich') && pairingFlavors.includes('light')) {
    return "Light item refreshes the palate after rich flavors";
  }
  if (mainFlavors.includes('hot') && pairingFlavors.includes('cooling')) {
    return "Cooling effect provides relief from hot spices";
  }
  return "Perfect flavor combination for a complete meal";
};

const getAllCategories = () => {
  const categories = new Set();
  Object.values(menuItems).flat().forEach(item => {
    if (item.category) {
      categories.add(item.category);
    }
  });
  return Array.from(categories);
};

module.exports = {
  menuItems,
  getVegItems,
  getItemsByPriceRange,
  getDiscountedItems,
  getFullMenu,
  getItemByName,
  getItemsByCategory,
  getPairingSuggestions,
  getAllCategories
};
