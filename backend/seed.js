const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Restaurant = require('./models/restaurant.cjs');
const { menuItems } = require('./data/menu');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1:27017/boltbite', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4
})
.then(() => {
  console.log('Connected to MongoDB...');
  seedDatabase();
})
.catch(err => console.error('MongoDB connection error:', err));

async function seedDatabase() {
  try {
    // Clear existing data
    await Restaurant.deleteMany({});
    console.log('Cleared existing restaurants');

    const restaurants = [];
    
    // Read CSV and create restaurants
    fs.createReadStream(__dirname + '/data/restaurants.csv')
      .pipe(csv())
      .on('data', (row) => {
        const menuCategory = row.Cuisines.split(',')[0].trim();
        let restaurantMenu = menuItems[menuCategory] || menuItems["Pizzas & Burgers"];
        
        // Pizza Paradise gets only Pizzas & Burgers
        if (row.RestaurantID == 1) {
          restaurantMenu = menuItems["Pizzas & Burgers"];
        }
        
        restaurants.push({
          restaurantId: parseInt(row.RestaurantID),
          name: row.RestaurantName,
          cuisines: row.Cuisines,
          imageUrl: row.ImageURL,
          averageCostForTwo: parseInt(row.AverageCostForTwo),
          currency: row.Currency,
          hasTableBooking: row.HasTableBooking === 'Yes',
          hasOnlineDelivery: row.HasOnlineDelivery === 'Yes',
          aggregateRating: parseFloat(row.AggregateRating),
          ratingText: row.RatingText,
          votes: parseInt(row.Votes),
          menu: restaurantMenu
        });
      })
      .on('end', async () => {
        try {
          await Restaurant.insertMany(restaurants);
          console.log(`✅ Successfully seeded ${restaurants.length} restaurants with images!`);
          mongoose.connection.close();
        } catch (err) {
          console.error('Error inserting restaurants:', err);
          mongoose.connection.close();
        }
      })
      .on('error', (err) => {
        console.error('CSV parse error:', err);
        mongoose.connection.close();
      });
  } catch (err) {
    console.error('Seed error:', err);
    mongoose.connection.close();
  }
}

// Pizza Paradise - Only Pizzas & Burgers
const pizzaParadise = new Restaurant({
  restaurantId: 1,
  name: "Pizza Paradise",
  cuisines: "Italian, American",
  imageUrl: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&h=400&fit=crop",
  averageCostForTwo: 10,
  currency: "USD",
  hasTableBooking: true,
  hasOnlineDelivery: true,
  aggregateRating: 4.5,
  ratingText: "Excellent",
  votes: 100,
  menu: menuItems["Pizzas & Burgers"]
});

// Dragon House - Chinese & Fast Food
const dragonHouse = new Restaurant({
  restaurantId: 2,
  name: "Dragon House",
  cuisines: "Chinese, Asian",
  imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a860?w=600&h=400&fit=crop",
  averageCostForTwo: 15,
  currency: "USD",
  hasTableBooking: true,
  hasOnlineDelivery: true,
  aggregateRating: 4.3,
  ratingText: "Good",
  votes: 80,
  menu: menuItems["Chinese & Fast Food"]
});

// North Indian Delight - North Indian
const northIndian = new Restaurant({
  restaurantId: 3,
  name: "North Indian Delight",
  cuisines: "Indian, North Indian",
  imageUrl: "https://images.unsplash.com/photo-1585937421945-7d632c40b91a?w=600&h=400&fit=crop",
  averageCostForTwo: 12,
  currency: "USD",
  hasTableBooking: true,
  hasOnlineDelivery: true,
  aggregateRating: 4.4,
  ratingText: "Great",
  votes: 90,
  menu: menuItems["North Indian"]
});

// South Indian Express - South Indian
const southIndian = new Restaurant({
  restaurantId: 4,
  name: "South Indian Express",
  cuisines: "Indian, South Indian",
  imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop",
  averageCostForTwo: 14,
  currency: "USD",
  hasTableBooking: true,
  hasOnlineDelivery: true,
  aggregateRating: 4.2,
  ratingText: "Very Good",
  votes: 70,
  menu: menuItems["South Indian"]
});

// Street Food Heaven - Snacks & Street Food
const streetFood = new Restaurant({
  restaurantId: 5,
  name: "Street Food Heaven",
  cuisines: "Street Food, Indian",
  imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
  averageCostForTwo: 8,
  currency: "USD",
  hasTableBooking: true,
  hasOnlineDelivery: true,
  aggregateRating: 4.1,
  ratingText: "Good",
  votes: 60,
  menu: menuItems["Snacks & Street Food"]
});

// Sweet Delights - Desserts & Beverages
const sweetDelights = new Restaurant({
  restaurantId: 6,
  name: "Sweet Delights",
  cuisines: "Desserts, Beverages",
  imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&h=400&fit=crop",
  averageCostForTwo: 6,
  currency: "USD",
  hasTableBooking: true,
  hasOnlineDelivery: true,
  aggregateRating: 4.0,
  ratingText: "Good",
  votes: 50,
  menu: menuItems["Desserts & Beverages"]
});

// Thali House - Combos & Meals
const thaliHouse = new Restaurant({
  restaurantId: 7,
  name: "Thali House",
  cuisines: "Combos & Meals",
  imageUrl: "https://images.unsplash.com/photo-1585937421945-7d632c40b91a?w=600&h=400&fit=crop",
  averageCostForTwo: 10,
  currency: "USD",
  hasTableBooking: true,
  hasOnlineDelivery: true,
  aggregateRating: 4.0,
  ratingText: "Good",
  votes: 40,
  menu: menuItems["Combos & Meals"]
});

console.log('Finished seeding...');
