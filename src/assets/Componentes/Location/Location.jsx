import React from "react";
import "../../../App.css";

function Location({ locationData }) {
  return (
    <div className="locations">
      <div className="locations__nombre">
        <p>{locationData.name}</p>
      </div>
      <div className="locations__content">
        <p>{locationData.type}</p>
        <p>{locationData.dimension}</p>
        <p>{locationData.residents?.length}</p>
      </div>
    </div>
  );
}

export default Location;
