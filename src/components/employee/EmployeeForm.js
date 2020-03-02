import React, { useState } from 'react';
import EmployeeManager from '../../modules/EmployeeManager';

const EmployeeForm = props => {
  const [employee, setEmployee] = useState({ name: "", phoneNumber: "", jobTitle: "", hireDate: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...employee };
    stateToChange[evt.target.id] = evt.target.value;
    setEmployee(stateToChange);
  };

  const constructNewEmployee = evt => {
    evt.preventDefault();
    if (employee.name === "" || employee.phoneNumber === "" || employee.jobTitle === "" || employee.hireDate === "") {
      window.alert("Please fill out all fields");
    } else {
      setIsLoading(true);
      EmployeeManager.post(employee)
        .then(() => props.history.push("/employees"));
    }
  };

  return (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="name"
              placeholder="Employee name"
            />
            <label htmlFor="name">Employee Name</label>

            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="phoneNumber"
              placeholder="000-000-0000"
            />
            <label htmlFor="phoneNumber">Phone Number</label>

            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="jobTitle"
              placeholder="Job Title"
            />
            <label htmlFor="jobTitle">Job Title</label>

            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="hireDate"
              placeholder="MM/DD/YY"
            />
            <label htmlFor="hireDate">Hire Date</label>

          </div>
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={constructNewEmployee}
            >Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default EmployeeForm