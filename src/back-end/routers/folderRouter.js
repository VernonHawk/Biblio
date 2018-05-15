"use strict";

const express = require("express");

const User   = require("../DAL/UserDAL");
const Folder = require("../DAL/FolderDAL");

const { getJWToken, decodeRequestToken } = require("../common/tokens");

const TokenError = require("../errors/TokenError");
const PropError  = require("../errors/PropError");

const router = express.Router();

router.post("/", (req, res) => {
    const { name, folderId } = req.body;

    let error = {};

    if (!name || !folderId) {
        error = { cause: "add folder", message: "Not all arguments were specified" };

        return res.status(400).json({ error });
    }

    const trimName = name.trim();

    if (!trimName) {
        error = { cause: "name", message: "Folder name can't be empty or consist only of whitespace" };

        return res.status(400).json({ error });
    }

    decodeRequestToken(req)
        .catch( err => {
            error = { cause: "token", message: err.message };

            throw new TokenError(error);
        })
        .then( ({ data }) => {
            if (data === folderId) {
                return User.getById(folderId);
            } else {
                return Folder.getById(folderId);
            }
        })
        .then( folder => {
            if (!folder) {
                error = { cause: "folderId", message: "No folder found with such id" };

                throw new PropError(error);
            }

            const userId = folder.userId || folder._id;

            return Folder.save({
                userId,
                folderId: folder._id,
                name: trimName
            });
        })
        .then( ({ name, userId }) => 
            res.status(200).json({ name, token: getJWToken(userId) })
        )
        .catch( err => {
            if (err instanceof TokenError) {
                error = { cause: err.cause, message: err.message };

                return res.status(403).json({ error });
            } else if (err instanceof PropError) {
                error = { cause: err.cause, message: err.message };

                return res.status(400).json({ error });
            }

            error = { cause: "folder", message: "Couldn't add new folder" };

            return res.status(500).json({ error });
        });
});

router.patch("/", (req, res) => {
    const { id, ...rest } = req.body;

    let error = {};

    if (!id) {
        error = { cause: "update folder", message: "Not all obligatory arguments were specified" };

        return res.status(400).json({ error });
    }
    
    if (rest.name && !rest.name.trim()) {   
        error = { cause: "name", message: "Folder name can't be empty or consist only of whitespace" };
        
        return res.status(400).json({ error });
    }

    decodeRequestToken(req)
        .catch( err => {
            error = { cause: "token", message: err.message };

            throw new TokenError(error);
        })
        .then( () => Folder.getById(id) )
        .then( folder => {
            if (!folder) {
                error = { cause: "id", message: "No folder found with such id" };

                throw new PropError(error);
            }

            folder.set(rest);

            return folder.save();
        })
        .then( ({ name, userId }) =>
            res.status(200).json({ name, token: getJWToken(userId) })
        )
        .catch( err => {
            if (err instanceof TokenError) {
                error = { cause: err.cause, message: err.message };

                return res.status(403).json({ error });
            } else if (err instanceof PropError) {
                error = { cause: err.cause, message: err.message };

                return res.status(400).json({ error });
            }

            error = { cause: "folder", message: "Couldn't update the folder" };

            return res.status(500).json({ error });
        });
});

module.exports = exports = router;