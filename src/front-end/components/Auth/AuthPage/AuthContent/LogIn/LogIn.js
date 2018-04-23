import React from "react";
import { Link } from "react-router-dom";
import { CardBody, CardFooter } from "reactstrap";
import PropTypes from "prop-types";

import AuthForm from "../AuthForm/AuthForm";

import params from "./params.json";

const propTypes = {
    match:    PropTypes.object,
    location: PropTypes.object,
    history:  PropTypes.object,
};

class LogIn extends React.Component { 
    
    // Keeps error messages!
    state = {
        email: "",
        pass:  ""
    }

    onSubmit = val => {
        console.log(val);
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