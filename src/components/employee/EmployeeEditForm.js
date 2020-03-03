import React, { useState, useEffect } from "react"
import EmployeeManager from "../../modules/EmployeeManager"
import LocationManager from "../../modules/LocationManager"

const EmployeeEditForm = props => {
  const [employee, setEmployee] = useState({ name: "", phoneNumber: "", jobTitle: "", hireDate: "" });
  const [locations, setLocations] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...employee };
    stateToChange[evt.target.id] = evt.target.value;
    setEmployee(stateToChange);
  };

  const updateExistingEmployee = evt => {
    evt.preventDefault()
    if (employee.name === "" || employee.phoneNumber === "" || employee.jobTitle === "" || employee.hireDate === "" || employee.locationId === "") {
      window.alert("Please fill out all fields");
    } else {
      setIsLoading(true);

      const editedEmployee = {
        id: props.match.params.employeeId,
        name: employee.name,
        phoneNumber: employee.phoneNumber,
        jobTitle: employee.jobTitle,
        hireDate: employee.hireDate,
        locationId: parseInt(employee.locationId)
      };

      EmployeeManager.update(editedEmployee)
        .then(() => props.history.push(`/employees/${employee.id}`))
    }
  }

  useEffect(() => {
    EmployeeManager.get(props.match.params.employeeId)
      .then(employee => {
        setEmployee(employee);
      })
    LocationManager.getAll(locations).then(locations => {
      setLocations(locations);
      setIsLoading(false);
    })
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
            <label htmlFor="name">Employee Name</label>

            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="phoneNumber"
              value={employee.phoneNumber}
            />
            <label htmlFor="phoneNumber">Phone Number</label>

            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="jobTitle"
              value={employee.jobTitle}
            />
            <label htmlFor="jobTitle">Job Title</label>

            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="hireDate"
              value={employee.hireDate}
            />
            <label htmlFor="hireDate">Hire Date</label>

            <select
              className="form-control"
              id="locationId"
              value={employee.employeeId}
              onChange={handleFieldChange}
            >
              {locations.map(location =>
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              )}
            </select>
            <label htmlFor="locationId">Assigned Location:</label>

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