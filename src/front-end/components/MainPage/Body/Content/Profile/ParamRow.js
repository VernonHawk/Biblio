import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, Collapse, Form, FormGroup, Input, Label } from "reactstrap";

const propTypes = {
    param: PropTypes.string,
    type:  PropTypes.string,
    value: PropTypes.string,

    onAlert: PropTypes.func
};

class ParamRow extends React.Component {

    state = {
        isEditing: false
    }

    toggle = () => this.setState( prevState => ({ isEditing: !prevState.isEditing }) )

    render() {
        const isEditing = this.state.isEditing;
        const { param, value, type } = this.props;

        return (
            <Row>
                <Col xs="3">
                    { param }
                </Col>  
                <Col xs="6">
                    { !isEditing && value }
                    <Collapse isOpen={isEditing}>
                        <Form>
                            <FormGroup>
                                <Label>{ param }</Label>
                                <Input
                                    id={ param }
                                    type={ type }
                                    value={ value }
                                    onChange={ () => console.log(`${param} change`) }
                                    required
                                />
                            </FormGroup>
                            <Button color="success">Save</Button>
                        </Form>
                    </Collapse>
                </Col>  
                <Col xs="3" >
                    <Button 
                        color="link" 
                        className="float-right pt-0"
                        onClick={ this.toggle }
                    >
                        { isEditing ? "Cancel" : "Edit" }
                    </Button>
                </Col>  
            </Row> 
        );
    }
}

ParamRow.propTypes = propTypes;

export default ParamRow;