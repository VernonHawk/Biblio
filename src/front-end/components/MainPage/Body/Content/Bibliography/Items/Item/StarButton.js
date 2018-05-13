import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

import Svg from "components/Common/Svg";

import icons from "assets/icons.json";

const propTypes = {
    isStarred: PropTypes.bool.isRequired
};

function StarButton({ isStarred, ...rest }) {
    const starIcon = {
        width:  20,
        height: 20,
        path:   isStarred ? icons["star-full"] : icons["star-empty"]
    };

    const title = isStarred ? "Remove from Starred" : "Add to Starred";

    return (
        <Button color="link" title={title} {...rest}>
            <Svg {...starIcon} style={{ fill: "#ffbf00" }}/>
        </Button>
        
    );
}

StarButton.propTypes = propTypes;

export default StarButton;