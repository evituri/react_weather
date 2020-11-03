import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../Router";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import Navigation from "../../components/Navigation/Navigation";
import UserList from "../../components/UserList/UserList";
import Map from "../../components/Map/Map";


const Home = () => {
    const { state, dispatch } = useContext(AuthContext);
    const [data, setData] = useState({ users: [], isLoading: true, selectedIndex: -1 });

    if (!state.isLoggedIn) {
        return <Redirect to="/login" />;
    }

    useEffect(async () => {
        fetch(`https://fakestoreapi.com/users`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((users) => {
                const userList = users.map((user) => Object.assign(user, {selected: false}));
                setData({
                    ...data,
                    isLoading: false,
                    users: userList,
                });
            })
    }, []);

    const { login } = state.user

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT"
        });
    }

    const userSelected = (index) => {
        setData({
            ...data, 
            selectedIndex: (data.selectedIndex !== index) ? index : -1
        })
    }

    return (
        <>
            <Navigation login={login} logoutFunction={() => handleLogout()}></Navigation>
            {!data.isLoading ? 
                <Container>
                    <UserList users={data.users} rowClicked={userSelected} selectedIndex={data.selectedIndex}></UserList>
                    <Map users={data.users} selectedIndex={data.selectedIndex}></Map>
                </Container> : 
                <Container>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </Container>
            }
        </>
    );
}

export default Home;