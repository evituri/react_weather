import React, { useState } from "react";
import { Toast } from "react-bootstrap";

const Error = (props) => {
    const [show, setShow] = useState(true);

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
            }}
        >
            {props.message !== "" && <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Header>
                    <strong className="mr-auto">Error</strong>
                </Toast.Header>
                <Toast.Body>{props.message}</Toast.Body>
            </Toast>}
        </div>
    );
};

export default Error;