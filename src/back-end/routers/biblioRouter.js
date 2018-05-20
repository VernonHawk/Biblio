"use strict";

const express = require("express");

const { 
    getRecent, getStarred, getArchived, getFolderContent
} = require("../controllers/biblioController");

const router = express.Router();

router.get("/recent", getRecent);
router.get("/starred", getStarred);
router.get("/archive", getArchived);
router.get("/:folderId", getFolderContent);

module.exports = exports = router;