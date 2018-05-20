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
 * Get Folders by parameters with sort
 * 
 * @async
 * 
 * @param {Object} params Folder attributes
 * @param {String} params.filters Paramters to filter data
 * @param {String} params.sort    Sorting order
 * 
 * @returns {Promise.<Folder[], Error>} Promise of folders
 */
const getByFiltersWithSort = ({ filters, sort = { name: 1 } }) => Folder.find(filters).lean().sort(sort);

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
 * @param {String[]} params.ids    Ids of folders to update
 * @param {Object}   params.params Fields with new values
 * 
 * @returns {Promise.<Folder[], Error>} Promise of folders
 */
const updateManyByIds = ({ ids, params }) => Folder.updateMany(params).where("_id").in(ids).exec();

/**
 * Delete many folders by their ids
 * 
 * @async
 * 
 * @param {Object} params Reference attributes
 * @param {String[]} params.ids Ids of folders to update
 */
const deleteManyByIds = ids => Promise.all( ids.map( id => Folder.findByIdAndRemove(id) ));

module.exports = {
    getById,
    getByFiltersWithSort,
    save,
    updateManyByIds,
    deleteManyByIds
};