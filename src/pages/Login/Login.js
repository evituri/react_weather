import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import GithubIcon from "mdi-react/GithubIcon";
import { AuthContext } from "../../Router";
import { Spinner, Container, Row, Col, Button } from "react-bootstrap";


const Login = () => {
    const { state, dispatch } = useContext(AuthContext);
    const [data, setData] = useState({ errorMessage: "", isLoading: false });

    const { client_id, redirect_uri } = state;

    useEffect(() => {
        const url = window.location.href;
        const hasCode = url.includes("?code=");

        if (hasCode) {
            const newUrl = url.split("?code=");
            window.history.pushState({}, null, newUrl[0]);
            setData({ ...data, isLoading: true });

            let urlBody = `?client_id=${state.client_id}&client_secret=${state.client_secret}&code=${newUrl[1]}`;

            fetch(`https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token${urlBody}`, {
                method: "GET",
                headers: {
                    "X-Requested-With": "XMLHttpRequest" 
                },
            })
                .then(response => response.text())
                .then(paramsString => {
                    let params = new URLSearchParams(paramsString);
                    const access_token = params.get("access_token");
                    const scope = params.get("scope");
                    const token_type = params.get("token_type");
            
                    return fetch(
                        `https://api.github.com/user`, {
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'token ' + access_token,
                            }
                        }
                    );
                })
                .then(response => response.json())
                .then(response => {
                    dispatch({
                        type: "LOGIN",
                        payload: { user: response, isLoggedIn: true }
                    });
                })
                .catch(error => {
                    setData({
                        isLoading: false,
                        errorMessage: JSON.stringify(error)
                    });
                });
        }
    }, [state, dispatch, data]);

    if (state.isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div className="login-container">
            {data.isLoading ? (
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
            ) : (
                <Container>
                    <Row>
                        <Col md={3} />
                        <Col md={6}>
                            <h1>Welcome</h1>
                            <span>{data.errorMessage}</span>
                        </Col>
                        <Col md={3} />
                    </Row>
                    <Row>
                        <Col md={3} />
                        <Col md={6}>
                            <Button 
                                variant="dark"
                                href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
                                onClick={() => {
                                    setData({ ...data, errorMessage: "" });
                                }}
                            >
                                <GithubIcon />
                                <span>Login with GitHub</span>
                            </Button>
                        </Col>
                        <Col md={3} />
                    </Row>
                </Container>
            )}
        </div>
    );
}

export default Login;