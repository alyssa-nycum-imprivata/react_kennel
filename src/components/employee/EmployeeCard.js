import React from "react";

const EmployeeCard = () => {
  return (
    <div className="card">
      <div className="card-content">
        <picture>
          <img src={require("./profile-icon.png")} alt="Employee Picture" />
        </picture>
        <h3>
          Name: <span className="card-employeename">Matt Berringer</span>
        </h3>
      </div>
    </div>
  );
};

export default EmployeeCard;