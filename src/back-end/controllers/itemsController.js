const Folder    = require("../DAL/FolderDAL");
const Reference = require("../DAL/ReferenceDAL");

const { getJWToken, decodeRequestToken } = require("../common/tokens");

const TokenError = require("../errors/TokenError");
const PropError  = require("../errors/PropError");

const { FOLDER, REFERENCE } = require("../assets/itemTypes.json");

// #region Help
const processError = ({ res, serverError }) => 
                     error => {
    if (error instanceof TokenError) {
        return res.status(403).json({ error });
    } else if (error instanceof PropError) {
        return res.status(400).json({ error });
    }

    return res.status(500).json({ error: serverError });
};

function divideByType(items) {
    const foldersIds = () => 
        Promise.resolve(items.filter( el => el.type === FOLDER ).map( el => el._id ));
    const referencesIds = () => 
        Promise.resolve(items.filter( el => el.type === REFERENCE ).map( el => el._id ));

    return Promise.all([ foldersIds(), referencesIds() ]);
}
//#endregion

// #region Controllers
function updateItems(req, res) {
    const { items, params } = req.body;

    let error = {};
    let userId = "";

    const cause = "update items";
    const serverError = { cause, message: "Couldn't update the items" };
    
    if (!items) {
        error = { cause, message: "Not all obligatory arguments were specified" };

        return res.status(400).json({ error });
    }

    
    decodeRequestToken(req)
        .then( ({ data }) => {
            userId = data;
            
            return divideByType(items);
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
        .catch( err => processError({ res, serverError })(err) );
}

function deleteItems(req, res) {
    const { items } = req.body;

    let error = {};
    let userId = "";

    const cause = "delete items";
    const serverError = { cause, message: "Couldn't delete the items" };

    if (!items) {
        error = { cause, message: "Not all obligatory arguments were specified" };

        return res.status(400).json({ error });
    }
    
    decodeRequestToken(req)
        .then( ({ data }) => {
            userId = data;
            
            return divideByType(items);
        })
        .then( ([ foldersIds, referencesIds ]) => {
            const deleteFolders    = () => Folder.deleteManyByIds(foldersIds);
            const deleteReferences = () => Reference.deleteManyByIds(referencesIds);
            
            return Promise.all([ deleteFolders(), deleteReferences() ]);
        })
        .then( () =>
            res.status(200).json({ token: getJWToken(userId) })
        )
        .catch( err => processError({ res, serverError })(err) );
}
// #endregion

module.exports = exports = {
    updateItems,
    deleteItems
};