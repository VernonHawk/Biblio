import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { DragDropContextProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

import All     from "./All/All";
import Recent  from "./Recent/Recent";
import Starred from "./Starred/Starred";
import Archive from "./Archive/Archive";
import NotFound from "components/Common/NotFound";

const propTypes = {
    userId:  PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,

    onAlert:   PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

const routes = [{
    path: "/recent",
    component: Recent
},
{
    path: "/starred",
    component: Starred
},
{
    path: "/archive",
    component: Archive
},
{
    path: "/:folder?",
    component: All
}];

function BibliographyRouter({ userId, search, onAlert, onSignOut }) {
    const content = routes.map( ({ path, component: Component }) => 
        (
            <Route
                key={ path }
                exact path={ path }
                render={ props => 
                    <Component 
                        {...props} 
                        userId={userId} search={ search }
                        onAlert={onAlert} onSignOut={ onSignOut } 
                    /> }
            />
        ));

    return (
        <DragDropContextProvider backend={ Backend }>
            <Switch>
                { content }
                <Route component={ NotFound } />
            </Switch>
        </DragDropContextProvider>
    );
}

BibliographyRouter.propTypes = propTypes;

export default BibliographyRouter;