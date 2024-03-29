const express = require('express');
const axios = require('axios');

const app = express();
const port = 4000;

// Define a route to make the Axios request
app.get('/', async (req, res) => {
  try {
    // Make Axios request
    console.log("Inside GET")
    const response = await axios.get('https://fmls-scrapper.onrender.com');
    console.log("After Axios GET")
    // Send response back to client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});