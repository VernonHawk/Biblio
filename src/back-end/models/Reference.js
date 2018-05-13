"use strict";

const mongoose = require("mongoose");

const { validateId, validateName, validateAuthors, validateYear } = require("./validator");

const referenceSchema = mongoose.Schema({
    // general info
    folderId: {
        type: String,
        required: [ true, "Folder Id required" ],
        validate: { validator: validateId, message: "Folder Id is incorrect" }
    },
    userId: {
        type: String,
        required: [ true, "User Id required" ],
        validate: { validator: validateId, message: "User Id is incorrect" }
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
    },
    // concrete info
    name: {
        type: String,
        required: [ true, "Reference name required" ],
        trim: true,
        maxlength: 100,
        validate: { validator: validateName, message: "Reference name can't be empty or consist only of whitespace" }
    },
    authors: {
        type: [{
            type: String,
            trim: true,
            maxlength: 100,
            validate: { validator: validateName, message: "Author's name can't be empty or consist only of whitespace" }
        }],
        validate: { validator: validateAuthors, message: "Authors array is too long" }
    },
    publisher: {
        type: String,
        default: "",
        trim: true,
        maxlength: 100
    },
    city: {
        type: String,
        default: "",
        trim: true,
        maxlength: 100
    },
    year: {
        type: Number,
        validate: { validator: validateYear, message: "Publishing year can't be later than current year" }
    },
    edition: {
        type: String,
        default: "",
        trim: true,
        maxlength: 100
    },
    startPage: {
        type: Number,
        min: [ 0, "Start page number can't be less than 0" ],
        validate: { 
            validator: function (val) {
                return this.endPage ? val <= this.endPage : val <= 10000;
            }, 
            message: "Start page number can't be higher than end page" 
        }
    },
    endPage: {
        type: Number,
        min: [ 0, "End page number can't be less than 0" ],
        validate: { 
            validator: function (val) {
                return this.startPage ? val >= this.startPage : val <= 10000;
            }, 
            message: "End page number can't be lower than start page" 
        }
    },
    text: {
        type: String,
        default: "",
        maxlength: 200
    },
    link: {
        type: String,
        default: "",
        trim: true,
        maxlength: 100
    }
});

const Reference = mongoose.model("Reference", referenceSchema);

module.exports = exports = Reference;