import { Link } from "react-router-dom";
import React from "react";
import { firstLetterCase } from '../../modules/helpers';

const LocationCard = (props) => {
  return (
    <div className="card">
      <div className="card-content">
        <picture>
          <img src={require("./nashville-skyline.jpg")} alt="Nashville Skyline" />
        </picture>
        <h3>
          Location: <span className="card-locationname">{firstLetterCase(props.location.name)}</span>
        </h3>
        <Link to={`/locations/${props.location.id}`}>
          <button>Details</button>
        </Link>
        <button type="button" onClick={() => props.deleteLocation(props.location.id)}>Close</button>
      </div>
    </div>
  );
};

export default LocationCard;