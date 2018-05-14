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
const getManyByParentId = folderId => Folder.find({ folderId }).lean().sort({ name: 1 });

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

module.exports = {
    getById,
    getManyByParentId,
    save
};