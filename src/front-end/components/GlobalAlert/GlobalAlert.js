import React from "react";
import { Alert, Row } from "reactstrap";
import PropTypes from "prop-types";

import alerts from "./alert-types.json";

import "./GlobalAlert.css";

const propTypes = {
    alert: PropTypes.shape({
        type: PropTypes.oneOf(Object.values(alerts)).isRequired,
        msg:  PropTypes.string.isRequired
    }),

    onAlert: PropTypes.func.isRequired
};

class GlobalAlert extends React.PureComponent {
    
    state = {
        visible: false
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.alert) {
            return { visible: Boolean(nextProps.alert.msg) };
        }

        return { visible: false };
    }

    componentDidUpdate() {
        if (this.state.visible) {
            this.dismissTimer = setTimeout(this.dismiss, 10000);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.dismissTimer);
    }

    dismiss = () => {
        clearTimeout(this.dismissTimer);

        this.props.onAlert(null);
    }
    
    render() {
        const newAlert = this.props.alert;

        if (newAlert) {
            return (
                <Row className="justify-content-center fixed-top alert-container">
                    <Alert
                        className="w-25 mt-3"
                        color={ newAlert.type }
                        isOpen={ this.state.visible }
                        toggle={ this.dismiss }
                    > 
                        { newAlert.msg }
                    </Alert>
                </Row>
            );
        } else {
            return null;
        }
    }  
}

GlobalAlert.propTypes = propTypes;

export default GlobalAlert;