import React from "react";
import { Link } from "react-router-dom";
import { CardBody, CardFooter } from "reactstrap";
import PropTypes from "prop-types";

import AuthForm from "../AuthForm/AuthForm";

import fetcher from "fetcher";

import alertTypes from "components/GlobalAlert/alert-types.json";
import params from "./params-login.json";

const propTypes = {
    match:    PropTypes.object,
    location: PropTypes.object,
    history:  PropTypes.object,

    onAuth:  PropTypes.func.isRequired,
    onAlert: PropTypes.func.isRequired
};

class LogIn extends React.Component { 
    
    // Keeps error messages
    state = {
        email: "",
        pass:  ""
    }

    onSubmit = data => {
        this.setState({ email: "", pass: "" });

        const acceptCodes = [400];
        const errorMsg = "A problem occured while trying to log you in. " +
                         "Sorry for this, try again later, please";

        return fetcher.post({ url: "/login", data, acceptCodes, errorMsg })
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
                        params={params}
                        btnLabel="Log In"
                        onSubmit={this.onSubmit}
                        errors={this.state}
                    />
                </CardBody>

                <CardFooter>
                    Do not have an account?
                    <Link to={"/a/signup"}> Sign up</Link>
                </CardFooter>
            </React.Fragment>
        );
    }
}

LogIn.propTypes = propTypes;

export default LogIn;