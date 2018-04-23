import React from "react";
import { Col, FormGroup, Label, Input } from "reactstrap";

function AuthFormGroup({ id, label, ...rest }) {
    return (
        <FormGroup row>
            <Label for={id} sm={3}>{ label }</Label>
            <Col sm={9}>
                <Input 
                    required 
                    size="40" 
                    maxLength={50} 
                    {...rest} 
                />
            </Col>
        </FormGroup>
    );
}

export default AuthFormGroup;