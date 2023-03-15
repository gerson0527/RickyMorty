import React, { useState, useEffect } from "react";
import Location from "./assets/Componentes/Location/Location";
import LocationForm from "./assets/Componentes/LocationForm/LocationForm";
import ResidentInfo from "./assets/Componentes/ResidentInfo/ResidentInfo";
import Banner from "./assets/Componentes/Banner/Banner";
import Footer from "./assets/Componentes/Footer/Footer";
import "./App.css";

function App() {
  const [locationData, setLocationData] = useState({});
  const [residentData, setResidentData] = useState([]);

  useEffect(() => {
    const fetchRandomLocationData = async () => {
      const response = await fetch("https://rickandmortyapi.com/api/location");
      const data = await response.json();
      const randomLocation =
        data.results[Math.floor(Math.random() * data.results.length)];
      const locationResponse = await fetch(randomLocation.url);
      const locationData = await locationResponse.json();
      setLocationData(locationData);
      setResidentData(locationData.residents);
    };
    fetchRandomLocationData();
  }, []);

  const handleLocationSubmit = async (locationName) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/location/?name=${locationName}`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      const locationResponse = await fetch(data.results[0].url);
      const locationData = await locationResponse.json();
      setLocationData(locationData);
      setResidentData(locationData.residents);
    } else {
      setLocationData({ error: "Location not found" });
      setResidentData([]);
    }
  };

  const handleLocationClick = async (locationUrl) => {
    const response = await fetch(locationUrl);
    const data = await response.json();
    setLocationData(data);
    setResidentData(data.residents);
  };

  const handleSuggestionsFetch = () => {
    setResidentData([]);
  };

  return (
    <div className="App">
      <Banner />
      <div className="formulario">
        <LocationForm
          onSubmit={handleLocationSubmit}
          onSuggestionsFetch={handleSuggestionsFetch}
        />
      </div>
      <div className="location">
        <Location locationData={locationData} />
      </div>
      <div className="container">
        <div className="main">
          {locationData.error ? (
            <p>{locationData.error}</p>
          ) : residentData ? (
            residentData.length === 0 ? (
              <p>No residents found</p>
            ) : (
              residentData.map((residentUrl) => (
                <ResidentInfo
                  key={residentUrl}
                  url={residentUrl}
                  onClick={handleLocationClick}
                />
              ))
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
