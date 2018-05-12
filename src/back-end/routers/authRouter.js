"use strict";

const express = require("express");
const crypto  = require("crypto");

const { getByEmail, save } = require("../DAL/UserDAL");
const { getJWToken } = require("../common/tokens");

const PropError = require("../errors/PropError");

const router = express.Router();

router.post("/signin", (req, res) => {
    const { email, pass } = req.body;

    let error = {};

    if (!email || !pass) {
        error = { cause: "signin", message: "Not all arguments were specified" };

        return res.status(400).json({ error });
    }

    const lowerEmail = email.toLowerCase();

    getByEmail(lowerEmail)
        .then( user => {
            if (!user) {
                error = { cause: "email", message: "No user found with such email" };

                throw new PropError(error);
            }
            
            // Encrypt user password
            const hash = crypto.createHmac("sha512", pass)
                                .update(user.salt)
                                .digest("hex");

            if (hash === user.pass) {
                res.status(200).json({ token: getJWToken(user._id) });
            } else {
                error = { cause: "pass", message: "Password is incorrect" };

                throw new PropError(error);
            }
        })
        .catch( err => {
            if (err instanceof PropError) {
                error = { cause: err.cause, message: err.message };

                return res.status(400).json({ error });
            }

            error = { cause: "signin", message: err.message };

            res.status(500).json({ error });
        });
});

router.post("/signup", (req, res) => {
    const { username, email, pass } = req.body;

    let error = {};

    if (!username || !email || !pass) {
        error = { cause: "signup", message: "Not all arguments were specified" };

        return res.status(400).json({ error });
    }

    const trimUsername = username.trim();
    const lowerEmail   = email.toLowerCase();

    if (!trimUsername) {
        error = { cause: "username", message: "Username can't consist only of whitespace" };

        return res.status(400).json({ error });
    }

    const passLength = {
        min: 6,
        max: 50
    };

    if (pass.length < passLength.min) {
        error = { cause: "pass", message: `Password is too short. Min length is ${passLength.min}` };

        return res.status(400).json({ error });
    } else if (pass.length > passLength.max) {
        error = { cause: "pass", message: `Password is too long. Max length is ${passLength.max}` };

        return res.status(400).json({ error });
    }

    getByEmail(lowerEmail)
        .then( user => {
            if (user) {
                error = { cause: "email", message: "This email is already taken" };
                
                throw new PropError(error);
            }
            
            // Encrypt user password
            const salt = crypto.randomBytes(16).toString("hex"); 
        
            const hash = crypto.createHmac("sha512", pass)
                                .update(salt)
                                .digest("hex");

            const newUser = {
                username: trimUsername, 
                email: lowerEmail, 
                salt, pass: hash
            };

            return save(newUser);
        })
        .then( user =>
            res.status(200).json({ token: getJWToken(user._id) })
        )
        .catch( err => {
            if (err instanceof PropError) {
                error = { cause: err.cause, message: err.message };

                return res.status(400).json({ error });
            }

            error = { cause: "signup", message: err.message };

            res.status(500).json({ error });
        });
});

module.exports = exports = router;