//文章发表模块

var mongoose = require('mongoose');
var valid = require('../routes/valid');
var async = require('async');
//存储文章发表的表
var PostAddSchema = mongoose.Schema({
	post_category: { //文章大分类
		type: String,
		"enum": ["JAVASCRIPT", "NODEJS", "FRAMEFRAMEWORK", "BACKFRAMEWORK", "TOOLS"]

	},
	post_type: { //文章小分类
		type: String,
		"enum": ["A", "B", "C", "D", "E", "F", "G"]

	},
	post_title: { //文章标题
		type: String
	},
	post_content: { //文章主体
		type: String
	},
	post_attachments: {//上传附件
		type: mongoose.Schema.Types.ObjectId,
		ref: 'GridFile'
	},
	read_num: {//阅读数
		type: Number,
		default: 0
	},
	lover: {//点赞数
		type: Number,
		default: 0
	},
	hater: {//讨厌
		type: Number,
		default: 0

	},
	post_comment: [{ //文章评论
		comment: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	}]

});

module.exports.PostAddSchema = PostAddSchema;
PostAddSchema.plugin(valid);