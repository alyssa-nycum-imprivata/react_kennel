import React, { useState, useEffect } from 'react';
import LocationManager from '../../modules/LocationManager';
import { firstLetterCase } from '../../modules/helpers';

const LocationDetail = props => {
    const [location, setLocation] = useState({ name: "" });
    const [isLoading, setIsLoading] = useState(true);

    const handleDelete = () => {
        setIsLoading(true);
        LocationManager.delete(props.locationId).then(() =>
            props.history.push("/locations")
        );
    };

    useEffect(() => {
        LocationManager.get(props.locationId)
            .then(location => {
                setLocation({
                    name: location.name,
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
            <div className="card">
                <div className="card-content">
                    <picture>
                        <img src={require("./nashville-skyline.jpg")} alt="Nashville Skyline" />
                    </picture>
                    <h3>Location: <span style={{ color: 'darkslategrey' }}>{firstLetterCase(location.name)}</span></h3>
                    <button type="button" disabled={isLoading} onClick={handleDelete}>
                        Close
                    </button>
                </div>
            </div>
        );
    }
}

export default LocationDetail;