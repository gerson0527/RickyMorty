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

  const { name, image, gender, species, status } = residentData;

  return (
    <div className="resident">
      <img src={image} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>Gender: {gender}</p>
        <p>Species: {species}</p>
        <p>Status: {status}</p>
      </div>
    </div>
  );
}

export default ResidentInfo;
