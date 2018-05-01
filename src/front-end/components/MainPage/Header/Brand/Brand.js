import React from "react";
import { Row } from "reactstrap";
import { Link } from "react-router-dom";

import Svg from "components/Misc/Svg";

import "./Brand.css";
import icon from "./icon-book.json";

function Brand() {
    return (
        <Link to="/" id="brand" className="navbar-brand no-link-decoration">
            <Row>
                <Svg {...icon} />
                <h2>Biblio</h2>
            </Row>
        </Link>
    );
}

export default Brand;