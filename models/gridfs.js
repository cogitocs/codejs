var mongoose = require('mongoose');
var gridfs = require('../schemas/gridfs');

var GridFile = mongoose.model('GridFile', gridfs.GridFileSchema, 'fs.files');
module.exports.GridFile = GridFile;