"use strict";

const express = require("express");

const { updateItems, deleteItems } = require("../controllers/itemsController");

const router = express.Router();

router.patch("/", updateItems);
router.delete("/", deleteItems);

module.exports = exports = router;