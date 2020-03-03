import React, { useState } from 'react';
import LocationManager from '../../modules/LocationManager';

const LocationForm = props => {
  const [location, setLocation] = useState({ name: "", phoneNumber: "", address: "", hours: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...location };
    stateToChange[evt.target.id] = evt.target.value;
    setLocation(stateToChange);
  };

  const constructNewLocation = evt => {
    evt.preventDefault();
    if (location.name === "" || location.phoneNumber === "" || location.address === "" || location.hours === "") {
      window.alert("Please fill out all fields");
    } else {
      setIsLoading(true);
      LocationManager.post(location)
        .then(() => props.history.push("/locations"));
    }
  };

  return (
    <>
      <button type="button"
        className="back"
        onClick={() => { props.history.push("/locations") }}>
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
              placeholder="Location Name"
            />
            <label htmlFor="name">Name</label>

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
              id="address"
              placeholder="Address"
            />
            <label htmlFor="address">Address</label>

            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="hours"
              placeholder="Hours"
            />
            <label htmlFor="hours">Hours</label>

          </div>
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={constructNewLocation}
            >Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default LocationForm