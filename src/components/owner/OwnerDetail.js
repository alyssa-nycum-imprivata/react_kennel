import React, { useState, useEffect } from "react";
import OwnerManager from "../../modules/OwnerManager";
import { firstLetterCase } from '../../modules/helpers';

const OwnerDetail = props => {
    const [owner, setOwner] = useState({ name: "", phoneNumber: "", email: "", petName: "" });
    const [isLoading, setIsLoading] = useState(true);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to remove this owner?")) {
            setIsLoading(true);
            OwnerManager.delete(props.ownerId).then(() =>
                props.history.push("/owners")
            );
        }
    };

    useEffect(() => {
        OwnerManager.get(props.ownerId).then(owner => {
            setOwner({
                name: owner.name,
                phoneNumber: owner.phoneNumber,
                email: owner.email,
                petName: owner.petName
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
            <>
                <button type="button"
                    className="back"
                    onClick={() => { props.history.push("/owners") }}>
                    Go Back
                </button>
                <div className="card">
                    <div className="card-content">
                        <picture>
                            <img src={require("./profile-icon.png")} alt="Owner" />
                        </picture>
                        <h3>
                            Name: <span style={{ color: "darkslategrey" }}>{firstLetterCase(owner.name)}</span>
                        </h3>
                        <p>Phone Number: {owner.phoneNumber}</p>
                        <p>Email: {owner.email}</p>
                        <p>Pet's Name: {firstLetterCase(owner.petName)}</p>
                        <button type="button"
                            onClick={() => props.history.push(`/owners/${props.ownerId}/edit`)}>
                            Edit
                    </button>
                        <button type="button" disabled={isLoading} onClick={handleDelete}>
                            Remove
                    </button>
                    </div>
                </div>
            </>
        );
    }
};

export default OwnerDetail;