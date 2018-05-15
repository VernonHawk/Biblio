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

router.get("/:folderId", (req, res) => {
    const { folderId } = req.params;

    let error = {};
    let userId = "";

    decodeRequestToken(req)
        .catch( err => {
            error = { cause: "token", message: err.message };

            throw new TokenError(error);
        })
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
            
            const getRefs = () => Reference.getNotArchivedByFolderId(folder._id);
            const getFolders = () => Folder.getNotArchivedByFolderId(folder._id);
            
            return Promise.all([ getRefs(), getFolders() ]);
        })
        .then( ([refs, folders]) => {
            const typedFolders = folders.map( el => ({ ...el, type: FOLDER }) );
            const typedRefs    = refs.map( el => ({ ...el, type: REFERENCE }) );
            
            res.status(200).json({ data: [...typedFolders, ...typedRefs], 
                                   token: getJWToken(userId) });
        })
        .catch( err => {
            if (err instanceof TokenError) {
                error = { cause: err.cause, message: err.message };

                return res.status(403).json({ error });
            } else if (err instanceof PropError || err.name === "CastError") {
                error = { cause: err.cause, message: err.message };

                return res.status(400).json({ error });
            }
            
            error = { cause: "biblio", message: "Couldn't fetch folder content" };

            return res.status(500).json({ error });
        });
});

module.exports = exports = router;