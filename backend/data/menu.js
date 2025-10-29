const menuItems = {
  "Pizzas & Burgers": [
    { name: "Margherita Pizza", price: 299, isVeg: true },
    { name: "Farmhouse Pizza", price: 399, isVeg: true },
    { name: "Chicken Pepperoni Pizza", price: 449, isVeg: false },
    { name: "BBQ Chicken Pizza", price: 449, isVeg: false },
    { name: "Classic Veg Burger", price: 149, isVeg: true },
    { name: "Cheese Burst Burger", price: 199, isVeg: true },
    { name: "Chicken Crispy Burger", price: 249, isVeg: false },
    { name: "Double Patty Burger", price: 299, isVeg: false }
  ],
  "Chinese & Fast Food": [
    { name: "Veg Fried Rice", price: 199, isVeg: true },
    { name: "Chicken Fried Rice", price: 249, isVeg: false },
    { name: "Chilli Paneer", price: 249, isVeg: true },
    { name: "Chilli Chicken", price: 299, isVeg: false },
    { name: "Veg Momos", price: 149, isVeg: true },
    { name: "Chicken Momos", price: 199, isVeg: false }
  ],
  "North Indian": [
    { name: "Butter Chicken", price: 349, isVeg: false },
    { name: "Paneer Butter Masala", price: 299, isVeg: true },
    { name: "Dal Makhani", price: 249, isVeg: true },
    { name: "Chole Bhature", price: 199, isVeg: true },
    { name: "Rajma Chawal", price: 199, isVeg: true },
    { name: "Chicken Biryani", price: 349, isVeg: false }
  ],
  "South Indian": [
    { name: "Masala Dosa", price: 149, isVeg: true },
    { name: "Idli Sambhar", price: 129, isVeg: true },
    { name: "Medu Vada", price: 99, isVeg: true }
  ],
  "Snacks & Street Food": [
    { name: "Samosa", price: 30, isVeg: true },
    { name: "Pav Bhaji", price: 149, isVeg: true },
    { name: "Dahi Puri", price: 99, isVeg: true },
    { name: "Veg Sandwich", price: 99, isVeg: true },
    { name: "Club Sandwich", price: 149, isVeg: false },
    { name: "Cheese Sandwich", price: 129, isVeg: true }
  ],
  "Desserts & Beverages": [
    { name: "Chocolate Brownie", price: 149, isVeg: true },
    { name: "Gulab Jamun", price: 99, isVeg: true },
    { name: "Rasmalai", price: 129, isVeg: true },
    { name: "Ice Cream", price: 99, isVeg: true },
    { name: "Cold Coffee", price: 129, isVeg: true },
    { name: "Soft Drinks", price: 59, isVeg: true },
    { name: "Fresh Lime Soda", price: 79, isVeg: true },
    { name: "Lassi", price: 89, isVeg: true }
  ],
  "Combos & Meals": [
    { name: "Veg Thali", price: 299, isVeg: true },
    { name: "Non-Veg Thali", price: 399, isVeg: false },
    { name: "Biryani Combo", price: 449, isVeg: false }
  ]
};

module.exports = menuItems;
