var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var blog_list = ["汪峰跨年求婚的最新相关信息", "邓紫棋太空", "新闻图集：泰国清迈小姐选美大赛 性感泳装美腿林立_9张图片", "呼格父母获赔偿", "自拍是一种病", "第65回nhk红白歌会战"]

	var render_data = {
		title: 'Code Life',
		blog_list: blog_list
	}
	res.render('index', render_data);
});

module.exports = router;