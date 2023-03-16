import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faCross } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

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
  function getStatusIcon(status) {
    switch (status) {
      case "Alive":
        return (
          <FontAwesomeIcon icon={faHeart} className="alive-icon element" />
        );
      case "Dead":
        return (
          <FontAwesomeIcon icon={faCross} className="dead-icon disappear" />
        );
      case "unknown":
        return (
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className="unknown-icon"
          />
        );
    }
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
        <p className="resident__status">
          {getStatusIcon(status)}
          <span className="name__status">{status}</span>
        </p>
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
