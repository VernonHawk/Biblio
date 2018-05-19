const User      = require("../DAL/UserDAL");
const Folder    = require("../DAL/FolderDAL");
const Reference = require("../DAL/ReferenceDAL");

const { getJWToken, decodeRequestToken } = require("../common/tokens");

const TokenError = require("../errors/TokenError");
const PropError  = require("../errors/PropError");

const { FOLDER, REFERENCE } = require("../assets/itemTypes.json");

function getItems({ filters, sort }) {
    const getFolders = () => Folder.getByFiltersWithSort({ filters, sort });
    const getRefs    = () => Reference.getByFiltersWithSort({ filters, sort });
    
    return Promise.all([ getFolders(), getRefs() ]);
}

function mapWithType([ folders, refs ]) {
    const typedFolders = folders.map( el => ({ ...el, type: FOLDER }) );
    const typedRefs    = refs.map( el => ({ ...el, type: REFERENCE }) );

    return Promise.resolve({ folders: typedFolders, references: typedRefs});
}

const sendData = ({ res, userId }) => 
                 ({ folders, references }) =>
    res.status(200).json({ data: [...folders, ...references], 
                           token: getJWToken(userId) });

const processError = ({ res, serverError }) => 
                     error => {
    if (error instanceof TokenError) {
        return res.status(403).json({ error });
    } else if (error instanceof PropError || error.name === "CastError") {
        return res.status(400).json({ error });
    }

    return res.status(500).json({ error: serverError });
};

function getRecent(req, res) {
    const lastWeek = Date.now() - 7 * 1000 * 60 * 60 * 24;

    const filters = {
        isArchived: false,
        lastModified: { $gte: lastWeek }
    };

    const sort = { lastModified: -1 };
    const serverError = { cause: "recent", 
                          message: "Couldn't fetch recently modified items" };
    
    return getDataByFiltersWithSort({ req, res, filters, sort, serverError });
}

function getStarred(req, res) {
    const filters = { isStarred: true };
    const serverError = { cause: "starred", 
                          message: "Couldn't fetch starred items" };
    
    return getDataByFiltersWithSort({ req, res, filters, serverError });
}

function getFolderContent(req, res) {
    const { folderId } = req.params;
    
    let error = {};
    let userId = "";

    const serverError = { cause: "all", 
                          message: "Couldn't fetch folder content" };

    return decodeRequestToken(req)
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

            const sort = { name: 1 };
            
            return Promise.resolve({ filters, sort });
        })
        .then( getItems )
        .then( mapWithType )
        .then( items => sendData({ res, userId })(items) )
        .catch( err => processError({ res, serverError })(err) );
}

function getDataByFiltersWithSort({ req, res, filters = {}, sort = { name: 1 },
                                    serverError = {} }) {
    let userId = "";

    decodeRequestToken(req)
        .then( ({ data }) => {
            userId = data;
            
            filters.userId = userId;

            return Promise.resolve({ filters, sort });
        })
        .then( getItems )
        .then( mapWithType )
        .then( items => sendData({ res, userId })(items) )
        .catch( err => processError({ res, serverError })(err) );
}

module.exports = exports = {
    getRecent,
    getStarred,
    getFolderContent
};