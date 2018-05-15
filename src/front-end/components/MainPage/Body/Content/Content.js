import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";

import BibliographyRouter from "./Bibliography/BibliographyRouter";
import Profile from "./Profile/Profile";

const propTypes = {
    userId:  PropTypes.string.isRequired,

    onAlert:   PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

function Content({ userId, onAlert, onSignOut }) {
    return (
        <div className="h-100 pl-3 pt-4">
            <Switch>
                <Route
                    exact
                    path="/profile"
                    render={ props => 
                        <Profile {...props} userId={userId} 
                                    onAlert={onAlert} onSignOut={ onSignOut } 
                        /> }
                />
                <Route
                    path="/"
                    render={ props => 
                        <BibliographyRouter 
                            {...props} userId={userId} 
                            onAlert={onAlert} onSignOut={ onSignOut } 
                        /> }
                />
            </Switch>
        </div>
    );
}

Content.propTypes = propTypes;

export default Content;