import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "reactstrap";

import Loader from "components/Loader/Loader";

import UsernameRow from "./UsernameRow/UsernameRow";
import EmailRow    from "./EmailRow/EmailRow";
import PasswordRow from "./PasswordRow/PasswordRow";

import fetcher from "fetcher";

import errors from "assets/errorMessages.json";
import alerts from "components/GlobalAlert/alert-types.json";

const propTypes = {
    onAlert:   PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

class Profile extends React.Component {

    state = {
        username: null,
        email: null
    }

    componentDidMount() {
        this.getUserData();
    }

    onParamChange = () => this.getUserData();

    getUserData = () => {
        const { onSignOut, onAlert } = this.props;
        const acceptCodes = [400, 403];
        const errorMsg = errors.LOAD_DATA;

        return fetcher.get({ url: "user", acceptCodes, errorMsg })
            .then( json => { // error || { username, email, token }
                const error = json.error;
                
                if (error) {
                    onSignOut();

                    onAlert({ type: alerts.WARNING, msg: errors.TOKEN_EXPIRED });
                } else {
                    const { username, email, token } = json;

                    localStorage.setItem("token", token);
                    
                    this.setState({ username, email });
                }
            })
            .catch( () => onAlert({ type: alerts.DANGER, msg: errorMsg }) );
    }

    render() {
        const { username, email } = this.state;
        const { onSignOut, onAlert } = this.props;

        const rows = [
            {
                component: UsernameRow,
                value: username
            },
            {
                component: EmailRow,
                value: email
            },
            {
                component: PasswordRow,
                value: "**********"
            }
        ];

        if (!username || !email) {
            return <Loader />;
        }

        const general = rows.map( ({ component: Component, value }) => 
            <Component 
                key={ Component }
                value={ value }
                onDataUpdate={ () => this.getUserData() } 
                onSignOut={ onSignOut }
                onAlert={ onAlert }
            />
        );

        return (
            <div className="w-75">
                <h4>My Profile</h4>
                <hr className="border-dark" />

                <div>
                    <h5>General</h5>
                    <hr />
                    { general }
                </div>

                <div className="mt-5">
                    <h5 className="text-danger">Danger zone</h5>
                    <hr className="border-danger" />
                    <Row>
                        <Col xs="4">Delete my account</Col>
                        <Col xs="8">
                            <Button 
                                color="link" 
                                className="text-danger float-right pt-0"
                                onClick={ () => console.log("show warning modal") }
                            >
                                Delete
                            </Button>
                        </Col>
                    </Row>
                    <i>Your data will be gone forever</i>
                </div>
            </div>
        );
    }
}

Profile.propTypes = propTypes;

export default Profile;