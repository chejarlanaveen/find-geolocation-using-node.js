const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Public IP address and API key for geolocation
const ipAddress = '142.255.70.110'; // Replace with the IP address to geolocate
const apiKey = 'aaf848aaab11147b98d0942a9ed4eaaa'; // Replace with your IPstack API key

// Route to get geolocation data
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

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


