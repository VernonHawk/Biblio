"use strict";

const express = require("express");

const Folder    = require("../DAL/FolderDAL");
const Reference = require("../DAL/ReferenceDAL");

const { getJWToken, decodeRequestToken } = require("../common/tokens");

const TokenError = require("../errors/TokenError");
const PropError  = require("../errors/PropError");

const { FOLDER, REFERENCE } = require("../assets/itemTypes.json");

const router = express.Router();

router.patch("/", (req, res) => {
    const { items, params } = req.body;

    let error = {};
    let userId = "";

    if (!items) {
        error = { cause: "update items", message: "Not all obligatory arguments were specified" };

        return res.status(400).json({ error });
    }
    
    decodeRequestToken(req)
        .then( ({ data }) => {
            userId = data;
            
            const foldersIds = () => 
                Promise.resolve(items.filter( el => el.type === FOLDER ).map( el => el._id ));
            const referencesIds = () => 
                Promise.resolve(items.filter( el => el.type === REFERENCE ).map( el => el._id ));

            return Promise.all([ foldersIds(), referencesIds() ]);
         })
        .then( ([ foldersIds, referencesIds ]) => {
            const updateFolders    = () => 
                Folder.updateManyByIds({ ids: foldersIds, params });
            const updateReferences = () => 
                Reference.updateManyByIds({ ids: referencesIds, params });
            
            return Promise.all([ updateFolders(), updateReferences() ]);
        })
        .then( () =>
            res.status(200).json({ token: getJWToken(userId) })
        )
        .catch( err => {
            if (err instanceof TokenError) {
                return res.status(403).json({ error: err });
            } else if (err instanceof PropError) {
                return res.status(400).json({ error: err });
            }
            
            error = { cause: "items", message: "Couldn't update the items" };

            return res.status(500).json({ error });
        });
});

module.exports = exports = router;