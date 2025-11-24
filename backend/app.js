import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import restaurantRoutes from './routes/restaurantRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import Restaurant from './models/restaurant.cjs';

const app = express();
const port = 3005;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/boltbite', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Use restaurant routes
app.use('/api/restaurants', restaurantRoutes);

// Use search routes
app.use('/api/search', searchRoutes);

// Use recommendation routes
app.use('/api/recommendations', recommendationRoutes);

// Error handling for server
const startServer = () => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying ${port + 1}`);
      port++;
      startServer();
    } else {
      console.error('Server error:', err);
    }
  });
};

startServer();