import React, { useState, useEffect } from "react";
import OwnerManager from "../../modules/OwnerManager";
import { firstLetterCase } from '../../modules/helpers';

const OwnerDetail = props => {
    const [owner, setOwner] = useState({ name: "", phoneNumber: "" });
    const [isLoading, setIsLoading] = useState(true);

    const handleDelete = () => {
        setIsLoading(true);
        OwnerManager.delete(props.ownerId).then(() =>
            props.history.push("/owners")
        );
    };

    useEffect(() => {
        OwnerManager.get(props.ownerId).then(owner => {
            setOwner({
                name: owner.name,
                phoneNumber: owner.phoneNumber
            });
            setIsLoading(false);
        });
    }, [props.ownerId]);

    if (owner.name === undefined) {
        return (
            <div className="notFound">
                <h2>The owner you are searching for does not exist</h2>
            </div>
        )
    } else {
        return (
            <div className="card">
                <div className="card-content">
                    <picture>
                    <img src={require("./profile-icon.png")} alt="Owner" />
                    </picture>
                    <h3>
                        Name: <span style={{ color: "darkslategrey" }}>{firstLetterCase(owner.name)}</span>
                    </h3>
                    <p>Breed: {firstLetterCase(owner.phoneNumber)}</p>
                    <button type="button" disabled={isLoading} onClick={handleDelete}>
                        Remove
            </button>
                </div>
            </div>
        );
    }
};

export default OwnerDetail;