"use strict";

const jwt = require("jsonwebtoken");

const TokenError = require("../errors/TokenError");

const STD_TOKEN_AGE = 60 * 60; //seconds

function createJWToken(props) {
    let payload = typeof props === "object" ? props : {};

    if (!payload.maxAge || typeof payload.maxAge !== "number") {
        payload.maxAge = STD_TOKEN_AGE;
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

function decodeRequestToken(req) {
    const token = req.headers["authorization"] || req.body.token || req.query.token;
    
    return verifyJWToken(token)
        .catch( err => {
            const error = { cause: "token", message: err.message };

            throw new TokenError(error);
        });
}

const getJWToken = data => createJWToken({ data, maxAge: STD_TOKEN_AGE });

module.exports = exports = {
    verifyJWToken,
    createJWToken,
    decodeRequestToken,
    getJWToken
};