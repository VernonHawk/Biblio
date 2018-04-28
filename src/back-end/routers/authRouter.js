const express = require("express");

const User = require("../models/User");
const { createJWToken } = require("../common/tokens");

const { decodeRequestToken } = require("../common/middleware");

const router = express.Router();

router.post("/login", (req, res) => {
    const { email, pass } = req.body;

    if (!email || !pass) {
        return res.status(400)
                .json({
                    success: false,
                    message: "Not all arguments were specified"
                });
    }

    res.status(200).json(req.body);
});

router.post("/signup", (req, res) => {
    const { name: fullName, email, pass } = req.body;

    if (!fullName || !email || !pass) {
        return res.status(400)
                .json({
                    success: false,
                    message: "Not all arguments were specified"
                });
    }

    res.status(200).json(req.body);
});

module.exports = exports = router;