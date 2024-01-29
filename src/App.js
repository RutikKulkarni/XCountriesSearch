import React, { useEffect, useState } from "react";
import "./App.css";

const Card = ({ country }) => {
  const { flags, name } = country;
  return (
    <div className="card">
      <img
        src={flags.png}
        alt={`Flag of ${name.common}`}
        className="card-image"
      />
      <h2>{name.common}</h2>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((err) => {
        setError(err); // Log the error to the console
        console.error("Error fetching data: ", err);
      });
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm)
    );
    setFilteredCountries(filtered);
  };

  return (
    <div>
      <div className="navbar">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>
      <div className="container">
        {error ? (
          <div className="error-message">Error loading data from the API</div>
        ) : filteredCountries.length === 0 ? (
          <div className="no-results">No matching countries found</div>
        ) : (
          filteredCountries.map((country) => (
            <Card key={country.cca3} country={country} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
