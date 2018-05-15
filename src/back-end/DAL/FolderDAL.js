const Folder = require("../models/Folder");

/**
 * Get Folder by id
 * 
 * @async
 * 
 * @param {String} id Id
 * 
 * @returns {Promise.<Folder, Error>} Promise of folder
 */
const getById = id => Folder.findById(id);

/**
 * Get Folders by Parent Folder Id
 * 
 * @async
 * 
 * @param {String} folderId Parent Folder Id
 * 
 * @returns {Promise.<Folder[], Error>} Promise of folders
 */
const getNotArchivedByFolderId = folderId => Folder.find({ folderId, isArchived: false }).lean().sort({ name: 1 });

/**
 * Save Folder
 * 
 * @async
 * 
 * @param {Object} params Folder attributes
 * @param {String} params.name     Name
 * @param {String} params.folderId Parent folder Id
 * @param {String} params.userId   User Id
 * 
 * @returns {Promise.<Folder, Error>} Promise of folder
 */
const save = params => new Folder(params).save();

/**
 * Update many folders by items ids
 * 
 * @async
 * 
 * @param {Object} params Folder attributes
 * @param {String} params.ids    Ids of folders to update
 * @param {String} params.params Fields with new values
 * 
 * @returns {Promise.<Folder[], Error>} Promise of folders
 */
const updateManyByIds = ({ ids, params }) => Folder.updateMany(params).where("_id").in(ids).exec();

module.exports = {
    getById,
    getNotArchivedByFolderId,
    save,
    updateManyByIds
};