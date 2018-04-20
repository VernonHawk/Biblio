"use strict";

require("dotenv").config();
const mongoose = require("mongoose");

const OPTIONS = {
    autoReconnect: true,
    keepAlive: 120
};

function connect() {
    mongoose.connect(process.env.DB_CONNECTION_STRING, OPTIONS)
        .then(
            () => console.log("Connected to MongoDB"),
            (err) => {
                console.error(`Connection error: ${err}`);

                process.exit(1);
            }
        );
}

module.exports = exports = { connect };