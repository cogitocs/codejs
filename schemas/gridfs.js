var sprintf = require('sprintf').sprintf;
var mongoose = require('mongoose');

var GridFileSchema = mongoose.Schema({
    filename: String,
    contentType: String,
    length: Number,
    chunkSize: Number,
    uploadDate: Date,
    aliases: String,
    metadata: {},
    md5: String
})

module.exports.GridFileSchema = GridFileSchema;