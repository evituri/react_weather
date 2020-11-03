import React, { useContext, useState } from "react";
import { AuthContext } from "../../Router";
import { Spinner, Container, Row, Col, Button } from "react-bootstrap";
import Bottleneck from "bottleneck";
import './_Weather.scss';

const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 5000
});

const Weather = (props) => {
    const { state } = useContext(AuthContext);
    const [data, setData] = useState({ weatherData: false, isLoading: true, showContainer: false, errorMessage: false });

    const getData = () => {
        limiter.schedule(() => {
            const result = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${props.user.address.geolocation.lat}&lon=${props.user.address.geolocation.long}&appid=${state.openweather_key}&units=metric`, {
                method: "GET",
            })

            return Promise.resolve(result);
        })
            .then((response) => {
                return response.json()
            })
            .then((weatherData) => {
                setData({
                    ...data,
                    isLoading: false,
                    showContainer: true,
                    weatherData,
                    errorMessage: false,
                });
            })
            .catch(error => {
                setData({
                    ...data,
                    showContainer: true,
                    isLoading: true,
                    errorMessage: JSON.stringify(error),
                    weatherData: data.weatherData,
                });
            });
        setData({
            ...data,
            isLoading: true,
            showContainer: true,
            errorMessage: false,
            weatherData: false,
        });
    };

    return (
        <div className="weather">
            <Button
                variant="secondary"
                onClick={getData}
            >
                <span>Get Weather</span>
            </Button>
            {data.errorMessage && <Container>
                <div>{JSON.stringify(data.errorMessage)}</div>
            </Container>}
            {data.showContainer && (!data.isLoading ? 
                <Container>
                    {data.weatherData && <div className="weather-data">
                        <img src={`https://openweathermap.org/img/wn/${data.weatherData.weather[0].icon}@2x.png`}></img>
                        <span>{`${data.weatherData.weather[0].main}, Feels like ${data.weatherData.main.feels_like} ˙C`}</span>
                    </div>}
                </Container> : 
                <Container>
                    <Row>
                        <Col md={3} />
                        <Col md={6}>
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </Col>
                        <Col md={3} />
                    </Row>
                </Container>)
            }
        </div>
    );
}

export default Weather;