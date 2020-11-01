import React from 'react';
import GoogleMapReact from 'google-map-react';

const UserBlip = ({ text }) => <div>{text}</div>;

const Map = (props) => (
    <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: props.api_key }}
            defaultCenter={{
                lat: parseFloat(props.users[2].address.geolocation.lat),
                lng: parseFloat(props.users[2].address.geolocation.long),
            }}
            defaultZoom={11}
        >
            {props.users.map((user, i) => (
                <UserBlip
                    key={i}
                    lat={parseFloat(user.address.geolocation.lat)}
                    lng={parseFloat(user.address.geolocation.long)}
                    text={user.username}
                />
            ))}
        </GoogleMapReact>
    </div>
);

export default Map;