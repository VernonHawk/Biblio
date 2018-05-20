import React from "react";
import PropTypes from "prop-types";
import { 
    Row, Col, Button, Collapse
} from "reactstrap";

import GenericForm from "components/GenericForm/GenericForm";

const propTypes = {
    value:  PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    params: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    errors: PropTypes.objectOf(PropTypes.string).isRequired,

    toggle:   PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

function ParamRow({ value, isOpen, params, toggle, ...rest }) {
    const param = params[0].id;
    const values = params[0].type === "password" ? 
                    {} : 
                    { [param]: value };
    
    return (
        <Row>
            <Col xs="3">
                { param[0].toUpperCase() + param.slice(1) }
            </Col>  
            <Col xs="6">
                { !isOpen && value }
                <Collapse isOpen={ isOpen }>
                    <GenericForm 
                        params={ params }
                        values={ values }
                        {...rest}
                    >
                        <Button color="success" className=" mb-1">
                            Save
                        </Button>
                    </GenericForm>
                </Collapse>
            </Col>  
            <Col xs="3" >
                <Button 
                    color="link" 
                    className="float-right pt-0"
                    onClick={ toggle }
                >
                    { isOpen ? "Cancel" : "Edit" }
                </Button>
            </Col>  
        </Row> 
    );
}

ParamRow.propTypes = propTypes;

export default ParamRow;