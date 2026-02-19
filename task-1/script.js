async function getWeather() {
    const city = document.getElementById("city").value;
    const result = document.getElementById("weather-result");

    if (city === "") {
        result.innerHTML = "⚠️ Please enter a city name";
        return;
    }

    try {
        // Fetch latitude & longitude using Open-Meteo Geocoding API
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
        );
        const geoData = await geoResponse.json();

        if (!geoData.results) {
            result.innerHTML = "❌ City not found";
            return;
        }

        const { latitude, longitude } = geoData.results[0];

        // Fetch weather data
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const weatherData = await weatherResponse.json();

        const temp = weatherData.current_weather.temperature;
        const wind = weatherData.current_weather.windspeed;

        result.innerHTML = `
            <h3>📍 ${city}</h3>
            <p>🌡 Temperature: ${temp} °C</p>
            <p>💨 Wind Speed: ${wind} km/h</p>
        `;
    } catch (error) {
        result.innerHTML = "⚠️ Error fetching data";
    }
}
