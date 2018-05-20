import React from "react";
import PropTypes from "prop-types";

import ParamRow from "../ParamRow";
import { updateUser } from "../ProfileHelper";

import errors  from "assets/errorMessages.json";
import success from "assets/successMessages.json";

import params from "./params-username.json";

const propTypes = {
    value: PropTypes.string.isRequired,

    onDataUpdate: PropTypes.func.isRequired,
    onSignOut:    PropTypes.func.isRequired,
    onAlert:      PropTypes.func.isRequired
};

class UsernameRow extends React.Component {

    // errors
    state = {
        isOpen: false,

        username: ""
    }

    onSubmit = data => {
        const { newState, valid } = this.getStateAfterValidation(data);

        this.setState(newState);
        
        if (valid) {
            const errorMsg = errors.CHANGE_USERNAME;
            const succMsg  = success.USERNAME_CHANGED;

            return updateUser({ data, errorMsg, succMsg, 
                                toggle: this.toggle, setState: this.setState,
                                ...this.props });
        }
    }

    getStateAfterValidation = ({ username }) => {
        const newState = { 
            username:  ""
        };

        let valid = true;
        
        if (!username || !username.trim()) {
            newState.username = "Username can't be empty or consist only of whitespaces";

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

UsernameRow.propTypes = propTypes;

export default UsernameRow;