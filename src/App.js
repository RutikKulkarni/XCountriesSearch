import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

const CountryFlags = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="navbar">
        <input
          type="text"
          placeholder="Search for a country"
          value={searchTerm}
          onChange={handleSearch}
          className="search-box"
        />
      </div>
      <div className="country-cards">
        {filteredCountries.map((country) => (
          <div key={country.cca2} className="country-card">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
            />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryFlags;
