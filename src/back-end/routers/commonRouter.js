const express = require("express");

const User = require("../models/User");

const router = express.Router();

router.get("/userByEmail/:email", (req, res) => {
    User.findOne({ email: req.params.email })
        .then( user => {
            res.status(200).json(user);
        })
        .catch( err => res.status(500).json(err));
});

module.exports = exports = router;