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
