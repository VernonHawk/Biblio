import React from "react";
import { Route, Redirect } from "react-router-dom";

import PropTypes from "prop-types";

const propTypes = {
    component:       PropTypes.element.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={ props =>
                isAuthenticated ? 
                     <Component {...props} /> : 
                    (<Redirect
                        to={{
                            pathname: "/a/login",
                            state: { from: props.location }
                        }}
                    />)
            }
        />
    );
}

PrivateRoute.propTypes = propTypes;

export default PrivateRoute;