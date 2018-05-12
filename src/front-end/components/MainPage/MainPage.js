import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Header from "./Header/Header";
import Body   from "./Body/Body";
import Loader from "components/Loader/Loader";

import fetcher from "fetcher";

import errors from "assets/errorMessages.json";
import alerts from "components/GlobalAlert/alert-types.json";

const propTypes = {
    // Injected by router
    match:    PropTypes.object,
    location: PropTypes.object,
    history:  PropTypes.object,

    onAlert:   PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

class MainPage extends React.Component {

    // user data
    state = {
        id: null,
        username: null
    }

    componentDidMount() {
        const acceptCodes = [400, 403];
        const errorMsg = errors.LOAD_DATA;

        return fetcher.get({ url: "/user", acceptCodes, errorMsg })
            .then( json => { // error || { id, username, token }
                const error = json.error;
                
                if (error) {
                    this.props.onSignOut();

                    this.props.onAlert({ type: alerts.WARNING, msg: errors.TOKEN_EXPIRED });
                } else {
                    const { id, username, token } = json;

                    localStorage.setItem("token", token);

                    this.setState({ id, username });
                }
            })
            .catch( () => {
                this.props.onAlert({ type: alerts.DANGER, msg: errorMsg });
            });
    }

    onSearch = val => {
        console.log("SEARCH", val);
    }

    render() {
        const { username, id } = this.state;

        return (!username || !id) ? 
            <Loader /> :
        (
            <Fragment>
                <Header 
                    username={ username }
                    onSearch={ this.onSearch } 
                    onSignOut={ this.props.onSignOut } 
                />
                <Body 
                    userId={ id } 
                    onAlert={ this.props.onAlert } 
                />
            </Fragment>
        );
    }
}

MainPage.propTypes = propTypes;

export default MainPage;
