const menuItems = {
  "Pizzas & Burgers": [
    { 
      name: "Margherita Pizza",
      price: 299,
      isVeg: true,
      description: "Classic delight with 100% real mozzarella cheese",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "mild",
      preparation: "20-25 mins",
      category: "Italian",
      is_discounted: true,
      discount_amount: "20% off",
      flavor_profile: ["savory", "creamy", "mild"],
      restaurantId: 1
    },
    { 
      name: "Farmhouse Pizza",
      price: 399,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1571407918910-918fcfb3c9da?w=400&h=300&fit=crop",
      spiceLevel: "medium",
      preparation: "25-30 mins",
      category: "Italian",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["savory", "fresh", "creamy"],
      restaurantId: 1
    },
    { 
      name: "Chicken Pepperoni Pizza",
      price: 449,
      isVeg: false,
      description: "Spicy and cheesy with a mix of chicken and pepperoni",
      image: "https://images.unsplash.com/photo-1628840042765-356cda07f4ee?w=400&h=300&fit=crop",
      spiceLevel: "hot",
      preparation: "25-30 mins",
      category: "Italian",
      is_discounted: true,
      discount_amount: "15% off",
      flavor_profile: ["spicy", "savory", "meaty"],
      restaurantId: 1
    },
    { 
      name: "BBQ Chicken Pizza",
      price: 449,
      isVeg: false,
      description: "Grilled chicken with BBQ sauce and vegetables",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561141?w=400&h=300&fit=crop",
      spiceLevel: "medium",
      preparation: "25-30 mins",
      category: "Italian",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["spicy", "tangy", "smoky"],
      restaurantId: 1
    },
    { 
      name: "Classic Veg Burger",
      price: 149,
      isVeg: true,
      description: "Simple and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1585238341710-4b4e6cecc068?w=400&h=300&fit=crop",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "American",
      is_discounted: true,
      discount_amount: "25% off",
      flavor_profile: ["savory", "fresh", "mild"],
      restaurantId: 1
    },
    { 
      name: "Cheese Burst Burger",
      price: 199,
      isVeg: true,
      description: "Cheese burst with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      spiceLevel: "medium",
      preparation: "15-20 mins",
      category: "American",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["savory", "creamy", "mild"],
      restaurantId: 1
    },
    { 
      name: "Chicken Crispy Burger",
      price: 249,
      isVeg: false,
      description: "Crispy and delicious with a mix of chicken and vegetables",
      image: "https://images.unsplash.com/photo-1562547256-c5aff167aeb7?w=400&h=300&fit=crop",
      spiceLevel: "medium",
      preparation: "15-20 mins",
      category: "American",
      is_discounted: true,
      discount_amount: "20% off",
      flavor_profile: ["spicy", "savory", "crispy"],
      restaurantId: 1
    },
    { 
      name: "Double Patty Burger",
      price: 299,
      isVeg: false,
      description: "Double patty with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1550547990-ee5243f8f7f6?w=400&h=300&fit=crop",
      spiceLevel: "hot",
      preparation: "20-25 mins",
      category: "American",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["savory", "meaty", "rich"],
      restaurantId: 1
    }
  ],
  "Chinese & Fast Food": [
    { 
      name: "Veg Fried Rice",
      price: 199,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a860?w=400&h=300&fit=crop",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Chinese",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["savory", "crispy", "mild"]
    },
    { 
      name: "Chicken Fried Rice",
      price: 249,
      isVeg: false,
      description: "Grilled chicken with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561141?w=400&h=300&fit=crop",
      spiceLevel: "medium",
      preparation: "15-20 mins",
      category: "Chinese",
      is_discounted: true,
      discount_amount: "10% off",
      flavor_profile: ["savory", "crispy", "mild"]
    },
    { 
      name: "Chilli Paneer",
      price: 249,
      isVeg: true,
      description: "Spicy and delicious with a mix of paneer and vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "hot",
      preparation: "20-25 mins",
      category: "Chinese",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["spicy", "savory", "tangy"]
    },
    { 
      name: "Chilli Chicken",
      price: 299,
      isVeg: false,
      description: "Spicy and delicious with a mix of chicken and vegetables",
      image: "https://images.unsplash.com/photo-1628840042765-356cda07f4ee?w=400&h=300&fit=crop",
      spiceLevel: "hot",
      preparation: "20-25 mins",
      category: "Chinese",
      is_discounted: true,
      discount_amount: "15% off",
      flavor_profile: ["spicy", "savory", "tangy"]
    },
    { 
      name: "Veg Momos",
      price: 149,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a860?w=400&h=300&fit=crop",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Chinese",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["savory", "mild", "steamed"]
    },
    { 
      name: "Chicken Momos",
      price: 199,
      isVeg: false,
      description: "Grilled chicken with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561141?w=400&h=300&fit=crop",
      spiceLevel: "medium",
      preparation: "15-20 mins",
      category: "Chinese",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["savory", "mild", "steamed"]
    }
  ],
  "North Indian": [
    { 
      name: "Butter Chicken",
      price: 349,
      isVeg: false,
      description: "Spicy and delicious with a mix of chicken and vegetables",
      image: "https://images.unsplash.com/photo-1628840042765-356cda07f4ee?w=400&h=300&fit=crop",
      spiceLevel: "hot",
      preparation: "20-25 mins",
      category: "Indian",
      is_discounted: true,
      discount_amount: "20% off",
      flavor_profile: ["spicy", "creamy", "rich"]
    },
    { 
      name: "Paneer Butter Masala",
      price: 299,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "medium",
      preparation: "20-25 mins",
      category: "Indian",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["spicy", "creamy", "savory"]
    },
    { 
      name: "Dal Makhani",
      price: 249,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: true,
      discount_amount: "15% off",
      flavor_profile: ["creamy", "mild", "savory"]
    },
    { 
      name: "Chole Bhature",
      price: 199,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "medium",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["savory", "crispy", "mild"]
    },
    { 
      name: "Rajma Chawal",
      price: 199,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["savory", "mild", "hearty"]
    },
    { 
      name: "Chicken Biryani",
      price: 349,
      isVeg: false,
      description: "Spicy and delicious with a mix of chicken and vegetables",
      image: "https://images.unsplash.com/photo-1628840042765-356cda07f4ee?w=400&h=300&fit=crop",
      spiceLevel: "hot",
      preparation: "20-25 mins",
      category: "Indian",
      is_discounted: true,
      discount_amount: "25% off",
      flavor_profile: ["spicy", "savory", "aromatic"]
    }
  ],
  "South Indian": [
    { 
      name: "Masala Dosa",
      price: 149,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["spicy", "crispy", "savory"]
    },
    { 
      name: "Idli Sambhar",
      price: 129,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: true,
      discount_amount: "10% off",
      flavor_profile: ["mild", "tangy", "savory"]
    },
    { 
      name: "Medu Vada",
      price: 99,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["savory", "crispy", "mild"]
    }
  ],
  "Snacks & Street Food": [
    { 
      name: "Samosa",
      price: 30,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: true,
      discount_amount: "30% off",
      flavor_profile: ["spicy", "crispy", "savory"]
    },
    { 
      name: "Pav Bhaji",
      price: 149,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["spicy", "savory", "buttery"]
    },
    { 
      name: "Dahi Puri",
      price: 99,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: true,
      discount_amount: "20% off",
      flavor_profile: ["tangy", "sweet", "savory"]
    },
    { 
      name: "Veg Sandwich",
      price: 99,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "International",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["savory", "fresh", "mild"]
    },
    { 
      name: "Club Sandwich",
      price: 149,
      isVeg: false,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "medium",
      preparation: "15-20 mins",
      category: "International",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["savory", "meaty", "mild"]
    },
    { 
      name: "Cheese Sandwich",
      price: 129,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "medium",
      preparation: "15-20 mins",
      category: "International",
      is_discounted: true,
      discount_amount: "15% off",
      flavor_profile: ["savory", "creamy", "mild"]
    }
  ],
  "Desserts & Beverages": [
    { 
      name: "Chocolate Brownie",
      price: 149,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
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
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
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
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["sweet", "creamy", "mild"]
    },
    { 
      name: "Ice Cream",
      price: 99,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "International",
      is_discounted: true,
      discount_amount: "25% off",
      flavor_profile: ["sweet", "cold", "creamy"]
    },
    { 
      name: "Cold Coffee",
      price: 129,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Beverages",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["sweet", "creamy", "cold"]
    },
    { 
      name: "Soft Drinks",
      price: 59,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Beverages",
      is_discounted: true,
      discount_amount: "10% off",
      flavor_profile: ["sweet", "fizzy", "cold"]
    },
    { 
      name: "Fresh Lime Soda",
      price: 79,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Beverages",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["tangy", "refreshing", "cold"]
    },
    { 
      name: "Lassi",
      price: 89,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Beverages",
      is_discounted: true,
      discount_amount: "15% off",
      flavor_profile: ["creamy", "mild", "sweet"]
    }
  ],
  "Combos & Meals": [
    { 
      name: "Veg Thali",
      price: 299,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["savory", "diverse", "mild"]
    },
    { 
      name: "Non-Veg Thali",
      price: 399,
      isVeg: false,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "medium",
      preparation: "15-20 mins",
      category: "Indian",
      is_discounted: true,
      discount_amount: "20% off",
      flavor_profile: ["spicy", "savory", "meaty"]
    },
    { 
      name: "Biryani Combo",
      price: 449,
      isVeg: false,
      description: "Hearty and delicious with a variety of vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      spiceLevel: "hot",
      preparation: "20-25 mins",
      category: "Indian",
      is_discounted: true,
      discount_amount: "25% off",
      flavor_profile: ["spicy", "aromatic", "savory"]
    }
  ]
};

// Helper functions for AI agents
const getDiscountedItems = () => {
  const discounted = [];
  Object.values(menuItems).forEach(category => {
    category.forEach(item => {
      if (item.is_discounted) {
        discounted.push(item);
      }
    });
  });
  return discounted;
};

const getFullMenu = () => menuItems;

const getItemsByCategory = (category) => {
  const filtered = {};
  Object.entries(menuItems).forEach(([key, items]) => {
    const categoryItems = items.filter(item => item.category === category);
    if (categoryItems.length > 0) {
      filtered[key] = categoryItems;
    }
  });
  return filtered;
};

const getItemByName = (name) => {
  for (const items of Object.values(menuItems)) {
    const found = items.find(item => item.name.toLowerCase() === name.toLowerCase());
    if (found) return found;
  }
  return null;
};

const getPairingSuggestions = (item, excludeItem = null) => {
  const suggestions = [];
  const flavorProfile = item.flavor_profile || [];
  
  // Pairing logic based on flavor profiles
  Object.values(menuItems).forEach(category => {
    category.forEach(potentialPair => {
      if (excludeItem && potentialPair.name === excludeItem.name) return;
      
      let score = 0;
      let reason = "";

      // Spicy items pair well with creamy/sweet
      if (flavorProfile.includes("spicy")) {
        if (potentialPair.flavor_profile.includes("creamy") || potentialPair.flavor_profile.includes("sweet")) {
          score += 2;
          reason = "Creamy beverages balance spicy flavors";
        }
      }

      // Savory items pair with tangy
      if (flavorProfile.includes("savory") && potentialPair.flavor_profile.includes("tangy")) {
        score += 1;
        reason = "Tangy flavors complement savory dishes";
      }

      // Heavy dishes pair with light desserts
      if (flavorProfile.includes("rich") || flavorProfile.includes("meaty")) {
        if (potentialPair.flavor_profile.includes("sweet") && !potentialPair.flavor_profile.includes("creamy")) {
          score += 1;
          reason = "Light sweet desserts refresh after heavy meals";
        }
      }

      if (score > 0) {
        suggestions.push({
          item: potentialPair,
          score,
          reason
        });
      }
    });
  });

  return suggestions.sort((a, b) => b.score - a.score).slice(0, 3);
};

module.exports = {
  menuItems,
  getDiscountedItems,
  getFullMenu,
  getItemsByCategory,
  getItemByName,
  getPairingSuggestions
};
