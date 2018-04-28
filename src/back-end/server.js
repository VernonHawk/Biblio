"use strict";

const express    = require("express");
const bodyParser = require("body-parser");
const helmet     = require("helmet");

const app = express();

const PORT = process.env.PORT || 3000;

function mapRoutes() {
    app.get("/", (req, res) => {
        res.sendFile("index.html");
    });

    app.post("/login", (req, res) => {
        res.status(200).json(req.body);
    });

    app.post("/signup", (req, res) => {
        res.status(200).json(req.body);
    });

    app.get("/userByEmail/:email", (req, res) => {
        //make mongo request
        const user = { id: 1};
        res.status(200).json(user);
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