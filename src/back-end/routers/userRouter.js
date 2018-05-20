"use strict";

const express = require("express");

const {
    getUserInfo, updateUser, deleteUser
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getUserInfo);
router.patch("/", updateUser);
router.delete("/", deleteUser);

module.exports = exports = router;