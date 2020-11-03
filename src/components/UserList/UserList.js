import React from "react";
import { Table, ListGroup, Button } from "react-bootstrap";
import './_UserList.scss';
import Weather from "../Weather/Weather";

const Navigation = (props) => {
    return (
        <div className="user-list">
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
                        <>
                            <tr className={((props.selectedIndex !== -1) && (props.selectedIndex !== i)) ? "dimmed" : ''} key={i} onClick={() => props.rowClicked(i)}>
                                <td>{user.name.firstname}</td>
                                <td>{user.name.lastname}</td>
                                <td>{user.username}</td>
                            </tr>
                            <tr>
                                <td className="data-row" colSpan="3">
                                    <div className="data-container" style={{maxHeight: props.selectedIndex === i ? '300px' : '0'}}>
                                        <ListGroup className="user-data">
                                            <ListGroup.Item variant="dark">E-mail: {user.email}</ListGroup.Item>
                                            <ListGroup.Item variant="dark">First Name: {user.name.firstname}</ListGroup.Item>
                                            <ListGroup.Item variant="dark">Last Name: {user.name.lastname}</ListGroup.Item>
                                            <ListGroup.Item variant="dark">Address: {`${user.address.street} ${user.address.number}, ${user.address.zipcode} ${user.address.city}`}</ListGroup.Item>
                                            <ListGroup.Item variant="dark">Phone: {user.phone}</ListGroup.Item>
                                        </ListGroup>
                                        <div className="weather-container">
                                            <Weather user={user}></Weather>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </Table>
        </div>
    )
};

export default Navigation;