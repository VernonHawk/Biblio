"use strict";

const mongoose = require("mongoose");

const { validateName, validateEmail } = require("./validator");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [ true, "Username required" ],
        validate: { validator: validateName, message: "Username can't consist only of whitespace" }
    },
    email: {
        type: String, 
        required: [ true, "Email required" ],
        unique: true,
        validate: { validator: validateEmail, message: "Email can't consist only of whitespace" }
    },
    pass: {
        type: String,
        required: [ true, "Password required" ]
    },
    salt: {
        type: String,
        required: [ true, "Salt required" ]
    }
});

const User = mongoose.model("User", userSchema);

module.exports = exports = User;