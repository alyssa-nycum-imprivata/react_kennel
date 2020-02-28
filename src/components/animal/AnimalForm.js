import React, { useState } from 'react';
import AnimalManager from '../../modules/AnimalManager';
import './AnimalForm.css'

const AnimalForm = props => {
    const [animal, setAnimal] = useState({ name: "", breed: "" });
    const [isLoading, setIsLoading] = useState(false);

    const handleFieldChange = evt => {
        const stateToChange = { ...animal };
        stateToChange[evt.target.id] = evt.target.value;
        setAnimal(stateToChange);
    };

    /*  Local method for validation, set loadingStatus, create animal      object, invoke the AnimalManager post method, and redirect to the full animal list
    */
    const constructNewAnimal = evt => {
        evt.preventDefault();
        if (animal.name === "" || animal.breed === "" || animal.gender === "" || animal.age === "" || animal.weight === "" || animal.petOwner === "") {
            window.alert("Please fill out all fields");
        } else {
            setIsLoading(true);
            // Create the animal and redirect user to animal list
            AnimalManager.post(animal)
                .then(() => props.history.push("/animals"));
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
                            placeholder="Animal name"
                        />
                        <label htmlFor="name">Animal Name</label>
                        
                        <input
                            type="text"
                            required
                            onChange={handleFieldChange}
                            id="breed"
                            placeholder="Breed"
                        />
                        <label htmlFor="breed">Breed</label>
                        
                        <input
                            type="text"
                            required
                            onChange={handleFieldChange}
                            id="gender"
                            placeholder="male or female"
                        />
                        <label htmlFor="gender">Gender</label>
                        
                        <input
                            type="number"
                            required
                            onChange={handleFieldChange}
                            id="age"
                            placeholder="age"
                        />
                        <label htmlFor="age">Age</label>
                        
                        <input
                            type="number"
                            required
                            onChange={handleFieldChange}
                            id="weight"
                            placeholder="weight in pounds"
                        />
                        <label htmlFor="weight">Weight</label>
                        
                        <input
                            type="text"
                            required
                            onChange={handleFieldChange}
                            id="petOwner"
                            placeholder="Owner"
                        />
                        <label htmlFor="petOwner">Owner</label>
                    </div>
                    <div className="alignRight">
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={constructNewAnimal}
                        >Submit</button>
                    </div>
                </fieldset>
            </form>
        </>
    );
};

export default AnimalForm