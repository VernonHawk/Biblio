import React from "react";
import { CardHeader } from "reactstrap";

function AuthHeader() {
    return (
        <CardHeader className="text-center">
            <h2 className="text-warning">Biblio</h2>
            <h5>Your personal bibliography manager</h5>
        </CardHeader>
    );
}

export default AuthHeader;