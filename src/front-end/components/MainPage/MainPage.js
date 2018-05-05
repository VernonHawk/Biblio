import React from "react";
import PropTypes from "prop-types";

import Header from "./Header/Header";
import Body   from "./Body/Body";

const propTypes = {
    // Injected by router
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
                <Body onAlert={ this.props.onAlert } />
            </React.Fragment>
        );
    }
}

MainPage.propTypes = propTypes;

export default MainPage;
