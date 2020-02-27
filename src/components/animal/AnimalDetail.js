import React, { useState, useEffect } from "react";
import AnimalManager from "../../modules/AnimalManager";
import "./AnimalDetail.css";
import { firstLetterCase } from '../../modules/helpers';

const AnimalDetail = props => {
    const [animal, setAnimal] = useState({ name: "", breed: "" });
    const [isLoading, setIsLoading] = useState(true);

    const handleDelete = () => {
        setIsLoading(true);
        AnimalManager.delete(props.animalId).then(() =>
            props.history.push("/animals")
        );
    };

    useEffect(() => {
        AnimalManager.get(props.animalId).then(animal => {
            setAnimal({
                name: animal.name,
                breed: animal.breed
            });
            setIsLoading(false);
        });
    }, [props.animalId]);

    if (animal.name === undefined) {
        return (
            <div className="notFound">
                <h2>The animal you are searching for does not exist</h2>
            </div>
        )
    } else {
        return (
            <div className="card">
                <div className="card-content">
                    <picture>
                        <img src={require("./dog.svg")} alt="My Dog" />
                    </picture>
                    <h3>
                        Name: <span style={{ color: "darkslategrey" }}>{firstLetterCase(animal.name)}</span>
                    </h3>
                    <p>Breed: {firstLetterCase(animal.breed)}</p>
                    <button type="button" disabled={isLoading} onClick={handleDelete}>
                        Discharge
            </button>
                </div>
            </div>
        );
    }
};

export default AnimalDetail;