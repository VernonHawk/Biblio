import React from "react";
import PropTypes from "prop-types";

import ParamRow from "../ParamRow";
import { updateUser } from "../ProfileHelper";

import errors  from "assets/errorMessages.json";
import success from "assets/successMessages.json";

import params from "./params-password.json";

const propTypes = {
    value: PropTypes.string.isRequired,

    onDataUpdate: PropTypes.func.isRequired,
    onSignOut:    PropTypes.func.isRequired,
    onAlert:      PropTypes.func.isRequired
};

class PasswordRow extends React.Component {

    // errors
    state = {
        isOpen: false,

        password:       "",
        repeatPassword: ""
    }

    onSubmit = form => {
        const { newState, valid } = this.getStateAfterValidation(form);

        this.setState(newState);
        
        if (valid) {
            const errorMsg = errors.CHANGE_PASSWORD;
            const succMsg  = success.PASSWORD_CHANGED;

            const data = { pass: form.password };

            return updateUser({ data, errorMsg, succMsg, 
                                toggle: this.toggle, setState: this.setState,
                                ...this.props });
        }
    }

    getStateAfterValidation = ({ password, repeatPassword }) => {
        const newState = { 
            password:       "",
            repeatPassword: ""
        };

        let valid = true;

        if (!password || !password.trim()) {
            newState.password = "Password can't be empty or consist only of whitespaces";

            valid = false;
        } else if (password.length < 6) {
            newState.pass = "New password is too short";

            valid = false;
        } else if (password.length > 50) {
            newState.pass = "New password is too long";

            valid = false;
        }

        if (password !== repeatPassword) {
            newState.repeatPassword = "Passwords do not match";

            valid = false;
        }

        return { newState, valid };
    }

    toggle = () => this.setState( prevState => ({ isOpen: !prevState.isOpen }) )

    render() {
        const { isOpen, ...errs } = this.state;

        return (
            <ParamRow
                isOpen={ isOpen }
                toggle={ this.toggle }
                params={ params }
                value={ this.props.value }
                errors={ errs }
                onSubmit={ this.onSubmit }
            />
        );
    }
}

PasswordRow.propTypes = propTypes;

export default PasswordRow;