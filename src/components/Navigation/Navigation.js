import React from "react";
import { Button, Navbar, Nav } from "react-bootstrap";

const Navigation = (props) => (
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">React Weather</Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>
        <Navbar.Text>
            Signed in as: {props.login}
        </Navbar.Text>
        <Button
            className='ml-5'
            variant="secondary"
            onClick={props.logoutFunction}
        >
            <span>Logout</span>
        </Button>
    </Navbar>
);

export default Navigation;