"use strict";

const mongoose = require("mongoose");

const { validateId, validateName, validateDate } = require("./validator");


const folderSchema = mongoose.Schema({
    parentId: {
        type: String,
        required: [ true, "Parent folder Id required" ],
        validate: { validator: validateId, message: "Parent folder Id is incorrect" }
    },
    userId: {
        type: String,
        required: [ true, "User Id required" ],
        validate: { validator: validateId, message: "User Id is incorrect" }
    },
    name: {
        type: String,
        required: [ true, "Folder name required" ],
        validate: { validator: validateName, message: "Folder name can't consist only of whitespace" }
    },
    lastModified: {
        type: Date,
        default: Date.now,
        validate: { validator: validateDate, message: "Last modified time can't be later than current time" }
    },
    isStarred: {
        type: Boolean,
        default: false
    },
    isArchived: {
        type: Boolean,
        default: false
    }
});

const Folder = mongoose.model("Folder", folderSchema);

module.exports = exports = Folder;