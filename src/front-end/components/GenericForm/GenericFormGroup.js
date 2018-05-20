import React from "react";
import { Col, FormGroup, Label, Input, FormText, FormFeedback } from "reactstrap";
import PropTypes from "prop-types";

const propTypes = {
    id:    PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    label: PropTypes.string,
    help:  PropTypes.string,
    error: PropTypes.string
};

function GenericFormGroup({ id, label, help, error, ...rest }) {
    return (
        <FormGroup row>
            { label && <Label for={id} sm={3}>{ label }</Label> }
            <Col sm={9}>
                <Input 
                    id={id}
                    invalid={ Boolean(error) }
                    {...rest} 
                />
                { error && <FormFeedback>{ error }</FormFeedback> }
                { help && <FormText>{ help }</FormText> }
            </Col>
        </FormGroup>
    );
}

GenericFormGroup.propTypes = propTypes;

export default GenericFormGroup;