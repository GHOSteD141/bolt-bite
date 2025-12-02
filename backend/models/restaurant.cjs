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
  restaurantId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  cuisines: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: 'https://source.unsplash.com/600x400/?food,restaurant'
  },
  averageCostForTwo: {
    type: Number,
    default: 0
  },
  currency: {
    type: String,
    default: 'INR'
  },
  hasTableBooking: {
    type: Boolean,
    default: false
  },
  hasOnlineDelivery: {
    type: Boolean,
    default: true
  },
  aggregateRating: {
    type: Number,
    default: 0
  },
  ratingText: {
    type: String,
    default: 'New'
  },
  votes: {
    type: Number,
    default: 0
  },
  menu: {
    type: Array,
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);