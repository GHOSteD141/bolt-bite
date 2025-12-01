const menuItems = {
  "Pizzas & Burgers": [
    { 
      name: "Margherita Pizza",
      price: 299,
      isVeg: true,
      description: "Classic delight with 100% real mozzarella cheese",
      image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64e59?w=400&h=300&fit=crop&q=80",
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
      description: "Loaded with fresh vegetables",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop&q=80",
      spiceLevel: "medium",
      preparation: "25-30 mins",
      category: "Italian",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["savory", "fresh", "creamy"]
    },
    { 
      name: "Chicken Pepperoni Pizza",
      price: 449,
      isVeg: false,
      description: "Spicy pepperoni with chicken",
      image: "https://images.unsplash.com/photo-1593560708920-e50d94e84a47?w=400&h=300&fit=crop&q=80",
      spiceLevel: "hot",
      preparation: "25-30 mins",
      category: "Italian",
      is_discounted: true,
      discount_amount: "15% off",
      flavor_profile: ["spicy", "savory", "meaty"]
    },
    { 
      name: "BBQ Chicken Pizza",
      price: 449,
      isVeg: false,
      description: "Grilled chicken with BBQ sauce",
      image: "https://images.unsplash.com/photo-1571379934382-3cc361f3a3fe?w=400&h=300&fit=crop&q=80",
      spiceLevel: "medium",
      preparation: "25-30 mins",
      category: "Italian",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["spicy", "tangy", "smoky"]
    },
    { 
      name: "Classic Veg Burger",
      price: 149,
      isVeg: true,
      description: "Fresh veggies between soft buns",
      image: "https://images.unsplash.com/photo-1511689915169-a64c46b674d0?w=400&h=300&fit=crop&q=80",
      spiceLevel: "mild",
      preparation: "15-20 mins",
      category: "American",
      is_discounted: true,
      discount_amount: "25% off",
      flavor_profile: ["savory", "fresh", "mild"]
    },
    { 
      name: "Cheese Burst Burger",
      price: 199,
      isVeg: true,
      description: "Melted cheese oozing from center",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&q=80",
      spiceLevel: "medium",
      preparation: "15-20 mins",
      category: "American",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["savory", "creamy", "mild"]
    },
    { 
      name: "Chicken Crispy Burger",
      price: 249,
      isVeg: false,
      description: "Golden crispy fried chicken patty",
      image: "https://images.unsplash.com/photo-1562547256-c5aff167aeb7?w=400&h=300&fit=crop&q=80",
      spiceLevel: "medium",
      preparation: "15-20 mins",
      category: "American",
      is_discounted: true,
      discount_amount: "20% off",
      flavor_profile: ["spicy", "savory", "crispy"]
    },
    { 
      name: "Double Patty Burger",
      price: 299,
      isVeg: false,
      description: "Two juicy meat patties stacked",
      image: "https://images.unsplash.com/photo-1550547990-ee5243f8f7f6?w=400&h=300&fit=crop&q=80",
      spiceLevel: "hot",
      preparation: "20-25 mins",
      category: "American",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["savory", "meaty", "rich"]
    }
  ],
  "Chinese & Fast Food": [
    { 
      name: "Veg Fried Rice",
      price: 199,
      isVeg: true,
      description: "Stir-fried rice with vegetables",
      image: "https://images.unsplash.com/photo-1585521922687-a82d0d4f2d65?w=400&h=300&fit=crop&q=80",
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
      description: "Rice with tender chicken pieces",
      image: "https://images.unsplash.com/photo-1603894687169-bee6087b3503?w=400&h=300&fit=crop&q=80",
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
      description: "Crispy paneer in spicy sauce",
      image: "https://images.unsplash.com/photo-1476124369162-f4978d03adc1?w=400&h=300&fit=crop&q=80",
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
      description: "Tender chicken in fiery chilli sauce",
      image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop&q=80",
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
      description: "Steamed dumplings with veggies",
      image: "https://images.unsplash.com/photo-1606787620375-e629d829c91d?w=400&h=300&fit=crop&q=80",
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
      description: "Chicken-filled steamed momos",
      image: "https://images.unsplash.com/photo-1606787620375-e629d829c91d?w=400&h=300&fit=crop&q=80",
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
      description: "Tender chicken in creamy tomato gravy",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop&q=80",
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
      description: "Soft paneer in buttery sauce",
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop&q=80",
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
      description: "Creamy lentil curry",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&q=80",
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
      description: "Fluffy fried bread with chickpea curry",
      image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop&q=80",
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
      description: "Kidney beans with steamed rice",
      image: "https://images.unsplash.com/photo-1609501676725-8b3cfdf89ce8?w=400&h=300&fit=crop&q=80",
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
      description: "Fragrant rice with spiced chicken",
      image: "https://images.unsplash.com/photo-1587080353052-da9c5a9db90a?w=400&h=300&fit=crop&q=80",
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
      description: "Crispy crepe with spiced potato",
      image: "https://images.unsplash.com/photo-1589301760014-eda862345ba9?w=400&h=300&fit=crop&q=80",
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
      description: "Steamed rice cake with lentil stew",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&q=80",
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
      description: "Crispy lentil donuts",
      image: "https://images.unsplash.com/photo-1627809149241-e68ff02dc34e?w=400&h=300&fit=crop&q=80",
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
      description: "Triangular fried pastry with potato filling",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&q=80",
      spiceLevel: "mild",
      preparation: "10 mins",
      category: "Indian",
      is_discounted: true,
      discount_amount: "30% off",
      flavor_profile: ["spicy", "crispy", "savory"]
    },
    { 
      name: "Pav Bhaji",
      price: 149,
      isVeg: true,
      description: "Spiced vegetable curry with bread",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&q=80",
      spiceLevel: "hot",
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
      description: "Crispy shells with yogurt and sauce",
      image: "https://images.unsplash.com/photo-1605787020362-e34b90b8f6e4?w=400&h=300&fit=crop&q=80",
      spiceLevel: "mild",
      preparation: "10 mins",
      category: "Indian",
      is_discounted: true,
      discount_amount: "20% off",
      flavor_profile: ["tangy", "sweet", "savory"]
    },
    { 
      name: "Veg Sandwich",
      price: 99,
      isVeg: true,
      description: "Fresh veggies between bread slices",
      image: "https://images.unsplash.com/photo-1585238341710-4b4e6cecc068?w=400&h=300&fit=crop&q=80",
      spiceLevel: "mild",
      preparation: "10 mins",
      category: "International",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["savory", "fresh", "mild"]
    },
    { 
      name: "Club Sandwich",
      price: 149,
      isVeg: false,
      description: "Triple-layer sandwich with chicken",
      image: "https://images.unsplash.com/photo-1559052586-c4e16f339b44?w=400&h=300&fit=crop&q=80",
      spiceLevel: "medium",
      preparation: "10 mins",
      category: "International",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["savory", "meaty", "mild"]
    },
    { 
      name: "Cheese Sandwich",
      price: 129,
      isVeg: true,
      description: "Melted cheese between toasted bread",
      image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&h=300&fit=crop&q=80",
      spiceLevel: "mild",
      preparation: "10 mins",
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
      description: "Rich fudgy chocolate cake",
      image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop&q=80",
      spiceLevel: "mild",
      preparation: "5 mins",
      category: "Desserts",
      is_discounted: true,
      discount_amount: "25% off",
      flavor_profile: ["sweet", "chocolatey", "rich"]
    },
    { 
      name: "Gulab Jamun",
      price: 99,
      isVeg: true,
      description: "Soft milk solids in sugar syrup",
      image: "https://images.unsplash.com/photo-1585621341507-41fc292bc485?w=400&h=300&fit=crop&q=80",
      spiceLevel: "mild",
      preparation: "5 mins",
      category: "Desserts",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["sweet", "creamy", "syrupy"]
    },
    { 
      name: "Rasmalai",
      price: 129,
      isVeg: true,
      description: "Soft cheese in sweetened cream",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a860?w=400&h=300&fit=crop&q=80",
      spiceLevel: "mild",
      preparation: "5 mins",
      category: "Desserts",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["sweet", "creamy", "mild"]
    },
    { 
      name: "Ice Cream",
      price: 99,
      isVeg: true,
      description: "Cold creamy frozen dessert",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e157?w=400&h=300&fit=crop&q=80",
      spiceLevel: "mild",
      preparation: "2 mins",
      category: "Desserts",
      is_discounted: true,
      discount_amount: "25% off",
      flavor_profile: ["sweet", "cold", "creamy"]
    },
    { 
      name: "Cold Coffee",
      price: 129,
      isVeg: true,
      description: "Chilled coffee with cream",
      image: "https://images.unsplash.com/photo-1517701550927-30cf4ba20d7d?w=400&h=300&fit=crop&q=80",
      spiceLevel: "mild",
      preparation: "5 mins",
      category: "Beverages",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["sweet", "creamy", "cold"]
    },
    { 
      name: "Soft Drinks",
      price: 59,
      isVeg: true,
      description: "Refreshing carbonated beverage",
      image: "https://images.unsplash.com/photo-1527082395-e0e8c1d4c0e8?w=400&h=300&fit=crop&q=80",
      spiceLevel: "mild",
      preparation: "1 min",
      category: "Beverages",
      is_discounted: true,
      discount_amount: "10% off",
      flavor_profile: ["sweet", "fizzy", "cold"]
    },
    { 
      name: "Fresh Lime Soda",
      price: 79,
      isVeg: true,
      description: "Tangy lime with soda water",
      image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=300&fit=crop&q=80",
      spiceLevel: "mild",
      preparation: "3 mins",
      category: "Beverages",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["tangy", "refreshing", "cold"]
    },
    { 
      name: "Lassi",
      price: 89,
      isVeg: true,
      description: "Traditional yogurt-based drink",
      image: "https://images.unsplash.com/photo-1599599810735-91b5e2c52e15?w=400&h=300&fit=crop&q=80",
      spiceLevel: "mild",
      preparation: "2 mins",
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
      description: "Complete vegetarian meal combo",
      image: "https://images.unsplash.com/photo-1589521471024-8015e670e6c0?w=400&h=300&fit=crop&q=80",
      spiceLevel: "mild",
      preparation: "25 mins",
      category: "Indian",
      is_discounted: false,
      discount_amount: null,
      flavor_profile: ["savory", "diverse", "mild"]
    },
    { 
      name: "Non-Veg Thali",
      price: 399,
      isVeg: false,
      description: "Complete non-veg meal combo",
      image: "https://images.unsplash.com/photo-1585937421945-7d632c40b91a?w=400&h=300&fit=crop&q=80",
      spiceLevel: "medium",
      preparation: "25 mins",
      category: "Indian",
      is_discounted: true,
      discount_amount: "20% off",
      flavor_profile: ["spicy", "savory", "meaty"]
    },
    { 
      name: "Biryani Combo",
      price: 449,
      isVeg: false,
      description: "Fragrant biryani with raita & salad",
      image: "https://images.unsplash.com/photo-1587080353052-da9c5a9db90a?w=400&h=300&fit=crop&q=80",
      spiceLevel: "hot",
      preparation: "30 mins",
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
