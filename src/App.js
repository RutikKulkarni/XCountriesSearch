import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data);
        setDisplayedCountries(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterCountries = () => {
      const filteredData = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedCountries(filteredData.length === 0 ? countries : filteredData);
    };

    filterCountries();
  }, [searchTerm, countries]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          value={searchTerm}
          placeholder="Search for countries"
          onChange={handleSearchChange}
        />
      </div>
      <div className="country-card">
        {displayedCountries.map((country) => (
          <div key={country.cca3} className="card-style">
            <img
              className="image-style"
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
            />
            <h2>{country.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
