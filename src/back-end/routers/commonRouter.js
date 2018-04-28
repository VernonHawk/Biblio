"use strict";

const express = require("express");

const { getByEmail } = require("../DAL/UserDAL");

const router = express.Router();

router.get("/userByEmail/:email", (req, res) => {
    getByEmail(req.params.email)
        .then( user => {
            res.status(200).json(user);
        })
        .catch( err => res.status(500)
                        .json({ error: { cause: "email", msg: err.message } }) );
});

module.exports = exports = router;