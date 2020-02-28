import React from "react";
import { firstLetterCase } from '../../modules/helpers';
import { Link } from "react-router-dom";

const OwnerCard = (props) => {
  return (
    <div className="card">
      <div className="card-content">
        <picture>
          <img src={require("./profile-icon.png")} alt="Owner" />
        </picture>
        <h3>
          Name: <span className="card-ownername">{firstLetterCase(props.owner.name)}</span>
        </h3>
        <p>Phone Number: {firstLetterCase(props.owner.phoneNumber)}</p>
        <Link to={`/owners/${props.owner.id}`}>
          <button>Details</button>
        </Link>
        <button type="button" onClick={() => props.deleteOwner(props.owner.id)}>Remove</button>
      </div>
    </div>
  );
};

export default OwnerCard;