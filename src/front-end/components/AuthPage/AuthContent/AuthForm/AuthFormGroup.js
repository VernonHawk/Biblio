import React from "react";
import { Col, FormGroup, Label, Input, FormText, FormFeedback } from "reactstrap";
import PropTypes from "prop-types";

const propTypes = {
    id:    PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    label: PropTypes.string.isRequired,
    help:  PropTypes.string,
    error: PropTypes.string
};

function AuthFormGroup({ id, label, help, error, ...rest }) {
    return (
        <FormGroup row>
            <Label for={id} sm={3}>{ label }</Label>
            <Col sm={9}>
                <Input 
                    id={id} required 
                    size="40" maxLength={50} 
                    invalid={ Boolean(error) }
                    {...rest} 
                />
                { error && <FormFeedback>{ error }</FormFeedback> }
                { help && <FormText>{ help }</FormText> }
            </Col>
        </FormGroup>
    );
}

AuthFormGroup.propTypes = propTypes;

export default AuthFormGroup;