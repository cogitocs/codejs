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

module.exports = router;