import React, { useState, useEffect } from 'react';
import LocationManager from '../../modules/LocationManager';
import { firstLetterCase } from '../../modules/helpers';

const LocationDetail = props => {
    const [location, setLocation] = useState({ name: "", phoneNumber: "", address: "", hours: "" });
    const [isLoading, setIsLoading] = useState(true);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to close this location?")) {
            setIsLoading(true);
            LocationManager.delete(props.locationId).then(() =>
                props.history.push("/locations")
            );
        }
    };

    useEffect(() => {
        LocationManager.get(props.locationId)
            .then(location => {
                setLocation({
                    name: location.name,
                    phoneNumber: location.phoneNumber,
                    address: location.address,
                    hours: location.hours
                });
                setIsLoading(false);
            });
    }, [props.locationId]);

    if (location.name === undefined) {
        return (
            <div className="notFound">
                <h2>The location you are searching for does not exist</h2>
            </div>
        )
    } else {
        return (
            <>
                <button type="button"
                    className="back"
                    onClick={() => { props.history.push("/locations") }}>
                    Go Back
                </button>
                <div className="card">
                    <div className="card-content">
                        <picture>
                            <img src={require("./nashville-skyline.jpg")} alt="Nashville Skyline" />
                        </picture>
                        <h3>Location: <span style={{ color: 'darkslategrey' }}>{firstLetterCase(location.name)}</span></h3>
                        <p>Phone Number: {location.phoneNumber}</p>
                        <p>Address: {location.address}</p>
                        <p>Hours: {location.hours}</p>
                        <button type="button"
                            onClick={() => props.history.push(`/locations/${props.locationId}/edit`)}>
                            Edit
                    </button>
                        <button type="button" disabled={isLoading} onClick={handleDelete}>
                            Close
                    </button>
                    </div>
                </div>
            </>
        );
    }
}

export default LocationDetail;