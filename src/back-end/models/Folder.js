"use strict";

const mongoose = require("mongoose");

const { validateId, validateName } = require("./validator");

const folderSchema = mongoose.Schema({
    folderId: {
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
        trim: true,
        maxlength: 100,
        validate: { validator: validateName, message: "Folder name can't be empty or consist only of whitespace" }
    },
    lastModified: {
        type: Date,
        default: Date.now,
        max: [ Date.now, "Last modified time can't be later than current time" ]
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

folderSchema.pre("save", function(next) {
    this.lastModified = Date.now();
    
    next();
});

folderSchema.pre("update", function(next) {
    this.update({}, { lastModified: Date.now() });
    
    next();
});

folderSchema.pre("updateMany", function(next) {
    this.update({}, { lastModified: Date.now() });
    
    next();
});
const Folder = mongoose.model("Folder", folderSchema);

module.exports = exports = Folder;