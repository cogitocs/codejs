var mongoose = require('mongoose');
var post_add = require('../schemas/post');//发表文章

var PostAdd = mongoose.model('PostAdd', post_add.PostAddSchema);

module.exports.PostAdd = PostAdd;
