import React from "react";
import { Alert, Row } from "reactstrap";
import PropTypes from "prop-types";

import alertTypes from "./alert-types.json";

const propTypes = {
    alert: PropTypes.shape({
        type: PropTypes.oneOf(Object.values(alertTypes)).isRequired,
        msg:  PropTypes.string.isRequired
    })
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

        this.setState({ visible: false });
    }

    render() {
        const newAlert = this.props.alert;

        if (newAlert) {
            return (
                <Row className="justify-content-center fixed-top">
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