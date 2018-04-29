import React from "react";
import { Form } from "reactstrap";
import PropTypes from "prop-types";

import AuthFormGroup from "./AuthFormGroup";
import AuthButton    from "./AuthButton";

const propTypes = {
    params: PropTypes.arrayOf( PropTypes.shape({
        id:   PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
        help: PropTypes.string
    })),
    btnLabel: PropTypes.string.isRequired,
    errors: PropTypes.objectOf(PropTypes.string)
};

class AuthForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        for (const { id } of props.params) {
            this.state[id] = "";
        }
    }

    onSubmit = e => {
        e.preventDefault();

        this.props.onSubmit(this.state);
    }
    
    render() {
        const { params, btnLabel, errors } = this.props;

        const formGroups = [];

        for (const { id, ...rest } of params) {
            formGroups.push(
                <AuthFormGroup
                    key={id}
                    id={id}
                    value={this.state[id]}
                    onChange={ e => this.setState({ [id]: e.target.value })}
                    error={ errors[id].trim() }
                    {...rest}
                />
            );
        }

        return (
            <Form onSubmit={this.onSubmit}>
                {formGroups}

                <AuthButton label={btnLabel} className="mt-3" />
            </Form>
        );
    }
}

AuthForm.propTypes = propTypes;

export default AuthForm;