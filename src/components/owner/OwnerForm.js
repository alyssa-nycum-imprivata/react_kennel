import React, { useState } from 'react';
import OwnerManager from '../../modules/OwnerManager';

const OwnerForm = props => {
  const [owner, setOwner] = useState({ name: "", phoneNumber: "", email: "", petName: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...owner };
    stateToChange[evt.target.id] = evt.target.value;
    setOwner(stateToChange);
  };

  const constructNewOwner = evt => {
    evt.preventDefault();
    if (owner.name === "" || owner.phoneNumber === "" || owner.email === "" || owner.petName === "") {
      window.alert("Please fill out all fields");
    } else {
      setIsLoading(true);
      OwnerManager.post(owner)
        .then(() => props.history.push("/owners"));
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
              placeholder="Owner name"
            />
            <label htmlFor="name">Owner Name</label>

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
              id="email"
              placeholder="Email"
            />
            <label htmlFor="email">Email</label>

            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="petName"
              placeholder="Pet's Name"
            />
            <label htmlFor="petName">Pet's Name</label>

          </div>
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={constructNewOwner}
            >Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default OwnerForm