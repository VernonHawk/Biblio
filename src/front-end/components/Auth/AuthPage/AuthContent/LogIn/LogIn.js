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

    onAlert: PropTypes.func.isRequired
};

class LogIn extends React.Component { 
    
    // Keeps error messages
    state = {
        email: "",
        pass:  ""
    }

    onSubmit = data => {
        fetcher.post({ url: "/login", data })
            .then( resp => {
                if (!resp.ok) {
                    throw new Error("A problem occured while trying to log you in. " +
                                    "Sorry for this, try again later, please");
                }

                return resp.json();
            })
            .then( json => {
                console.log(json);
                // save jwt to localStorage
                // call auth function of App component
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