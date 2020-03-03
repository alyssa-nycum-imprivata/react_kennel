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
        {props.hasUser
          ? <button type="button"
            onClick={() => props.history.push(`/locations/${props.kennelLocation.id}/edit`)}>
            Edit
            </button>
          : null}
        {/* {props.hasUser
          ? <button type="button" onClick={() => { if (window.confirm("Are you sure you want to close this location?")) props.deleteLocation(props.kennelLocation.id) }}>Close</button>
          : null} */}
      </div>
    </div>
  );
};

export default LocationCard;