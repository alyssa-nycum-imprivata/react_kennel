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
      </div>
    </div>
  );
};

export default LocationCard;