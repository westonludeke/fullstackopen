import React from 'react';
import Weather from './Weather';

function CountryDetails({ country }) {
  const formatWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const calculateSquareMiles = (areaKm2) => {
    const conversionFactor = 0.386102; // 1 square kilometer = 0.386102 square miles
    return (areaKm2 * conversionFactor).toFixed(2);
  };

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>
        Area: {formatWithCommas(country.area)} km² (
        {formatWithCommas(calculateSquareMiles(country.area))} mi²)
      </p>
      <p>Languages: {Object.values(country.languages).join(', ')}</p>
      <p>
        <img
          src={country.flags.png}
          alt={country.flags.alt}
          width="200"
        />
      </p>
      <Weather capital={country.capital[0]} />
    </div>
  );
}

export default CountryDetails;
