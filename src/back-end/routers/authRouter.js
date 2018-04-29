"use strict";

const express = require("express");
const crypto = require("crypto");

const { getByEmail, save } = require("../DAL/UserDAL");
const { createJWToken } = require("../common/tokens");

const PropError = require("../common/PropError");

const router = express.Router();

router.post("/login", (req, res) => {
    const { email, pass } = req.body;

    let error = {};

    if (!email || !pass) {
        error = { cause: "login", message: "Not all arguments were specified" };

        return res.status(400).json({ error });
    }

    getByEmail(email)
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
                res.status(200).json({
                    token: createJWToken({ data: user._id, maxAge: 3600 })
                });
            } else {
                error = { cause: "pass", message: "Password is incorrect" };

                throw new PropError(error);
            }
        })
        .catch( err => {
            if (err.name === "PropError") {
                return res.status(400).json({ error });
            }

            error = { cause: "login", message: err.message };

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

    getByEmail(email)
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
                username, email, salt,
                pass: hash
            };

            return save(newUser);
        })
        .then( user => {
            res.status(200).json({
                token: createJWToken({ data: user._id, maxAge: 3600 })
            });
        })
        .catch( err => {
            if (err.name === "PropError") {
                return res.status(400).json({ error });
            }

            error = { cause: "signup", message: err.message };

            res.status(500).json({ error });
        });
});

module.exports = exports = router;