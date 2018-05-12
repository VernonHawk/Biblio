import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "reactstrap";

import AuthPage     from "components/AuthPage/AuthPage";
import MainPage     from "components/MainPage/MainPage";
import PrivateRoute from "components/Misc/PrivateRoute";
import GlobalAlert  from "components/GlobalAlert/GlobalAlert";
import Loader       from "components/Loader/Loader";

import "./App.css";

class App extends React.Component {

    state = {
        isAuthenticated: null,
        alert: null
    }

    componentDidMount() {
        const isAuthenticated = Boolean(localStorage.getItem("token"));

        this.setState({ isAuthenticated });
    }

    onAuth = () => this.setState({ isAuthenticated: true })

    onSignOut = () => {
        localStorage.removeItem("token");
        
        this.setState({ isAuthenticated: false });
    }

    onAlert = props => {
        this.setState({ alert: props });
    }

    render() {
        const { isAuthenticated, alert } = this.state;

        return isAuthenticated === null ? 
            <Loader /> :
        (
            <BrowserRouter>
                <Container fluid id="container-app">
                    <GlobalAlert alert={ alert } onAlert={ this.onAlert } />
                    <Switch>
                        <Route
                            path="/a"
                            render={ props =>
                                <AuthPage
                                    {...props}
                                    onAuth={ this.onAuth }
                                    onAlert={ this.onAlert }
                                />
                            }
                        />
                        <PrivateRoute
                            path="/"
                            isAuthenticated={ isAuthenticated }
                            render={ props =>
                                <MainPage
                                    {...props}
                                    onAlert={ this.onAlert }
                                    onSignOut={ this.onSignOut }
                                /> 
                            }
                        />
                    </Switch>
                </Container>
            </BrowserRouter>
        );
    }
}

export default App;