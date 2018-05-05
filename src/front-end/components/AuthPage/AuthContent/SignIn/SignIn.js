import React from "react";
import { Link } from "react-router-dom";
import { CardBody, CardFooter } from "reactstrap";
import PropTypes from "prop-types";

import AuthForm from "../AuthForm/AuthForm";

import fetcher from "fetcher";

import alertTypes from "components/GlobalAlert/alert-types.json";
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
        const errorMsg = "A problem occured while trying to sign you in. " +
                         "Sorry for this, try again later, please";

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
                this.props.onAlert({ type: alertTypes.DANGER, msg: err.message });
            });
    }

    render() {
        return (
            <React.Fragment>
                <CardBody>
                    <AuthForm 
                        params={ params }
                        btnLabel="Sign In"
                        onSubmit={ this.onSubmit }
                        errors={ this.state }
                    />
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