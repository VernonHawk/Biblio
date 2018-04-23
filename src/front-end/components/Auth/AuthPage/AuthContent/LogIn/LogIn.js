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

    onAlert: PropTypes.func.isRequired
};

class LogIn extends React.Component { 
    
    // Keeps error messages!
    state = {
        email: "",
        pass:  ""
    }

    onSubmit = ({ email, pass }) => {
        fetch("/login", {
            method: "POST",
            body: JSON.stringify({ email, pass }),
            headers : {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then( resp => {
            if (!resp.ok) {
                throw new Error("Response is not ok");
            }

            return resp.json();
        })
        .then( json => {
            console.log(json);
        })
        .catch( err => {
            this.props.onAlert({ type: "danger", msg: err.message });
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