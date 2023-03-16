import React, { useState, useEffect } from "react";

function ResidentInfo({ url }) {
  const [residentData, setResidentData] = useState(null);

  useEffect(() => {
    const fetchResidentData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setResidentData(data);
    };
    fetchResidentData();
  }, [url]);

  if (!residentData) {
    return <div>Loading resident information...</div>;
  }

  const { name, image, gender, species, status, episode, origin } =
    residentData;

  return (
    <div className="resident">
      <img src={image} alt={name} />
      <div className="resident__conten">
        <h3 className="resident__name">{name}</h3>
        <p className="resident__Gender">
          <span>Gender: </span>
          {gender}
        </p>
        <p className="resident__Species">
          <span>Species: </span>
          {species}
        </p>
        <p className="resident__status">{status}</p>
        <p>
          <span>apariciones en episodios:</span>
          {episode.length}
        </p>
        <p>
          <span>origen:</span>
          {origin.name}
        </p>
      </div>
    </div>
  );
}

export default ResidentInfo;
