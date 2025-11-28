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
      image: "farmhouse-pizza.jpg",
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
      description: "Spicy and cheesy with a mix of chicken and pepperoni",
      image: "chicken-pepperoni-pizza.jpg",
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
      description: "Grilled chicken with BBQ sauce and vegetables",
      image: "bbq-chicken-pizza.jpg",
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
      description: "Simple and delicious with a variety of vegetables",
      image: "classic-veg-burger.jpg",
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
      description: "Cheese burst with a variety of vegetables",
      image: "cheese-burst-burger.jpg",
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
      description: "Crispy and delicious with a mix of chicken and vegetables",
      image: "chicken-crispy-burger.jpg",
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
      description: "Double patty with a variety of vegetables",
      image: "double-patty-burger.jpg",
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
      description: "Hearty and delicious with a variety of vegetables",
      image: "veg-fried-rice.jpg",
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
      image: "chicken-fried-rice.jpg",
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
      image: "chilli-paneer.jpg",
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
      image: "chilli-chicken.jpg",
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
      image: "veg-momos.jpg",
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
      image: "chicken-momos.jpg",
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
      image: "butter-chicken.jpg",
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
      image: "paneer-butter-masala.jpg",
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
      image: "dal-makhani.jpg",
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
      image: "chole-bhature.jpg",
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
      image: "rajma-chawal.jpg",
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
      image: "chicken-biryani.jpg",
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
      image: "masala-dosa.jpg",
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
      image: "idli-sambhar.jpg",
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
      image: "medu-vada.jpg",
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
      image: "samosa.jpg",
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
      image: "pav-bhaji.jpg",
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
      image: "dahi-puri.jpg",
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
      image: "veg-sandwich.jpg",
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
      image: "club-sandwich.jpg",
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
      image: "cheese-sandwich.jpg",
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
      image: "chocolate-brownie.jpg",
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
      image: "gulab-jamun.jpg",
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
      image: "rasmalai.jpg",
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
      image: "ice-cream.jpg",
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
      image: "cold-coffee.jpg",
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
      image: "soft-drinks.jpg",
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
      image: "fresh-lime-soda.jpg",
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
      image: "lassi.jpg",
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
      image: "veg-thali.jpg",
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
      image: "non-veg-thali.jpg",
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
      image: "biryani-combo.jpg",
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
