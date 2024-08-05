const express = require('express');
const axios = require('axios');
var cron = require('node-cron');


const app = express();
const port = 4000;

// Define a route to make the Axios request
const fetch = async () => {
  try {
    const response = await axios.get('https://fmls-scrapper-stra.onrender.com/all');
    console.log("response " ,response)
  } catch (error) {
    console.error('Error in making GET request:', error);
    console.log("Stopped")
  }
  await new Promise((resolve) => setTimeout(resolve, 4000));
  try {
    const response = await axios.get('https://filtered-fmls.onrender.com/all');
    console.log("response " ,response)
  } catch (error) {
    console.error('Error in making GET request:', error);
    console.log("Stopped")
  }
}



cron.schedule('0 22 * * *', () => {
  fetch();
});




// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});