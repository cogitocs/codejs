//博客目录
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var PostAdd = require('../models/post').PostAdd;
/* post data to database. */
router.post('/', function(req, res) {
	console.log('message');
	// var post_title = post_title
		console.log(req.body.post_title);

	var obj = {
		post_title: req.body.post_title
	}
	PostAdd.create(obj, function(err, data) {
		console.log(data);
		return res.json({
			msg: "OK",
			data: data
		})
	})
});
var post_list = function(req, res) {
	var render_data = {
		title: '文章列表'
	}
	res.render('admin/post/post_list', render_data);
}
module.exports = function(app) {
	var __base_path = '/admin';
	app.get(__base_path + '/post_list', post_list); //登录
	// app.post(__base_path + '/regist', regist_action); //注册
};