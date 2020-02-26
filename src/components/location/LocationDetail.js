import React, { useState, useEffect } from 'react';
import LocationManager from '../../modules/LocationManager';

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

    return (
        <div className="card">
            <div className="card-content">
                <picture>
                    <img src={require("./nashville-skyline.jpg")} alt="Nashville Skyline" />
                </picture>
                <h3>Location: <span style={{ color: 'darkslategrey' }}>{location.name}</span></h3>
                <button type="button" disabled={isLoading} onClick={handleDelete}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default LocationDetail;