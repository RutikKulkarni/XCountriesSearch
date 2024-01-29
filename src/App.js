import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");
  // const [specificCountries, setSpecificCountries] = useState([]);
  // Fetch countries data on component mount
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setShowCountries(data);
      })
      .catch((err) => console.error("Error fetching data: ", err));
  }, []);
  // Filter countries based on search input
  useEffect(() => {
    let filteredData = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchCountries.toLowerCase())
    );
    if(!searchCountries){
      setShowCountries("")
      setShowCountries(countries)
    }else{
      setShowCountries(filteredData)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCountries]);

  function handleChange(e) {
    setSearchCountries(e.target.value);
  }

  const cardStyle = {
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
  };

  const countryCard = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const searchInputWrapper = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  };

  const searchInput = {
    marginTop: "5px",
    height: "25px",
    width: "50%",
  };
  return (
    <div>
      <div style={searchInputWrapper}>
        <input
          type="text"
          style={searchInput}
          value={searchCountries}
          placeholder="Search for countries..."
          onChange={handleChange}
        />
      </div>
      <div style={countryCard}>
        {showCountries.map((country) => (
          <div key={country.cca3} style={cardStyle}>
            <img
              style={imageStyle}
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
            />
            <h2>{country.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
