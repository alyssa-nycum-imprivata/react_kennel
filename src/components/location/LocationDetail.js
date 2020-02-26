import React, { useState, useEffect } from 'react';
import LocationManager from '../../modules/LocationManager';

const LocationDetail = props => {
    const [location, setLocation] = useState({ name: "", breed: "" });

    useEffect(() => {
        LocationManager.get(props.locationId)
            .then(location => {
                setLocation({
                    name: location.name,
                    breed: location.breed
                });
            });
    }, [props.locationId]);

    return (
        <div className="card">
            <div className="card-content">
                <picture>
                    <img src={require("./nashville-skyline.jpg")} alt="Nashville Skyline" />
                </picture>
                <h3>Location: <span style={{ color: 'darkslategrey' }}>{location.name}</span></h3>
            </div>
        </div>
    );
}

export default LocationDetail;