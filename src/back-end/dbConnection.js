"use strict";

const mongoose = require("mongoose");

const OPTIONS = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
    autoReconnect: true,
    keepAlive: 120
};

function connect() {
    mongoose.connect(process.env.DB_CONNECTION_STRING, OPTIONS)
        .then(
            () => console.log("Connected to MongoDB"),
            err => {
                console.error(`Connection error: ${err}`);

                process.exit(1);
            }
        );
}

module.exports = exports = { connect };