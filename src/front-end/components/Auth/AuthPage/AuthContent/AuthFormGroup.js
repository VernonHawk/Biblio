import React from "react";
import { Col, FormGroup, Label } from "reactstrap";

import AuthInput from "./AuthInput";

function AuthFormGroup({ id, label, ...rest }) {
    return (
        <FormGroup row>
            <Label for={id} sm={4}>{label}</Label>
            <Col sm={8}>
                <AuthInput id={id} {...rest} />
            </Col>
        </FormGroup>
    );
}

export default AuthFormGroup;