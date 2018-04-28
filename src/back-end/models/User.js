const mongoose = require("mongoose");

const notEmpty = value => new Promise( resolve => resolve(Boolean(value.trim().length)) );

const userSchema = mongoose.Schema({
    fullName: { 
        type: String, 
        required: [ true, "Name required" ], 
        validate: { validator: notEmpty, message: "Name can't consist only of whitespace" }
    },
    email: { 
        type: String, 
        required: [ true, "Email required" ], 
        unique: true,
        validate: { validator: notEmpty, message: "Email can't consist only of whitespace" }
    },
    password: { 
        type: String, 
        required: [ true, "Password required" ] 
    },
    salt: { 
        type: String, 
        required: [ true, "Salt required" ] 
    },
});

const User = mongoose.model("User", userSchema);

module.exports = exports = User;