import React from "react";
import { Link } from "react-router-dom";
import { CardBody, CardFooter } from "reactstrap";
import PropTypes from "prop-types";

import GenericForm from "components/GenericForm/GenericForm";
import AuthButton  from "../AuthButton";

import fetcher from "fetcher";

import errors from "assets/errorMessages.json";
import alerts from "components/GlobalAlert/alert-types.json";
import params from "./params-signin.json";

const propTypes = {
    // Injected by router
    match:    PropTypes.object,
    location: PropTypes.object,
    history:  PropTypes.object,

    onAuth:  PropTypes.func.isRequired,
    onAlert: PropTypes.func.isRequired
};

class SignIn extends React.Component { 
    
    // Keeps error messages
    state = {
        email: "",
        pass:  ""
    }

    onSubmit = data => {
        this.setState({ email: "", pass: "" });

        const acceptCodes = [400];
        const errorMsg = errors.SIGN_IN;

        return fetcher.post({ url: "/signin", data, acceptCodes, errorMsg })
            .then( json => {
                const error = json.error;
                
                if (error) {
                    this.setState({ [error.cause]: error.message });
                } else {
                    localStorage.setItem("token", json.token);

                    this.props.onAuth();
                }
            })
            .catch( err => {
                this.props.onAlert({ type: alerts.DANGER, msg: err.message });
            });
    }

    render() {
        return (
            <React.Fragment>
                <CardBody>
                    <GenericForm 
                        params={ params }
                        onSubmit={ this.onSubmit }
                        errors={ this.state }
                    >
                        <AuthButton label="Sign In" className="mt-3" />
                    </GenericForm>
                </CardBody>

                <CardFooter>
                    Do not have an account?
                    <Link to="/a/signup"> Sign up</Link>
                </CardFooter>
            </React.Fragment>
        );
    }
}

SignIn.propTypes = propTypes;

export default SignIn;