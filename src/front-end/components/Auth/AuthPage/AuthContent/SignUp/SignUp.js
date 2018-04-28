import React from "react";
import { Link } from "react-router-dom";
import { CardBody, CardFooter } from "reactstrap";
import PropTypes from "prop-types";

import AuthForm from "../AuthForm/AuthForm";

import fetcher from "fetcher";

import alertTypes from "components/GlobalAlert/alert-types.json";
import params from "./params-signup.json";

const propTypes = {
    match:    PropTypes.object,
    location: PropTypes.object,
    history:  PropTypes.object,

    onAlert: PropTypes.func.isRequired
};

class SignUp extends React.Component {

    // Keeps error messages
    state = {
        name:  "",
        email: "",
        pass:  ""
    }
    
    onSubmit = data => {
        this.getStateAfterValidation(data)
            .then( ({ newState, valid }) => {
                this.setState(newState);
        
                if (valid) {
                    fetcher.post({ url: "/signup", data })
                        .then( resp => {
                            if (!resp.ok) {
                                throw new Error("A problem occured while trying to sign you up. " +
                                                "Sorry for this, try again later, please");
                            }
                
                            return resp.json();
                        })
                        .then( json => {
                            console.log(json);
                            // save jwt to localStorage
                            // call auth function of App component 
                        });
                }
            })
            .catch( err => {
                this.props.onAlert({ type: alertTypes.DANGER, msg: err.message });
            });
    }

    getStateAfterValidation = ({ name: fullName, email, pass }) => {
        const newState = { 
            name:  "",
            email: "",
            pass:  "" 
        };
        
        function validateEmail() {
            return fetch(`/userByEmail/${email}`)
                    .then( resp => {
                        if (!resp.ok) {
                            throw new Error("There were some problems. " +
                                            "Sorry for this, try again later, please");
                        }

                        return resp.json();
                    })
                    .then( user => {
                        if (user) {
                            newState.email = "This email is already taken";
                            
                            return Promise.resolve(false);
                        }

                        return Promise.resolve(true);
                    })
                    .catch( err => Promise.reject(err) );
        }
        
        function validateName() {
            return new Promise( resolve => {
                if (!fullName.trim().length) {
                    newState.name = "Name can't consist only of whitespaces";

                    return resolve(false);
                }

                return resolve(true);
            });
        }
        
        function validatePassword() {
            return new Promise( resolve => {
                if (pass.length < 6) {
                    newState.pass = "Password is too short";

                    return resolve(false);
                } else if (pass.length > 50) {
                    newState.pass = "Password is too long";

                    return resolve(false);
                }

                return resolve(true);
            });
        }

        return Promise.all([validateEmail(), validateName(), validatePassword()])
            .then( results => ({ newState, valid: results.every(res => res) }) );
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