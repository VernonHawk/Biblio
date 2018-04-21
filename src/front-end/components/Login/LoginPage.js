import React from "react";
import { Redirect } from "react-router-dom";

export default class LoginPage extends React.Component {

    state = {
        redirectToReferrer: false
    };

    login = () => {
        this.props.onLogin();
        this.setState({ redirectToReferrer: true });
    };
    
    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };

        if (this.state.redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <button onClick={this.login}>Log in</button>
            </div>
        );
    }
}
