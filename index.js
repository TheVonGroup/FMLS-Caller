const express = require('express');
const axios = require('axios');
var cron = require('node-cron');


const app = express();
const port = 4000;

function getCurrentEST() {
    const now = new Date();
    return new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
}

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



cron.schedule("0 * * * *", async () => {
    const now = getCurrentEST();
    const currentHour = now.getHours(); // Gets hour in EST

    if (currentHour === 6) {
        console.log(`Running fetch at EST hour: ${currentHour}`);
        await fetch();
    } else {
        console.log(`Skipping fetch at EST hour: ${currentHour}`);
    }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
