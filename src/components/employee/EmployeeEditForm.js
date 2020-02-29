import React, { useState, useEffect } from "react"
import EmployeeManager from "../../modules/EmployeeManager"

const EmployeeEditForm = props => {
  const [employee, setEmployee] = useState({ name: "", phoneNumber: "", jobTitle: "", hireDate: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...employee };
    stateToChange[evt.target.id] = evt.target.value;
    setEmployee(stateToChange);
  };

  const updateExistingEmployee = evt => {
    evt.preventDefault()
    setIsLoading(true);

    const editedEmployee = {
      id: props.match.params.employeeId,
      name: employee.name,
      phoneNumber: employee.phoneNumber,
      jobTitle: employee.jobTitle,
      hireDate: employee.hireDate
    };

    EmployeeManager.update(editedEmployee)
      .then(() => props.history.push("/employees"))
  }

  useEffect(() => {
    EmployeeManager.get(props.match.params.employeeId)
      .then(employee => {
        setEmployee(employee);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="name"
              value={employee.name}
            />
            <label htmlFor="name">Employee name</label>

            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="phoneNumber"
              value={employee.phoneNumber}
            />
            <label htmlFor="phoneNumber">Phone Number:</label>

            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="jobTitle"
              value={employee.jobTitle}
            />
            <label htmlFor="jobTitle">Job Title:</label>

            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="hireDate"
              value={employee.hireDate}
            />
            <label htmlFor="hireDate">Hire Date:</label>

          </div>
          <div className="alignRight">
            <button
              type="button" disabled={isLoading}
              onClick={updateExistingEmployee}
              className="btn btn-primary"
            >Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default EmployeeEditForm