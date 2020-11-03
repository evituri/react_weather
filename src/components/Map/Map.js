import React, { useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import { AuthContext } from "../../Router";
import './_Map.scss';

const UserBlip = ({ text, className }) => <div className={className}><img className="marker" src="./marker.png"/>{text}</div>;

const Map = (props) => {
    const { state } = useContext(AuthContext);

    return (
        <div className="map" style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: state.google_key }}
                defaultCenter={{
                    lat: parseFloat(props.users[2].address.geolocation.lat),
                    lng: parseFloat(props.users[2].address.geolocation.long),
                }}
                defaultZoom={11}
            >
                {props.users.map((user, i) => (
                    <UserBlip
                        className={((props.selectedIndex !== -1) && (props.selectedIndex !== i)) ? "dimmed" : ''}
                        key={i}
                        lat={parseFloat(user.address.geolocation.lat)}
                        lng={parseFloat(user.address.geolocation.long)}
                        text={user.username}
                    />
                ))}
            </GoogleMapReact>
        </div>
    )
};

export default Map;