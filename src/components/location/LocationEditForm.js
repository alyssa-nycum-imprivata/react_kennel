import React, { useState, useEffect } from "react"
import LocationManager from "../../modules/LocationManager"

const LocationEditForm = props => {
  const [location, setLocation] = useState({ name: "", phoneNumber: "", address: "", hours: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...location };
    stateToChange[evt.target.id] = evt.target.value;
    setLocation(stateToChange);
  };

  const updateExistingLocation = evt => {
    evt.preventDefault()
    if (location.name === "" || location.phoneNumber === "" || location.address === "" || location.hours === "") {
      window.alert("Please fill out all fields");
    } else {
      setIsLoading(true);

      const editedLocation = {
        id: props.match.params.locationId,
        name: location.name,
        phoneNumber: location.phoneNumber,
        address: location.address,
        hours: location.hours
      };

      LocationManager.update(editedLocation)
        .then(() => props.history.push(`/locations/${location.id}`))
    }
  }

  useEffect(() => {
    LocationManager.get(props.match.params.locationId)
      .then(location => {
        setLocation(location);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <button type="button"
        className="back"
        onClick={() => { props.history.push(`/locations/${location.id}`) }}>
        Go Back
      </button>
      <form>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="name"
              value={location.name}
            />
            <label htmlFor="name">Location Name</label>

            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="phoneNumber"
              value={location.phoneNumber}
            />
            <label htmlFor="phoneNumber">Phone Number</label>

            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="address"
              value={location.address}
            />
            <label htmlFor="address">Address</label>

            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="hours"
              value={location.hours}
            />
            <label htmlFor="hours">Hours</label>

          </div>
          <div className="alignRight">
            <button
              type="button" disabled={isLoading}
              onClick={updateExistingLocation}
              className="btn btn-primary"
            >Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default LocationEditForm