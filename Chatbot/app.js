// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');
const dbConnection = require('./config/dbConnection');
const cors = require('cors'); // Import cors module

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Initialize the express application
const app = express();

// Connect to MongoDB
dbConnection();

// Use cors middleware to handle CORS errors
app.use(cors()); // Allow all origins by default

// Use bodyParser middleware to parse JSON bodies
app.use(bodyParser.json());

// Import routers
const chatRouter = require('./routers/chatRouters');
const businessRouter = require('./routers/businessEmbeddingRouters');
const productRouter = require('./routers/productEmbeddingRouters');
const serviceRouter = require('./routers/serviceEmbeddingRouters');
const embeddingRouter = require('./routers/embeddingRouter');

const script = require('./scripts/createEmbeddings');

// Use routers
app.use('/chat', chatRouter);
app.use('/business', businessRouter);
app.use('/product', productRouter);
app.use('/service', serviceRouter);
app.use('/search', embeddingRouter);

// Default route for testing the server
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Handle not found (404)
app.use((req, res, next) => {
  res.status(404).send('Sorry, that route does not exist.');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Set the port for the server to listen on
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
