const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const WEATHERSTACK_API_KEY = '9efe8fdbe634091c240926ea9859728a'; 

// Define a route to fetch weather data
app.get('/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'Please provide a city name' });
    }

    try {
        const response = await axios.get(`http://api.weatherstack.com/current`, {
            params: {
                access_key: WEATHERSTACK_API_KEY,
                query: city
            }
        });

        if (response.data.error) {
            return res.status(400).json({ error: response.data.error.info });
        }

        const weatherData = response.data;
        res.json({
            location: weatherData.location.name,
            temperature: weatherData.current.temperature,
            weather_descriptions: weatherData.current.weather_descriptions[0],
            wind_speed: weatherData.current.wind_speed,
            humidity: weatherData.current.humidity,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
