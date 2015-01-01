//文章发表模块

var mongoose = require('mongoose');
var valid = require('../routes/valid');
var async = require('async');
//存储文章发表的表
var PostAddSchema = mongoose.Schema({
    post_title: { 
        type: String
    },
   
});

module.exports.PostAddSchema = PostAddSchema;
PostAddSchema.plugin(valid);
