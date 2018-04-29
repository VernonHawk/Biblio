import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "reactstrap";

import AuthPage     from "components/AuthPage/AuthPage";
import MainPage     from "components/MainPage/MainPage";
import PrivateRoute from "components/Misc/PrivateRoute";
import GlobalAlert  from "components/GlobalAlert/GlobalAlert";
import Loader       from "components/Loader/Loader";

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

    onLogOut = () => {
        localStorage.removeItem("token");
        
        this.setState({ isAuthenticated: false });
    }

    onAlert = ({ type, msg }) => {
        this.setState({ alert: { type, msg }});
    }

    render() {
        const content = this.state.isAuthenticated === null ? 
             <Loader /> :
            (<BrowserRouter>
                <Container fluid className="h-100">
                    <GlobalAlert alert={this.state.alert} />
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
                            isAuthenticated={ this.state.isAuthenticated }
                            render={ props =>
                                <MainPage
                                    {...props}
                                    onAlert={ this.onAlert }
                                    onLogOut={ this.onLogOut }
                                /> 
                            }
                        />
                    </Switch>
                </Container>
            </BrowserRouter>);

        return content;
    }
}

export default App;