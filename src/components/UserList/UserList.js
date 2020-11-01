import React from "react";
import { Table } from "react-bootstrap";

const Navigation = (props) => (
    <Table striped bordered hover variant="dark">
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
            </tr>
        </thead>
        <tbody>
            {props.users.sort((a, b) => (a.name.firstname > b.name.firstname) ? 1 : -1).map((user, i) => (
                <tr key={i}>
                    <td>{user.name.firstname}</td>
                    <td>{user.name.lastname}</td>
                    <td>{user.username}</td>
                </tr>
            ))}
        </tbody>
    </Table>
);

export default Navigation;