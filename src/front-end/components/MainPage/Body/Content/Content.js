import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";

import BibliographyRouter from "./Bibliography/BibliographyRouter";
import Profile from "./Profile/Profile";

const propTypes = {
    userId:  PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,

    onAlert:   PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

const routes = [{
    path: "/profile",
    exact: true,
    component: Profile
},
{
    path: "/",
    exact: false,
    component: BibliographyRouter
}];

function Content({ userId, search, onAlert, onSignOut }) {
    const content = routes.map( ({ path, exact, component: Component }) => 
        (
            <Route
                key={ path }
                exact={ exact }
                path={ path }
                render={ props => 
                    <Component 
                        {...props} 
                        userId={userId} search={ search }
                        onAlert={onAlert} onSignOut={ onSignOut } 
                    /> }
            />
        ));

    return (
        <div className="h-100 pl-3 pt-4">
            <Switch>
                { content }
            </Switch>
        </div>
    );
}

Content.propTypes = propTypes;

export default Content;