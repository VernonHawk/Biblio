"use strict";

const express    = require("express");
const bodyParser = require("body-parser");
const helmet     = require("helmet");

const authRouter      = require("./routers/authRouter");
const userRouter      = require("./routers/userRouter");
const biblioRouter    = require("./routers/biblioRouter");
const folderRouter    = require("./routers/folderRouter");
const referenceRouter = require("./routers/referenceRouter");

const app = express();

const PORT = process.env.PORT || 3000;

function mapRoutes() {
    app.get("/", (req, res) => {
        res.sendFile("index.html");
    });

    app.use("/", authRouter);
    app.use("/user", userRouter);
    app.use("/folder", folderRouter);
    app.use("/reference", referenceRouter);
    app.use("/", biblioRouter);
}

function startServer() {
    const buildPath = __dirname + "/../../build/";

    app.use(express.static(buildPath));
    app.use(express.static(buildPath + "static"));
    
    app.use(helmet());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    mapRoutes();
    
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`)); 
}

module.exports.start = startServer;