"use strict";

const express = require("express");
const crypto = require("crypto");

const { getByEmail, save } = require("../DAL/UserDAL");
const { createJWToken } = require("../common/tokens");

const router = express.Router();

router.post("/login", (req, res) => {
    const { email, pass } = req.body;

    let error = {};

    if (!email || !pass) {
        error = { cause: "login", msg: "Not all arguments were specified" };

        return res.status(400).json({ error });
    }

    getByEmail(email)
        .then( user => {
            if (!user) {
                error = { cause: "email", msg: "No user found with such email" };

                return res.status(404).json({ error });
            }
            
            // Encrypt user password
            const hash = crypto.createHmac("sha512", pass)
                                .update(user.salt)
                                .digest("hex");

            if (hash === user.pass) {
                // TODO: make jwt
                res.status(200).json(user);
            } else {
                error = { cause: "pass", msg: "Password is incorrect" };

                res.status(404).json({ error });
            }
        })
        .catch( err => {
            error = { cause: "login", msg: err.message };

            res.status(500).json({ error });
        });
});

router.post("/signup", (req, res) => {
    const { username, email, pass } = req.body;

    let error = {};

    if (!username || !email || !pass) {
        error = { cause: "signup", msg: "Not all arguments were specified" };

        return res.status(400).json({ error });
    }

    getByEmail(email)
        .then( user => {
            if (user) {
                error = { cause: "email", msg: "This email is already taken" };

                return res.status(404).json({ error });
            }

            // Encrypt user password
            const salt = crypto.randomBytes(16).toString("hex"); 
        
            const hash = crypto.createHmac("sha512", pass)
                                .update(salt)
                                .digest("hex");

            const newUser = {
                username, email, salt,
                pass: hash
            };

            return save(newUser);
        })
        .then( user => {
            // TODO: make jwt
            res.status(200).json(user);
        })
        .catch( err => {
            console.log(err.message);
            error = { cause: "signup", msg: err.message };

            res.status(500).json({ error });
        });
});

module.exports = exports = router;