import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
    console.log("rest", rest);

    return (
        <Route
            {...rest}
            render={ props =>
                isAuthenticated ? 
                    <Component {...props} /> : 
                    ( 
                        <Redirect
                            to={{
                                pathname: "/a/login",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
}

export default PrivateRoute;