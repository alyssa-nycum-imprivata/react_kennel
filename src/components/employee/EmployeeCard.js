import React from "react";

const EmployeeCard = (props) => {
  return (
    <div className="card">
      <div className="card-content">
        <picture>
          <img src={require("./profile-icon.png")} alt="Employee" />
        </picture>
        <h3>
          Name: <span className="card-employeename">{props.employee.name}</span>
        </h3>
        <button type="button" onClick={() => props.deleteEmployee(props.employee.id)}>Fire</button>
      </div>
    </div>
  );
};

export default EmployeeCard;