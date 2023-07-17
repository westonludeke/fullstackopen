import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './index.css';
import CountryDetails from './components/CountryDetails';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setSelectedCountry(null); // Reset the selectedCountry when performing a new search
  };

  const handleShowButtonClick = (country) => {
    setSelectedCountry(country);
  };

  const filteredCountries = searchQuery
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const fetchWeather = useCallback((city) => {
    const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
    const capitalInfo = selectedCountry.capitalInfo;
    const lat = capitalInfo.latlng[0];
    const lon = capitalInfo.latlng[1];
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.log('Error fetching weather data:', error);
      });
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry) {
      fetchWeather(selectedCountry.capital[0]);
    }
  }, [selectedCountry, fetchWeather]);

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
