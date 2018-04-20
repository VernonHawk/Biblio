"use strict";

const express    = require("express");
const bodyParser = require("body-parser");
const helmet     = require("helmet");

const app = express();

const PORT = process.env.PORT || 3001;

function mapRoutes() {
    app.get("/", (req, res) => {
        res.sendFile("index.html");
    });

    app.get("/tst", (req, res) => {
        res.send("abc");
    });
}

function startServer() {
    const buildPath = __dirname + "/../../build/" ;

    app.use(express.static(buildPath));
    app.use(express.static(buildPath + "static"));
    
    app.use(helmet());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    mapRoutes();
    
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`)); 
}

module.exports.start = startServer;