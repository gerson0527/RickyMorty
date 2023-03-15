import React, { useState, useEffect, useRef } from "react";
import "../../../App.css";

function LocationForm({ onSubmit, onSuggestionsFetch }) {
  const [locationName, setLocationName] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const fetchLocationSuggestions = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/location/?name=${locationName}`
        );
        const data = await response.json();
        setLocationSuggestions(data.results);
        onSuggestionsFetch(data.results);
      } catch (error) {
        console.log(error);
        onSuggestionsFetch([]);
      }
    };

    if (locationName.length > 0) {
      setShowSuggestions(true);
      fetchLocationSuggestions();
    } else {
      setShowSuggestions(false);
      setLocationSuggestions([]);
    }
  }, [locationName, onSuggestionsFetch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(locationName);
    setLocationName("");
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setLocationName(suggestion.name);
    onSubmit(suggestion.id);
    setShowSuggestions(false); // Oculta el cuadro de sugerencias cuando se hace clic en una sugerencia
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="input-container" ref={wrapperRef}>
        <input
          placeholder="Escribe el nombre de la ubicación"
          type="text"
          value={locationName}
          onChange={(event) => setLocationName(event.target.value)}
        />
        {showSuggestions && (
          <div className="suggestions">
            {locationSuggestions.map((suggestion) => (
              <div
                className="suggestion"
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <button type="submit">Search</button>
    </form>
  );
}

export default LocationForm;
