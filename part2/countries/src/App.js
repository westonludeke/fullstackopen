import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './index.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

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

  const formatWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const calculateSquareMiles = (areaKm2) => {
    const conversionFactor = 0.386102; // 1 square kilometer = 0.386102 square miles
    return (areaKm2 * conversionFactor).toFixed(2);
  };

  const handleShowButtonClick = (country) => {
    setSelectedCountry(country);
  };

  const filteredCountries = searchQuery
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

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
        <div>
          <h2>{filteredCountries[0].name.common}</h2>
          <p>Capital: {filteredCountries[0].capital[0]}</p>
          <p>
            Area: {formatWithCommas(filteredCountries[0].area)} km² (
            {formatWithCommas(calculateSquareMiles(filteredCountries[0].area))} mi²)
          </p>
          <p>
            Languages: {Object.values(filteredCountries[0].languages).join(', ')}
          </p>
          <p>
            <img
              src={filteredCountries[0].flags.png}
              alt={filteredCountries[0].flags.alt}
              width="200"
            />
          </p>
        </div>
      ) : selectedCountry ? (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital[0]}</p>
          <p>
            Area: {formatWithCommas(selectedCountry.area)} km² (
            {formatWithCommas(calculateSquareMiles(selectedCountry.area))} mi²)
          </p>
          <p>Languages: {Object.values(selectedCountry.languages).join(', ')}</p>
          <p>
            <img
              src={selectedCountry.flags.png}
              alt={selectedCountry.flags.alt}
              width="200"
            />
          </p>
        </div>
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
