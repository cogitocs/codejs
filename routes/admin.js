var PostAdd = require('../models/post').PostAdd;
var index = function(req, res) {
	var blog_list = ["汪峰跨年求婚的最新相关信息", "邓紫棋太空", "新闻图集：泰国清迈小姐选美大赛 性感泳装美腿林立_9张图片", "呼格父母获赔偿", "自拍是一种病", "第65回nhk红白歌会战"]

	var render_data = {
		title: 'Code Js',
		blog_list: blog_list
	}
	PostAdd.find({}).exec(function(err, data) {
		render_data.data = data;
		console.log(data.length);
		res.render('welcome', render_data);

	})
}
var resources_css = function(req, res) {
	var render_data = {
		title: 'Code Js',
	}
	res.render('resources/css', render_data);

}
var resources_js = function(req, res) {
	var render_data = {
		title: 'Code Js',
	}
	res.render('resources/js', render_data);

}
var resources_html = function(req, res) {
	var render_data = {
		title: 'Code Js',
	}
	res.render('resources/html', render_data);

}
var test_border = function(req, res) {
	var render_data = {
		title: 'Code Js',
	}
	res.render('test/border', render_data);

}
module.exports = function(app) {
	app.get('/', index);
	app.get('/resources/css', resources_css);
	app.get('/resources/js', resources_js);
	app.get('/resources/html', resources_html);
	app.get('/test/border', test_border);

	require('./admin/login')(app);
}