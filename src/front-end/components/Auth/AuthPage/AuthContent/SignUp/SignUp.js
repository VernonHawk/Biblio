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

class SignUp extends React.Component {

    // Keeps error messages!
    state = {
        name:  "",
        email: "",
        pass:  ""
    }
    
    onSubmit = form => {
        const validation = this.getStateAfterValidation(form);

        this.setState(validation.newState);

        if (validation.valid) {
            fetch("/signup", {
                method: "POST",
                body: JSON.stringify({ name: form.name, email: form.email, pass: form.pass }),
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
            .catch( err => console.error(err) );
        }
    }

    getStateAfterValidation = ({ name: fullName, email, pass }) => {
        const newState = { 
            name:  "",
            email: "",
            pass:  "" 
        };

        let valid = true;

        if (!fullName.trim().length) {
            newState.name = "Name can't consist only of whitespaces";
            valid = false;
        }
        
        if (pass.length < 6) {
            newState.pass = "Password is too short";
            valid = false;
        } else if (pass.length > 50) {
            newState.pass = "Password is too long";
            valid = false;
        }

        // TODO: send request to check if email is taken
        const emailTaken = false;

        if (emailTaken) {
            newState.email = "This email is already taken";
            valid = false;
        }

        return { newState, valid };
    }

    render() {

        return (
            <React.Fragment>
                <CardBody>
                    <AuthForm 
                        params={params}
                        btnLabel="Sign Up"
                        onSubmit={this.onSubmit}
                        errors={this.state}
                    />
                </CardBody>

                <CardFooter>
                    Already have an account?
                    <Link to={"/a/login"}> Log in</Link>
                </CardFooter>
            </React.Fragment>
        );
    }
}

SignUp.propTypes = propTypes;

export default SignUp;