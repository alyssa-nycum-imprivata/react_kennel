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
          Location: <span className="card-locationname">{firstLetterCase(props.kennelLocation.name)}</span>
        </h3>
        <p>Address: {props.kennelLocation.address}</p>
        <Link to={`/locations/${props.kennelLocation.id}`}>
          <button>Details</button>
        </Link>
        <button type="button"
          onClick={() => props.history.push(`/locations/${props.kennelLocation.id}/edit`)}>
          Edit
        </button>
        <button type="button" onClick={() => props.deleteLocation(props.kennelLocation.id)}>Close</button>
      </div>
    </div>
  );
};

export default LocationCard;