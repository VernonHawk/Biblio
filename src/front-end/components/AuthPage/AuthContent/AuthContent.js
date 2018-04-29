import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Card } from "reactstrap";
import PropTypes from "prop-types";

import AuthHeader from "./AuthHeader";
import LogIn      from "./LogIn/LogIn";
import SignUp     from "./SignUp/SignUp";

const propTypes = {
    match:    PropTypes.object,
    location: PropTypes.object,
    history:  PropTypes.object,

    onAuth:  PropTypes.func.isRequired,
    onAlert: PropTypes.func.isRequired
};

class AuthContent extends React.PureComponent {
    
    render() {
        const url = this.props.match.url;

        return (
            <Card className="align-self-center border-warning">
                <AuthHeader />
                <Switch>
                    <Route
                        exact path={`${url}/signup`}
                        render={ props =>
                            <SignUp
                                {...props}
                                onAuth={ this.props.onAuth }
                                onAlert={ this.props.onAlert }
                            /> 
                        }  
                    />
                    <Route
                        exact path={`${url}/login`}
                        render={ props =>
                            <LogIn
                                {...props}
                                onAuth={ this.props.onAuth }
                                onAlert={ this.props.onAlert }
                            />
                        } 
                    />
                    <Redirect to={`${url}/signup`} />
                </Switch>
            </Card>
        );
    }
}

AuthContent.propTypes = propTypes;

export default AuthContent;