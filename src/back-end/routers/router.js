const express = require("express");
const router = express.Router();

const authRouter      = require("./authRouter");
const userRouter      = require("./userRouter");
const biblioRouter    = require("./biblioRouter");
const itemsRouter     = require("./itemsRouter");
const folderRouter    = require("./folderRouter");
const referenceRouter = require("./referenceRouter");

router.use("/", authRouter);
router.use("/user", userRouter);
router.use("/items", itemsRouter);
router.use("/folder", folderRouter);
router.use("/reference", referenceRouter);
router.use("/", biblioRouter);

module.exports = exports = router;