import React from "react";
import { Row } from "reactstrap";
import { Link } from "react-router-dom";

import Svg from "components/Misc/Svg";

import "./Brand.css";
import { book } from "assets/icons.json";

function Brand() {
    const icon = {
        width:  36,
        height: 36,
        path:   book
    };

    return (
        <Link to="/" id="brand" className="navbar-brand">
            <Row>
                <Svg {...icon} />
                <h2>Biblio</h2>
            </Row>
        </Link>
    );
}

export default Brand;