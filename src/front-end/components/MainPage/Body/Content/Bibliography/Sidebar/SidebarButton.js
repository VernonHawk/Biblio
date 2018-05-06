import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

const propTypes = {
    children: PropTypes.node,
    onClick:  PropTypes.func.isRequired
};

function SidebarButton({ children, onClick }) {

    return (
        <div>
            <Button color="link" onClick={ onClick }>
                { children }
            </Button>
        </div>
    );
}

SidebarButton.propTypes = propTypes;

export default SidebarButton;