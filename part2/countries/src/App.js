import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './index.css';
import CountryDetails from './components/CountryDetails';
import useCountry from './hooks/useCountry';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const { filteredCountries, selectedCountry, setSelectedCountry } = useCountry(searchQuery);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setSelectedCountry(null); // Reset the selectedCountry when performing a new search
  };

  const handleShowButtonClick = (country) => {
    setSelectedCountry(country);
  };

  const fetchWeather = useCallback(() => {
    if (selectedCountry && selectedCountry.capitalInfo) {
      const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
      const { latlng } = selectedCountry.capitalInfo;
      const lat = latlng[0];
      const lon = latlng[1];
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      axios
        .get(apiUrl)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.log('Error fetching weather data:', error);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return (
    <div className="App">
      <h1>Countries App</h1>
      <div>
        <span>find countries: </span>
        <input type="text" value={searchQuery} onChange={handleSearch} />
      </div>
      {searchQuery && filteredCountries.length > 10 ? (
        <p>Too many matches, please refine your search.</p>
      ) : filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : filteredCountries.length === 0 && searchQuery ? (
        <p>not found...</p>
      ) : (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.name.common}>
              {country.name.common}
              {filteredCountries.length > 1 && (
                <button onClick={() => handleShowButtonClick(country)}>Show</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
