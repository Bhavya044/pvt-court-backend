const express = require('express');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');


// Create Express app
const app = express();

// Connect to MongoDB
connectDB();
const cors = require('cors');
app.use(cors());


// Middleware
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
