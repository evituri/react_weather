import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../Router";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import Navigation from "../../components/Navigation/Navigation";
import UserList from "../../components/UserList/UserList";
import Map from "../../components/Map/Map";


const Home = () => {
    const { state, dispatch } = useContext(AuthContext);
    const [data, setData] = useState({ users: [], isLoading: true });

    if (!state.isLoggedIn) {
        return <Redirect to="/login" />;
    }

    useEffect(async () => {
        fetch(`https://fakestoreapi.com/users`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((users) => {
                setData({
                    isLoading: false,
                    users: users,
                });
            })
    }, []);

    const { login } = state.user

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT"
        });
    }

    return (
        <>
            <Navigation login={login} logoutFunction={() => handleLogout()}></Navigation>
            {!data.isLoading ? 
                <Container>
                    <UserList users={data.users}></UserList>
                    <Map api_key={state.google_key} users={data.users}></Map>
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
                </Container>
            }
        </>
    );
}

export default Home;