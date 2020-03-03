import React, { useState, useEffect } from 'react';
import EmployeeManager from '../../modules/EmployeeManager';
import LocationManager from '../../modules/LocationManager';

const EmployeeForm = props => {
  const [employee, setEmployee] = useState({ name: "", phoneNumber: "", jobTitle: "", hireDate: "", locationId: "" });
  const [locations, setLocations] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...employee };
    stateToChange[evt.target.id] = evt.target.value;
    setEmployee(stateToChange);
  };

  useEffect(() => {
    LocationManager.getAll(locations).then(locations => {
      setLocations(locations);
      setIsLoading(false);
    })
  }, []);

  const constructNewEmployee = evt => {
    evt.preventDefault();
    if (employee.name === "" || employee.phoneNumber === "" || employee.jobTitle === "" || employee.hireDate === "" || employee.locationId === "") {
      window.alert("Please fill out all fields");
    } else {
      setIsLoading(true);

      const newEmployee = {
        id: props.match.params.employeeId,
        name: employee.name,
        phoneNumber: employee.phoneNumber,
        jobTitle: employee.jobTitle,
        hireDate: employee.hireDate,
        locationId: parseInt(employee.locationId)
      };

      EmployeeManager.post(newEmployee)
        .then(() => props.history.push("/employees"));
    }
  };

  return (
    <>
      <button type="button"
        className="back"
        onClick={() => { props.history.push("/employees") }}>
        Go Back
      </button>
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

            <select
              className="form-control"
              id="locationId"
              value={employee.locationId}
              onChange={handleFieldChange}
            >
              <option value="" disabled defaultValue>Select Location</option>
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