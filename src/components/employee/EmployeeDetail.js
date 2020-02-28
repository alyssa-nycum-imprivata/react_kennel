import React, { useState, useEffect } from 'react';
import EmployeeManager from '../../modules/EmployeeManager';
import { firstLetterCase } from '../../modules/helpers';

const EmployeeDetail = props => {
    const [employee, setEmployee] = useState({ name: "" });
    const [isLoading, setIsLoading] = useState(true);

    const handleDelete = () => {
        setIsLoading(true);
        EmployeeManager.delete(props.employeeId).then(() =>
            props.history.push("/employees")
        );
    };

    useEffect(() => {
        EmployeeManager.get(props.employeeId)
            .then(employee => {
                setEmployee({
                    name: employee.name,
                });
                setIsLoading(false);
            });
    }, [props.employeeId]);

    if (employee.name === undefined) {
        return (
            <div className="notFound">
                <h2>The employee you are searching for does not exist</h2>
            </div>
        )
    } else {
        return (
            <div className="card">
                <div className="card-content">
                    <picture>
                        <img src={require("./profile-icon.png")} alt="Employee" />
                    </picture>
                    <h3>Name: <span style={{ color: 'darkslategrey' }}>{firstLetterCase(employee.name)}</span></h3>
                    <button type="button" disabled={isLoading} onClick={handleDelete}>
                        Fire
                    </button>
                </div>
            </div>
        );
    }
}

export default EmployeeDetail;