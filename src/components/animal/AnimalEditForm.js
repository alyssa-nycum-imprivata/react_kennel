import React, { useState, useEffect } from "react"
import AnimalManager from "../../modules/AnimalManager"
import "./AnimalForm.css"

const AnimalEditForm = props => {
    const [animal, setAnimal] = useState({ name: "", breed: "" });
    const [isLoading, setIsLoading] = useState(false);

    const handleFieldChange = evt => {
        const stateToChange = { ...animal };
        stateToChange[evt.target.id] = evt.target.value;
        setAnimal(stateToChange);
    };

    const updateExistingAnimal = evt => {
        evt.preventDefault()
        setIsLoading(true);

        const editedAnimal = {
            id: props.match.params.animalId,
            name: animal.name,
            breed: animal.breed,
            gender: animal.gender,
            age: animal.age,
            weight: animal.weight,
            petOwner: animal.petOwner
        };

        AnimalManager.update(editedAnimal)
            .then(() => props.history.push("/animals"))
    }

    useEffect(() => {
        AnimalManager.get(props.match.params.animalId)
            .then(animal => {
                setAnimal(animal);
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
                            value={animal.name}
                        />
                        <label htmlFor="name">Animal Name</label>

                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="breed"
                            value={animal.breed}
                        />
                        <label htmlFor="breed">Breed</label>

                        <input
                            type="text"
                            required
                            onChange={handleFieldChange}
                            id="gender"
                            placeholder="Male or Female"
                            value={animal.gender}
                        />
                        <label htmlFor="gender">Gender</label>

                        <input
                            type="number"
                            required
                            onChange={handleFieldChange}
                            id="age"
                            placeholder="Age"
                            value={animal.age}
                        />
                        <label htmlFor="age">Age</label>

                        <input
                            type="number"
                            required
                            onChange={handleFieldChange}
                            id="weight"
                            placeholder="Weight in pounds"
                            value={animal.weight}
                        />
                        <label htmlFor="weight">Weight</label>

                        <input
                            type="text"
                            required
                            onChange={handleFieldChange}
                            id="petOwner"
                            placeholder="Owner"
                            value={animal.petOwner}
                        />
                        <label htmlFor="petOwner">Owner</label>
                    </div>
                    <div className="alignRight">
                        <button
                            type="button" disabled={isLoading}
                            onClick={updateExistingAnimal}
                            className="btn btn-primary"
                        >Submit</button>
                    </div>
                </fieldset>
            </form>
        </>
    );
}

export default AnimalEditForm