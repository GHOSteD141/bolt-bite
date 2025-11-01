const menuItems = {
  "Pizzas & Burgers": [
    { 
      name: "Margherita Pizza",
      price: 299,
      isVeg: true,
      description: "Classic delight with 100% real mozzarella cheese",
      image: "margherita-pizza.jpg",
      spiceLevel: "mild",
      preparation: "20-25 mins"
    },
    { 
      name: "Farmhouse Pizza",
      price: 399,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "farmhouse-pizza.jpg",
      spiceLevel: "medium",
      preparation: "25-30 mins"
    },
    { 
      name: "Chicken Pepperoni Pizza",
      price: 449,
      isVeg: false,
      description: "Spicy and cheesy with a mix of chicken and pepperoni",
      image: "chicken-pepperoni-pizza.jpg",
      spiceLevel: "hot",
      preparation: "25-30 mins"
    },
    { 
      name: "BBQ Chicken Pizza",
      price: 449,
      isVeg: false,
      description: "Grilled chicken with BBQ sauce and vegetables",
      image: "bbq-chicken-pizza.jpg",
      spiceLevel: "medium",
      preparation: "25-30 mins"
    },
    { 
      name: "Classic Veg Burger",
      price: 149,
      isVeg: true,
      description: "Simple and delicious with a variety of vegetables",
      image: "classic-veg-burger.jpg",
      spiceLevel: "mild",
      preparation: "15-20 mins"
    },
    { 
      name: "Cheese Burst Burger",
      price: 199,
      isVeg: true,
      description: "Cheese burst with a variety of vegetables",
      image: "cheese-burst-burger.jpg",
      spiceLevel: "medium",
      preparation: "15-20 mins"
    },
    { 
      name: "Chicken Crispy Burger",
      price: 249,
      isVeg: false,
      description: "Crispy and delicious with a mix of chicken and vegetables",
      image: "chicken-crispy-burger.jpg",
      spiceLevel: "medium",
      preparation: "15-20 mins"
    },
    { 
      name: "Double Patty Burger",
      price: 299,
      isVeg: false,
      description: "Double patty with a variety of vegetables",
      image: "double-patty-burger.jpg",
      spiceLevel: "hot",
      preparation: "20-25 mins"
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
      preparation: "15-20 mins"
    },
    { 
      name: "Chicken Fried Rice",
      price: 249,
      isVeg: false,
      description: "Grilled chicken with a variety of vegetables",
      image: "chicken-fried-rice.jpg",
      spiceLevel: "medium",
      preparation: "15-20 mins"
    },
    { 
      name: "Chilli Paneer",
      price: 249,
      isVeg: true,
      description: "Spicy and delicious with a mix of paneer and vegetables",
      image: "chilli-paneer.jpg",
      spiceLevel: "hot",
      preparation: "20-25 mins"
    },
    { 
      name: "Chilli Chicken",
      price: 299,
      isVeg: false,
      description: "Spicy and delicious with a mix of chicken and vegetables",
      image: "chilli-chicken.jpg",
      spiceLevel: "hot",
      preparation: "20-25 mins"
    },
    { 
      name: "Veg Momos",
      price: 149,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "veg-momos.jpg",
      spiceLevel: "mild",
      preparation: "15-20 mins"
    },
    { 
      name: "Chicken Momos",
      price: 199,
      isVeg: false,
      description: "Grilled chicken with a variety of vegetables",
      image: "chicken-momos.jpg",
      spiceLevel: "medium",
      preparation: "15-20 mins"
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
      preparation: "20-25 mins"
    },
    { 
      name: "Paneer Butter Masala",
      price: 299,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "paneer-butter-masala.jpg",
      spiceLevel: "medium",
      preparation: "20-25 mins"
    },
    { 
      name: "Dal Makhani",
      price: 249,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "dal-makhani.jpg",
      spiceLevel: "mild",
      preparation: "15-20 mins"
    },
    { 
      name: "Chole Bhature",
      price: 199,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "chole-bhature.jpg",
      spiceLevel: "medium",
      preparation: "15-20 mins"
    },
    { 
      name: "Rajma Chawal",
      price: 199,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "rajma-chawal.jpg",
      spiceLevel: "mild",
      preparation: "15-20 mins"
    },
    { 
      name: "Chicken Biryani",
      price: 349,
      isVeg: false,
      description: "Spicy and delicious with a mix of chicken and vegetables",
      image: "chicken-biryani.jpg",
      spiceLevel: "hot",
      preparation: "20-25 mins"
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
      preparation: "15-20 mins"
    },
    { 
      name: "Idli Sambhar",
      price: 129,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "idli-sambhar.jpg",
      spiceLevel: "mild",
      preparation: "15-20 mins"
    },
    { 
      name: "Medu Vada",
      price: 99,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "medu-vada.jpg",
      spiceLevel: "mild",
      preparation: "15-20 mins"
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
      preparation: "15-20 mins"
    },
    { 
      name: "Pav Bhaji",
      price: 149,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "pav-bhaji.jpg",
      spiceLevel: "mild",
      preparation: "15-20 mins"
    },
    { 
      name: "Dahi Puri",
      price: 99,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "dahi-puri.jpg",
      spiceLevel: "mild",
      preparation: "15-20 mins"
    },
    { 
      name: "Veg Sandwich",
      price: 99,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "veg-sandwich.jpg",
      spiceLevel: "mild",
      preparation: "15-20 mins"
    },
    { 
      name: "Club Sandwich",
      price: 149,
      isVeg: false,
      description: "Hearty and delicious with a variety of vegetables",
      image: "club-sandwich.jpg",
      spiceLevel: "medium",
      preparation: "15-20 mins"
    },
    { 
      name: "Cheese Sandwich",
      price: 129,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "cheese-sandwich.jpg",
      spiceLevel: "medium",
      preparation: "15-20 mins"
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
      preparation: "15-20 mins"
    },
    { 
      name: "Gulab Jamun",
      price: 99,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "gulab-jamun.jpg",
      spiceLevel: "mild",
      preparation: "15-20 mins"
    },
    { 
      name: "Rasmalai",
      price: 129,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "rasmalai.jpg",
      spiceLevel: "mild",
      preparation: "15-20 mins"
    },
    { 
      name: "Ice Cream",
      price: 99,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "ice-cream.jpg",
      spiceLevel: "mild",
      preparation: "15-20 mins"
    },
    { 
      name: "Cold Coffee",
      price: 129,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "cold-coffee.jpg",
      spiceLevel: "mild",
      preparation: "15-20 mins"
    },
    { 
      name: "Soft Drinks",
      price: 59,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "soft-drinks.jpg",
      spiceLevel: "mild",
      preparation: "15-20 mins"
    },
    { 
      name: "Fresh Lime Soda",
      price: 79,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "fresh-lime-soda.jpg",
      spiceLevel: "mild",
      preparation: "15-20 mins"
    },
    { 
      name: "Lassi",
      price: 89,
      isVeg: true,
      description: "Hearty and delicious with a variety of vegetables",
      image: "lassi.jpg",
      spiceLevel: "mild",
      preparation: "15-20 mins"
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
      preparation: "15-20 mins"
    },
    { 
      name: "Non-Veg Thali",
      price: 399,
      isVeg: false,
      description: "Hearty and delicious with a variety of vegetables",
      image: "non-veg-thali.jpg",
      spiceLevel: "medium",
      preparation: "15-20 mins"
    },
    { 
      name: "Biryani Combo",
      price: 449,
      isVeg: false,
      description: "Hearty and delicious with a variety of vegetables",
      image: "biryani-combo.jpg",
      spiceLevel: "hot",
      preparation: "20-25 mins"
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

module.exports = {
  menuItems,
  getVegItems,
  getItemsByPriceRange
};
