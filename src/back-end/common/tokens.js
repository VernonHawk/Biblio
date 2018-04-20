"use strict";

const jwt = require("jsonwebtoken");

function verifyJWToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err);
            }

            resolve(decodedToken);
        });
    });
}

function createJWToken(details) {
    let newDetails = details;
    
    if (typeof details !== "object") {
        newDetails = {};
    }

    if (!newDetails.maxAge || typeof newDetails.maxAge !== "number") {
        newDetails.maxAge = 3600;
    }

    const token = jwt.sign({
            data: newDetails.sessionData
        }, 
        process.env.TOKEN_SECRET, 
        {
            expiresIn: newDetails.maxAge,
            algorithm: "HS256"
    });

    return token;
}

module.exports = exports ={
    verifyJWToken,
    createJWToken
};