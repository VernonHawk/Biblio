"use strict";

const mongoose = require("mongoose");

const OPTIONS = {
    autoReconnect: true,
    keepAlive: 120
};

function connect() {
    mongoose.connect(process.env.MONGODB_URI, OPTIONS)
        .then(
            () => console.log("Connected to MongoDB"),
            err => {
                console.error(`Connection error: ${err}`);

                process.exit(1);
            }
        );
}

module.exports = exports = { connect };