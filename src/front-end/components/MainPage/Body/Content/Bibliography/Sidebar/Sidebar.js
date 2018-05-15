import React from "react";
import PropTypes from "prop-types";

import SidebarButton  from "./SidebarButton";

const propTypes = {
    menu: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        func: PropTypes.func.isRequired
    }))).isRequired,
    selectedAmount: PropTypes.number.isRequired
};

function Sidebar({ menu, selectedAmount }) {
    let mode = [];

    switch (selectedAmount) {
        case 0:
            mode = menu.zero;
            break;
        case 1:
            mode = menu.one;
            break;
        default:
            mode = menu.many;
            break;
    } 

    const items = mode.map( option => (
        <SidebarButton key={ option.text } onClick={ option.func }>
            { option.text }
        </SidebarButton>
    ));
    
    return items;
}

Sidebar.propTypes = propTypes;

export default Sidebar;