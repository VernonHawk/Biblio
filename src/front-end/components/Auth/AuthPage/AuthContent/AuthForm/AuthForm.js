import React from "react";
import { Form } from "reactstrap";
import PropTypes from "prop-types";

import AuthFormGroup from "./AuthFormGroup";
import AuthButton    from "./AuthButton";

const propTypes = {
    params: PropTypes.arrayOf( PropTypes.shape({
        id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number]).isRequired
    })),
    btnLabel: PropTypes.string.isRequired
};

class SignUp extends React.Component {

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
        const { params, btnLabel } = this.props;

        const formGroups = [];

        for (const { id, ...rest } of params) {
            formGroups.push(
                <AuthFormGroup
                    key={id}
                    value={this.state[id]}
                    onChange={ e => this.setState({ [id]: e.target.value })}
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

SignUp.propTypes = propTypes;

export default SignUp;