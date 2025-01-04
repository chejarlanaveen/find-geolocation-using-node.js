const express = require('express');
const axios = require('axios');
const path = require('path');
const serverless =require('serverless-http');

const app = express();
const port = 3006;

// Public IP address and API key for geolocation
const ipAddress = '142.250.70.36'; // Replace with the IP address to geolocate
const apiKey = 'aaf848aaab11147b98d0942a9ed4eaaa'; // Replace with your IPstack API key

// Serve static HTML file
app.use(express.static(path.join(__dirname, 'public')));

// API route to get geolocation data
app.get('/get-location', async (req, res) => {
  try {
    const response = await axios.get(`http://api.ipstack.com/${ipAddress}?access_key=${apiKey}`);
    const location = response.data;

    if (location.city) {
      res.json({
        success: true,
        city: location.city,
        region: location.region_name,
        country: location.country_name,
      });
    } else {
      res.json({ success: false, message: 'Location data not available' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching geolocation', error: error.message });
  }
});
if(NODE_ENV=='development'){
// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
}
else{
  module.exports=serverless(app);
