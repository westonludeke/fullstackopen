import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './index.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
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
      {filteredCountries.length === 0 ? (
        <p></p>
      ) : (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.name.common}>{country.name.common}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
