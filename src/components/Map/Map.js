import React, { useContext, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { AuthContext } from "../../Router";
import html2canvas from 'html2canvas';
import { Button } from 'react-bootstrap';
import './_Map.scss';

const UserBlip = ({ text, className }) => <div className={className}><img className="marker" src="./marker.png"/>{text}</div>;

const Map = (props) => {
    const { state } = useContext(AuthContext);
    const defaultCenter = {
        lat: props.users && parseFloat(props.users[0].address.geolocation.lat),
        lng: props.users && parseFloat(props.users[0].address.geolocation.long),
    };
    const defaultZoom = 11;
    const [data, setData] = useState({
        lat: defaultCenter.lat,
        lng: defaultCenter.lng,
        zoom: defaultZoom
    });

    const downloadImage = (el) => {
        let a = document.createElement('a');
        a.href = `https://maps.googleapis.com/maps/api/staticmap?center=${data.lat},${data.lng}&zoom=${data.zoom}&size=600x300&maptype=roadmap&key=${state.google_key}`;
        a.download = "map.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <div className="map-container">
            <div className="map" id="map" style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: state.google_key }}
                    defaultCenter={defaultCenter}
                    defaultZoom={defaultZoom}
                    onChange={({ center, zoom }) => setData({
                        lat: center.lat,
                        lng: center.lng,
                        zoom
                    })}
                >
                    {props.users && props.users.map((user, i) => (
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
            <Button
                variant="secondary"
                onClick={downloadImage}
            >
                <span>Download map as image</span>
            </Button>
        </div>
    )
};

export default Map;