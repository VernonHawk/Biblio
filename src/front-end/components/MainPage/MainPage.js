import React from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

import Header       from "./Header/Header";
import Menu         from "./Menu/Menu";
import Bibliography from "./Content/Bibliography";

import Starred  from "./Content/Starred";
import Archive  from "./Content/Archive";
import Profile  from "./Content/Profile";
import NotFound from "components/Misc/NotFound";

const propTypes = {
    match:    PropTypes.object,
    location: PropTypes.object,
    history:  PropTypes.object,

    onAlert:   PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

class MainPage extends React.Component {

    onSearch = val => {
        console.log("SEARCH", val);
    }

    render() {
        return (
            <React.Fragment>
                <Header 
                    username="Igor Morenec" 
                    onSearch={ this.onSearch } 
                    onSignOut={ this.props.onSignOut } 
                />
                <Menu />
                <Bibliography />
            </React.Fragment>
        );
    }
}

/*
<Switch>
    <Route exact path="/"        component={Main}    />
    <Route exact path="/starred" component={Starred} />
    <Route exact path="/archive" component={Archive} />
    <Route exact path="/profile" component={Profile} />
    <Route component={NotFound} />
</Switch>
*/

MainPage.propTypes = propTypes;

export default MainPage;
