import React, { useState, useEffect } from "react";
import AnimalManager from "../../modules/AnimalManager";
import "./AnimalForm.css";
import EmployeeManager from "../../modules/EmployeeManager";


const AnimalEditForm = props => {
    const [animal, setAnimal] = useState({ name: "", breed: "", gender: "", age: "", weight: "", petOwner: "", employeeId: "" });
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleFieldChange = evt => {
        const stateToChange = { ...animal };
        stateToChange[evt.target.id] = evt.target.value;
        setAnimal(stateToChange);
    };

    const updateExistingAnimal = evt => {
        evt.preventDefault()
        if (animal.name === "" || animal.breed === "" || animal.gender === "" || animal.age === "" || animal.weight === "" || animal.petOwner === "" || animal.employeeId === "") {
            window.alert("Please fill out all fields");
        } else {
            setIsLoading(true);

            const editedAnimal = {
                id: props.match.params.animalId,
                name: animal.name,
                breed: animal.breed,
                gender: animal.gender,
                age: parseInt(animal.age),
                weight: parseInt(animal.weight),
                petOwner: animal.petOwner,
                employeeId: parseInt(animal.employeeId)
            };

            AnimalManager.update(editedAnimal)
                .then(() => props.history.push(`/animals/${animal.id}`))
        }
    }

    useEffect(() => {
        AnimalManager.get(props.match.params.animalId)
            .then(animal => {
                setAnimal(animal);
            })
        EmployeeManager.getAll(employees).then(employees => {
            setEmployees(employees);
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
                            value={animal.gender}
                        />
                        <label htmlFor="gender">Gender</label>

                        <input
                            type="number"
                            required
                            onChange={handleFieldChange}
                            id="age"
                            value={animal.age}
                        />
                        <label htmlFor="age">Age</label>

                        <input
                            type="number"
                            required
                            onChange={handleFieldChange}
                            id="weight"
                            value={animal.weight}
                        />
                        <label htmlFor="weight">Weight</label>

                        <input
                            type="text"
                            required
                            onChange={handleFieldChange}
                            id="petOwner"
                            value={animal.petOwner}
                        />
                        <label htmlFor="petOwner">Owner</label>

                        <select
                            className="form-control"
                            id="employeeId"
                            value={animal.employeeId}
                            onChange={handleFieldChange}
                        >
                            {employees.map(employee =>
                                <option key={employee.id} value={employee.id}>
                                    {employee.name}
                                </option>
                            )}
                        </select>
                        <label htmlFor="employeeId">Assigned Employee</label>

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