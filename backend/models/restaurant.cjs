const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  isVeg: Boolean,
  image: String
});

const restaurantSchema = new mongoose.Schema({
  restaurantId: Number,
  name: String,
  countryCode: Number,
  city: String,
  locality: String,
  address: String,
  cuisines: String,
  currency: String,
  hasTableBooking: Boolean,
  hasOnlineDelivery: Boolean,
  priceRange: Number,
  aggregateRating: Number,
  ratingColor: String,
  ratingText: String,
  votes: Number,
  menu: [menuItemSchema]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);