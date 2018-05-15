"use strict";

const express = require("express");

const { getById } = require("../DAL/UserDAL");

const { getJWToken, decodeRequestToken } = require("../common/tokens");

const TokenError = require("../errors/TokenError");

const router = express.Router();

router.get("/", (req, res) => {
    let error = {};

    decodeRequestToken(req)
        .then( ({ data }) => getById(data) )
        .then( ({ _id, username }) => 
            res.status(200).json({
                id: _id, username, token: getJWToken(_id)
            })
        )
        .catch( err => {
            if (err instanceof TokenError) {
                error = { cause: err.cause, message: err.message };

                return res.status(403).json({ error });
            }

            error = { cause: "id", message: "No user found with such Id" };

            return res.status(400).json({ error });
        });
});

module.exports = exports = router;