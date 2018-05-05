import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Card } from "reactstrap";
import PropTypes from "prop-types";

import AuthHeader from "./AuthHeader";
import SignIn     from "./SignIn/SignIn";
import SignUp     from "./SignUp/SignUp";

const propTypes = {
    // Injected by router
    match:    PropTypes.object,
    location: PropTypes.object,
    history:  PropTypes.object,

    onAuth:  PropTypes.func.isRequired,
    onAlert: PropTypes.func.isRequired
};

function AuthContent({ match: { url }, onAuth, onAlert }) {
    return (
        <Card className="align-self-center border-warning">
            <AuthHeader />
            <Switch>
                <Route
                    exact path={`${url}/signup`}
                    render={ props =>
                        <SignUp
                            {...props}
                            onAuth={ onAuth }
                            onAlert={ onAlert }
                        /> 
                    }  
                />
                <Route
                    exact path={`${url}/signin`}
                    render={ props =>
                        <SignIn
                            {...props}
                            onAuth={ onAuth }
                            onAlert={ onAlert }
                        />
                    } 
                />
                <Redirect to={`${url}/signup`} />
            </Switch>
        </Card>
    );
}

AuthContent.propTypes = propTypes;

export default AuthContent;