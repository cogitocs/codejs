var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');//用户表
/*
User Model
 */

var User = mongoose.model('User', UserSchema);

module.exports = User;
