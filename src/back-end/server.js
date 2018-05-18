"use strict";

const express    = require("express");
const bodyParser = require("body-parser");
const helmet     = require("helmet");
const path       = require("path");

const router = require("./routers/router");

const app = express();

const BUILD_PATH = path.resolve(`${__dirname}/../../build`);

function mapRoutes() {
    app.use("/api", router);
    
    app.get("*", (req, res) => {
        res.sendFile(`${BUILD_PATH}/index.html`);
    });
}

function startServer() {
    app.use(express.static(BUILD_PATH));
    
    app.use(helmet());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    mapRoutes();

    app.set("port", process.env.PORT || 3000);
    
    app.listen(app.get("port"), () => console.log(`App listening on port ${app.get("port")}`)); 
}

module.exports.start = startServer;