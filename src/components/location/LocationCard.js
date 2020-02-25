import React from "react";

const LocationCard = (props) => {
  return (
    <div className="card">
      <div className="card-content">
        <picture>
          <img src={require("./nashville-skyline.jpg")} alt="Nashville Skyline" />
        </picture>
        <h3>
          Location: <span className="card-locationname">{props.location.name}</span>
        </h3>
        <button type="button" onClick={() => props.deleteLocation(props.location.id)}>Close</button>
      </div>
    </div>
  );
};

export default LocationCard;