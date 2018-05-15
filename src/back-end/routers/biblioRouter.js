"use strict";

const express = require("express");

const User      = require("../DAL/UserDAL");
const Folder    = require("../DAL/FolderDAL");
const Reference = require("../DAL/ReferenceDAL");

const { getJWToken, decodeRequestToken } = require("../common/tokens");

const TokenError = require("../errors/TokenError");
const PropError  = require("../errors/PropError");

const { FOLDER, REFERENCE } = require("../assets/itemTypes.json");

const router = express.Router();

router.get("/recent", (req, res) => {
    let error = {};
    let userId = "";

    decodeRequestToken(req)
        .then( ({ data }) => {
            userId = data;
            
            const lastWeek = Date.now() - 7 * 1000 * 60 * 60 * 24;

            const filters = {
                userId,
                isArchived: false,
                lastModified: { $gte: lastWeek }
            };

            const sort = {
                lastModified: -1
            };

            const getFolders = () => Folder.getByFiltersWithSort({ filters, sort });
            const getRefs = () => Reference.getByFiltersWithSort({ filters, sort });
            
            return Promise.all([ getFolders(), getRefs() ]);
        })
        .then( ([ folders, refs ]) => mapWithType({ folders, refs }) )
        .then( ({ folders, references }) =>
            res.status(200).json({ data: [...folders, ...references], 
                                token: getJWToken(userId) })
        )
        .catch( err => {
            if (err instanceof TokenError) {
                error = { cause: err.cause, message: err.message };

                return res.status(403).json({ error });
            } else if (err instanceof PropError || err.name === "CastError") {
                error = { cause: err.cause, message: err.message };

                return res.status(400).json({ error });
            }
            
            error = { cause: "recent", message: "Couldn't fetch recently modified items" };

            return res.status(500).json({ error });
        });
});

router.get("/:folderId", (req, res) => {
    const { folderId } = req.params;

    let error = {};
    let userId = "";

    decodeRequestToken(req)
        .then( ({ data }) => {
            userId = data;

            if (!folderId || data === folderId) {
                return User.getById(data);
            } else {
                return Folder.getById(folderId);
            }
        })
        .then( folder => {
            if (!folder) {
                error = { cause: "folderId", message: "No folder found with such id" };

                throw new PropError(error);
            }

            const filters = {
                userId,
                folderId: folder._id,
                isArchived: false
            };

            const sort = {
                name: 1
            };

            const getFolders = () => Folder.getByFiltersWithSort({ filters, sort });
            const getRefs    = () => Reference.getByFiltersWithSort({ filters, sort });
            
            return Promise.all([ getFolders(), getRefs() ]);
        })
        .then( ([ folders, refs ]) => mapWithType({ folders, refs }) )
        .then( ({ folders, references }) =>
            res.status(200).json({ data: [...folders, ...references], 
                                   token: getJWToken(userId) })
        )
        .catch( err => {
            if (err instanceof TokenError) {
                error = { cause: err.cause, message: err.message };

                return res.status(403).json({ error });
            } else if (err instanceof PropError || err.name === "CastError") {
                error = { cause: err.cause, message: err.message };

                return res.status(400).json({ error });
            }
            
            error = { cause: "all", message: "Couldn't fetch folder content" };

            return res.status(500).json({ error });
        });
});

function mapWithType({ refs, folders }) {
    const typedFolders = folders.map( el => ({ ...el, type: FOLDER }) );
    const typedRefs    = refs.map( el => ({ ...el, type: REFERENCE }) );

    return Promise.resolve({ folders: typedFolders, references: typedRefs});
}

module.exports = exports = router;