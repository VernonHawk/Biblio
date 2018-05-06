import React from "react";
import { Row, Button } from "reactstrap";

function AuthButton({ label, ...rest }) {
    return (
        <Row className="justify-content-center">
            <Button {...rest} outline color="success">{label}</Button>
        </Row>
    );
}

export default AuthButton;