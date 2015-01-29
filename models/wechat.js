var mongoose = require('mongoose');
var token = require('../schemas/QYWXToken');//wechat

var QYWXToken = mongoose.model('QYWXToken', token.QYWXTokenSchema);

module.exports.QYWXToken = QYWXToken;
