const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3001;


// Enable CORS (Cross-Origin Resource Sharing) to allow requests from other domains
app.use(cors());

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Import and use the routes defined in 'cliRoute.js'
const cliRoutes = require('./routes/cliRoute');
app.use('/', cliRoutes);


// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});