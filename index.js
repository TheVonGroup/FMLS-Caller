const express = require('express');
const axios = require('axios');

const app = express();
const port = 4000;

// Define a route to make the Axios request
app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://fmls-scrapper-stra.onrender.com');
    res.json(response.data);
  } catch (error) {
    console.error('Error in making GET request:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});