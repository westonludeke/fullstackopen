import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Weather({ capital }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = () => {
      const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`;

      axios
        .get(apiUrl)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.log('Error fetching weather data:', error);
        });
    };

    fetchWeather();
  }, [capital]);

  if (!weather) {
    return <p>Loading weather data...</p>;
  }

  const convertToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };

  const convertToFahrenheit = (kelvin) => {
    return ((kelvin - 273.15) * 9 / 5 + 32).toFixed(2);
  };

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {convertToCelsius(weather.main.temp)} °C ({convertToFahrenheit(weather.main.temp)} °F)</p>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
}

export default Weather;
