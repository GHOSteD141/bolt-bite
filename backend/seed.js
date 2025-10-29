const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const csv = require('csv-parser');
const fs = require('fs');
const Restaurant = require('./models/restaurant.cjs');
const path = require('path');
const menuItems = require('./data/menu');

const dbURI = 'mongodb://localhost:27017/boltbite';
// Update CSV file path to use the local data directory
const csvFilePath = path.join(__dirname, 'data', 'restaurants.csv');

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB...');
    console.log('Starting to seed database...');
    seedDatabase();
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });

async function seedDatabase() {
  try {
    console.log('Reading CSV file from:', csvFilePath);
    await Restaurant.deleteMany({});
    console.log('Existing data cleared...');

    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        const restaurantData = results.map(row => ({
          restaurantId: parseInt(row.RestaurantID),
          name: row.RestaurantName,
          cuisines: row.Cuisines,
          averageCostForTwo: parseInt(row.AverageCostForTwo),
          currency: row.Currency,
          hasTableBooking: row.HasTableBooking === 'Yes',
          hasOnlineDelivery: row.HasOnlineDelivery === 'Yes',
          aggregateRating: parseFloat(row.AggregateRating),
          ratingText: row.RatingText,
          votes: parseInt(row.Votes),
          popularDishes: row.PopularDishes ? row.PopularDishes.split(',').map(dish => dish.trim()) : [],
          menu: Object.entries(menuItems).flatMap(([category, items]) => 
            items.map(item => ({
              ...item,
              category,
              description: `Delicious ${item.name}`,
              image: `${item.name.toLowerCase().replace(/ /g, '-')}.jpg`
            }))
          )
        }));

        await Restaurant.insertMany(restaurantData);
        console.log(`Successfully inserted ${restaurantData.length} restaurants with menus!`);
        mongoose.connection.close();
      })
      .on('error', (error) => {
        console.error('Error reading CSV:', error);
        mongoose.connection.close();
        process.exit(1);
      });
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}
