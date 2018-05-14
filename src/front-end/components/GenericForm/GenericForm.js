import React from "react";
import { Form } from "reactstrap";
import PropTypes from "prop-types";

import GenericFormGroup from "./GenericFormGroup";

const propTypes = {
    params: PropTypes.arrayOf( PropTypes.shape({
        id:   PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
        help: PropTypes.string
    })),
    values: PropTypes.object,
    errors: PropTypes.objectOf(PropTypes.string)
};

const defaultProps = {
    params: [],
    values: {},
    errors: {}
};

class GenericForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        for (const { id } of props.params) {
            this.state[id] = props.values[id] || "";
        }
    }

    onSubmit = e => {
        e.preventDefault();

        this.props.onSubmit(this.state);
    }
    
    render() {
        const { params, errors, children } = this.props;

        const formGroups = [];

        for (const { id, ...rest } of params) {
            formGroups.push(
                <GenericFormGroup
                    key={id}
                    id={id}
                    value={ this.state[id] }
                    onChange={ e => this.setState({ [id]: e.target.value })}
                    error={ errors[id] && errors[id].trim() }
                    {...rest}
                />
            );
        }

        return (
            <Form onSubmit={ this.onSubmit }>
                { formGroups }
                { children }
            </Form>
        );
    }
}

GenericForm.propTypes = propTypes;
GenericForm.defaultProps = defaultProps;

export default GenericForm;