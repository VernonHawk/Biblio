"use strict";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    require("dotenv").config();
}

const db     = require("./dbConnection");
const server = require("./server");

db.connect();
server.start();