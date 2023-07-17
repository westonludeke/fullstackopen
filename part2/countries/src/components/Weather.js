import React from 'react';

function Weather({ weather, capital }) {
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
