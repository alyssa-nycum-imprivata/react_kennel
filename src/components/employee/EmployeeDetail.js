import React, { useState, useEffect } from 'react';
import EmployeeManager from '../../modules/EmployeeManager';
import { firstLetterCase } from '../../modules/helpers';
import AnimalCard from '../animal/AnimalCard';
import AnimalManager from '../../modules/AnimalManager';

const EmployeeDetail = props => {
    const [employee, setEmployee] = useState({});
    const [animals, setAnimals] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const handleEmployeeDelete = () => {
        if (window.confirm("Are you sure you want to fire this employee?")) {
            setIsLoading(true);
            EmployeeManager.delete(props.employeeId).then(() =>
                props.history.push("/employees")
            );
        }
    };

    const handleAnimalDelete = (animalId) => {
            AnimalManager.delete(animalId).then(() =>
                props.history.push("/animals")
            );
    }

    useEffect(() => {
        EmployeeManager.getWithAnimals(props.match.params.employeeId)
            .then(employee => {
                setEmployee({
                    name: employee.name,
                    phoneNumber: employee.phoneNumber,
                    jobTitle: employee.jobTitle,
                    hireDate: employee.hireDate
                });
                setAnimals(employee.animals);
                setIsLoading(false);
            });
    }, [props.match.params.employeeId]);

    if (employee.name === undefined) {
        return (
            <div className="notFound">
                <h2>The employee you are searching for does not exist</h2>
            </div>
        )
    } else {
        return (
            <>
                <button type="button"
                    className="back"
                    onClick={() => { props.history.push("/employees") }}>
                    Go Back
                </button>
                <div className="card">
                    <div className="card-content">
                        <picture>
                            <img src={require("./profile-icon.png")} alt="Employee" />
                        </picture>
                        <h3>Name: <span style={{ color: 'darkslategrey' }}>{firstLetterCase(employee.name)}</span></h3>
                        <p>Phone Number: {employee.phoneNumber}</p>
                        <p>Job Title: {firstLetterCase(employee.jobTitle)}</p>
                        <p>Hire Date: {employee.hireDate}</p>
                        <button type="button"
                            onClick={() => props.history.push(`/employees/${props.employeeId}/edit`)}>
                            Edit
                    </button>
                        <button type="button" disabled={isLoading} onClick={handleEmployeeDelete}>
                            Fire
                    </button>
                    </div>
                </div>
                <h1 className="expandedDetails">Currently taking care of:</h1>
                <div className="card">
                    {animals.map(animal =>
                        <AnimalCard
                            key={animal.id}
                            animal={animal}
                            deleteAnimal={handleAnimalDelete}
                            {...props}
                        />
                    )}
                </div>
            </>
        );
    }
}

export default EmployeeDetail;