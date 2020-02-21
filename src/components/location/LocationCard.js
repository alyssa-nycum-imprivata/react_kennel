import React from "react";

const LocationCard = () => {
  return (
    <div className="card">
      <div className="card-content">
        <picture>
          <img src={require("./nashville-skyline.jpg")} alt="Nashville Skyline" />
        </picture>
        <h3>
          Location: <span className="card-location">Nashville, TN</span>
        </h3>
      </div>
    </div>
  );
};

export default LocationCard;