"use strict";

const jwt = require("jsonwebtoken");

function verifyJWToken(token) {
    return new Promise( (resolve, reject) => {
        jwt.verify(
            token, process.env.TOKEN_SECRET, 
            { algorithms: ["HS256"] },
            (err, decodedToken) => {
                if (err || !decodedToken) {
                    return reject(err);
                }

                return resolve(decodedToken);
            }
        );
    });
}

function createJWToken(props) {
    let payload = typeof props === "object" ? 
                  props : {};

    if (!payload.maxAge || typeof payload.maxAge !== "number") {
        payload.maxAge = 60 * 60; // seconds
    }

    const token = jwt.sign({
            data: payload.data
        }, 
        process.env.TOKEN_SECRET, 
        {
            expiresIn: payload.maxAge,
            algorithm: "HS256"
    });

    return token;
}

module.exports = exports = {
    verifyJWToken,
    createJWToken
};