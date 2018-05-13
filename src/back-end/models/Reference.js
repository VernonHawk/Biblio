"use strict";

const mongoose = require("mongoose");

const { validateId, validateName, validateArray } = require("./validator");

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
        validate: { validator: validateName, message: "Reference name can't consist only of whitespace" }
    },
    authors: {
        type: [{
            type: String,
            maxlength: 100,
            validate: { validator: validateName, message: "Author's name can't consist only of whitespace" }
        }],
        validate: { validator: validateArray, message: "Authors array is too long" }
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
        max: [ new Date().getFullYear, "Publishing year can't be later than current year" ]
    },
    startPage: {
        type: Number,
        min: [ 0, "Start page number can't be less than 0" ],
        max: [
        function () {
            return this.endPage;
        }, "Start page number can't be higher than end page" ]
    },
    endPage: {
        type: Number,
        min: [
        function () {
            return this.startPage;
        }, "End page number can't be lower than start page" ]
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